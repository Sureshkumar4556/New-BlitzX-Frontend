"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  company: string; // honeypot — keep empty
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "Website Development",
  message: "",
  company: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Tell us a bit more (10+ characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (form.company) return; // honeypot tripped — silently drop
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="bg-void">
      <Navbar />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're trying to build."
        desc="We reply to every inquiry within 24 hours — usually much sooner."
      />

      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* honeypot field — hidden from real users */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="mb-1 block font-body text-sm text-chrome-300">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-sm border border-white/10 bg-surface px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-1 block font-body text-sm text-chrome-300">Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-sm border border-white/10 bg-surface px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1 block font-body text-sm text-chrome-300">Phone (optional)</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-sm border border-white/10 bg-surface px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
              />
            </div>

            <div>
              <label className="mb-1 block font-body text-sm text-chrome-300">Service</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full rounded-sm border border-white/10 bg-surface px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
              >
                <option>Website Development</option>
                <option>SEO Optimization</option>
                <option>Digital Marketing</option>
                <option>E-Commerce</option>
                <option>Something else</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-body text-sm text-chrome-300">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-sm border border-white/10 bg-surface px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-sm bg-bolt-gradient px-6 py-3 font-body text-sm font-semibold text-void shadow-bolt-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="font-body text-sm text-bolt-gold">
                Thanks! We've received your message and will be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="font-body text-sm text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>

          <div className="space-y-6">
            <div className="rounded-sm border border-white/10 bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-bolt-gold">Email</p>
              <p className="mt-2 font-body text-chrome-100">hello@blitzx.com</p>
            </div>
            <div className="rounded-sm border border-white/10 bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-bolt-gold">Phone</p>
              <p className="mt-2 font-body text-chrome-100">+91 00000 00000</p>
            </div>
            <div className="rounded-sm border border-white/10 bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-bolt-gold">Based in</p>
              <p className="mt-2 font-body text-chrome-100">Sirohi, Rajasthan, India</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
