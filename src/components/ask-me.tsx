"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/routing";

const QUESTION_LIMIT = 400;

type AskCopy = {
  label: string;
  powered: string;
  placeholder: string;
  submit: string;
  pending: string;
  unknownLead: string;
  unknownOr: string;
  quota: string;
  unavailable: string;
  tooLong: string;
  email: string;
  linkedinLabel: string;
  linkedinUrl: string;
};

type AskResult =
  | { status: "answer"; answer: string }
  | { status: "unknown" | "quota" | "invalid" | "unavailable" };

export function AskMe({ locale, copy }: { locale: Locale; copy: AskCopy }) {
  const [question, setQuestion] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<AskResult | null>(null);

  const tooLong = question.length > QUESTION_LIMIT;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || trimmed.length > QUESTION_LIMIT || pending) {
      return;
    }

    setPending(true);
    setResult(null);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, locale }),
      });
      const payload = (await response.json()) as {
        status?: AskResult["status"];
        answer?: string;
      };

      if (payload.status === "answer" && payload.answer) {
        setResult({ status: "answer", answer: payload.answer });
      } else if (
        payload.status === "unknown" ||
        payload.status === "quota" ||
        payload.status === "invalid" ||
        payload.status === "unavailable"
      ) {
        setResult({ status: payload.status });
      } else {
        setResult({ status: "unavailable" });
      }
    } catch {
      setResult({ status: "unavailable" });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-10 max-w-xl">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
          {copy.label}
        </h2>
        <span className="ask-neon">{copy.powered}</span>
      </div>
      <form onSubmit={onSubmit} className="mt-4">
        <label htmlFor="ask-me" className="sr-only">
          {copy.label}
        </label>
        <textarea
          id="ask-me"
          name="question"
          rows={3}
          maxLength={QUESTION_LIMIT}
          value={question}
          placeholder={copy.placeholder}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key !== "Enter" ||
              event.shiftKey ||
              event.nativeEvent.isComposing
            ) {
              return;
            }
            event.preventDefault();
            if (pending || question.trim().length === 0 || tooLong) {
              return;
            }
            event.currentTarget.form?.requestSubmit();
          }}
          className="w-full resize-y border border-line bg-white px-3 py-3 text-base leading-relaxed outline-none placeholder:text-muted"
        />
        <div className="mt-3 flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={pending || question.trim().length === 0 || tooLong}
            className="inline-flex min-h-11 items-center rounded-full border border-foreground px-5 text-sm disabled:opacity-40"
          >
            {pending ? copy.pending : copy.submit}
          </button>
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted">
            {question.length}/{QUESTION_LIMIT}
          </p>
        </div>
      </form>
      {result ? (
        <div className="mt-6 text-base leading-relaxed" aria-live="polite">
          {result.status === "answer" ? <p>{result.answer}</p> : null}
          {result.status === "unknown" ? (
            <p>
              {copy.unknownLead}{" "}
              <a
                href={`mailto:${copy.email}`}
                className="underline decoration-line underline-offset-4"
              >
                {copy.email}
              </a>{" "}
              {copy.unknownOr}{" "}
              <a
                href={copy.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line underline-offset-4"
              >
                {copy.linkedinLabel}
              </a>
              .
            </p>
          ) : null}
          {result.status === "quota" || result.status === "unavailable" ? (
            <p>
              {result.status === "quota" ? copy.quota : copy.unavailable}{" "}
              <a
                href={`mailto:${copy.email}`}
                className="underline decoration-line underline-offset-4"
              >
                {copy.email}
              </a>{" "}
              {copy.unknownOr}{" "}
              <a
                href={copy.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line underline-offset-4"
              >
                {copy.linkedinLabel}
              </a>
              .
            </p>
          ) : null}
          {result.status === "invalid" ? <p>{copy.tooLong}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
