"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const filters = ["All", "Web", "SEO", "Marketing", "E-Commerce"];

const projects = [
  { title: "RAM Cabs & Rentals", tag: "Web", desc: "Booking platform for a cab & rental fleet with live availability.", img: "https://picsum.photos/seed/ramcabs/600/450" },
  { title: "Axiom Studio", tag: "Web", desc: "Editorial-style agency site built on Next.js + FastAPI.", img: "https://picsum.photos/seed/axiomstudio/600/450" },
  { title: "Sirohi Local Market", tag: "E-Commerce", desc: "Storefront with 200+ SKUs, UPI checkout, and order tracking.", img: "https://picsum.photos/seed/sirohimarket/600/450" },
  { title: "GreenLeaf Organics", tag: "SEO", desc: "Technical SEO overhaul — 3x organic traffic in 5 months.", img: "https://picsum.photos/seed/greenleaf/600/450" },
  { title: "Udaipur Eats", tag: "Marketing", desc: "Paid social + influencer funnel for a restaurant chain launch.", img: "https://picsum.photos/seed/udaipureats/600/450" },
  { title: "Northline Apparel", tag: "E-Commerce", desc: "Headless commerce build with custom size-fit recommender.", img: "https://picsum.photos/seed/northline/600/450" },
];

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.tag === active);

  return (
    <main className="bg-void">
      <Navbar />
      <PageHero
        eyebrow="Our work"
        title="Projects we're proud to put our name on."
        desc="A sample of the websites, stores, and campaigns we've shipped for clients across categories."
      />

      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-sm border px-4 py-2 font-body text-sm transition-colors ${
                  active === f
                    ? "border-bolt-orange/50 bg-bolt-orange/10 text-bolt-gold"
                    : "border-white/10 text-chrome-300 hover:border-white/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <div
                key={p.title}
                className="group overflow-hidden rounded-sm border border-white/10 bg-surface transition-all hover:-translate-y-1 hover:border-bolt-orange/40"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                </div>
                <div className="p-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-bolt-gold">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-chrome-100">{p.title}</h3>
                  <p className="mt-2 font-body text-sm text-chrome-300">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
