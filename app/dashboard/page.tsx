import Reveal from "@/components/Reveal";
import { IconAlertTriangle, IconTrendUp, IconTarget, IconZap, IconClock, IconPercent } from "@/components/icons";

const metrics = [
  { label: "Revenue at risk", value: "KES 86,400", tone: "text-red-400", bg: "bg-red-500/10", note: "12 conversations need attention", icon: IconAlertTriangle },
  { label: "Revenue recovered", value: "KES 142,900", tone: "text-emerald-400", bg: "bg-emerald-500/10", note: "This month", icon: IconTrendUp },
  { label: "Active opportunities", value: "23", tone: "text-indigo-300", bg: "bg-indigo-500/10", note: "Across all channels", icon: IconTarget },
  { label: "AI resolution rate", value: "81%", tone: "text-cyan-300", bg: "bg-cyan-500/10", note: "Handled without a human", icon: IconZap },
  { label: "Avg. response time", value: "8 sec", tone: "text-emerald-400", bg: "bg-emerald-500/10", note: "vs. industry avg 42 hrs", icon: IconClock },
  { label: "Conversion rate", value: "16.4%", tone: "text-fuchsia-300", bg: "bg-fuchsia-500/10", note: "Conversation to sale", icon: IconPercent },
];

const funnel = [
  { stage: "Conversations", count: 428 },
  { stage: "Qualified leads", count: 156 },
  { stage: "Opportunities", count: 61 },
  { stage: "Appointments booked", count: 34 },
  { stage: "Sales", count: 22 },
];

const leaks = [
  { title: "7 high-value customers haven't received a response", value: "KES 42,000", age: "Oldest: 6 hrs ago" },
  { title: "3 leads are waiting for follow-up", value: "KES 28,400", age: "Oldest: 2 days ago" },
  { title: "2 customers abandoned after asking about pricing", value: "KES 16,000", age: "Oldest: 4 hrs ago" },
];

const activity = [
  { text: "Lewy booked an appointment for Jane W. — Thursday, 10:00 AM", time: "2 min ago" },
  { text: "Lewy sent an M-Pesa payment link to David O. for KES 3,500", time: "18 min ago" },
  { text: "Lewy escalated a conversation to you — customer asking about a 100-unit order", time: "41 min ago" },
  { text: "Lewy sent a follow-up to a customer who went quiet after pricing questions", time: "1 hr ago" },
];

export default function DashboardOverview() {
  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Today, Sept 12</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">Good morning, Amina.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">
          3 things need your attention — KES 86,400 is currently at risk.
        </p>
      </Reveal>

      <Reveal delay={100} className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6 sm:mt-8">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5 sm:p-4">
              <div className={`w-8 h-8 rounded-lg ${m.bg} ${m.tone} flex items-center justify-center`}>
                <Icon />
              </div>
              <div className="text-[11px] sm:text-[12px] text-white/40 mt-3">{m.label}</div>
              <div className={`text-lg sm:text-xl font-semibold mt-1 ${m.tone}`}>{m.value}</div>
              <div className="text-[10px] sm:text-[11px] text-white/30 mt-1">{m.note}</div>
            </div>
          );
        })}
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 mt-6">
        <Reveal delay={150} className="rounded-xl border border-white/8 bg-white/[0.02]">
          <div className="border-b border-white/8 px-4 sm:px-5 py-3 text-[14px] font-medium">Conversation to revenue</div>
          <div className="p-4 sm:p-5 space-y-3.5">
            {funnel.map((f) => (
              <div key={f.stage} className="flex items-center gap-3">
                <div className="w-28 sm:w-32 text-[11px] sm:text-[12px] text-white/50 shrink-0">{f.stage}</div>
                <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                    style={{ width: `${(f.count / funnel[0].count) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-right font-mono text-[12px] text-white/60">{f.count}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="rounded-xl border border-red-500/20 bg-red-500/[0.03]">
          <div className="border-b border-red-500/15 px-4 sm:px-5 py-3 text-[14px] font-medium flex items-center gap-2">
            <span className="text-red-400"><IconAlertTriangle /></span>
            Revenue Leak Detector
          </div>
          <div className="divide-y divide-white/6">
            {leaks.map((leak) => (
              <button key={leak.title} className="w-full text-left px-4 sm:px-5 py-3.5 hover:bg-red-500/5 transition">
                <div className="flex justify-between items-start gap-3">
                  <div className="text-[13px] text-white/80">{leak.title}</div>
                  <div className="font-mono text-red-400 text-[13px] shrink-0">{leak.value}</div>
                </div>
                <div className="text-[11px] text-white/30 mt-1">{leak.age}</div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={250} className="rounded-xl border border-white/8 bg-white/[0.02] mt-5">
        <div className="border-b border-white/8 px-4 sm:px-5 py-3 text-[14px] font-medium">AI activity</div>
        <div className="divide-y divide-white/6">
          {activity.map((a, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 px-4 sm:px-5 py-3 text-[13px]">
              <div className="text-white/60">{a.text}</div>
              <div className="text-[11px] font-mono text-white/30 shrink-0 sm:ml-4">{a.time}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
