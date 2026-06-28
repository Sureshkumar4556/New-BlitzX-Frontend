"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = ["Website Development", "SEO Optimization", "Digital Marketing", "E-Commerce"];
const budgets = ["Under ₹20,000", "₹20,000 – ₹50,000", "₹50,000 – ₹1,50,000", "₹1,50,000+"];
const timelines = ["ASAP (1–2 weeks)", "1 month", "2–3 months", "Flexible"];

const steps = ["Service", "Details", "Budget & Timeline", "Contact"];

export default function NewOrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    service: services[0],
    details: "",
    budget: budgets[0],
    timeline: timelines[0],
    name: "",
    email: "",
    phone: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function next() {
    if (step === 1 && form.details.trim().length < 10) {
      setError("Please describe your project in a bit more detail.");
      return;
    }
    if (step === 3 && (!form.name || !/^\S+@\S+\.\S+$/.test(form.email))) {
      setError("Name and a valid email are required.");
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Could not submit your order. Please try again.");
      const data = await res.json();
      router.push(`/order/confirm?id=${data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-void">
      <Navbar />

      <section className="min-h-screen px-6 pb-24 pt-32 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-wider text-bolt-gold">
            New Project
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-chrome-gradient">
            Let's scope your project.
          </h1>

          {/* progress */}
          <div className="mt-8 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex-1">
                <div
                  className={`h-1 rounded-full ${
                    i <= step ? "bg-bolt-gradient" : "bg-white/10"
                  }`}
                />
                <p
                  className={`mt-2 font-mono text-[10px] uppercase tracking-wider ${
                    i === step ? "text-bolt-gold" : "text-chrome-600"
                  }`}
                >
                  {s}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-sm border border-white/10 bg-surface p-8">
            {step === 0 && (
              <div>
                <p className="mb-4 font-body text-sm text-chrome-300">
                  Which service do you need?
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s}
                      onClick={() => update("service", s)}
                      className={`rounded-sm border px-4 py-3 text-left font-body text-sm transition-colors ${
                        form.service === s
                          ? "border-bolt-orange/50 bg-bolt-orange/10 text-chrome-100"
                          : "border-white/10 text-chrome-300 hover:border-white/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <label className="mb-2 block font-body text-sm text-chrome-300">
                  Describe your project — goals, current site (if any), must-haves.
                </label>
                <textarea
                  rows={6}
                  value={form.details}
                  onChange={(e) => update("details", e.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <p className="mb-2 font-body text-sm text-chrome-300">Budget range</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        onClick={() => update("budget", b)}
                        className={`rounded-sm border px-4 py-2 text-left font-body text-sm transition-colors ${
                          form.budget === b
                            ? "border-bolt-orange/50 bg-bolt-orange/10 text-chrome-100"
                            : "border-white/10 text-chrome-300 hover:border-white/30"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 font-body text-sm text-chrome-300">Timeline</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {timelines.map((t) => (
                      <button
                        key={t}
                        onClick={() => update("timeline", t)}
                        className={`rounded-sm border px-4 py-2 text-left font-body text-sm transition-colors ${
                          form.timeline === t
                            ? "border-bolt-orange/50 bg-bolt-orange/10 text-chrome-100"
                            : "border-white/10 text-chrome-300 hover:border-white/30"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block font-body text-sm text-chrome-300">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-body text-sm text-chrome-300">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-body text-sm text-chrome-300">Phone (optional)</label>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
                  />
                </div>
              </div>
            )}

            {error && <p className="mt-4 font-body text-sm text-red-400">{error}</p>}

            <div className="mt-8 flex justify-between">
              <button
                onClick={back}
                disabled={step === 0}
                className="rounded-sm border border-white/15 px-5 py-2.5 font-body text-sm text-chrome-100 disabled:opacity-30"
              >
                Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  onClick={next}
                  className="rounded-sm bg-bolt-gradient px-6 py-2.5 font-body text-sm font-semibold text-void shadow-bolt-glow"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="rounded-sm bg-bolt-gradient px-6 py-2.5 font-body text-sm font-semibold text-void shadow-bolt-glow disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Order"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
