const metrics = [
  { label: "Revenue at risk", value: "KES 86,400", tone: "loss", note: "12 conversations need attention" },
  { label: "Revenue recovered", value: "KES 142,900", tone: "gain", note: "This month" },
  { label: "Active opportunities", value: "23", tone: "ink", note: "Across all channels" },
  { label: "AI resolution rate", value: "81%", tone: "ink", note: "Handled without a human" },
  { label: "Avg. response time", value: "8 sec", tone: "gain", note: "vs. industry avg 42 hrs" },
  { label: "Conversion rate", value: "16.4%", tone: "ink", note: "Conversation to sale" },
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

function toneClass(tone: string) {
  if (tone === "loss") return "text-loss";
  if (tone === "gain") return "text-gain";
  return "text-ink";
}

export default function DashboardOverview() {
  return (
    <div className="max-w-6xl px-8 lg:px-12 py-10">
      <div className="text-xs font-mono tracking-widest text-ink/40">TODAY, SEPT 12</div>
      <h1 className="font-serif text-3xl font-semibold mt-2">Good morning, Amina.</h1>
      <p className="text-ink/55 mt-2">
        3 things need your attention — KES 86,400 is currently at risk.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-10 border-t border-l border-ink/15">
        {metrics.map((m) => (
          <div key={m.label} className="border-b border-r border-ink/15 p-6">
            <div className="text-sm text-ink/50">{m.label}</div>
            <div className={`font-mono tabular text-2xl font-semibold mt-2 ${toneClass(m.tone)}`}>{m.value}</div>
            <div className="text-xs text-ink/40 mt-1">{m.note}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <div className="border border-ink/20">
          <div className="border-b border-ink/15 px-6 py-4 font-serif font-semibold">Conversation to revenue</div>
          <div className="p-6 space-y-4">
            {funnel.map((f) => (
              <div key={f.stage} className="flex items-center gap-4">
                <div className="w-40 text-sm text-ink/60 shrink-0">{f.stage}</div>
                <div className="flex-1 h-2 bg-ink/10">
                  <div
                    className="h-full bg-ink"
                    style={{ width: `${(f.count / funnel[0].count) * 100}%` }}
                  />
                </div>
                <div className="w-10 text-right font-mono tabular text-sm">{f.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-loss/30">
          <div className="border-b border-loss/20 px-6 py-4 font-serif font-semibold flex items-center gap-2">
            <span>Revenue Leak Detector</span>
          </div>
          <div className="divide-y divide-ink/10">
            {leaks.map((leak) => (
              <button key={leak.title} className="w-full text-left px-6 py-4 hover:bg-loss/5 transition">
                <div className="flex justify-between items-start gap-4">
                  <div className="text-sm">{leak.title}</div>
                  <div className="font-mono tabular text-loss text-sm shrink-0">{leak.value}</div>
                </div>
                <div className="text-xs text-ink/40 mt-1">{leak.age}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-ink/20 mt-8">
        <div className="border-b border-ink/15 px-6 py-4 font-serif font-semibold">AI activity</div>
        <div className="divide-y divide-ink/10">
          {activity.map((a, i) => (
            <div key={i} className="flex justify-between items-center px-6 py-3.5 text-sm">
              <div className="text-ink/70">{a.text}</div>
              <div className="text-xs font-mono text-ink/35 shrink-0 ml-4">{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
