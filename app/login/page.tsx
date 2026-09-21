"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { getOrCreateWorkspace } from "@/lib/workspace";

const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>
);
const IconTrendUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
);

const features = [
  { icon: IconZap, text: "Replies to customers instantly, day or night" },
  { icon: IconTrendUp, text: "Shows exactly how much revenue it recovered" },
  { icon: IconUser, text: "Hands off to you the moment it matters" },
];

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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (!data.user) return;
    const workspace = await getOrCreateWorkspace(data.user.id);
    router.push(workspace.onboarding_completed_at ? "/dashboard" : "/onboarding");
  }

  return (
    <main className="min-h-screen bg-[#08080d] text-white flex">
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(circle_at_80%_90%,rgba(34,211,238,0.15),transparent_50%),#0c0c14]">
        <div className="fixed top-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[130px] pointer-events-none" />

        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-sm">L</div>
          <span className="font-semibold tracking-tight">Lewy AI</span>
        </Link>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Your AI revenue employee is online
          </div>
          <h1 className="text-3xl font-semibold leading-tight max-w-sm">
            Never lose a customer because you replied too late.
          </h1>
          <div className="space-y-3.5 mt-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-indigo-300 shrink-0">
                    <Icon />
                  </div>
                  <div className="text-[14px] text-white/70">{f.text}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-[12px] text-white/30 relative z-10">© 2026 Lewy AI</div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-sm">L</div>
            <span className="font-semibold tracking-tight">Lewy AI</span>
          </div>

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

          <form onSubmit={handleSubmit} className="mt-6 rounded-2xl bg-[#15151f] shadow-lg shadow-black/20">
            <div className="p-5 space-y-4">
              <div>
                <label htmlFor="email" className="text-[11px] font-medium text-white/40 uppercase tracking-wide">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:bg-white/8 transition placeholder:text-white/25"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-[11px] font-medium text-white/40 uppercase tracking-wide">Password</label>
                  <Link href="/forgot-password" className="text-[11px] text-white/35 hover:text-white underline">Forgot?</Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:bg-white/8 transition placeholder:text-white/25"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-b-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-black py-3 text-[14px] font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="text-white/40 text-[13px] mt-6 text-center">
            Don&apos;t have an account? <Link href="/signup" className="text-white underline">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
