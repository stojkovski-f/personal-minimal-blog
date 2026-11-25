import type { Post } from "@/content/posts";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/locale";

export function PostList({
  items,
  locale,
  readMore,
}: {
  items: Post[];
  locale: Locale;
  readMore: string;
}) {
  const ordered = [...items].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ol>
      {ordered.map((post) => (
        <li key={post.slug} className="border-t border-line">
          <article className="max-w-2xl py-8">
            <time
              dateTime={post.date}
              className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase"
            >
              {formatDate(post.date, locale)}
            </time>
            <h3 className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline"
              >
                {post.title[locale]}
              </Link>
            </h3>
            <p className="mt-4 text-lg leading-relaxed">
              {post.body[locale][0]}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex min-h-11 items-center border-b border-foreground text-sm"
            >
              {readMore}
            </Link>
          </article>
        </li>
      ))}
    </ol>
  );
}
