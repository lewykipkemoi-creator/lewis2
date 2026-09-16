"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";

type BizType = "products" | "services" | "both";

const industries = [
  "Retail & E-commerce",
  "Healthcare / Hospital / Clinic",
  "Automotive / Car dealership",
  "Salon, Spa & Beauty",
  "Restaurant & Food",
  "Professional services (legal, consulting, accounting)",
  "Real estate",
  "Education & Training",
  "Personal assistant / Individual",
  "Other",
];

const services = [
  { name: "General Consultation", detail: "30 min · Walk-in or booked", price: "KES 1,500" },
  { name: "Follow-up Visit", detail: "15 min · Booked only", price: "KES 800" },
  { name: "Home Service Call-out", detail: "Within Nairobi, same day", price: "KES 3,000" },
];

const products = [
  { name: "Premium Package", desc: "Complete business automation package.", price: "KES 24,000", grad: "from-indigo-500/40 to-cyan-500/20", emoji: "◈" },
  { name: "Growth Package", desc: "Automated customer response and lead capture.", price: "KES 7,500", grad: "from-cyan-500/30 to-indigo-600/20", emoji: "◇" },
];

const faqs = [
  { q: "What are your working hours?", a: "We're open Monday to Saturday, 8:00 AM to 6:00 PM. Closed on Sundays and public holidays." },
  { q: "Do you deliver / offer home visits?", a: "Yes, we cover Nairobi and surrounding areas. Delivery/visit fees depend on location." },
  { q: "What payment methods do you accept?", a: "M-Pesa, bank transfer, and cash on delivery for orders under KES 20,000." },
];

const files = [
  { name: "Price list — 2026.pdf", type: "PDF", used: "Used in 89 conversations" },
  { name: "Service menu.pdf", type: "PDF", used: "Used in 34 conversations" },
  { name: "Policies & terms.pdf", type: "PDF", used: "Used in 22 conversations" },
];

export default function KnowledgePage() {
  const { showToast } = useToast();
  const [bizType, setBizType] = useState<BizType>("both");
  const [industry, setIndustry] = useState(industries[0]);

  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Business Knowledge</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">What Lewy needs to know to answer for you.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5 max-w-lg">
          This works for any business — a hospital, a car dealership, a salon,
          a shop, or even one person using Lewy as a personal assistant.
          Fill in what applies to you.
        </p>
      </Reveal>

      <Reveal delay={80} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-5 mt-6">
        <div className="text-[13px] font-medium">What does your business offer?</div>
        <div className="flex flex-wrap gap-2 mt-3">
          {([
            { key: "products", label: "Physical goods" },
            { key: "services", label: "Services / appointments" },
            { key: "both", label: "Both" },
          ] as { key: BizType; label: string }[]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setBizType(opt.key)}
              className={`text-[13px] px-4 py-2 rounded-full transition ${
                bizType === opt.key
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 font-medium"
                  : "bg-white/8 text-white/60 hover:bg-white/15"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3.5 mt-5">
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Business name</label>
            <input
              placeholder="Your business"
              className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
            />
          </div>
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8"
            >
              {industries.map((i) => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Working hours</label>
            <input
              placeholder="e.g. Mon–Sat, 8am–6pm"
              className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
            />
          </div>
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Location / delivery area</label>
            <input
              placeholder="e.g. Nairobi and surrounding areas"
              className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Describe your business in a few sentences</label>
            <textarea
              rows={3}
              placeholder="e.g. We're a family clinic offering general consultations, lab tests and home visits across Nairobi..."
              className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25 resize-none"
            />
          </div>
        </div>
        <button
          onClick={() => showToast("Business profile saved — Lewy will use this immediately")}
          className="mt-4 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl px-4 py-2.5 text-[13px] font-medium shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 transition"
        >
          Save profile
        </button>
      </Reveal>

      {(bizType === "services" || bizType === "both") && (
        <Reveal delay={130} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 mt-5">
          <div className="flex items-center justify-between px-5 py-3.5">
            <div>
              <div className="text-[14px] font-semibold">Services & appointments</div>
              <div className="text-[11px] text-white/40 mt-0.5">What Lewy can book or quote directly.</div>
            </div>
            <button
              onClick={() => showToast("Add service form opened")}
              className="text-[12px] bg-white/8 hover:bg-white/15 rounded-lg px-3 py-1.5 transition"
            >
              + Add service
            </button>
          </div>
          <div className="divide-y divide-transparent">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <div className="font-medium text-[13px]">{s.name}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">{s.detail}</div>
                </div>
                <div className="font-mono text-[13px] text-white/70">{s.price}</div>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {(bizType === "products" || bizType === "both") && (
        <Reveal delay={170} className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[14px] font-semibold">Products for sale</div>
            <button
              onClick={() => showToast("Product editor opened")}
              className="text-[12px] bg-white/8 hover:bg-white/15 rounded-lg px-3 py-1.5 transition"
            >
              + Add product
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.name} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 overflow-hidden hover:-translate-y-1 transition">
                <div className={`h-24 bg-gradient-to-br ${p.grad} flex items-center justify-center text-3xl`}>{p.emoji}</div>
                <div className="p-4">
                  <div className="font-semibold text-[14px]">{p.name}</div>
                  <p className="text-white/40 text-[12px] mt-1.5 leading-5">{p.desc}</p>
                  <div className="flex items-center justify-between mt-3.5">
                    <span className="font-bold text-[15px]">{p.price}</span>
                    <button
                      onClick={() => showToast(`Editing ${p.name}`)}
                      className="text-[11px] bg-white/8 hover:bg-white/15 rounded-lg px-3 py-1.5 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal delay={210} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 mt-5">
        <div className="flex items-center justify-between px-5 py-3.5">
          <div>
            <div className="text-[14px] font-semibold">Frequently asked questions</div>
            <div className="text-[11px] text-white/40 mt-0.5">Lewy answers these instantly, word for word if needed.</div>
          </div>
          <button
            onClick={() => showToast("Add FAQ form opened")}
            className="text-[12px] bg-white/8 hover:bg-white/15 rounded-lg px-3 py-1.5 transition"
          >
            + Add FAQ
          </button>
        </div>
        <div className="divide-y divide-transparent">
          {faqs.map((f) => (
            <div key={f.q} className="px-5 py-3.5">
              <div className="font-medium text-[13px]">{f.q}</div>
              <div className="text-[12px] text-white/45 mt-1 leading-5">{f.a}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={250} className="mt-8">
        <div className="text-[14px] font-semibold mb-3">Supporting documents</div>
        <div className="border-2 border-dashed border-white/12 rounded-2xl p-8 text-center hover:border-white/20 transition">
          <div className="font-medium text-[14px]">Drop files here, or browse</div>
          <div className="text-[12px] text-white/35 mt-1.5">
            Price lists, service menus, policies, size charts, catalogues — PDF, images or video, up to 25MB each
          </div>
        </div>
        <div className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 mt-4 divide-y divide-transparent">
          {files.map((f) => (
            <div key={f.name} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <div className="font-medium text-[13px]">{f.name}</div>
                <div className="text-[12px] text-white/40 mt-0.5">{f.used}</div>
              </div>
              <span className="text-[10px] font-bold bg-white/8 px-2.5 py-1 rounded-full text-white/50">
                {f.type.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
