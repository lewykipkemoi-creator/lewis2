const conversations = [
  { channel: "WhatsApp", name: "Peter M.", snippet: "Can someone give me a better price for 100 units?", time: "2 min", unread: true, tag: "HOT" },
  { channel: "Instagram", name: "@grace.k", snippet: "Do you deliver to Nakuru?", time: "14 min", unread: true, tag: "WARM" },
  { channel: "Website", name: "Chat form", snippet: "Booked for Thursday 10:00 AM — confirmed", time: "41 min", unread: false, tag: null },
  { channel: "Facebook", name: "David O.", snippet: "I'll think about it, thanks", time: "3 hrs", unread: false, tag: "WARM" },
  { channel: "Gmail", name: "orders@client.co.ke", snippet: "Following up on our quote from last week", time: "1 day", unread: true, tag: "COLD" },
];

export default function InboxPage() {
  return (
    <div className="max-w-6xl px-8 lg:px-12 py-10">
      <div className="text-xs font-mono tracking-widest text-ink/40">UNIFIED INBOX</div>
      <h1 className="font-serif text-3xl font-semibold mt-2">Every channel, one place.</h1>
      <p className="text-ink/55 mt-2">WhatsApp, Instagram, Facebook, Gmail, Telegram and your website — together.</p>

      <div className="border border-ink/20 mt-10 divide-y divide-ink/10">
        {conversations.map((c, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-ink/[0.02] cursor-pointer">
            <div className="w-20 shrink-0 text-xs font-mono text-ink/40">{c.channel}</div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm ${c.unread ? "font-semibold" : "font-medium text-ink/70"}`}>{c.name}</div>
              <div className="text-sm text-ink/50 truncate">{c.snippet}</div>
            </div>
            {c.tag && (
              <span className="text-[10px] font-mono tracking-wider border border-ink/20 px-2 py-1 text-ink/50 shrink-0">
                {c.tag}
              </span>
            )}
            <div className="text-xs font-mono text-ink/35 w-12 text-right shrink-0">{c.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
