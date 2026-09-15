"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";

const tabs = ["AI behavior", "Notifications", "Team", "Security", "Billing"];

const initialToggles = [
  { key: "replies", title: "Automatic replies", detail: "Allow Lewy to answer incoming messages.", on: true },
  { key: "qualify", title: "Lead qualification", detail: "Automatically score customer intent.", on: true },
  { key: "followups", title: "Automatic follow-ups", detail: "Recover leads that stop responding.", on: true },
  { key: "approval", title: "Human approval for sensitive actions", detail: "Require approval before certain AI actions.", on: false },
];

export default function SettingsPage() {
  const { showToast } = useToast();
  const [tab, setTab] = useState("AI behavior");
  const [toggles, setToggles] = useState(initialToggles);

  function toggle(key: string) {
    setToggles((prev) =>
      prev.map((t) => {
        if (t.key !== key) return t;
        const next = !t.on;
        showToast(next ? "Setting enabled" : "Setting disabled");
        return { ...t, on: next };
      })
    );
  }

  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <h1 className="text-xl sm:text-2xl font-semibold">Settings</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">Control how Lewy behaves inside your business.</p>
      </Reveal>

      <Reveal delay={100} className="grid md:grid-cols-[210px_1fr] gap-5 mt-8">
        <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-left px-3.5 py-2.5 rounded-xl text-[13px] whitespace-nowrap transition ${
                tab === t ? "bg-white/8 text-white" : "text-white/45 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          {tab === "AI behavior" ? (
            <>
              <div className="text-[14px] font-semibold">AI behavior</div>
              <div className="text-[11px] text-white/35 mt-1">Configure how Lewy communicates with customers.</div>
              <div className="divide-y divide-white/6 mt-4">
                {toggles.map((t) => (
                  <div key={t.key} className="flex items-center justify-between py-3.5">
                    <div>
                      <div className="text-[13px] font-medium">{t.title}</div>
                      <div className="text-[11px] text-white/40 mt-0.5">{t.detail}</div>
                    </div>
                    <button
                      onClick={() => toggle(t.key)}
                      className={`w-11 h-6 rounded-full p-0.5 transition shrink-0 ${t.on ? "bg-violet-600" : "bg-white/15"}`}
                    >
                      <span
                        className={`block w-5 h-5 rounded-full bg-white transition-transform ${t.on ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-[13px] text-white/40 py-8 text-center">
              {tab} settings coming soon.
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
