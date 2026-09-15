"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

type Message = { from: "customer" | "ai"; text: string };

const conversations = [
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
    messages: [
      { from: "customer", text: "Can I book for tomorrow?" },
      { from: "ai", text: "Yes! I have an opening at 2:30 PM tomorrow — shall I reserve it for you?" },
    ] as Message[],
  },
  {
    initials: "DK",
    name: "David Kimani",
    channel: "Email",
    preview: "Send me the catalogue please.",
    time: "21m",
    messages: [
      { from: "customer", text: "Send me the catalogue please." },
      { from: "ai", text: "Sure thing — attaching our latest catalogue now." },
    ] as Message[],
  },
  {
    initials: "JM",
    name: "James Mutua",
    channel: "Website",
    preview: "Do you deliver to Nakuru?",
    time: "1h",
    messages: [
      { from: "customer", text: "Do you deliver to Nakuru?" },
      { from: "ai", text: "Yes, we deliver to Nakuru within 2-3 business days." },
    ] as Message[],
  },
];

export default function ConversationsPage() {
  const [selected, setSelected] = useState(0);
  const [threads, setThreads] = useState(conversations);
  const [input, setInput] = useState("");

  const active = threads[selected];

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    setThreads((prev) => {
      const next = [...prev];
      next[selected] = { ...next[selected], messages: [...next[selected].messages, { from: "ai", text }] };
      return next;
    });
    setInput("");

    setTimeout(() => {
      setThreads((prev) => {
        const next = [...prev];
        next[selected] = {
          ...next[selected],
          messages: [...next[selected].messages, { from: "customer", text: "Got it, thank you!" }],
        };
        return next;
      });
    }, 900);
  }

  return (
    <div className="max-w-6xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Unified Inbox</h1>
            <p className="text-white/45 text-[13px] mt-1">Every customer conversation in one place.</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100} className="rounded-2xl border border-white/8 bg-white/[0.02] mt-6 overflow-hidden grid md:grid-cols-[280px_1fr] h-[560px]">
        <div className="border-b md:border-b-0 md:border-r border-white/8 overflow-y-auto">
          {threads.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelected(i)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3.5 border-b border-white/6 transition ${
                selected === i ? "bg-indigo-500/10" : "hover:bg-white/[0.03]"
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[11px] font-bold shrink-0">
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium truncate">{c.name}</div>
                <div className="text-[11px] text-white/40 truncate">{c.preview}</div>
              </div>
              <div className="text-[10px] text-white/30 shrink-0">{c.time}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-col min-h-0">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/8">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-[11px] font-bold">
              {active.initials}
            </div>
            <div>
              <div className="text-[13px] font-semibold">{active.name}</div>
              <div className="text-[10px] text-emerald-300">● {active.channel} · AI assisted</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {active.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "ai" ? "justify-end" : ""}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] leading-6 ${
                    m.from === "ai"
                      ? "bg-gradient-to-br from-indigo-600/80 to-cyan-600/60 rounded-br-md"
                      : "bg-white/[0.06] border border-white/8 rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 px-4 py-3 border-t border-white/8">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Write a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-[13px] outline-none focus:border-indigo-400/50 placeholder:text-white/25"
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl px-4 py-2.5 text-[13px] font-medium hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
