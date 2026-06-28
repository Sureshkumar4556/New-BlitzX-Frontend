export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-void px-6">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-bolt-orange/10 blur-[120px]" />

      <div className="w-full max-w-md">
        <a href="/" className="mb-8 flex items-center justify-center gap-2 text-center font-display text-2xl font-extrabold">
          <img src="/logo.png" alt="BlitzXCreatives" className="h-8 w-8" />
          <span>
            <span className="text-chrome-gradient">BlitzX</span>
            <span className="text-bolt-gradient">Creatives</span>
          </span>
        </a>

        <div className="rounded-sm border border-white/10 bg-surface p-8">
          <h1 className="font-display text-2xl font-bold text-chrome-100">{title}</h1>
          <p className="mt-1 font-body text-sm text-chrome-300">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}
