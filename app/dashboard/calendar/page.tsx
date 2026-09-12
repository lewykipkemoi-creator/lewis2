const appointments = [
  { time: "10:00 AM", name: "Jane Wambui", service: "Premium package", status: "Confirmed" },
  { time: "1:30 PM", name: "David O.", service: "Consultation", status: "Confirmed" },
  { time: "3:00 PM", name: "Open slot", service: "—", status: "Available" },
  { time: "4:15 PM", name: "Grace K.", service: "Standard package", status: "Awaiting payment" },
];

export default function CalendarPage() {
  return (
    <div className="max-w-6xl px-8 lg:px-12 py-10">
      <div className="text-xs font-mono tracking-widest text-ink/40">CALENDAR</div>
      <h1 className="font-serif text-3xl font-semibold mt-2">Thursday, September 12</h1>
      <p className="text-ink/55 mt-2">Connected to Google Calendar. Lewy books directly into open slots.</p>

      <div className="border border-ink/20 mt-10 divide-y divide-ink/10 max-w-2xl">
        {appointments.map((a, i) => (
          <div key={i} className="flex items-center gap-6 px-6 py-4">
            <div className="w-20 font-mono text-sm text-ink/50 shrink-0">{a.time}</div>
            <div className="flex-1">
              <div className="font-medium text-sm">{a.name}</div>
              <div className="text-xs text-ink/45 mt-0.5">{a.service}</div>
            </div>
            <span
              className={`text-[10px] font-mono tracking-wider px-2 py-1 border shrink-0 ${
                a.status === "Confirmed"
                  ? "border-gain/30 text-gain"
                  : a.status === "Available"
                  ? "border-ink/15 text-ink/40"
                  : "border-seal/30 text-seal"
              }`}
            >
              {a.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
