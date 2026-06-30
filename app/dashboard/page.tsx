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
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending: "text-bolt-gold border-bolt-gold/30 bg-bolt-gold/10",
  in_progress: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  completed: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  cancelled: "text-red-400 border-red-400/30 bg-red-400/10",
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!meRes.ok) {
          router.push("/login");
          return;
        }
        const meData = await meRes.json();
        setUser(meData);

        const ordersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          credentials: "include",
        });
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
        }
      } catch {
        setError("Could not load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="bg-void">
        <Navbar />
        <section className="flex min-h-screen items-center justify-center px-6">
          <p className="font-body text-sm text-chrome-300">Loading your dashboard...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-void">
      <Navbar />

      <section className="min-h-screen px-6 pb-24 pt-32 lg:px-10">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-bolt-gold">
                Dashboard
              </span>
              <h1 className="mt-2 font-display text-3xl font-extrabold text-chrome-gradient">
                Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}.
              </h1>
              {user && (
                <p className="mt-1 font-body text-sm text-chrome-600">{user.email}</p>
              )}
            </div>

            <div className="flex gap-3">
              {user?.is_admin && (
                <a
                  href="/admin"
                  className="rounded-sm border border-bolt-gold/40 px-5 py-2.5 font-body text-sm font-semibold text-bolt-gold transition-colors hover:border-bolt-gold/70"
                >
                  Admin Panel
                </a>
              )}
              <a
                href="/order/new"
                className="rounded-sm bg-bolt-gradient px-5 py-2.5 font-body text-sm font-semibold text-void shadow-bolt-glow transition-transform hover:scale-[1.02]"
              >
                + New Project
              </a>
              <button
                onClick={handleLogout}
                className="rounded-sm border border-white/15 px-5 py-2.5 font-body text-sm text-chrome-100 transition-colors hover:border-white/30"
              >
                Log out
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-6 font-body text-sm text-red-400">{error}</p>
          )}

          {/* Orders */}
          <div className="mt-10">
            <h2 className="font-display text-lg font-bold text-chrome-100">
              Your Orders
            </h2>

            {orders.length === 0 ? (
              <div className="mt-4 rounded-sm border border-white/10 bg-surface p-10 text-center">
                <p className="font-body text-sm text-chrome-300">
                  You haven't submitted any projects yet.
                </p>
                <a
                  href="/order/new"
                  className="mt-4 inline-block rounded-sm bg-bolt-gradient px-6 py-2.5 font-body text-sm font-semibold text-void shadow-bolt-glow"
                >
                  Start your first project
                </a>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-sm border border-white/10 bg-surface p-6 transition-colors hover:border-white/20"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-base font-bold text-chrome-100">
                          {order.service}
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-chrome-600">
                          {order.id}
                        </p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${
                          statusColors[order.status] ||
                          "border-white/20 text-chrome-300 bg-white/5"
                        }`}
                      >
                        {order.status.replace("_", " ")}
                      </span>
                    </div>

                    <p className="mt-3 font-body text-sm text-chrome-300 line-clamp-2">
                      {order.details}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-6 font-body text-xs text-chrome-600">
                      <span>
                        <span className="text-chrome-600">Budget:</span>{" "}
                        <span className="text-chrome-300">{order.budget}</span>
                      </span>
                      <span>
                        <span className="text-chrome-600">Timeline:</span>{" "}
                        <span className="text-chrome-300">{order.timeline}</span>
                      </span>
                      <span>
                        <span className="text-chrome-600">Submitted:</span>{" "}
                        <span className="text-chrome-300">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
