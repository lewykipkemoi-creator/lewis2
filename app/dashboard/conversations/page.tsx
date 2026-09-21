"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";
import { supabase } from "@/lib/supabaseClient";
import { getOrCreateWorkspace, getProducts, buildKnowledgeContext, emptyKnowledge, type KnowledgeAnswers, type Product } from "@/lib/workspace";
import { detectEscalation, escalateConversation, reasonLabels } from "@/lib/handover";

type Sender = "customer" | "ai" | "human";
type Message = { from: Sender; text: string };

const initialConversations = [
  {
    initials: "BM",
    name: "Brian Mwangi",
    channel: "WhatsApp",
    preview: "How much is the premium package?",
    time: "2m",
    messages: [
      { from: "customer", text: "Hi, how much is the premium package?" },
      { from: "ai", text: "Hi Brian 👋 Our Premium package is KES 24,000. It includes priority support and all automation features. Would you like me to help you get started?" },
      { from: "customer", text: "Yes. Can I pay today?" },
      { from: "ai", text: "Absolutely. I can send you the payment link now." },
    ] as Message[],
  },
  {
    initials: "SW",
    name: "Sarah Wanjiku",
    channel: "Instagram",
    preview: "Can I book for tomorrow?",
    time: "8m",
    messages: [{ from: "customer", text: "Can I book for tomorrow?" }] as Message[],
  },
  {
    initials: "DK",
    name: "David Kimani",
    channel: "Email",
    preview: "Do you deliver to Nakuru?",
    time: "21m",
    messages: [{ from: "customer", text: "Do you deliver to Nakuru?" }] as Message[],
  },
];

function bubbleStyle(from: Sender) {
  if (from === "ai") return "ml-auto bg-gradient-to-br from-indigo-600/80 to-cyan-600/60 rounded-br-md";
  if (from === "human") return "ml-auto bg-emerald-600/70 rounded-br-md";
  return "bg-white/8 rounded-bl-md";
}

export default function ConversationsPage() {
  const { showToast } = useToast();
  const [selected, setSelected] = useState(0);
  const [threads, setThreads] = useState(initialConversations);
  const [simInput, setSimInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");
  const [lewyTyping, setLewyTyping] = useState(false);
  const [businessContext, setBusinessContext] = useState<string | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const workspace = await getOrCreateWorkspace(data.session.user.id);
      setWorkspaceId(workspace.id);
      const answers: KnowledgeAnswers = { ...emptyKnowledge, ...(workspace.knowledge_answers || {}) };
      const products: Product[] = await getProducts(workspace.id);
      setBusinessContext(buildKnowledgeContext(answers, products));
    });
  }, []);

  const active = threads[selected];

  function appendMessage(from: Sender, text: string) {
    setThreads((prev) => {
      const next = [...prev];
      next[selected] = { ...next[selected], messages: [...next[selected].messages, { from, text }] };
      return next;
    });
  }

  async function simulateIncomingMessage() {
    const text = simInput.trim();
    if (!text) return;
    setSimInput("");
    appendMessage("customer", text);
    setLewyTyping(true);

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerMessage: text, businessContext }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      appendMessage("ai", data.reply);
    } catch (err: any) {
      showToast(err.message || "Lewy couldn't reply — flagging for a human");
    } finally {
      setLewyTyping(false);
    }
  }

  function sendOwnerMessage() {
    const text = ownerInput.trim();
    if (!text) return;
    appendMessage("human", text);
    setOwnerInput("");
    showToast("Sent as you — Lewy will hand future replies back to you in this thread");
  }

  return (
    <div className="max-w-6xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <h1 className="text-xl sm:text-2xl font-semibold">Unified Inbox</h1>
        <p className="text-white/45 text-[13px] mt-1">
          Lewy replies automatically using your business info. You only need to step in when it matters.
        </p>
      </Reveal>

      <Reveal delay={100} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 mt-6 overflow-hidden grid md:grid-cols-[280px_1fr] h-[600px]">
        <div className="overflow-y-auto">
          {threads.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelected(i)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3.5 transition ${
                selected === i ? "bg-indigo-500/10" : "hover:bg-white/[0.04]"
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[11px] font-bold shrink-0">
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium truncate">{c.name}</div>
                <div className="text-[11px] text-white/40 truncate">
                  {c.messages[c.messages.length - 1]?.text ?? c.preview}
                </div>
              </div>
              <div className="text-[10px] text-white/30 shrink-0">{c.time}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-col min-h-0">
          <div className="flex items-center gap-3 px-5 py-3.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[11px] font-bold">
              {active.initials}
            </div>
            <div>
              <div className="text-[13px] font-semibold">{active.name}</div>
              <div className="text-[10px] text-emerald-300">● {active.channel} · Lewy auto-replying</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {active.messages.map((m, i) => (
              <div key={i} className="flex flex-col">
                {m.from !== "customer" && (
                  <div className={`text-[10px] mb-1 ${m.from === "ai" ? "text-indigo-300 ml-auto" : "text-emerald-300 ml-auto"}`}>
                    {m.from === "ai" ? "Lewy" : "You"}
                  </div>
                )}
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] leading-6 ${bubbleStyle(m.from)}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {lewyTyping && (
              <div className="ml-auto text-[11px] text-white/35 italic">Lewy is typing…</div>
            )}
          </div>

          <div className="px-4 py-3">
            <div className="text-[10px] text-white/35 uppercase tracking-wide mb-1.5">Simulate an incoming customer message</div>
            <div className="flex gap-2">
              <input
                value={simInput}
                onChange={(e) => setSimInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && simulateIncomingMessage()}
                placeholder="Type what a customer would say..."
                className="flex-1 bg-white/5 rounded-xl px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <button
                onClick={simulateIncomingMessage}
                disabled={lewyTyping}
                className="bg-white/8 hover:bg-white/15 disabled:opacity-50 rounded-xl px-4 py-2.5 text-[13px] font-medium transition"
              >
                Send
              </button>
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="text-[10px] text-white/35 uppercase tracking-wide mb-1.5">Step in yourself</div>
            <div className="flex gap-2">
              <input
                value={ownerInput}
                onChange={(e) => setOwnerInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendOwnerMessage()}
                placeholder="Take over this conversation..."
                className="flex-1 bg-white/5 rounded-xl px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <button
                onClick={sendOwnerMessage}
                className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-xl px-4 py-2.5 text-[13px] font-medium hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
