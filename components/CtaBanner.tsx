export default function CtaBanner() {
  return (
    <section className="relative my-10 overflow-hidden px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-sm bg-surface px-8 py-14 sm:px-14">
          <div className="bolt-divider absolute inset-0 bg-bolt-gradient opacity-[0.07]" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-chrome-gradient sm:text-3xl">
                Ready to start your project?
              </h3>
              <p className="mt-2 font-body text-chrome-300">
                Tell us what you're building — we'll scope it within 24 hours.
              </p>
            </div>
            <a
              href="/order/new"
              className="shrink-0 rounded-sm bg-bolt-gradient px-6 py-3 font-body text-sm font-semibold text-void shadow-bolt-glow transition-transform hover:scale-[1.03]"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
