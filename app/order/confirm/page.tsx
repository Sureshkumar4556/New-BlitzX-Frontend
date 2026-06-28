"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Order = {
  id: string;
  service: string;
  details: string;
  budget: string;
  timeline: string;
  status: string;
  created_at: string;
};

function OrderConfirmContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then(setOrder)
      .catch((e) => setError(e.message));
  }, [id]);

  return (
    <section className="flex min-h-screen items-center px-6 pt-24 lg:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-sm border border-bolt-orange/30 bg-surface p-10 text-center shadow-bolt-glow">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-bolt-gradient">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#05050A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="font-display text-2xl font-extrabold text-chrome-gradient">
            Order received
          </h1>
          <p className="mt-2 font-body text-sm text-chrome-300">
            We've sent a confirmation to your email. Our team will review your project and
            reach out within 24 hours.
          </p>

          {error && (
            <p className="mt-6 font-body text-sm text-red-400">
              {error} — but don't worry, if you just submitted this, check your email for
              confirmation. You can also view all your orders from your dashboard.
            </p>
          )}

          {order && (
            <div className="mt-8 space-y-3 rounded-sm border border-white/10 bg-elevated p-6 text-left">
              <Row label="Order ID" value={order.id} />
              <Row label="Service" value={order.service} />
              <Row label="Budget" value={order.budget} />
              <Row label="Timeline" value={order.timeline} />
              <Row label="Status" value={order.status} highlight />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/dashboard"
              className="rounded-sm bg-bolt-gradient px-6 py-3 font-body text-sm font-semibold text-void"
            >
              Go to Dashboard
            </a>
            <a
              href="/"
              className="rounded-sm border border-white/15 px-6 py-3 font-body text-sm text-chrome-100"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OrderConfirmPage() {
  return (
    <main className="bg-void">
      <Navbar />
      <Suspense
        fallback={
          <section className="flex min-h-screen items-center justify-center px-6">
            <p className="font-body text-sm text-chrome-300">Loading...</p>
          </section>
        }
      >
        <OrderConfirmContent />
      </Suspense>
      <Footer />
    </main>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs uppercase tracking-wider text-chrome-600">{label}</span>
      <span
        className={`font-body text-sm ${
          highlight ? "text-bolt-gold" : "text-chrome-100"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
