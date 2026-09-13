"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { business_name: businessName } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#07070c] text-white flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.2),transparent_45%)] pointer-events-none" />
      <nav className="border-b border-white/10 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-black">L</div>
            <span className="font-bold text-lg tracking-tight">Lewy AI</span>
          </Link>
          <Link href="/login" className="text-sm text-white/60 hover:text-white">
            Already have an account? <span className="underline">Log in</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">
        <div className="w-full max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-1.5 text-xs text-fuchsia-200 mb-6">
            Free to start
          </div>
          <h1 className="text-3xl font-extrabold leading-tight">Open your first revenue report.</h1>
          <p className="text-white/50 mt-3">Set up Lewy in a few minutes. No card required.</p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <div className="p-6 space-y-5">
              <div>
                <label htmlFor="business" className="text-xs font-medium text-white/50">Business name</label>
                <input id="business" type="text" required value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your business"
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-fuchsia-400/50 transition placeholder:text-white/25" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-medium text-white/50">Email</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-fuchsia-400/50 transition placeholder:text-white/25" />
              </div>
              <div>
                <label htmlFor="password" className="text-xs font-medium text-white/50">Password</label>
                <input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-fuchsia-400/50 transition placeholder:text-white/25" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-b-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-semibold hover:opacity-90 transition disabled:opacity-50">
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-white/40 text-sm mt-6 text-center">
            By continuing you agree to Lewy AI&apos;s terms and privacy policy.
          </p>
        </div>
      </div>
    </main>
  );
}
