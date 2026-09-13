"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

const nav = [
  { n: "01", label: "Overview", href: "/dashboard" },
  { n: "02", label: "Inbox", href: "/dashboard/inbox" },
  { n: "03", label: "Leads", href: "/dashboard/leads" },
  { n: "04", label: "Customers", href: "/dashboard/customers" },
  { n: "05", label: "Follow-ups", href: "/dashboard/followups" },
  { n: "06", label: "Calendar", href: "/dashboard/calendar" },
  { n: "07", label: "Products & Media", href: "/dashboard/products" },
  { n: "08", label: "Channels", href: "/dashboard/channels" },
  { n: "09", label: "Settings", href: "/dashboard/settings" },
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
    return <div className="min-h-screen bg-paper flex items-center justify-center text-ink/40 text-sm">Loading…</div>;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-paper text-ink flex">
      <aside className="w-64 shrink-0 border-r border-ink/15 flex flex-col">
        <Link href="/" className="flex items-center gap-3 px-6 h-20 border-b border-ink/15">
          <div className="w-9 h-9 border border-ink/70 flex items-center justify-center font-serif font-semibold text-lg">L</div>
          <span className="font-serif font-semibold text-lg tracking-tight">Lewy AI</span>
        </Link>

        <nav className="flex-1 py-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-2.5 text-sm border-l-2 transition ${
                  active
                    ? "border-ink text-ink font-medium bg-ink/[0.04]"
                    : "border-transparent text-ink/55 hover:text-ink hover:bg-ink/[0.02]"
                }`}
              >
                <span className="font-mono text-xs text-ink/40 w-5">{item.n}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-ink/15 px-6 py-4">
          <div className="text-sm font-medium truncate">{session.user.email}</div>
          <button onClick={handleSignOut} className="text-xs text-ink/45 hover:text-ink underline mt-1">
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
