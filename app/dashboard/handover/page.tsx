"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";
import { supabase } from "@/lib/supabaseClient";
import { getOrCreateWorkspace } from "@/lib/workspace";
import { getPendingHandovers, resolveHandover, reasonLabels, type EscalationReason } from "@/lib/handover";

type HandoverRow = {
  id: string;
  channel: string;
  escalation_reason: EscalationReason;
  opportunity_value: number | null;
  created_at: string;
  customers: { name: string } | { name: string }[] | null;
};

function reasonStyle(reason: EscalationReason) {
  if (reason === "complaint") return "bg-red-500/15 text-red-300";
  if (reason === "payment_discussion") return "bg-amber-500/15 text-amber-300";
  return "bg-purple-500/15 text-purple-300";
}

function customerName(row: HandoverRow) {
  if (!row.customers) return "Unknown customer";
  if (Array.isArray(row.customers)) return row.customers[0]?.name || "Unknown customer";
  return row.customers.name;
}

export default function HandoverPage() {
  const { showToast } = useToast();
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [rows, setRows] = useState<HandoverRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;
    const workspace = await getOrCreateWorkspace(data.session.user.id);
    setWorkspaceId(workspace.id);
    const handovers = await getPendingHandovers(workspace.id);
    setRows(handovers as unknown as HandoverRow[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function takeOver(id: string, name: string) {
    try {
      await resolveHandover(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
      showToast(`You're now handling ${name}'s conversation — open it in Conversations`);
    } catch {
      showToast("Couldn't update — try again");
    }
  }

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-[13px]">Checking for flagged conversations…</div>;
  }

  return (
    <div className="max-w-4xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Human Takeover</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">Conversations that need you.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5 max-w-lg">
          Lewy never handles complaints, payment details, or price negotiation
          on its own — those always come straight to you.
        </p>
      </Reveal>

      {rows.length === 0 ? (
        <Reveal delay={100} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-8 mt-6 text-center">
          <div className="text-3xl mb-2">✅</div>
          <div className="font-medium text-[14px]">Nothing needs you right now.</div>
          <p className="text-white/40 text-[13px] mt-1.5">
            Try the Conversations page and simulate a message about a complaint,
            payment, or price negotiation to see this in action.
          </p>
        </Reveal>
      ) : (
        <div className="space-y-3 mt-6">
          {rows.map((row, i) => (
            <Reveal key={row.id} delay={i * 60} className="rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-500/[0.06] to-transparent p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[11px] font-bold">
                      {customerName(row).slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-[14px]">{customerName(row)}</div>
                      <div className="text-[11px] text-white/40">{row.channel}</div>
                    </div>
                  </div>
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full mt-3 ${reasonStyle(row.escalation_reason)}`}>
                    {reasonLabels[row.escalation_reason]}
                  </span>
                  {row.opportunity_value && (
                    <div className="font-mono text-[13px] text-white/70 mt-2">
                      Opportunity value: KES {row.opportunity_value.toLocaleString()}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => takeOver(row.id, customerName(row))}
                  className="bg-gradient-to-r from-red-500 to-red-700 rounded-xl px-4 py-2.5 text-[13px] font-medium hover:opacity-90 transition shrink-0"
                >
                  Take over
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
