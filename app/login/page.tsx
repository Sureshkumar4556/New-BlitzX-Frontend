"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // receives httpOnly JWT cookies set by FastAPI
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Invalid email or password");
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Welcome back" subtitle="Log in to track your projects and orders.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-body text-sm text-chrome-300">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="font-body text-sm text-chrome-300">Password</label>
            <a href="/forgot-password" className="font-body text-xs text-bolt-gold hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
          />
        </div>

        {error && <p className="font-body text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-bolt-gradient px-6 py-3 font-body text-sm font-semibold text-void shadow-bolt-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-chrome-300">
        Don't have an account?{" "}
        <a href="/register" className="text-bolt-gold hover:underline">
          Register
        </a>
      </p>
    </AuthCard>
  );
}
