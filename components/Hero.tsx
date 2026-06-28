"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 lg:px-10">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-bolt-orange/10 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-block rounded-sm border border-bolt-orange/30 bg-bolt-orange/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-bolt-gold"
          >
            Web · SEO · Marketing · Commerce
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          >
            <span className="text-chrome-gradient">Building Digital.</span>
            <br />
            <span className="text-bolt-gradient">Boosting Growth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-md font-body text-chrome-300"
          >
            BlitzX designs and ships websites, e-commerce stores, and growth
            campaigns built to convert — not just look good.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="/order/new"
              className="rounded-sm bg-bolt-gradient px-6 py-3 font-body text-sm font-semibold text-void shadow-bolt-glow transition-transform hover:scale-[1.03]"
            >
              Start a Project
            </a>
            <a
              href="/portfolio"
              className="rounded-sm border border-white/15 px-6 py-3 font-body text-sm font-semibold text-chrome-100 transition-colors hover:border-white/40"
            >
              View Our Work
            </a>
          </motion.div>

          {/* stat strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 flex gap-10 border-t border-white/10 pt-6"
          >
            {[
              ["120+", "Projects shipped"],
              ["98%", "Client retention"],
              ["4.9★", "Average rating"],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold text-chrome-100">{num}</p>
                <p className="font-body text-xs text-chrome-600">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: the bolt strike — signature element */}
        <div className="relative hidden h-[480px] items-center justify-center lg:flex">
          <motion.svg
            viewBox="0 0 200 400"
            className="h-full drop-shadow-[0_0_60px_rgba(255,138,0,0.35)]"
            initial={{ opacity: 0, scaleY: 0.4, y: -40 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <defs>
              <linearGradient id="boltFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFC400" />
                <stop offset="100%" stopColor="#FF8A00" />
              </linearGradient>
            </defs>
            <polygon
              points="140,0 200,0 90,260 130,260 60,400 0,210 70,210"
              fill="url(#boltFill)"
            />
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
