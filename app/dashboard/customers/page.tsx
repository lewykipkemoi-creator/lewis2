"use client";

import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";

const customers = [
  { initials: "JW", name: "Jane Wambui", last: "Today, 9:14 AM", channel: "WhatsApp", value: "KES 84,000", status: "ACTIVE", statusColor: "bg-red-500/10 text-red-300" },
  { initials: "BM", name: "Brian Mwangi", last: "2 minutes ago", channel: "WhatsApp", value: "KES 84,000", status: "ACTIVE", statusColor: "bg-red-500/10 text-red-300" },
  { initials: "SW", name: "Sarah Wanjiku", last: "8 minutes ago", channel: "Instagram", value: "KES 41,500", status: "PROSPECT", statusColor: "bg-amber-500/10 text-amber-300" },
  { initials: "DK", name: "David Kimani", last: "21 minutes ago", channel: "Email", value: "KES 18,000", status: "PROSPECT", statusColor: "bg-amber-500/10 text-amber-300" },
];

export default function CustomersPage() {
  const { showToast } = useToast();

  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Customers</h1>
          <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">Every customer profile, conversation and activity.</p>
        </div>
      </Reveal>

      <Reveal delay={100} className="rounded-2xl border border-white/8 bg-white/[0.02] mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="text-white/35 text-[10px] uppercase tracking-wide border-b border-white/8">
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
                <tr key={c.name} className="border-b border-white/6 last:border-0 text-[13px]">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {c.initials}
                      </div>
                      <span className="whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-white/60 whitespace-nowrap">{c.last}</td>
                  <td className="py-3.5 px-5 text-white/60 whitespace-nowrap">{c.channel}</td>
                  <td className="py-3.5 px-5 font-mono whitespace-nowrap">{c.value}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${c.statusColor}`}>{c.status}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <button
                      onClick={() => showToast(`Opening ${c.name}`)}
                      className="text-[11px] border border-white/12 rounded-lg px-3 py-1.5 hover:bg-white/5 transition whitespace-nowrap"
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
