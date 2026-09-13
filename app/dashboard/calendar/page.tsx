import Reveal from "@/components/Reveal";

const appointments = [
  { time: "10:00 AM", name: "Jane Wambui", service: "Premium package", status: "Confirmed" },
  { time: "1:30 PM", name: "David O.", service: "Consultation", status: "Confirmed" },
  { time: "3:00 PM", name: "Open slot", service: "—", status: "Available" },
  { time: "4:15 PM", name: "Grace K.", service: "Standard package", status: "Awaiting payment" },
];

function statusStyle(status: string) {
  if (status === "Confirmed") return "border-emerald-500/25 text-emerald-400";
  if (status === "Available") return "border-white/10 text-white/35";
  return "border-amber-500/25 text-amber-400";
}

export default function CalendarPage() {
  return (
    <div className="max-w-5xl px-6 lg:px-10 py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Calendar</div>
        <h1 className="text-2xl font-semibold mt-1.5">Thursday, September 12</h1>
        <p className="text-white/45 text-[14px] mt-1.5">Connected to Google Calendar. Lewy books directly into open slots.</p>
      </Reveal>

      <Reveal delay={100} className="rounded-xl border border-white/8 bg-white/[0.02] mt-8 divide-y divide-white/6 max-w-lg">
        {appointments.map((a, i) => (
          <div key={i} className="flex items-center gap-5 px-5 py-3.5">
            <div className="w-16 font-mono text-[12px] text-white/45 shrink-0">{a.time}</div>
            <div className="flex-1">
              <div className="font-medium text-[13px]">{a.name}</div>
              <div className="text-[12px] text-white/40 mt-0.5">{a.service}</div>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${statusStyle(a.status)}`}>
              {a.status.toUpperCase()}
            </span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
