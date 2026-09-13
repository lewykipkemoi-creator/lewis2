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
    <main className="min-h-screen bg-paper text-ink flex flex-col">
      <nav className="border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 border border-ink/70 flex items-center justify-center font-serif font-semibold text-lg">L</div>
            <span className="font-serif font-semibold text-lg tracking-tight">Lewy AI</span>
          </Link>
          <Link href="/signup" className="text-sm text-ink/60 hover:text-ink">
            Need an account? <span className="underline">Sign up</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-xs font-mono tracking-widest text-ink/40 mb-3">SIGN IN</div>
          <h1 className="font-serif text-3xl font-semibold leading-tight">Welcome back to your revenue desk.</h1>
          <p className="text-ink/55 mt-3 leading-6">Log in to see what needs attention today.</p>

          {error && (
            <div className="mt-6 border border-loss/30 bg-loss/5 text-loss text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 border border-ink/20">
            <div className="p-6 space-y-5">
              <div>
                <label htmlFor="email" className="text-xs font-mono tracking-widest text-ink/45">EMAIL</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full mt-2 bg-transparent border-b border-ink/25 py-2.5 outline-none focus:border-ink transition placeholder:text-ink/30" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-mono tracking-widest text-ink/45">PASSWORD</label>
                  <Link href="/forgot-password" className="text-xs text-ink/45 hover:text-ink underline">Forgot?</Link>
                </div>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-2 bg-transparent border-b border-ink/25 py-2.5 outline-none focus:border-ink transition placeholder:text-ink/30" />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-paper py-4 font-medium hover:bg-ink/85 transition disabled:opacity-50"
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="text-ink/45 text-sm mt-6 text-center">
            Don&apos;t have an account? <Link href="/signup" className="text-ink underline">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
