"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";
import { supabase } from "@/lib/supabaseClient";
import {
  getOrCreateWorkspace,
  getProducts,
  saveKnowledgeAnswers,
  buildKnowledgeContext,
  emptyKnowledge,
  type KnowledgeAnswers,
  type Product,
} from "@/lib/workspace";

type Message = { from: "user" | "lewy"; text: string; correcting?: boolean };

const suggestedPrompts = [
  "What are your hours?",
  "How much does it cost?",
  "Do you deliver?",
  "Can I book an appointment?",
];

export default function TrainLewyPage() {
  const { showToast } = useToast();
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<KnowledgeAnswers>(emptyKnowledge);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [correctionText, setCorrectionText] = useState("");
  const [correctingIndex, setCorrectingIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      const workspace = await getOrCreateWorkspace(data.session.user.id);
      setWorkspaceId(workspace.id);
      setAnswers({ ...emptyKnowledge, ...(workspace.knowledge_answers || {}) });
      const prods = await getProducts(workspace.id);
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setTyping(true);

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerMessage: trimmed,
          businessContext: buildKnowledgeContext(answers, products),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages((prev) => [...prev, { from: "lewy", text: data.reply }]);
    } catch (err: any) {
      setMessages((prev) => [...prev, { from: "lewy", text: "(Couldn't generate a reply just now.)" }]);
    } finally {
      setTyping(false);
    }
  }

  function startCorrection(i: number) {
    setCorrectingIndex(i);
    setCorrectionText("");
  }

  async function saveCorrection(i: number) {
    if (!correctionText.trim() || !workspaceId) return;
    const customerQuestion = messages[i - 1]?.text || "";

    const updated = {
      ...answers,
      faqs: [...answers.faqs, { q: customerQuestion, a: correctionText.trim() }],
    };
    setAnswers(updated);

    try {
      await saveKnowledgeAnswers(workspaceId, updated);
      showToast("Thanks — Lewy will answer this correctly from now on");
    } catch {
      showToast("Couldn't save the correction — try again");
    }

    setCorrectingIndex(null);
    setCorrectionText("");
  }

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-[13px]">Loading Lewy's current knowledge…</div>;
  }

  return (
    <div className="max-w-3xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Train & Test Lewy</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">Talk to Lewy like a customer would.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">
          This uses your real saved business knowledge. If an answer isn't
          right, correct it on the spot — Lewy remembers for next time.
        </p>
      </Reveal>

      {messages.length === 0 && (
        <Reveal delay={80} className="flex flex-wrap gap-2 mt-5">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="text-[12px] bg-white/8 hover:bg-white/15 rounded-full px-3.5 py-1.5 transition"
            >
              {p}
            </button>
          ))}
        </Reveal>
      )}

      <Reveal delay={120} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 mt-5 flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-white/30 text-[13px] text-center mt-16">
              Ask something a real customer might ask.
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i}>
              <div className={`flex ${m.from === "lewy" ? "justify-end" : ""}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-6 ${
                    m.from === "lewy"
                      ? "bg-gradient-to-br from-indigo-600/80 to-cyan-600/60 rounded-br-md"
                      : "bg-white/8 rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              </div>
              {m.from === "lewy" && (
                <div className="flex justify-end mt-1">
                  {correctingIndex === i ? (
                    <div className="w-full max-w-[80%] space-y-1.5">
                      <input
                        autoFocus
                        value={correctionText}
                        onChange={(e) => setCorrectionText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveCorrection(i)}
                        placeholder="What should Lewy have said?"
                        className="w-full bg-white/5 rounded-lg px-3 py-2 text-[12px] outline-none focus:bg-white/8 placeholder:text-white/25"
                      />
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setCorrectingIndex(null)} className="text-[11px] text-white/40 hover:text-white">
                          Cancel
                        </button>
                        <button onClick={() => saveCorrection(i)} className="text-[11px] bg-emerald-600 hover:bg-emerald-500 rounded px-2.5 py-1 transition">
                          Save correction
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => startCorrection(i)}
                      className="text-[11px] text-white/35 hover:text-white/70"
                    >
                      Not quite right? Teach Lewy →
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          {typing && <div className="text-[12px] text-white/30 italic text-right">Lewy is typing…</div>}
        </div>

        <div className="flex gap-2 p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask Lewy something..."
            className="flex-1 bg-white/5 rounded-xl px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
          <button
            onClick={() => send(input)}
            disabled={typing}
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl px-4 py-2.5 text-[13px] font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </Reveal>
    </div>
  );
}
