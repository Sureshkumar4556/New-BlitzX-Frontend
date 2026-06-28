"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Website Development",
    desc: "Fast, responsive sites and web apps built on modern stacks — Next.js, FastAPI, and beyond.",
  },
  {
    title: "SEO Optimization",
    desc: "Technical audits, on-page fixes, and content strategy that move you up the rankings that matter.",
  },
  {
    title: "Digital Marketing",
    desc: "Paid campaigns, social strategy, and funnels designed around measurable return, not vanity metrics.",
  },
  {
    title: "E-Commerce",
    desc: "Storefronts that convert — from product pages to checkout to post-purchase retention.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-xl"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-bolt-gold">
            What we do
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-chrome-gradient sm:text-4xl">
            Four services. One growth engine.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-sm border border-white/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-bolt-orange/40"
            >
              <div className="mb-4 h-8 w-8 bg-bolt-gradient" style={{ clipPath: "polygon(60% 0, 100% 0, 45% 100%, 25% 100%, 45% 55%, 0 55%)" }} />
              <h3 className="font-display text-lg font-bold text-chrome-100">{s.title}</h3>
              <p className="mt-2 font-body text-sm text-chrome-300">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
