import Reveal from "@/components/Reveal";
import { IconPercent, IconTrendUp, IconAlertTriangle, IconZap } from "@/components/icons";

const summary = [
  { label: "Revenue generated", value: "KES 421,300", icon: IconZap, tone: "text-white", bg: "bg-white/8", note: "All time, this business" },
  { label: "Revenue recovered", value: "KES 142,900", icon: IconTrendUp, tone: "text-emerald-300", bg: "bg-emerald-500/10", note: "Through Lewy's follow-ups" },
  { label: "Revenue at risk", value: "KES 86,400", icon: IconAlertTriangle, tone: "text-red-300", bg: "bg-red-500/10", note: "12 conversations need attention" },
];

const insights = [
  "Your WhatsApp leads convert 32% better than Instagram leads.",
  "Most lost opportunities happen when customers don't get a reply within 30 minutes.",
  "You recovered KES 142,900 this month through automated follow-ups.",
  "12 customers are showing buying intent but haven't purchased yet.",
];

const byChannel = [
  { channel: "WhatsApp", revenue: 68400, share: 48 },
  { channel: "Instagram", revenue: 34200, share: 24 },
  { channel: "Website", revenue: 22800, share: 16 },
  { channel: "Facebook", revenue: 17500, share: 12 },
];

const topCustomers = [
  { initials: "JW", name: "Jane Wambui", value: "KES 84,000", orders: 4 },
  { initials: "PM", name: "Peter M.", value: "KES 62,500", orders: 2 },
  { initials: "SW", name: "Sarah Wanjiku", value: "KES 41,500", orders: 3 },
];

export default function RevenuePage() {
  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Revenue</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">What conversations are actually worth.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">Generated, recovered and at-risk — measured, not guessed.</p>
      </Reveal>

      <Reveal delay={80} className="grid sm:grid-cols-3 gap-3 mt-6">
        {summary.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-4">
              <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.tone} flex items-center justify-center`}>
                <Icon />
              </div>
              <div className={`text-xl font-bold mt-3 ${s.tone}`}>{s.value}</div>
              <div className="text-[11px] text-white/40 mt-0.5">{s.label}</div>
              <div className="text-[10px] text-white/30 mt-1">{s.note}</div>
            </div>
          );
        })}
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 mt-5">
        <Reveal delay={130} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-5">
          <div className="text-[14px] font-semibold mb-4">Revenue by channel</div>
          <div className="space-y-3.5">
            {byChannel.map((c) => (
              <div key={c.channel} className="flex items-center gap-3">
                <div className="w-20 text-[12px] text-white/50 shrink-0">{c.channel}</div>
                <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: `${c.share}%` }} />
                </div>
                <div className="w-20 text-right font-mono text-[12px] text-white/60">KES {c.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180} className="rounded-2xl bg-gradient-to-br from-indigo-500/[0.08] to-transparent p-5">
          <div className="text-[14px] font-semibold mb-1 flex items-center gap-2">
            <span className="text-indigo-300"><IconPercent /></span>
            Business intelligence
          </div>
          <div className="space-y-3 mt-3">
            {insights.map((insight, i) => (
              <div key={i} className="text-[13px] text-white/70 leading-6 bg-[#15151f] shadow-lg shadow-black/20 rounded-lg px-3.5 py-2.5">{insight}</div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={230} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 mt-5">
        <div className="px-5 py-3.5 text-[14px] font-semibold">Top customers by revenue</div>
        <div className="divide-y divide-transparent">
          {topCustomers.map((c) => (
            <div key={c.name} className="flex items-center gap-3.5 px-5 py-3.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[11px] font-bold shrink-0">
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[13px]">{c.name}</div>
                <div className="text-[11px] text-white/40">{c.orders} orders</div>
              </div>
              <div className="font-mono text-[13px] text-white/70 shrink-0">{c.value}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
