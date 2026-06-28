export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 sm:flex-row">
        <div>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="BlitzXCreatives" className="h-7 w-7" />
            <p className="font-display text-xl font-extrabold">
              <span className="text-chrome-gradient">BlitzX</span>
              <span className="text-bolt-gradient">Creatives</span>
            </p>
          </div>
          <p className="mt-2 max-w-xs font-body text-sm text-chrome-600">
            Building Digital. Boosting Growth.
          </p>
        </div>

        <div className="flex gap-12 font-body text-sm">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-chrome-600">
              Services
            </p>
            <ul className="space-y-2 text-chrome-300">
              <li>Website Development</li>
              <li>SEO Optimization</li>
              <li>Digital Marketing</li>
              <li>E-Commerce</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-chrome-600">
              Company
            </p>
            <ul className="space-y-2 text-chrome-300">
              <li><a href="/about" className="hover:text-chrome-100">About</a></li>
              <li><a href="/portfolio" className="hover:text-chrome-100">Portfolio</a></li>
              <li><a href="/pricing" className="hover:text-chrome-100">Pricing</a></li>
              <li><a href="/contact" className="hover:text-chrome-100">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl font-body text-xs text-chrome-600">
        © {new Date().getFullYear()} BlitzX. All rights reserved.
      </p>
    </footer>
  );
}
