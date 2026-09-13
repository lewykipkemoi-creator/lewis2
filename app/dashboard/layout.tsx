"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

const nav = [
  { label: "Overview", href: "/dashboard" },
  { label: "Inbox", href: "/dashboard/inbox" },
  { label: "Leads", href: "/dashboard/leads" },
  { label: "Customers", href: "/dashboard/customers" },
  { label: "Follow-ups", href: "/dashboard/followups" },
  { label: "Calendar", href: "/dashboard/calendar" },
  { label: "Products & Media", href: "/dashboard/products" },
  { label: "Channels", href: "/dashboard/channels" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
      if (!data.session) router.push("/login");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.push("/login");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!checked) {
    return <div className="min-h-screen bg-[#08080d] flex items-center justify-center text-white/30 text-sm">Loading…</div>;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#08080d] text-white flex">
      <aside className="w-60 shrink-0 border-r border-white/8 flex flex-col">
        <Link href="/" className="flex items-center gap-2.5 px-5 h-16 border-b border-white/8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-sm">L</div>
          <span className="font-semibold text-sm tracking-tight">Lewy AI</span>
        </Link>

        <nav className="flex-1 py-3">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-5 py-2 text-[13px] border-l-2 transition ${
                  active
                    ? "border-indigo-400 text-white font-medium bg-white/[0.04]"
                    : "border-transparent text-white/45 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/8 px-5 py-4">
          <div className="text-[13px] font-medium truncate">{session.user.email}</div>
          <button onClick={handleSignOut} className="text-[11px] text-white/40 hover:text-white underline mt-1">
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
