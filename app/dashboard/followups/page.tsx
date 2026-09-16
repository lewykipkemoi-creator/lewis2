"use client";

import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";
import { IconAlertTriangle, IconClock, IconCheck } from "@/components/icons";

const stats = [
  { label: "Waiting for response", value: "2", icon: IconAlertTriangle, tone: "text-red-300", bg: "bg-red-500/10" },
  { label: "Scheduled by Lewy", value: "2", icon: IconClock, tone: "text-amber-300", bg: "bg-amber-500/10" },
  { label: "Completed today", value: "6", icon: IconCheck, tone: "text-emerald-300", bg: "bg-emerald-500/10" },
];

const groups = [
  {
    title: "Waiting for a response",
    pill: "bg-red-500/15 text-red-300",
    action: "Send now",
    items: [
      { initials: "PM", name: "Peter M.", detail: "Bulk order pricing — 6 hrs waiting", value: "KES 250,000" },
      { initials: "GK", name: "Grace K.", detail: "Delivery question — 4 hrs waiting", value: "KES 18,000" },
    ],
  },
  {
    title: "Scheduled by Lewy",
    pill: "bg-amber-500/15 text-amber-300",
    action: "Edit",
    items: [
      { initials: "DO", name: "David O.", detail: "Second follow-up — sends tomorrow, 9:00 AM", value: "KES 6,500" },
      { initials: "WT", name: "Wanjiru T.", detail: "Check-in — sends in 2 days", value: "KES 3,000" },
    ],
  },
  {
    title: "Already followed up",
    pill: "bg-emerald-500/15 text-emerald-300",
    action: "View",
    items: [
      { initials: "JW", name: "Jane W.", detail: "Confirmed appointment reminder sent", value: "KES 18,000" },
    ],
  },
];

export default function FollowupsPage() {
  const { showToast } = useToast();

  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Follow-ups</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">Nothing gets forgotten.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">What Lewy is about to do, what's already done, and what's still waiting.</p>
      </Reveal>

      <Reveal delay={80} className="grid grid-cols-3 gap-3 mt-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-4">
              <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.tone} flex items-center justify-center`}>
                <Icon />
              </div>
              <div className="text-xl font-bold mt-3">{s.value}</div>
              <div className="text-[11px] text-white/40 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </Reveal>

      <div className="space-y-4 mt-5">
        {groups.map((group, gi) => (
          <Reveal key={group.title} delay={120 + gi * 80} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20">
            <div className="px-5 py-3 flex items-center justify-between">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${group.pill}`}>{group.title.toUpperCase()}</span>
            </div>
            <div className="divide-y divide-transparent">
              {group.items.map((item) => (
                <div key={item.name} className="flex items-center gap-3.5 px-5 py-3.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[11px] font-bold shrink-0">
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[13px] truncate">{item.name}</div>
                    <div className="text-[11px] text-white/40 mt-0.5 truncate">{item.detail}</div>
                  </div>
                  <div className="font-mono text-[13px] text-white/60 shrink-0 hidden sm:block">{item.value}</div>
                  <button
                    onClick={() => showToast(`${group.action}: ${item.name}`)}
                    className="text-[11px] bg-white/8 hover:bg-white/15 rounded-lg px-3 py-1.5 transition shrink-0"
                  >
                    {group.action}
                  </button>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
