"use client";

import { motion } from "framer-motion";

const work = [
  { title: "RAM Cabs & Rentals", tag: "Web", img: "https://picsum.photos/seed/ramcabs/600/450" },
  { title: "Sirohi Local Market", tag: "E-Commerce", img: "https://picsum.photos/seed/sirohimarket/600/450" },
  { title: "GreenLeaf Organics", tag: "SEO", img: "https://picsum.photos/seed/greenleaf/600/450" },
  { title: "Udaipur Eats", tag: "Marketing", img: "https://picsum.photos/seed/udaipureats/600/450" },
];

export default function WorkPreview() {
  return (
    <section className="px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs uppercase tracking-wider text-bolt-gold">
              See Our Work
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-chrome-gradient sm:text-4xl">
              Recent projects we've shipped.
            </h2>
          </motion.div>
          <a
            href="/portfolio"
            className="font-body text-sm font-semibold text-bolt-gold hover:underline"
          >
            View Full Portfolio →
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {work.map((w, i) => (
            <motion.a
              key={w.title}
              href="/portfolio"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group block overflow-hidden rounded-sm border border-white/10 bg-surface transition-all hover:-translate-y-1 hover:border-bolt-orange/40"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={w.img}
                  alt={w.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
              </div>
              <div className="p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-bolt-gold">
                  {w.tag}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-chrome-100">
                  {w.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
