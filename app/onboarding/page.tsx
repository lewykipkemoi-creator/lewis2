"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ChannelIcon } from "@/components/ChannelIcon";
import { getOrCreateWorkspace, saveKnowledgeAnswers } from "@/lib/workspace";

type Answers = {
  businessName: string;
  bizType: string;
  brandVoice: string;
  hasLocation: string;
  locationName: string;
  address: string;
  mapsLink: string;
  description: string;
  greeting: string;
  hours: string;
  serviceAreas: string;
  languages: string;
  faqs: { q: string; a: string }[];
  pricingRules: string;
  refundPolicy: string;
  deliveryRules: string;
  appointmentRules: string;
  escalationContact: string;
  neverInvent: string;
};

const initialAnswers: Answers = {
  businessName: "",
  bizType: "",
  brandVoice: "",
  hasLocation: "",
  locationName: "",
  address: "",
  mapsLink: "",
  description: "",
  greeting: "",
  hours: "",
  serviceAreas: "",
  languages: "",
  faqs: [{ q: "", a: "" }],
  pricingRules: "",
  refundPolicy: "",
  deliveryRules: "",
  appointmentRules: "",
  escalationContact: "",
  neverInvent: "",
};

function buildContext(a: Answers) {
  const faqLines = a.faqs
    .filter((f) => f.q.trim())
    .map((f) => `Q: ${f.q}\nA: ${f.a}`)
    .join("\n");

  return `
Business name: ${a.businessName || "Not provided"}
What they offer: ${a.bizType || "Not specified"}
Brand voice: ${a.brandVoice || "Friendly"}
Location: ${a.hasLocation === "yes" ? `${a.locationName}, ${a.address}` : "No physical location"}
Description: ${a.description || "Not provided"}
Preferred greeting: ${a.greeting || "Hi there!"}
Working hours: ${a.hours || "Not specified"}
Service areas: ${a.serviceAreas || "Not specified"}
Languages: ${a.languages || "English"}
Pricing rules: ${a.pricingRules || "None specified"}
Refund/return policy: ${a.refundPolicy || "None specified"}
Delivery rules: ${a.deliveryRules || "None specified"}
Appointment rules: ${a.appointmentRules || "None specified"}
Never claim or invent: ${a.neverInvent || "Nothing specified — stick to known facts only"}

FAQs:
${faqLines || "None provided yet"}
`.trim();
}

const bizTypeOptions = ["Physical goods", "Services", "Both", "Personal secretary / assistant"];
const voiceOptions = ["Friendly", "Professional", "Funny / Playful", "Formal", "Casual / Sheng"];
const channels = ["WhatsApp", "Instagram", "Facebook Messenger", "Gmail", "Telegram", "Website chat"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [testInput, setTestInput] = useState("");
  const [testMessages, setTestMessages] = useState<{ from: "user" | "lewy"; text: string }[]>([]);
  const [testLoading, setTestLoading] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/login");
    });
  }, [router]);

  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function updateFaq(i: number, field: "q" | "a", value: string) {
    setAnswers((prev) => {
      const faqs = [...prev.faqs];
      faqs[i] = { ...faqs[i], [field]: value };
      return { ...prev, faqs };
    });
  }

  function addFaq() {
    setAnswers((prev) => ({ ...prev, faqs: [...prev.faqs, { q: "", a: "" }] }));
  }

  async function sendTestMessage() {
    const text = testInput.trim();
    if (!text) return;
    setTestInput("");
    setTestMessages((prev) => [...prev, { from: "user", text }]);
    setTestLoading(true);

    try {
      const res = await fetch("/api/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerMessage: text, businessContext: buildContext(answers) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTestMessages((prev) => [...prev, { from: "lewy", text: data.reply }]);
    } catch (err: any) {
      setTestMessages((prev) => [...prev, { from: "lewy", text: "(Couldn't generate a reply just now — try again in a moment.)" }]);
    } finally {
      setTestLoading(false);
    }
  }

  function toggleChannel(c: string) {
    setConnected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  async function finishOnboarding() {
    setSaving(true);
    try {
      await saveKnowledgeAnswers(workspaceId, { ...answers, services: [] }, true);
    } catch (err) {
      console.error("Failed to save onboarding data:", err);
    }
    setSaving(false);
    router.push("/dashboard");
  }

  const questionSteps = [
    {
      title: "What's your business called?",
      body: (
        <input
          autoFocus
          value={answers.businessName}
          onChange={(e) => update("businessName", e.target.value)}
          placeholder="e.g. Amina's Salon"
          className="w-full bg-white/5 rounded-xl px-4 py-3.5 text-[15px] outline-none focus:bg-white/8 placeholder:text-white/25"
        />
      ),
    },
    {
      title: "What do you use me for?",
      body: (
        <div className="grid grid-cols-2 gap-2.5">
          {bizTypeOptions.map((o) => (
            <button
              key={o}
              onClick={() => update("bizType", o)}
              className={`text-left px-4 py-3.5 rounded-xl text-[14px] transition ${
                answers.bizType === o ? "bg-gradient-to-r from-indigo-500 to-cyan-500 font-medium" : "bg-white/5 text-white/70 hover:bg-white/8"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "How should I sound when I talk to your customers?",
      body: (
        <div className="grid grid-cols-2 gap-2.5">
          {voiceOptions.map((o) => (
            <button
              key={o}
              onClick={() => update("brandVoice", o)}
              className={`text-left px-4 py-3.5 rounded-xl text-[14px] transition ${
                answers.brandVoice === o ? "bg-gradient-to-r from-indigo-500 to-cyan-500 font-medium" : "bg-white/5 text-white/70 hover:bg-white/8"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Do you have a physical office, shop, or location?",
      body: (
        <div className="space-y-3">
          <div className="flex gap-2.5">
            {["yes", "no"].map((v) => (
              <button
                key={v}
                onClick={() => update("hasLocation", v)}
                className={`px-5 py-2.5 rounded-full text-[14px] capitalize transition ${
                  answers.hasLocation === v ? "bg-gradient-to-r from-indigo-500 to-cyan-500 font-medium" : "bg-white/5 text-white/70 hover:bg-white/8"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          {answers.hasLocation === "yes" && (
            <div className="space-y-2.5 pt-2">
              <input
                value={answers.locationName}
                onChange={(e) => update("locationName", e.target.value)}
                placeholder="Location name"
                className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <input
                value={answers.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Address"
                className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <input
                value={answers.mapsLink}
                onChange={(e) => update("mapsLink", e.target.value)}
                placeholder="Google Maps link (optional)"
                className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Tell me about your business",
      subtitle: "What you do, your goals, and anything that makes you different.",
      body: (
        <textarea
          rows={4}
          value={answers.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="e.g. We're a family-run salon offering hair, nails and spa treatments in Nairobi..."
          className="w-full bg-white/5 rounded-xl px-4 py-3.5 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25 resize-none"
        />
      ),
    },
    {
      title: "Hours and how you'd like me to greet customers",
      body: (
        <div className="space-y-2.5">
          <input
            value={answers.hours}
            onChange={(e) => update("hours", e.target.value)}
            placeholder="e.g. Mon–Sat, 8am–6pm"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
          <input
            value={answers.greeting}
            onChange={(e) => update("greeting", e.target.value)}
            placeholder="Preferred greeting, e.g. 'Karibu! How can I help today?'"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
        </div>
      ),
    },
    {
      title: "Where do you operate, and in what languages?",
      body: (
        <div className="space-y-2.5">
          <input
            value={answers.serviceAreas}
            onChange={(e) => update("serviceAreas", e.target.value)}
            placeholder="Service areas, e.g. Nairobi and surrounding areas"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
          <input
            value={answers.languages}
            onChange={(e) => update("languages", e.target.value)}
            placeholder="Languages, e.g. English, Swahili, Sheng"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
        </div>
      ),
    },
    {
      title: "What do customers ask you most often?",
      subtitle: "Give me a few common questions and how you'd answer them.",
      body: (
        <div className="space-y-3">
          {answers.faqs.map((f, i) => (
            <div key={i} className="space-y-1.5">
              <input
                value={f.q}
                onChange={(e) => updateFaq(i, "q", e.target.value)}
                placeholder="Question, e.g. Do you deliver?"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <input
                value={f.a}
                onChange={(e) => updateFaq(i, "a", e.target.value)}
                placeholder="Answer"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
            </div>
          ))}
          <button onClick={addFaq} className="text-[13px] text-indigo-300 hover:text-indigo-200">
            + Add another question
          </button>
        </div>
      ),
    },
    {
      title: "Rules I should follow",
      subtitle: "Pricing, refunds, delivery and appointment rules — as much or as little as you'd like.",
      body: (
        <div className="space-y-2.5">
          <input
            value={answers.pricingRules}
            onChange={(e) => update("pricingRules", e.target.value)}
            placeholder="Pricing rules, e.g. no discounts without approval"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
          <input
            value={answers.refundPolicy}
            onChange={(e) => update("refundPolicy", e.target.value)}
            placeholder="Refund / return policy"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
          <input
            value={answers.deliveryRules}
            onChange={(e) => update("deliveryRules", e.target.value)}
            placeholder="Delivery rules"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
          <input
            value={answers.appointmentRules}
            onChange={(e) => update("appointmentRules", e.target.value)}
            placeholder="Appointment rules"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
        </div>
      ),
    },
    {
      title: "Anything I should never say or promise?",
      subtitle: "And who should I contact if something needs a human urgently?",
      body: (
        <div className="space-y-2.5">
          <textarea
            rows={2}
            value={answers.neverInvent}
            onChange={(e) => update("neverInvent", e.target.value)}
            placeholder="e.g. Never promise same-day delivery outside Nairobi"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25 resize-none"
          />
          <input
            value={answers.escalationContact}
            onChange={(e) => update("escalationContact", e.target.value)}
            placeholder="Escalation contact, e.g. owner's phone number"
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-[14px] outline-none focus:bg-white/8 placeholder:text-white/25"
          />
        </div>
      ),
    },
  ];

  const stepLabel = step === 0 ? "Welcome" : step <= questionSteps.length ? `Question ${step} of ${questionSteps.length}` : "";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_80%_100%,rgba(34,211,238,0.12),transparent_45%),#08080d] text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg">
        {step > 0 && step <= questionSteps.length && (
          <div className="mb-6">
            <div className="h-1 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all"
                style={{ width: `${(step / questionSteps.length) * 100}%` }}
              />
            </div>
            <div className="text-[11px] text-white/35 mt-1.5">{stepLabel}</div>
          </div>
        )}

        {step === 0 && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-4xl font-black shadow-lg shadow-indigo-500/30 animate-[float_4s_ease-in-out_infinite]">
              L
            </div>
            <h1 className="text-2xl font-semibold mt-6">Hi, I'm Lewy 👋</h1>
            <p className="text-white/50 text-[14px] mt-3 leading-6 max-w-sm mx-auto">
              I'm your AI business assistant. I can understand text, photos
              and videos from your customers — and I can send back photos,
              videos, PDFs, catalogues, price lists and size charts whenever
              they ask.
            </p>
            <p className="text-white/50 text-[14px] mt-3 leading-6 max-w-sm mx-auto">
              Before we go live, I need to learn a bit about your business.
              It'll only take a few minutes.
            </p>
            <button
              onClick={() => setStep(1)}
              className="mt-8 bg-gradient-to-r from-indigo-500 to-cyan-400 text-black rounded-full px-6 py-3 text-[14px] font-semibold hover:opacity-90 transition"
            >
              Let's get started
            </button>
          </div>
        )}

        {step >= 1 && step <= questionSteps.length && (
          <div className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-6">
            <h2 className="text-xl font-semibold">{questionSteps[step - 1].title}</h2>
            {questionSteps[step - 1].subtitle && (
              <p className="text-white/40 text-[13px] mt-1.5">{questionSteps[step - 1].subtitle}</p>
            )}
            <div className="mt-5">{questionSteps[step - 1].body}</div>

            <div className="flex justify-between mt-7">
              <button
                onClick={() => setStep((s) => s - 1)}
                className="text-[13px] text-white/40 hover:text-white px-4 py-2"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-black rounded-full px-6 py-2.5 text-[14px] font-semibold hover:opacity-90 transition"
              >
                {step === questionSteps.length ? "Continue" : "Next"}
              </button>
            </div>
          </div>
        )}

        {step === questionSteps.length + 1 && (
          <div>
            <h2 className="text-xl font-semibold text-center">Now try talking to me</h2>
            <p className="text-white/45 text-[13px] mt-1.5 text-center max-w-sm mx-auto">
              Pretend you're a customer and see if my answers fit your business.
            </p>

            <div className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 mt-5 flex flex-col h-[380px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {testMessages.length === 0 && (
                  <div className="text-white/30 text-[13px] text-center mt-10">
                    Try asking something like &ldquo;What are your hours?&rdquo;
                  </div>
                )}
                {testMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "user" ? "justify-end" : ""}`}>
                    <div
                      className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-[13px] leading-6 ${
                        m.from === "user" ? "bg-white/8" : "bg-gradient-to-br from-indigo-600/80 to-cyan-600/60"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {testLoading && <div className="text-[12px] text-white/30 italic">Lewy is typing…</div>}
              </div>
              <div className="flex gap-2 p-3">
                <input
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendTestMessage()}
                  placeholder="Type a test message..."
                  className="flex-1 bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
                />
                <button
                  onClick={sendTestMessage}
                  disabled={testLoading}
                  className="bg-white/8 hover:bg-white/15 disabled:opacity-50 rounded-lg px-4 py-2.5 text-[13px] font-medium transition"
                >
                  Send
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep((s) => s - 1)} className="text-[13px] text-white/40 hover:text-white px-4 py-2">
                ← Back
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-black rounded-full px-6 py-2.5 text-[14px] font-semibold hover:opacity-90 transition"
              >
                This works for me →
              </button>
            </div>
          </div>
        )}

        {step === questionSteps.length + 2 && (
          <div>
            <h2 className="text-xl font-semibold text-center">Connect your channels</h2>
            <p className="text-white/45 text-[13px] mt-1.5 text-center max-w-sm mx-auto">
              Choose where customers message you. You can add more later.
            </p>
            <div className="grid grid-cols-2 gap-2.5 mt-5">
              {channels.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleChannel(c)}
                  className={`flex items-center gap-3 rounded-xl p-3.5 transition ${
                    connected.includes(c) ? "bg-indigo-500/15 ring-1 ring-indigo-400/40" : "bg-[#15151f] hover:bg-white/[0.06]"
                  }`}
                >
                  <ChannelIcon name={c} />
                  <span className="text-[13px] font-medium">{c}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-7">
              <button onClick={() => setStep((s) => s - 1)} className="text-[13px] text-white/40 hover:text-white px-4 py-2">
                ← Back
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-black rounded-full px-6 py-2.5 text-[14px] font-semibold hover:opacity-90 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === questionSteps.length + 3 && (
          <div className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-6">
            <h2 className="text-xl font-semibold">Before Lewy goes live</h2>
            <div className="text-white/50 text-[13px] leading-6 mt-4 space-y-2.5 max-h-48 overflow-y-auto pr-1">
              <p>Lewy will respond to customers automatically using the information you've provided. You're responsible for keeping that information accurate.</p>
              <p>Certain sensitive topics — complaints, payment details, and price negotiation — are always escalated to a human rather than handled by Lewy.</p>
              <p>You can pause Lewy at any time from your dashboard, and review everything it says in the AI Activity Log.</p>
            </div>
            <label className="flex items-center gap-2.5 mt-5 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 accent-indigo-500"
              />
              <span className="text-[13px] text-white/70">I understand and accept these terms</span>
            </label>
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep((s) => s - 1)} className="text-[13px] text-white/40 hover:text-white px-4 py-2">
                ← Back
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!termsAccepted}
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-black rounded-full px-6 py-2.5 text-[14px] font-semibold hover:opacity-90 transition disabled:opacity-40"
              >
                Activate Lewy
              </button>
            </div>
          </div>
        )}

        {step === questionSteps.length + 4 && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 flex items-center justify-center text-4xl">🎉</div>
            <h1 className="text-2xl font-semibold mt-6">Lewy is live!</h1>
            <p className="text-white/50 text-[14px] mt-3 leading-6 max-w-sm mx-auto">
              I'm now handling customer conversations for {answers.businessName || "your business"}.
              Remember, I can send photos, videos and files whenever a customer asks.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <button
                onClick={finishOnboarding}
                disabled={saving}
                className="border border-white/15 rounded-full px-6 py-2.5 text-[14px] font-medium hover:bg-white/5 transition disabled:opacity-50"
              >
                Skip for now
              </button>
              <button
                onClick={finishOnboarding}
                disabled={saving}
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-black rounded-full px-6 py-2.5 text-[14px] font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {saving ? "Setting up…" : "Go to Media →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
