import Reveal from "@/components/Reveal";
import { IconPercent } from "@/components/icons";

const summary = [
  { label: "Revenue generated", value: "KES 421,300", tone: "text-white", note: "All time, this business" },
  { label: "Revenue recovered", value: "KES 142,900", tone: "text-emerald-400", note: "Through Lewy's follow-ups and reminders" },
  { label: "Revenue at risk", value: "KES 86,400", tone: "text-red-400", note: "12 conversations need attention" },
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

export default function RevenuePage() {
  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Revenue</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">What conversations are actually worth.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">Generated, recovered and at-risk — measured, not guessed.</p>
      </Reveal>

      <Reveal delay={100} className="grid sm:grid-cols-3 gap-3 mt-8">
        {summary.map((s) => (
          <div key={s.label} className="rounded-2xl border border-transparent bg-gradient-to-b from-white/[0.03] to-transparent p-4">
            <div className="text-[12px] text-white/40">{s.label}</div>
            <div className={`text-xl font-semibold mt-1.5 ${s.tone}`}>{s.value}</div>
            <div className="text-[11px] text-white/30 mt-1">{s.note}</div>
          </div>
        ))}
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 mt-6">
        <Reveal delay={150} className="rounded-2xl border border-transparent bg-white/[0.02]">
          <div className="border-b border-transparent px-5 py-3 text-[14px] font-medium">Revenue by channel</div>
          <div className="p-5 space-y-3.5">
            {byChannel.map((c) => (
              <div key={c.channel} className="flex items-center gap-3">
                <div className="w-20 text-[12px] text-white/50 shrink-0">{c.channel}</div>
                <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" style={{ width: `${c.share}%` }} />
                </div>
                <div className="w-20 text-right font-mono text-[12px] text-white/60">KES {c.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/[0.06] to-transparent">
          <div className="border-b border-indigo-500/15 px-5 py-3 text-[14px] font-medium flex items-center gap-2">
            <span className="text-indigo-300"><IconPercent /></span>
            Business intelligence
          </div>
          <div className="divide-y divide-transparent">
            {insights.map((insight, i) => (
              <div key={i} className="px-5 py-3.5 text-[13px] text-white/70 leading-6">{insight}</div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
