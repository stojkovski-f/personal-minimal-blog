export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
        {kicker}
      </p>
      <h1 className="mt-4 font-serif text-[clamp(3rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.03em]">
        {title}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{lede}</p>
    </header>
  );
}
