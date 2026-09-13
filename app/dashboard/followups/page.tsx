import Reveal from "@/components/Reveal";

const groups = [
  {
    title: "Waiting for a response",
    color: "text-red-400",
    border: "border-red-500/20",
    items: [
      { name: "Peter M.", detail: "Bulk order pricing — 6 hrs waiting", value: "KES 250,000" },
      { name: "Grace K.", detail: "Delivery question — 4 hrs waiting", value: "KES 18,000" },
    ],
  },
  {
    title: "Scheduled by Lewy",
    color: "text-amber-400",
    border: "border-amber-500/20",
    items: [
      { name: "David O.", detail: "Second follow-up — sends tomorrow, 9:00 AM", value: "KES 6,500" },
      { name: "Wanjiru T.", detail: "Check-in — sends in 2 days", value: "KES 3,000" },
    ],
  },
  {
    title: "Already followed up",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    items: [
      { name: "Jane W.", detail: "Confirmed appointment reminder sent", value: "KES 18,000" },
    ],
  },
];

export default function FollowupsPage() {
  return (
    <div className="max-w-5xl px-6 lg:px-10 py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Follow-ups</div>
        <h1 className="text-2xl font-semibold mt-1.5">Nothing gets forgotten.</h1>
        <p className="text-white/45 text-[14px] mt-1.5">What Lewy is about to do, what's already done, and what's still waiting.</p>
      </Reveal>

      <div className="space-y-4 mt-8">
        {groups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 100} className={`rounded-xl border ${group.border} bg-white/[0.02]`}>
            <div className={`px-5 py-2.5 border-b ${group.border} text-[11px] font-mono tracking-wide ${group.color}`}>
              {group.title.toUpperCase()}
            </div>
            <div className="divide-y divide-white/6">
              {group.items.map((item) => (
                <div key={item.name} className="flex justify-between items-center px-5 py-3.5">
                  <div>
                    <div className="font-medium text-[13px]">{item.name}</div>
                    <div className="text-[12px] text-white/40 mt-0.5">{item.detail}</div>
                  </div>
                  <div className="font-mono text-[13px] text-white/70">{item.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
