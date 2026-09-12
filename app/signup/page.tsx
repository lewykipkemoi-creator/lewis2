"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("signup attempt", { businessName, email });
  }

  return (
    <main className="min-h-screen bg-paper text-ink flex flex-col">
      <nav className="border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 border border-ink/70 flex items-center justify-center font-serif font-semibold text-lg">L</div>
            <span className="font-serif font-semibold text-lg tracking-tight">Lewy AI</span>
          </Link>
          <Link href="/login" className="text-sm text-ink/60 hover:text-ink">
            Already have an account? <span className="underline">Log in</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-xs font-mono tracking-widest text-ink/40 mb-3">CREATE ACCOUNT</div>
          <h1 className="font-serif text-3xl font-semibold leading-tight">Open your first revenue report.</h1>
          <p className="text-ink/55 mt-3 leading-6">Set up Lewy in a few minutes. No card required to start.</p>

          <form onSubmit={handleSubmit} className="mt-9 border border-ink/20">
            <div className="p-6 space-y-5">
              <div>
                <label htmlFor="business" className="text-xs font-mono tracking-widest text-ink/45">BUSINESS NAME</label>
                <input id="business" type="text" required value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your business"
                  className="w-full mt-2 bg-transparent border-b border-ink/25 py-2.5 outline-none focus:border-ink transition placeholder:text-ink/30" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-mono tracking-widest text-ink/45">EMAIL</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full mt-2 bg-transparent border-b border-ink/25 py-2.5 outline-none focus:border-ink transition placeholder:text-ink/30" />
              </div>
              <div>
                <label htmlFor="password" className="text-xs font-mono tracking-widest text-ink/45">PASSWORD</label>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-2 bg-transparent border-b border-ink/25 py-2.5 outline-none focus:border-ink transition placeholder:text-ink/30" />
              </div>
            </div>
            <button type="submit" className="w-full bg-ink text-paper py-4 font-medium hover:bg-ink/85 transition">
              Create account
            </button>
          </form>

          <p className="text-ink/45 text-sm mt-6 text-center">
            By continuing you agree to Lewy AI&apos;s terms and privacy policy.
          </p>
        </div>
      </div>
    </main>
  );
}
