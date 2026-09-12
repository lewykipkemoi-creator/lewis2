const columns = [
  {
    tag: "HOT",
    color: "text-loss",
    border: "border-loss/30",
    leads: [
      { name: "Peter M.", interest: "100 units — bulk order", value: "KES 250,000", summary: "Asked for a better price on a 100-unit order. Ready to commit if pricing works.", next: "Alert owner — needs pricing decision" },
      { name: "Grace K.", interest: "Premium package", value: "KES 18,000", summary: "Confirmed budget and timeline. Asked about delivery to Nakuru.", next: "Send delivery confirmation and close" },
    ],
  },
  {
    tag: "WARM",
    color: "text-seal",
    border: "border-seal/30",
    leads: [
      { name: "David O.", interest: "Standard package", value: "KES 6,500", summary: "Asked about pricing twice. Hasn't responded to last follow-up.", next: "Send second follow-up" },
      { name: "Wanjiru T.", interest: "Consultation", value: "KES 3,000", summary: "Interested but said 'let me think about it' 3 days ago.", next: "Wait 2 more days, then follow up" },
    ],
  },
  {
    tag: "COLD",
    color: "text-ink/50",
    border: "border-ink/15",
    leads: [
      { name: "Instagram DM", interest: "General inquiry", value: "KES 2,000", summary: "Asked one question, no reply since.", next: "Low priority — automated nudge only" },
    ],
  },
];

export default function LeadsPage() {
  return (
    <div className="max-w-6xl px-8 lg:px-12 py-10">
      <div className="text-xs font-mono tracking-widest text-ink/40">LEADS</div>
      <h1 className="font-serif text-3xl font-semibold mt-2">Who's ready to buy.</h1>
      <p className="text-ink/55 mt-2">Sorted by how likely — and how valuable — each opportunity is.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {columns.map((col) => (
          <div key={col.tag} className={`border ${col.border}`}>
            <div className={`px-5 py-3 border-b ${col.border} font-mono text-xs tracking-widest ${col.color} flex justify-between`}>
              <span>{col.tag}</span>
              <span>{col.leads.length}</span>
            </div>
            <div className="divide-y divide-ink/10">
              {col.leads.map((lead) => (
                <div key={lead.name} className="p-5">
                  <div className="flex justify-between items-baseline gap-3">
                    <div className="font-serif font-semibold">{lead.name}</div>
                    <div className="font-mono tabular text-sm">{lead.value}</div>
                  </div>
                  <div className="text-sm text-ink/60 mt-1">{lead.interest}</div>
                  <p className="text-xs text-ink/45 leading-5 mt-3">{lead.summary}</p>
                  <div className="text-xs mt-3 pt-3 border-t border-ink/10 font-medium">
                    Next: <span className="font-normal text-ink/60">{lead.next}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
