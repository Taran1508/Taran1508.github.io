"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    if (res?.ok) {
      window.location.href = "/admin";
      return;
    }
    const data = res ? await res.json().catch(() => ({})) : {};
    setError(data.error ?? "Could not reach the server.");
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={submit} className="glass w-full max-w-sm p-7">
        <p className="eyebrow">Owner only</p>
        <h1 className="mt-3 font-grotesk text-2xl font-bold">Admin sign in</h1>
        <label htmlFor="pw" className="mt-6 block text-sm font-medium">
          Password
        </label>
        <div className="relative mt-1.5">
          <input
            id="pw"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-fg/10 bg-white py-3 pl-4 pr-16 text-base focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-xs font-semibold text-fg/60 hover:text-accent"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading || !password} className="btn-primary mt-6 w-full disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
