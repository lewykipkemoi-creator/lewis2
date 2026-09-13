import Reveal from "@/components/Reveal";

const conversations = [
  { channel: "WhatsApp", name: "Peter M.", snippet: "Can someone give me a better price for 100 units?", time: "2 min", unread: true, tag: "HOT" },
  { channel: "Instagram", name: "@grace.k", snippet: "Do you deliver to Nakuru?", time: "14 min", unread: true, tag: "WARM" },
  { channel: "Website", name: "Chat form", snippet: "Booked for Thursday 10:00 AM — confirmed", time: "41 min", unread: false, tag: null },
  { channel: "Facebook", name: "David O.", snippet: "I'll think about it, thanks", time: "3 hrs", unread: false, tag: "WARM" },
  { channel: "Gmail", name: "orders@client.co.ke", snippet: "Following up on our quote from last week", time: "1 day", unread: true, tag: "COLD" },
];

export default function InboxPage() {
  return (
    <div className="max-w-5xl px-6 lg:px-10 py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Unified Inbox</div>
        <h1 className="text-2xl font-semibold mt-1.5">Every channel, one place.</h1>
        <p className="text-white/45 text-[14px] mt-1.5">WhatsApp, Instagram, Facebook, Gmail, Telegram and your website — together.</p>
      </Reveal>

      <Reveal delay={100} className="rounded-xl border border-white/8 bg-white/[0.02] mt-8 divide-y divide-white/6">
        {conversations.map((c, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] cursor-pointer">
            <div className="w-16 shrink-0 text-[11px] text-white/35">{c.channel}</div>
            <div className="flex-1 min-w-0">
              <div className={`text-[13px] ${c.unread ? "font-semibold text-white" : "font-medium text-white/60"}`}>{c.name}</div>
              <div className="text-[13px] text-white/40 truncate">{c.snippet}</div>
            </div>
            {c.tag && (
              <span className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded text-white/40 shrink-0">
                {c.tag}
              </span>
            )}
            <div className="text-[11px] font-mono text-white/30 w-10 text-right shrink-0">{c.time}</div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
