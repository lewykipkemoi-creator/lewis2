"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";
import { supabase } from "@/lib/supabaseClient";
import { getOrCreateWorkspace } from "@/lib/workspace";
import { createPendingTransaction } from "@/lib/transactions";
import { IconAlertTriangle, IconClock, IconPercent, IconTrendUp } from "@/components/icons";

const stats = [
  { label: "HOT leads", value: "18", growth: "↑ 24%", icon: IconAlertTriangle, tone: "text-red-300", bg: "bg-red-500/10" },
  { label: "WARM leads", value: "64", growth: "↑ 12%", icon: IconClock, tone: "text-amber-300", bg: "bg-amber-500/10" },
  { label: "Conversion", value: "31.8%", growth: "↑ 6.2%", icon: IconPercent, tone: "text-cyan-300", bg: "bg-cyan-500/10" },
  { label: "Pipeline value", value: "KES 438k", growth: "↑ 19%", icon: IconTrendUp, tone: "text-indigo-300", bg: "bg-indigo-500/10" },
];

const columns = [
  {
    tag: "HOT",
    color: "text-red-300",
    pill: "bg-red-500/15 text-red-300",
    leads: [
      { initials: "PM", name: "Peter M.", interest: "100 units — bulk order", value: "KES 250,000", summary: "Asked for a better price on a 100-unit order. Ready to commit if pricing works.", next: "Alert owner — needs pricing decision" },
      { initials: "GK", name: "Grace K.", interest: "Premium package", value: "KES 18,000", summary: "Confirmed budget and timeline. Asked about delivery to Nakuru.", next: "Send delivery confirmation and close" },
    ],
  },
  {
    tag: "WARM",
    color: "text-amber-300",
    pill: "bg-amber-500/15 text-amber-300",
    leads: [
      { initials: "DO", name: "David O.", interest: "Standard package", value: "KES 6,500", summary: "Asked about pricing twice. Hasn't responded to last follow-up.", next: "Send second follow-up" },
      { initials: "WT", name: "Wanjiru T.", interest: "Consultation", value: "KES 3,000", summary: "Interested but said 'let me think about it' 3 days ago.", next: "Wait 2 more days, then follow up" },
    ],
  },
  {
    tag: "COLD",
    color: "text-white/50",
    pill: "bg-white/8 text-white/50",
    leads: [
      { initials: "IG", name: "Instagram DM", interest: "General inquiry", value: "KES 2,000", summary: "Asked one question, no reply since.", next: "Low priority — automated nudge only" },
    ],
  },
];

export default function LeadsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [closingName, setClosingName] = useState<string | null>(null);

  async function markAsWon(name: string, interest: string) {
    setClosingName(name);
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      const workspace = await getOrCreateWorkspace(data.session.user.id);
      await createPendingTransaction(workspace.id, name, interest);
      showToast(`${name} marked as won — confirm payment to continue`);
      router.push("/dashboard");
    } catch {
      showToast("Couldn't log this sale — try again");
      setClosingName(null);
    }
  }

  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Leads</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">Who's ready to buy.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">Sorted by how likely — and how valuable — each opportunity is.</p>
      </Reveal>

      <Reveal delay={80} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-4">
              <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.tone} flex items-center justify-center`}>
                <Icon />
              </div>
              <div className="text-xl font-bold mt-3">{s.value}</div>
              <div className="text-[11px] text-white/40 mt-0.5">{s.label}</div>
              <div className="text-[10px] text-emerald-400 mt-1">{s.growth}</div>
            </div>
          );
        })}
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4 mt-5">
        {columns.map((col, ci) => (
          <Reveal key={col.tag} delay={120 + ci * 80} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20">
            <div className="px-4 py-3 flex justify-between items-center">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${col.pill}`}>{col.tag}</span>
              <span className="text-[12px] text-white/40">{col.leads.length} leads</span>
            </div>
            <div className="divide-y divide-transparent">
              {col.leads.map((lead) => (
                <div key={lead.name} className="p-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {lead.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[14px] truncate">{lead.name}</div>
                      <div className="text-[11px] text-white/50 truncate">{lead.interest}</div>
                    </div>
                    <div className="font-mono text-[13px] text-white/70 shrink-0">{lead.value}</div>
                  </div>
                  <p className="text-[12px] text-white/40 leading-5 mt-3">{lead.summary}</p>
                  <div className="text-[12px] mt-3 pt-3 border-t border-transparent bg-[#15151f] shadow-lg shadow-black/20 rounded-lg px-2.5 py-2">
                    <span className="text-white/45">Next: </span>
                    <span className="text-white/75">{lead.next}</span>
                  </div>
                  <button
                    onClick={() => markAsWon(lead.name, lead.interest)}
                    disabled={closingName === lead.name}
                    className="w-full mt-2.5 text-[12px] bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg py-2 font-medium transition"
                  >
                    {closingName === lead.name ? "Logging sale…" : "Mark as Won — Log Sale"}
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
