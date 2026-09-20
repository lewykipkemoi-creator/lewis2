"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);

const checklist = [
  "No card required to start",
  "Works for products, services, or both",
  "Connects WhatsApp, Instagram, Gmail and more",
  "See revenue recovered from day one",
];

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
    router.push("/onboarding");
  }

  return (
    <main className="min-h-screen bg-[#08080d] text-white flex">
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-10 bg-[radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.2),transparent_50%),radial-gradient(circle_at_20%_90%,rgba(99,102,241,0.2),transparent_50%),#0c0c14]">
        <div className="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />

        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-sm">L</div>
          <span className="font-semibold tracking-tight">Lewy AI</span>
        </Link>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 mb-6">
            Free to start
          </div>
          <h1 className="text-3xl font-semibold leading-tight max-w-sm">
            Turn conversations into revenue automatically.
          </h1>
          <p className="text-white/45 text-[14px] mt-3 max-w-sm leading-6">
            Lewy replies instantly, follows up before opportunities disappear,
            and shows you exactly what it recovered.
          </p>
          <div className="space-y-3 mt-8">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center shrink-0">
                  <IconCheck />
                </div>
                <div className="text-[14px] text-white/70">{item}</div>
              </div>
            ))}
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
            Create account
          </div>
          <h1 className="text-2xl font-semibold leading-tight">Open your first revenue report.</h1>
          <p className="text-white/45 text-[14px] mt-2">Set up Lewy in a few minutes.</p>

          {error && (
            <div className="mt-5 rounded-lg border border-red-500/25 bg-red-500/10 text-red-300 text-[13px] px-4 py-2.5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 rounded-2xl bg-[#15151f] shadow-lg shadow-black/20">
            <div className="p-5 space-y-4">
              <div>
                <label htmlFor="business" className="text-[11px] font-medium text-white/40 uppercase tracking-wide">Business name</label>
                <input
                  id="business"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your business"
                  className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:bg-white/8 transition placeholder:text-white/25"
                />
              </div>
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
                <label htmlFor="password" className="text-[11px] font-medium text-white/40 uppercase tracking-wide">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
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
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-white/40 text-[13px] mt-6 text-center">
            Already have an account? <Link href="/login" className="text-white underline">Log in</Link>
          </p>
          <p className="text-white/25 text-[11px] mt-3 text-center">
            By continuing you agree to Lewy AI&apos;s terms and privacy policy.
          </p>
        </div>
      </div>
    </main>
  );
}
