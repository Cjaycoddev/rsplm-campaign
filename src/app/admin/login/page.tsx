"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-green-deep/10 bg-white p-8 shadow-card">
        <h1 className="font-display text-2xl font-bold text-green-deep">Campaign admin</h1>
        <p className="mt-1 text-sm text-ink/60">Live registrations and donations.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="mt-6 w-full rounded-xl border-2 border-ink/10 px-4 py-3 outline-none focus:border-gold"
        />
        {error && <p className="mt-2 text-xs font-medium text-campaignred">{error}</p>}
        <button type="submit" disabled={busy || !password} className="btn-gold mt-4 w-full justify-center disabled:opacity-40">
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
