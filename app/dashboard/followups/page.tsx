const groups = [
  {
    title: "Waiting for a response",
    color: "text-loss",
    items: [
      { name: "Peter M.", detail: "Bulk order pricing — 6 hrs waiting", value: "KES 250,000" },
      { name: "Grace K.", detail: "Delivery question — 4 hrs waiting", value: "KES 18,000" },
    ],
  },
  {
    title: "Scheduled by Lewy",
    color: "text-seal",
    items: [
      { name: "David O.", detail: "Second follow-up — sends tomorrow, 9:00 AM", value: "KES 6,500" },
      { name: "Wanjiru T.", detail: "Check-in — sends in 2 days", value: "KES 3,000" },
    ],
  },
  {
    title: "Already followed up",
    color: "text-gain",
    items: [
      { name: "Jane W.", detail: "Confirmed appointment reminder sent", value: "KES 18,000" },
    ],
  },
];

export default function FollowupsPage() {
  return (
    <div className="max-w-6xl px-8 lg:px-12 py-10">
      <div className="text-xs font-mono tracking-widest text-ink/40">FOLLOW-UPS</div>
      <h1 className="font-serif text-3xl font-semibold mt-2">Nothing gets forgotten.</h1>
      <p className="text-ink/55 mt-2">What Lewy is about to do, what's already done, and what's still waiting.</p>

      <div className="space-y-8 mt-10">
        {groups.map((group) => (
          <div key={group.title} className="border border-ink/20">
            <div className={`px-6 py-3 border-b border-ink/15 font-mono text-xs tracking-widest ${group.color}`}>
              {group.title.toUpperCase()}
            </div>
            <div className="divide-y divide-ink/10">
              {group.items.map((item) => (
                <div key={item.name} className="flex justify-between items-center px-6 py-4">
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-ink/45 mt-0.5">{item.detail}</div>
                  </div>
                  <div className="font-mono tabular text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
