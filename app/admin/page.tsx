"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type User = {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
};

type Order = {
  id: string;
  service: string;
  details: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  created_at: string;
};

const statusOptions = ["pending", "confirmed", "in_progress", "completed", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "text-bolt-gold border-bolt-gold/30 bg-bolt-gold/10",
  confirmed: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  in_progress: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  completed: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  cancelled: "text-red-400 border-red-400/30 bg-red-400/10",
};

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/me", {
          credentials: "include",
        });
        if (!meRes.ok) {
          router.push("/login");
          return;
        }
        const me: User = await meRes.json();
        if (!me.is_admin) {
          router.push("/dashboard");
          return;
        }
        setAuthChecked(true);

        const ordersRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/orders/admin/all", {
          credentials: "include",
        });
        if (!ordersRes.ok) {
          throw new Error("Could not load orders");
        }
        const data = await ordersRes.json();
        setOrders(data);
      } catch (err) {
        setError("Could not load the admin panel. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  async function updateStatus(orderId: string, newStatus: string) {
    setUpdatingId(orderId);
    setError("");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/orders/" + orderId + "/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        throw new Error("Could not update status");
      }
      const updated = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: updated.status } : o))
      );
    } catch (err) {
      setError("Could not update that order. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  function toggleExpand(orderId: string) {
    setExpandedId((current) => (current === orderId ? null : orderId));
  }

  function formatDateTime(value: string) {
    const d = new Date(value);
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) + " - " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }

  if (loading || !authChecked) {
    return (
      <main className="bg-void">
        <Navbar />
        <section className="flex min-h-screen items-center justify-center px-6">
          <p className="font-body text-sm text-chrome-300">Loading admin panel...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-void">
      <Navbar />

      <section className="min-h-screen px-6 pb-24 pt-32 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-xs uppercase tracking-wider text-bolt-gold">
            Admin
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-chrome-gradient">
            All Orders
          </h1>
          <p className="mt-1 font-body text-sm text-chrome-600">
            {orders.length} total order{orders.length === 1 ? "" : "s"}
          </p>

          {error && <p className="mt-4 font-body text-sm text-red-400">{error}</p>}

          {orders.length === 0 ? (
            <div className="mt-8 rounded-sm border border-white/10 bg-surface p-10 text-center">
              <p className="font-body text-sm text-chrome-300">No orders yet.</p>
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              {orders.map((order, index) => {
                const isOpen = expandedId === order.id;
                return (
                  <div
                    key={order.id}
                    className={
                      "overflow-hidden rounded-sm border bg-surface transition-colors " +
                      (isOpen ? "border-bolt-orange/40" : "border-white/10 hover:border-white/20")
                    }
                  >
                    {/* Row header - click to expand */}
                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="flex w-full flex-wrap items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-bold text-chrome-600">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-display text-base font-bold text-chrome-100">
                            {order.service}
                          </p>
                          <p className="mt-0.5 font-body text-xs text-chrome-600">
                            {order.name} &middot; {formatDateTime(order.created_at)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={
                            "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider " +
                            (statusColors[order.status] ||
                              "border-white/20 text-chrome-300 bg-white/5")
                          }
                        >
                          {order.status.replace("_", " ")}
                        </span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className={
                            "text-chrome-600 transition-transform " + (isOpen ? "rotate-180" : "")
                          }
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded detail view */}
                    {isOpen && (
                      <div className="border-t border-white/10 bg-elevated px-6 py-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                              Order ID
                            </p>
                            <p className="mt-1 font-body text-sm text-chrome-300">{order.id}</p>
                          </div>
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                              Submitted
                            </p>
                            <p className="mt-1 font-body text-sm text-chrome-300">
                              {formatDateTime(order.created_at)}
                            </p>
                          </div>
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                              Customer Name
                            </p>
                            <p className="mt-1 font-body text-sm text-chrome-100">{order.name}</p>
                          </div>
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                              Email
                            </p>
                            <p className="mt-1 font-body text-sm text-chrome-100">{order.email}</p>
                          </div>
                          {order.phone && (
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                                Phone
                              </p>
                              <p className="mt-1 font-body text-sm text-chrome-100">{order.phone}</p>
                            </div>
                          )}
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                              Service
                            </p>
                            <p className="mt-1 font-body text-sm text-chrome-100">{order.service}</p>
                          </div>
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                              Budget
                            </p>
                            <p className="mt-1 font-body text-sm text-chrome-100">{order.budget}</p>
                          </div>
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                              Timeline
                            </p>
                            <p className="mt-1 font-body text-sm text-chrome-100">{order.timeline}</p>
                          </div>
                        </div>

                        <div className="mt-6">
                          <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                            Project Details
                          </p>
                          <p className="mt-2 whitespace-pre-wrap rounded-sm border border-white/10 bg-surface p-4 font-body text-sm leading-relaxed text-chrome-300">
                            {order.details}
                          </p>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                          <p className="font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                            Update Status
                          </p>
                          <select
                            value={order.status}
                            disabled={updatingId === order.id}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className="rounded-sm border border-white/15 bg-surface px-3 py-1.5 font-body text-xs text-chrome-100 outline-none focus:border-bolt-orange/50 disabled:opacity-50"
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s.replace("_", " ")}
                              </option>
                            ))}
                          </select>
                          {updatingId === order.id && (
                            <span className="font-body text-xs text-chrome-600">Saving...</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
