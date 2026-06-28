export default function PageHero({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="px-6 pb-12 pt-32 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-wider text-bolt-gold">
          {eyebrow}
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-chrome-gradient sm:text-5xl">
          {title}
        </h1>
        {desc && <p className="mt-4 max-w-xl font-body text-chrome-300">{desc}</p>}
      </div>
    </div>
  );
}
