"use client";

import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";
import { IconCustomers, IconTrendUp, IconAlertTriangle, IconTarget } from "@/components/icons";

const stats = [
  { label: "Total customers", value: "284", icon: IconCustomers, tone: "text-indigo-300", bg: "bg-indigo-500/10" },
  { label: "Active this week", value: "37", icon: IconTrendUp, tone: "text-emerald-300", bg: "bg-emerald-500/10" },
  { label: "Prospects", value: "62", icon: IconTarget, tone: "text-amber-300", bg: "bg-amber-500/10" },
  { label: "At risk of churn", value: "9", icon: IconAlertTriangle, tone: "text-red-300", bg: "bg-red-500/10" },
];

const customers = [
  { initials: "JW", name: "Jane Wambui", last: "Today, 9:14 AM", channel: "WhatsApp", value: "KES 84,000", status: "ACTIVE", statusColor: "bg-red-500/15 text-red-300" },
  { initials: "BM", name: "Brian Mwangi", last: "2 minutes ago", channel: "WhatsApp", value: "KES 84,000", status: "ACTIVE", statusColor: "bg-red-500/15 text-red-300" },
  { initials: "SW", name: "Sarah Wanjiku", last: "8 minutes ago", channel: "Instagram", value: "KES 41,500", status: "PROSPECT", statusColor: "bg-amber-500/15 text-amber-300" },
  { initials: "DK", name: "David Kimani", last: "21 minutes ago", channel: "Email", value: "KES 18,000", status: "PROSPECT", statusColor: "bg-amber-500/15 text-amber-300" },
];

export default function CustomersPage() {
  const { showToast } = useToast();

  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Customers</div>
          <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">Business memory, not just messages.</h1>
          <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">Every interaction builds one profile, across every channel.</p>
        </div>
      </Reveal>

      <Reveal delay={80} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-4">
              <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.tone} flex items-center justify-center`}>
                <Icon />
              </div>
              <div className="text-xl font-bold mt-3">{s.value}</div>
              <div className="text-[11px] text-white/40 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </Reveal>

      <Reveal delay={150} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="text-white/35 text-[10px] uppercase tracking-wide">
                <th className="text-left font-medium py-3 px-5">Customer</th>
                <th className="text-left font-medium py-3 px-5">Last interaction</th>
                <th className="text-left font-medium py-3 px-5">Channel</th>
                <th className="text-left font-medium py-3 px-5">Lifetime value</th>
                <th className="text-left font-medium py-3 px-5">Status</th>
                <th className="py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.name} className="text-[13px] hover:bg-[#15151f] shadow-lg shadow-black/20 transition">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {c.initials}
                      </div>
                      <span className="whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-white/60 whitespace-nowrap">{c.last}</td>
                  <td className="py-3.5 px-5 text-white/60 whitespace-nowrap">{c.channel}</td>
                  <td className="py-3.5 px-5 font-mono whitespace-nowrap">{c.value}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${c.statusColor}`}>{c.status}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <button
                      onClick={() => showToast(`Opening ${c.name}`)}
                      className="text-[11px] bg-white/8 hover:bg-white/15 rounded-lg px-3 py-1.5 transition whitespace-nowrap"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}
