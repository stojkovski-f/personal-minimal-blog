import { readFile } from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";

const QUESTION_LIMIT = 400;
const MODEL = "openai/gpt-oss-20b";

function loadProfile() {
  return readFile(path.join(process.cwd(), "src/content/profile.md"), "utf8");
}

const instructions = `You answer questions about Filip Stojkovski using only the profile in this message.
Return JSON with two fields: "known" (boolean) and "answer" (string).
Set known to true only when the profile states the answer. Set known to false and answer to an empty string when the profile does not contain it, when the question is not about Filip, or when answering would require guessing.
Do not add employers, dates, titles, or skills that the profile does not state.
When a question could mean either origin or current city, include both if the profile states both.
Write the answer in the requested language, in plain sentences, with no markdown, and in fewer than 80 words.`;

type AskStatus = "answer" | "unknown" | "quota" | "invalid" | "unavailable";

function json(status: AskStatus, init?: ResponseInit, answer?: string) {
  return Response.json(
    answer ? { status, answer } : { status },
    init,
  );
}

function parseAnswer(content: string) {
  const trimmed = content.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "");
  const candidates = [trimmed];
  const object = trimmed.match(/\{[\s\S]*\}/);
  if (object && object[0] !== trimmed) {
    candidates.push(object[0]);
  }

  for (const candidate of candidates) {
    try {
      const value = JSON.parse(candidate) as { known?: unknown; answer?: unknown };
      if (typeof value.known !== "boolean") {
        continue;
      }
      return {
        known: value.known,
        answer: typeof value.answer === "string" ? value.answer.trim() : "",
      };
    } catch {
      continue;
    }
  }

  return null;
}

export async function POST(request: Request) {
  await connection();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json("invalid", { status: 400 });
  }

  const question =
    body &&
    typeof body === "object" &&
    "question" in body &&
    typeof body.question === "string"
      ? body.question.trim()
      : "";
  const locale =
    body &&
    typeof body === "object" &&
    "locale" in body &&
    body.locale === "sv"
      ? "sv"
      : "en";

  if (!question || question.length > QUESTION_LIMIT) {
    return json("invalid", { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return json("unavailable", { status: 503 });
  }

  let completion: Response;
  try {
    completion = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 700,
        reasoning_effort: "low",
        reasoning_format: "hidden",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: `${instructions}\n\nProfile:\n${await loadProfile()}` },
          {
            role: "user",
            content: `Language: ${locale === "sv" ? "Swedish" : "English"}\nQuestion: ${question}`,
          },
        ],
      }),
      cache: "no-store",
    });
  } catch {
    return json("unavailable", { status: 502 });
  }

  if (completion.status === 429) {
    return json("quota", { status: 429 });
  }

  if (!completion.ok) {
    return json("unavailable", { status: 502 });
  }

  const payload = (await completion.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };
  const content = payload.choices?.[0]?.message?.content;
  const parsed = typeof content === "string" ? parseAnswer(content) : null;

  if (!parsed || !parsed.known || !parsed.answer) {
    return json("unknown");
  }

  return json("answer", undefined, parsed.answer);
}
