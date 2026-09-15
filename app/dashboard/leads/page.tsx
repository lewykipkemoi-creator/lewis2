import Reveal from "@/components/Reveal";

const columns = [
  {
    tag: "HOT",
    color: "text-red-400",
    border: "border-red-500/20",
    leads: [
      { initials: "PM", name: "Peter M.", interest: "100 units — bulk order", value: "KES 250,000", summary: "Asked for a better price on a 100-unit order. Ready to commit if pricing works.", next: "Alert owner — needs pricing decision" },
      { initials: "GK", name: "Grace K.", interest: "Premium package", value: "KES 18,000", summary: "Confirmed budget and timeline. Asked about delivery to Nakuru.", next: "Send delivery confirmation and close" },
    ],
  },
  {
    tag: "WARM",
    color: "text-amber-400",
    border: "border-amber-500/20",
    leads: [
      { initials: "DO", name: "David O.", interest: "Standard package", value: "KES 6,500", summary: "Asked about pricing twice. Hasn't responded to last follow-up.", next: "Send second follow-up" },
      { initials: "WT", name: "Wanjiru T.", interest: "Consultation", value: "KES 3,000", summary: "Interested but said 'let me think about it' 3 days ago.", next: "Wait 2 more days, then follow up" },
    ],
  },
  {
    tag: "COLD",
    color: "text-white/40",
    border: "border-white/10",
    leads: [
      { initials: "IG", name: "Instagram DM", interest: "General inquiry", value: "KES 2,000", summary: "Asked one question, no reply since.", next: "Low priority — automated nudge only" },
    ],
  },
];

export default function LeadsPage() {
  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <h1 className="text-xl sm:text-2xl font-semibold">Who's ready to buy.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">Sorted by how likely — and how valuable — each opportunity is.</p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {columns.map((col, ci) => (
          <Reveal key={col.tag} delay={ci * 100} className={`rounded-2xl border ${col.border} bg-white/[0.02]`}>
            <div className={`px-4 py-2.5 border-b ${col.border} text-[11px] font-mono tracking-wide ${col.color} flex justify-between`}>
              <span>{col.tag}</span>
              <span>{col.leads.length}</span>
            </div>
            <div className="divide-y divide-white/6">
              {col.leads.map((lead) => (
                <div key={lead.name} className="p-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {lead.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[14px] truncate">{lead.name}</div>
                      <div className="text-[11px] text-white/50 truncate">{lead.interest}</div>
                    </div>
                    <div className="font-mono text-[13px] text-white/70 shrink-0">{lead.value}</div>
                  </div>
                  <p className="text-[12px] text-white/40 leading-5 mt-3">{lead.summary}</p>
                  <div className="text-[12px] mt-2.5 pt-2.5 border-t border-white/6">
                    <span className="text-white/50">Next: </span>
                    <span className="text-white/70">{lead.next}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
