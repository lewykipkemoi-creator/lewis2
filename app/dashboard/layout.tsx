"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import {
  IconOverview, IconInbox, IconLeads, IconCustomers, IconFollowups,
  IconCalendar, IconProducts, IconChannels, IconSettings, IconMenu, IconX,
} from "@/components/icons";

const nav = [
  { label: "Overview", href: "/dashboard", icon: IconOverview, color: "text-indigo-300" },
  { label: "Inbox", href: "/dashboard/inbox", icon: IconInbox, color: "text-cyan-300" },
  { label: "Leads", href: "/dashboard/leads", icon: IconLeads, color: "text-red-300" },
  { label: "Customers", href: "/dashboard/customers", icon: IconCustomers, color: "text-amber-300" },
  { label: "Follow-ups", href: "/dashboard/followups", icon: IconFollowups, color: "text-emerald-300" },
  { label: "Calendar", href: "/dashboard/calendar", icon: IconCalendar, color: "text-violet-300" },
  { label: "Products & Media", href: "/dashboard/products", icon: IconProducts, color: "text-fuchsia-300" },
  { label: "Channels", href: "/dashboard/channels", icon: IconChannels, color: "text-sky-300" },
  { label: "Settings", href: "/dashboard/settings", icon: IconSettings, color: "text-white/50" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!checked) {
    return <div className="min-h-screen bg-[#08080d] flex items-center justify-center text-white/30 text-sm">Loading…</div>;
  }

  if (!session) return null;

  const currentLabel = nav.find((item) => item.href === pathname)?.label ?? "Dashboard";

  const SidebarContent = (
    <>
      <div className="flex items-center justify-between px-5 h-16 border-b border-white/8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-sm">L</div>
          <span className="font-semibold text-sm tracking-tight">Lewy AI</span>
        </Link>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/50 hover:text-white">
          <IconX />
        </button>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-[13px] border-l-2 transition ${
                active
                  ? "border-indigo-400 text-white font-medium bg-white/[0.05]"
                  : "border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <span className={active ? item.color : "text-white/35"}><Icon /></span>
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
    </>
  );

  return (
    <div className="min-h-screen bg-[#08080d] text-white lg:flex">
      <div className="lg:hidden sticky top-0 z-40 h-14 border-b border-white/8 bg-[#08080d]/95 backdrop-blur-xl flex items-center justify-between px-4">
        <button onClick={() => setMobileOpen(true)} className="text-white/70 hover:text-white p-1">
          <IconMenu />
        </button>
        <span className="text-[14px] font-medium">{currentLabel}</span>
        <div className="w-6" />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0b0b12] border-r border-white/10 flex flex-col">
            {SidebarContent}
          </aside>
        </div>
      )}

      <aside className="hidden lg:flex w-60 shrink-0 border-r border-white/8 flex-col">
        {SidebarContent}
      </aside>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
