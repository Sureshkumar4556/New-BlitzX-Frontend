"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Registration failed");
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Create your account" subtitle="Order projects and track progress in one place.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-body text-sm text-chrome-300">Full name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
          />
        </div>
        <div>
          <label className="mb-1 block font-body text-sm text-chrome-300">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
          />
        </div>
        <div>
          <label className="mb-1 block font-body text-sm text-chrome-300">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
          />
        </div>
        <div>
          <label className="mb-1 block font-body text-sm text-chrome-300">Confirm password</label>
          <input
            type="password"
            required
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="w-full rounded-sm border border-white/10 bg-elevated px-4 py-3 font-body text-sm text-chrome-100 outline-none focus:border-bolt-orange/50"
          />
        </div>

        {error && <p className="font-body text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-bolt-gradient px-6 py-3 font-body text-sm font-semibold text-void shadow-bolt-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-chrome-300">
        Already have an account?{" "}
        <a href="/login" className="text-bolt-gold hover:underline">
          Log in
        </a>
      </p>
    </AuthCard>
  );
}
