"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#08080d] text-white flex flex-col">
      <div className="fixed top-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <nav className="border-b border-white/8 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-sm">L</div>
            <span className="font-semibold text-sm tracking-tight">Lewy AI</span>
          </Link>
          <Link href="/signup" className="text-[13px] text-white/50 hover:text-white">
            Need an account? <span className="underline">Sign up</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">
        <div className="w-full max-w-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 mb-5">
            Welcome back
          </div>
          <h1 className="text-2xl font-semibold leading-tight">Log in to your revenue desk.</h1>
          <p className="text-white/45 text-[14px] mt-2">See what needs attention today.</p>

          {error && (
            <div className="mt-5 rounded-lg border border-red-500/25 bg-red-500/10 text-red-300 text-[13px] px-4 py-2.5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl">
            <div className="p-5 space-y-4">
              <div>
                <label htmlFor="email" className="text-[11px] font-medium text-white/40 uppercase tracking-wide">Email</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full mt-1.5 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400/50 transition placeholder:text-white/25" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-[11px] font-medium text-white/40 uppercase tracking-wide">Password</label>
                  <Link href="/forgot-password" className="text-[11px] text-white/35 hover:text-white underline">Forgot?</Link>
                </div>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1.5 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400/50 transition placeholder:text-white/25" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-b-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-black py-3 text-[14px] font-medium hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="text-white/35 text-[13px] mt-5 text-center">
            Don&apos;t have an account? <Link href="/signup" className="text-white underline">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
