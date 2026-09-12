const channels = [
  { name: "WhatsApp", status: "Connected", detail: "428 conversations this month" },
  { name: "Instagram", status: "Connected", detail: "156 conversations this month" },
  { name: "Facebook Messenger", status: "Connected", detail: "61 conversations this month" },
  { name: "Gmail", status: "Connected", detail: "34 conversations this month" },
  { name: "Telegram", status: "Not connected", detail: "Connect to start capturing messages" },
  { name: "Website chat", status: "Not connected", detail: "Add a snippet to your site" },
  { name: "M-Pesa", status: "Connected", detail: "Payment links active" },
  { name: "Google Calendar", status: "Connected", detail: "Bookings sync automatically" },
];

export default function ChannelsPage() {
  return (
    <div className="max-w-6xl px-8 lg:px-12 py-10">
      <div className="text-xs font-mono tracking-widest text-ink/40">CHANNELS</div>
      <h1 className="font-serif text-3xl font-semibold mt-2">Where Lewy is listening.</h1>
      <p className="text-ink/55 mt-2">Connect a channel once — Lewy handles it forever.</p>

      <div className="grid sm:grid-cols-2 gap-px bg-ink/15 mt-10 max-w-3xl">
        {channels.map((c) => (
          <div key={c.name} className="bg-paper p-6 flex items-center justify-between">
            <div>
              <div className="font-serif font-semibold">{c.name}</div>
              <div className="text-xs text-ink/45 mt-1">{c.detail}</div>
            </div>
            {c.status === "Connected" ? (
              <span className="text-[10px] font-mono tracking-wider border border-gain/30 text-gain px-2 py-1 shrink-0">
                CONNECTED
              </span>
            ) : (
              <button className="text-xs font-medium border border-ink/25 px-3 py-1.5 hover:border-ink transition shrink-0">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
