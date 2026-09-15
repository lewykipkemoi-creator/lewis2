"use client";

import Reveal from "@/components/Reveal";
import { IconAlertTriangle, IconTrendUp, IconTarget, IconZap } from "@/components/icons";
import { useToast } from "@/components/Toast";

const metrics = [
  { label: "Revenue recovered", value: "KES 184,200", growth: "↑ 28.4% this month", tone: "text-white", growthTone: "text-emerald-400", icon: IconTrendUp, bg: "bg-emerald-500/10", iconTone: "text-emerald-300" },
  { label: "Revenue at risk", value: "KES 72,450", growth: "12 opportunities", tone: "text-white", growthTone: "text-red-400", icon: IconAlertTriangle, bg: "bg-red-500/10", iconTone: "text-red-300" },
  { label: "AI conversations", value: "1,284", growth: "↑ 18.7%", tone: "text-white", growthTone: "text-emerald-400", icon: IconZap, bg: "bg-indigo-500/10", iconTone: "text-indigo-300" },
  { label: "Leads captured", value: "347", growth: "↑ 31.2%", tone: "text-white", growthTone: "text-emerald-400", icon: IconTarget, bg: "bg-cyan-500/10", iconTone: "text-cyan-300" },
];

const opportunities = [
  { code: "WA", name: "Brian Mwangi", detail: "Asked about price 47m ago", amount: "KES 24k" },
  { code: "IG", name: "Sarah Wanjiku", detail: "Requested product details", amount: "KES 18k" },
  { code: "G", name: "David Kimani", detail: "Email unanswered", amount: "KES 14k" },
];

const priorityLeads = [
  { initials: "BM", name: "Brian Mwangi", source: "WhatsApp", intent: "HOT", value: "KES 24,000" },
  { initials: "SW", name: "Sarah Wanjiku", source: "Instagram", intent: "HOT", value: "KES 18,000" },
  { initials: "DK", name: "David Kimani", source: "Email", intent: "WARM", value: "KES 14,000" },
];

const activity = [
  { title: "Lewy replied to Brian", detail: "Product pricing question answered" },
  { title: "New HOT lead detected", detail: "Instagram conversation scored 92/100" },
  { title: "Follow-up scheduled", detail: "David will receive a reminder tomorrow" },
  { title: "Appointment booked", detail: "14:30 tomorrow with Sarah" },
];

function intentStyle(intent: string) {
  if (intent === "HOT") return "bg-red-500/10 text-red-300";
  if (intent === "WARM") return "bg-amber-500/10 text-amber-300";
  return "bg-sky-500/10 text-sky-300";
}

export default function DashboardOverview() {
  const { showToast } = useToast();

  return (
    <div className="max-w-6xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal className="relative rounded-3xl border border-indigo-500/20 overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.22),transparent_45%)]" />
        <div className="absolute -right-24 -bottom-32 w-72 h-72 bg-indigo-500 rounded-full blur-[100px] opacity-20" />
        <div className="relative flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="text-indigo-300 text-[11px] font-bold uppercase tracking-widest">AI Revenue Command Center</div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-2 max-w-lg leading-tight">
              Turn conversations into revenue automatically.
            </h1>
            <p className="text-white/50 text-[13px] sm:text-[14px] mt-3 max-w-lg leading-6">
              Lewy watches your customer channels, detects buying intent, responds instantly and follows up before opportunities disappear.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => showToast("Lewy is scanning your conversations…")}
                className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl px-5 py-2.5 text-[13px] font-medium shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 transition"
              >
                Run AI scan
              </button>
              <a href="/dashboard/conversations" className="border border-white/15 rounded-xl px-5 py-2.5 text-[13px] font-medium text-white/70 hover:bg-white/5 transition">
                Open inbox →
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[12px] text-emerald-300 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Lewy AI Active
          </div>
        </div>
      </Reveal>

      <Reveal delay={100} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 hover:border-indigo-500/25 hover:-translate-y-1 transition">
              <div className="flex justify-between items-start">
                <div className="text-[11px] sm:text-[12px] text-white/45">{m.label}</div>
                <div className={`w-8 h-8 rounded-lg ${m.bg} ${m.iconTone} flex items-center justify-center shrink-0`}>
                  <Icon />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold mt-3">{m.value}</div>
              <div className={`text-[11px] mt-1 ${m.growthTone}`}>{m.growth}</div>
            </div>
          );
        })}
      </Reveal>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 sm:gap-5 mt-5">
        <Reveal delay={150} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="flex justify-between items-center mb-5">
            <div>
              <div className="text-[14px] font-semibold">Revenue performance</div>
              <div className="text-[11px] text-white/35 mt-0.5">Recovered revenue over the last 30 days</div>
            </div>
          </div>
          <div className="h-40 sm:h-52 flex items-end gap-1.5 sm:gap-2.5">
            {[34, 45, 39, 61, 51, 73, 86, 94].map((h, i) => (
              <div key={i} className="flex-1 h-full flex items-end group relative">
                <div
                  style={{ height: `${h}%` }}
                  className="w-full rounded-t bg-gradient-to-t from-indigo-700 to-indigo-400 group-hover:brightness-125 transition"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/[0.08] to-transparent p-5">
          <div className="flex justify-between items-center">
            <div className="text-[14px] font-semibold">Revenue Leak Detector</div>
            <span className="text-[9px] font-bold bg-red-500/15 text-red-300 px-2 py-1 rounded-full">HIGH RISK</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-red-400 mt-3">KES 72,450</div>
          <div className="text-white/40 text-[11px] mt-1">estimated revenue currently at risk</div>
          <div className="h-2 bg-white/8 rounded-full overflow-hidden mt-3">
            <div className="h-full w-[72%] origin-left bg-gradient-to-r from-amber-400 to-red-500 rounded-full animate-pulseBar" />
          </div>

          <div className="mt-4 divide-y divide-white/6">
            {opportunities.map((o) => (
              <div key={o.name} className="flex items-center gap-3 py-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-[10px] font-bold shrink-0">{o.code}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium truncate">{o.name}</div>
                  <div className="text-[10px] text-white/40 truncate">{o.detail}</div>
                </div>
                <div className="text-[12px] font-semibold text-red-300 shrink-0">{o.amount}</div>
              </div>
            ))}
          </div>

          <a href="/dashboard/leads" className="block text-center text-[12px] border border-white/12 rounded-lg py-2 mt-4 hover:bg-white/5 transition">
            View all opportunities →
          </a>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 sm:gap-5 mt-5">
        <Reveal delay={250} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-[14px] font-semibold">Priority leads</div>
              <div className="text-[11px] text-white/35 mt-0.5">Customers most likely to buy</div>
            </div>
            <a href="/dashboard/leads" className="text-[11px] border border-white/12 rounded-lg px-3 py-1.5 hover:bg-white/5 transition">View all</a>
          </div>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[420px]">
              <thead>
                <tr className="text-white/35 text-[10px] uppercase tracking-wide">
                  <th className="text-left font-medium pb-2 px-1">Customer</th>
                  <th className="text-left font-medium pb-2 px-1">Source</th>
                  <th className="text-left font-medium pb-2 px-1">Intent</th>
                  <th className="text-left font-medium pb-2 px-1">Value</th>
                </tr>
              </thead>
              <tbody>
                {priorityLeads.map((lead) => (
                  <tr key={lead.name} className="border-t border-white/6 text-[12px]">
                    <td className="py-2.5 px-1">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[10px] font-bold shrink-0">{lead.initials}</div>
                        <span className="whitespace-nowrap">{lead.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-1 text-white/60 whitespace-nowrap">{lead.source}</td>
                    <td className="py-2.5 px-1">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${intentStyle(lead.intent)}`}>{lead.intent}</span>
                    </td>
                    <td className="py-2.5 px-1 font-mono whitespace-nowrap">{lead.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={300} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-[14px] font-semibold">Lewy activity</div>
              <div className="text-[11px] text-white/35 mt-0.5">AI actions happening now</div>
            </div>
            <span className="text-[9px] font-bold bg-red-500/15 text-red-300 px-2 py-1 rounded-full">LIVE</span>
          </div>
          <div className="space-y-1">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-2.5 rounded-lg p-2 hover:bg-white/[0.03] transition">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold shrink-0">L</div>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium">{a.title}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">{a.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
