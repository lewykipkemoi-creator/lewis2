"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import {
  IconOverview, IconInbox, IconLeads, IconCustomers, IconFollowups,
  IconCalendar, IconProducts, IconChannels, IconSettings, IconMenu, IconX,
  IconTrendUp, IconSearch, IconBell, IconPlus, IconWand,
} from "@/components/icons";
import { ToastProvider, useToast } from "@/components/Toast";
import Modal from "@/components/Modal";

const nav = [
  { label: "Overview", subtitle: "Revenue command center", href: "/dashboard", icon: IconOverview, color: "text-indigo-300", section: "main" },
  { label: "Human Takeover", subtitle: "Conversations that need you", href: "/dashboard/handover", icon: IconAlertTriangle, color: "text-red-300", section: "main" },
  { label: "Conversations", subtitle: "Unified customer inbox", href: "/dashboard/conversations", icon: IconInbox, color: "text-sky-300", section: "main", badge: 8 },
  { label: "Customers", subtitle: "Customer relationship intelligence", href: "/dashboard/customers", icon: IconCustomers, color: "text-amber-300", section: "main" },
  { label: "Leads", subtitle: "AI-powered lead intelligence", href: "/dashboard/leads", icon: IconLeads, color: "text-red-300", section: "main", badge: 5 },
  { label: "Business Knowledge", subtitle: "What Lewy uses to answer customers", href: "/dashboard/knowledge", icon: IconProducts, color: "text-purple-300", section: "main" },
  { label: "Train Lewy", subtitle: "Test and correct Lewy's answers", href: "/dashboard/train", icon: IconWand, color: "text-pink-300", section: "main" },
  { label: "Revenue", subtitle: "Revenue intelligence", href: "/dashboard/revenue", icon: IconTrendUp, color: "text-emerald-300", section: "main" },
  { label: "Follow-ups", subtitle: "Automated lead recovery", href: "/dashboard/followups", icon: IconFollowups, color: "text-orange-300", section: "main" },
  { label: "Calendar", subtitle: "Appointments and bookings", href: "/dashboard/calendar", icon: IconCalendar, color: "text-cyan-300", section: "main" },
  { label: "Channels", subtitle: "Connected communication channels", href: "/dashboard/channels", icon: IconChannels, color: "text-cyan-300", section: "integrations" },
  { label: "Settings", subtitle: "Workspace configuration", href: "/dashboard/settings", icon: IconSettings, color: "text-white/50", section: "integrations" },
];

function QuickActionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { showToast } = useToast();
  const [action, setAction] = useState("Send WhatsApp message");
  const [customer, setCustomer] = useState("");
  const [message, setMessage] = useState("");

  function handleCreate() {
    onClose();
    showToast(`${action} queued${customer ? ` for ${customer}` : ""}`);
    setCustomer("");
    setMessage("");
  }

  return (
    <Modal open={open} onClose={onClose} title="Create quick action">
      <div className="space-y-3.5">
        <div>
          <label className="text-[11px] text-white/40 uppercase tracking-wide">Action</label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full mt-1.5 bg-white/5 border border-transparent rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-indigo-400/50"
          >
            <option>Send WhatsApp message</option>
            <option>Create follow-up</option>
            <option>Book appointment</option>
            <option>Create lead</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] text-white/40 uppercase tracking-wide">Customer</label>
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Customer name"
            className="w-full mt-1.5 bg-white/5 border border-transparent rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-indigo-400/50 placeholder:text-white/25"
          />
        </div>
        <div>
          <label className="text-[11px] text-white/40 uppercase tracking-wide">Message</label>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What should Lewy do?"
            className="w-full mt-1.5 bg-white/5 border border-transparent rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-indigo-400/50 placeholder:text-white/25"
          />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button onClick={onClose} className="text-[13px] border border-transparent rounded-lg px-4 py-2 hover:bg-white/5 transition">
            Cancel
          </button>
          <button onClick={handleCreate} className="text-[13px] bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg px-4 py-2 font-medium hover:opacity-90 transition">
            Create action
          </button>
        </div>
      </div>
    </Modal>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [aiActive, setAiActive] = useState(true);
  const [handoverCount, setHandoverCount] = useState(0);

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
    if (workspaceId) {
      getPendingHandoverCount(workspaceId).then(setHandoverCount).catch(() => {});
    }
  }, [pathname, workspaceId]);

  async function handleToggleAi() {
    setAiActive(next);
    try {
      await updateAiActive(workspaceId, next);
      showToast(next ? "Lewy is active again" : "Lewy is paused — you're handling replies");
    } catch {
      showToast("Couldn't update — try again");
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!checked) {
    return <div className="min-h-screen bg-[#101018] flex items-center justify-center text-white/30 text-sm">Loading…</div>;
  }

  if (!session) return null;

  const current = nav.find((item) => item.href === pathname) ?? nav[0];
  const mainItems = nav.filter((item) => item.section === "main");
  const integrationItems = nav.filter((item) => item.section === "integrations");

  const NavLink = ({ item }: { item: (typeof nav)[number] }) => {
    const active = pathname === item.href;
    const Icon = item.icon;
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-4 py-2.5 mx-1.5 my-0.5 rounded-xl text-[13px] transition ${
          active
            ? "text-white bg-gradient-to-r from-indigo-500/25 to-indigo-500/5 border border-indigo-400/25"
            : "text-white/55 hover:text-white hover:bg-white/[0.04] hover:translate-x-0.5"
        }`}
      >
        <span className={active ? item.color : "text-white/35"}><Icon /></span>
        <span className="flex-1">{item.label}</span>
        {item.href === "/dashboard/handover" ? (
          handoverCount > 0 && (
            <span className="bg-red-600 text-[10px] px-1.5 py-0.5 rounded-full leading-none animate-pulse">{handoverCount}</span>
          )
        ) : item.badge ? (
          <span className="bg-indigo-600 text-[10px] px-1.5 py-0.5 rounded-full leading-none">{item.badge}</span>
        ) : null}
      </Link>
    );
  };

  const SidebarContent = (
    <>
      <div className="flex items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-black text-[15px] shadow-lg shadow-indigo-500/30">L</div>
          <span className="font-bold text-[15px] tracking-tight">Lewy AI</span>
        </Link>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/50 hover:text-white">
          <IconX />
        </button>
      </div>

      <div className="mx-3 mb-4 rounded-2xl border border-transparent bg-gradient-to-br from-indigo-500/[0.13] to-white/[0.02] p-3.5">
        <div className="text-[10px] text-white/40 tracking-wide">WORKSPACE</div>
        <div className="font-semibold text-[13px] mt-1">Amina&apos;s Salon</div>
        <button onClick={handleToggleAi} className="flex items-center gap-1.5 mt-2.5 text-[11px] w-full">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              aiActive ? "bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" : "bg-white/25"
            }`}
          />
          <span className={aiActive ? "text-emerald-300" : "text-white/40"}>
            {aiActive ? "AI is active" : "AI is paused"}
          </span>
          <span className="ml-auto text-white/25 underline">{aiActive ? "Pause" : "Resume"}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-3">
        <div className="text-[10px] font-bold text-white/30 tracking-widest px-5 py-2">COMMAND CENTER</div>
        {mainItems.map((item) => <NavLink key={item.href} item={item} />)}
        <div className="text-[10px] font-bold text-white/30 tracking-widest px-5 py-2 mt-2">INTEGRATIONS</div>
        {integrationItems.map((item) => <NavLink key={item.href} item={item} />)}
      </div>

      <div className="p-3 border-t border-transparent">
        <div className="flex items-center gap-2.5 rounded-xl border border-transparent p-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-[11px] shrink-0">
            {session.user.email?.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-medium truncate">{session.user.email}</div>
            <button onClick={handleSignOut} className="text-[10px] text-white/40 hover:text-white underline">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_0%,rgba(99,102,241,0.16),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(34,211,238,0.12),transparent_45%),#101018] text-white lg:flex relative overflow-hidden">
      <div className="fixed top-[-15%] left-[10%] w-[550px] h-[550px] bg-indigo-600/18 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[5%] w-[500px] h-[500px] bg-cyan-500/14 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-[40%] right-[25%] w-[350px] h-[350px] bg-indigo-500/8 rounded-full blur-[140px] pointer-events-none" />

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#0a0a10] border-r border-transparent flex flex-col">
            {SidebarContent}
          </aside>
        </div>
      )}

      <aside className="hidden lg:flex w-64 shrink-0 border-r border-transparent flex-col relative z-10 bg-black/20">
        {SidebarContent}
      </aside>

      <div className="flex-1 min-w-0 relative z-10 flex flex-col">
        <header className="h-16 border-b border-transparent flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 bg-[#101018]/85 backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white/60 hover:text-white p-1 shrink-0">
              <IconMenu />
            </button>
            <div className="min-w-0">
              <div className="text-[14px] sm:text-[15px] font-semibold truncate">{current.label}</div>
              <div className="hidden sm:block text-[11px] text-white/35">{current.subtitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-white/[0.05] border border-transparent rounded-lg px-3 py-2 text-white/35 w-52">
              <IconSearch />
              <input placeholder="Search anything..." className="bg-transparent outline-none text-[13px] w-full placeholder:text-white/30" />
            </div>
            <button
              onClick={() => showToast("You have 3 important notifications")}
              className="w-9 h-9 rounded-lg border border-transparent bg-white/[0.05] text-white/60 hover:text-white hover:-translate-y-0.5 transition flex items-center justify-center"
            >
              <IconBell />
            </button>
            <button
              onClick={() => setQuickOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-lg px-3 sm:px-4 py-2 text-[13px] font-medium shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 transition"
            >
              <IconPlus />
              <span className="hidden sm:inline">Quick action</span>
            </button>
          </div>
        </header>

        {handoverCount > 0 && pathname !== "/dashboard/conversations" && (
          <a
            href="/dashboard/handover"
            className="flex items-center justify-center gap-2 bg-red-600/90 hover:bg-red-600 transition text-white text-[13px] font-medium px-4 py-2.5 text-center"
          >
            🔴 ACTION REQUIRED: {handoverCount} customer{handoverCount > 1 ? "s" : ""} need{handoverCount === 1 ? "s" : ""} you →
          </a>
        )}

        <div className="flex-1">{children}</div>
      </div>

      <QuickActionModal open={quickOpen} onClose={() => setQuickOpen(false)} />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DashboardShell>{children}</DashboardShell>
    </ToastProvider>
  );
}
