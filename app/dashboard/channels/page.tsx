import Reveal from "@/components/Reveal";

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
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Channels</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">Where Lewy is listening.</h1>
        <p className="text-white/45 text-[14px] mt-1.5">Connect a channel once — Lewy handles it forever.</p>
      </Reveal>

      <Reveal delay={100} className="grid sm:grid-cols-2 gap-3 mt-8 max-w-2xl">
        {channels.map((c) => (
          <div key={c.name} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 flex items-center justify-between">
            <div>
              <div className="font-medium text-[14px]">{c.name}</div>
              <div className="text-[12px] text-white/40 mt-0.5">{c.detail}</div>
            </div>
            {c.status === "Connected" ? (
              <span className="text-[10px] font-mono border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded shrink-0">
                CONNECTED
              </span>
            ) : (
              <button className="text-[12px] font-medium border border-white/15 rounded-full px-3 py-1 hover:border-white/30 transition shrink-0">
                Connect
              </button>
            )}
          </div>
        ))}
      </Reveal>
    </div>
  );
}
