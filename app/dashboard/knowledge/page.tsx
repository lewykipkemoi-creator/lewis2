"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";
import { supabase } from "@/lib/supabaseClient";
import {
  getOrCreateWorkspace,
  saveKnowledgeAnswers,
  getProducts,
  addProduct,
  emptyKnowledge,
  type KnowledgeAnswers,
  type Product,
} from "@/lib/workspace";

type BizType = "products" | "services" | "both";

const bizTypeMap: Record<BizType, string> = {
  products: "Physical goods",
  services: "Services",
  both: "Both",
};

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

const productGrads = ["from-indigo-500/40 to-cyan-500/20", "from-cyan-500/30 to-indigo-600/20", "from-indigo-400/30 to-cyan-400/20"];
const productEmojis = ["◈", "◇", "✦", "◆"];

export default function KnowledgePage() {
  const { showToast } = useToast();
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<KnowledgeAnswers>(emptyKnowledge);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [industry, setIndustry] = useState(industries[0]);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newService, setNewService] = useState({ name: "", detail: "", price: "" });
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "" });

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

  function update<K extends keyof KnowledgeAnswers>(key: K, value: KnowledgeAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  const bizType: BizType =
    answers.bizType === "Physical goods" ? "products" : answers.bizType === "Services" ? "services" : "both";

  function setBizType(t: BizType) {
    update("bizType", bizTypeMap[t]);
  }

  async function saveProfile() {
    if (!workspaceId) return;
    setSaving(true);
    try {
      await saveKnowledgeAnswers(workspaceId, answers);
      showToast("Business profile saved — Lewy will use this immediately");
    } catch (err) {
      showToast("Couldn't save right now — try again");
    }
    setSaving(false);
  }

  async function saveService() {
    if (!newService.name.trim() || !workspaceId) return;
    const updated = { ...answers, services: [...answers.services, newService] };
    setAnswers(updated);
    setNewService({ name: "", detail: "", price: "" });
    setShowAddService(false);
    try {
      await saveKnowledgeAnswers(workspaceId, updated);
      showToast("Service added");
    } catch {
      showToast("Couldn't save — try again");
    }
  }

  async function saveProduct() {
    if (!newProduct.name.trim() || !workspaceId) return;
    const product: Product = {
      name: newProduct.name,
      description: newProduct.description,
      price: Number(newProduct.price) || 0,
    };
    try {
      await addProduct(workspaceId, product);
      setProducts((prev) => [...prev, product]);
      setNewProduct({ name: "", description: "", price: "" });
      setShowAddProduct(false);
      showToast("Product added");
    } catch {
      showToast("Couldn't save — try again");
    }
  }

  async function saveFaq() {
    if (!workspaceId) return;
    const updated = { ...answers, faqs: [...answers.faqs, { q: "", a: "" }] };
    setAnswers(updated);
  }

  function updateFaq(i: number, field: "q" | "a", value: string) {
    setAnswers((prev) => {
      const faqs = [...prev.faqs];
      faqs[i] = { ...faqs[i], [field]: value };
      return { ...prev, faqs };
    });
  }

  async function saveFaqsToDb() {
    if (!workspaceId) return;
    try {
      await saveKnowledgeAnswers(workspaceId, answers);
      showToast("FAQs saved");
    } catch {
      showToast("Couldn't save — try again");
    }
  }

  if (loading) {
    return <div className="px-6 py-10 text-white/40 text-[13px]">Loading your business knowledge…</div>;
  }

  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Business Knowledge</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">What Lewy needs to know to answer for you.</h1>
        <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5 max-w-lg">
          This works for any business — a hospital, a car dealership, a salon,
          a shop, or even one person using Lewy as a personal assistant.
        </p>
      </Reveal>

      {(answers.businessName || answers.description || products.length > 0 || answers.faqs.length > 0) && (
        <Reveal delay={40} className="rounded-2xl bg-gradient-to-br from-indigo-500/[0.08] to-transparent p-5 mt-6">
          <div className="text-[13px] font-semibold text-indigo-300">What Lewy currently knows</div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-3 text-[13px] text-white/70">
            {answers.businessName && (
              <div><span className="text-white/40">Business:</span> {answers.businessName}</div>
            )}
            {answers.bizType && (
              <div><span className="text-white/40">Offers:</span> {answers.bizType}</div>
            )}
            {answers.hours && (
              <div><span className="text-white/40">Hours:</span> {answers.hours}</div>
            )}
            {answers.serviceAreas && (
              <div><span className="text-white/40">Area:</span> {answers.serviceAreas}</div>
            )}
            <div><span className="text-white/40">Services listed:</span> {answers.services.length}</div>
            <div><span className="text-white/40">Products listed:</span> {products.length}</div>
            <div><span className="text-white/40">FAQs taught:</span> {answers.faqs.length}</div>
          </div>
          {answers.description && (
            <p className="text-[13px] text-white/50 leading-6 mt-3 border-t border-white/8 pt-3">
              {answers.description}
            </p>
          )}
          <a href="/dashboard/train" className="inline-flex text-[12px] text-indigo-300 hover:text-indigo-200 mt-3">
            Try Lewy with this knowledge →
          </a>
        </Reveal>
      )}

      <Reveal delay={80} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-5 mt-6">
        <div className="text-[13px] font-medium">What does your business offer?</div>
        <div className="flex flex-wrap gap-2 mt-3">
          {(["products", "services", "both"] as BizType[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setBizType(opt)}
              className={`text-[13px] px-4 py-2 rounded-full transition ${
                bizType === opt ? "bg-gradient-to-r from-indigo-500 to-cyan-500 font-medium" : "bg-white/8 text-white/60 hover:bg-white/15"
              }`}
            >
              {opt === "products" ? "Physical goods" : opt === "services" ? "Services / appointments" : "Both"}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3.5 mt-5">
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Business name</label>
            <input
              value={answers.businessName}
              onChange={(e) => update("businessName", e.target.value)}
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
              value={answers.hours}
              onChange={(e) => update("hours", e.target.value)}
              placeholder="e.g. Mon–Sat, 8am–6pm"
              className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
            />
          </div>
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Location / delivery area</label>
            <input
              value={answers.serviceAreas}
              onChange={(e) => update("serviceAreas", e.target.value)}
              placeholder="e.g. Nairobi and surrounding areas"
              className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[11px] text-white/40 uppercase tracking-wide">Describe your business</label>
            <textarea
              rows={3}
              value={answers.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="e.g. We're a family clinic offering general consultations, lab tests and home visits..."
              className="w-full mt-1.5 bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25 resize-none"
            />
          </div>
        </div>
        <button
          onClick={saveProfile}
          disabled={saving}
          className="mt-4 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl px-4 py-2.5 text-[13px] font-medium shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 transition disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save profile"}
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
              onClick={() => setShowAddService(!showAddService)}
              className="text-[12px] bg-white/8 hover:bg-white/15 rounded-lg px-3 py-1.5 transition"
            >
              + Add service
            </button>
          </div>

          {showAddService && (
            <div className="px-5 pb-4 space-y-2">
              <input
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                placeholder="Service name"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <input
                value={newService.detail}
                onChange={(e) => setNewService({ ...newService, detail: e.target.value })}
                placeholder="Detail, e.g. 30 min · booked only"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <input
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                placeholder="Price, e.g. KES 1,500"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <button onClick={saveService} className="text-[12px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-lg px-3 py-1.5">
                Save service
              </button>
            </div>
          )}

          <div className="divide-y divide-transparent">
            {answers.services.length === 0 && (
              <div className="px-5 py-4 text-[12px] text-white/35">No services added yet.</div>
            )}
            {answers.services.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5">
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
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="text-[12px] bg-white/8 hover:bg-white/15 rounded-lg px-3 py-1.5 transition"
            >
              + Add product
            </button>
          </div>

          {showAddProduct && (
            <div className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-4 mb-4 space-y-2">
              <input
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                placeholder="Product name"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <input
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Short description"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <input
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="Price (numbers only), e.g. 24000"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <button onClick={saveProduct} className="text-[12px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-lg px-3 py-1.5">
                Save product
              </button>
            </div>
          )}

          {products.length === 0 ? (
            <div className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 p-5 text-[12px] text-white/35">
              No products added yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {products.map((p, i) => (
                <div key={p.id || i} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 overflow-hidden">
                  <div className={`h-24 bg-gradient-to-br ${productGrads[i % productGrads.length]} flex items-center justify-center text-3xl`}>
                    {productEmojis[i % productEmojis.length]}
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-[14px]">{p.name}</div>
                    <p className="text-white/40 text-[12px] mt-1.5 leading-5">{p.description}</p>
                    <div className="font-bold text-[15px] mt-3.5">KES {p.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      )}

      <Reveal delay={210} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 mt-5">
        <div className="flex items-center justify-between px-5 py-3.5">
          <div>
            <div className="text-[14px] font-semibold">Frequently asked questions</div>
            <div className="text-[11px] text-white/40 mt-0.5">Lewy answers these instantly, word for word if needed.</div>
          </div>
          <button
            onClick={saveFaq}
            className="text-[12px] bg-white/8 hover:bg-white/15 rounded-lg px-3 py-1.5 transition"
          >
            + Add FAQ
          </button>
        </div>
        <div className="divide-y divide-transparent px-5 pb-4">
          {answers.faqs.length === 0 && <div className="py-3 text-[12px] text-white/35">No FAQs added yet.</div>}
          {answers.faqs.map((f, i) => (
            <div key={i} className="py-2.5 space-y-1.5">
              <input
                value={f.q}
                onChange={(e) => updateFaq(i, "q", e.target.value)}
                placeholder="Question"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
              <input
                value={f.a}
                onChange={(e) => updateFaq(i, "a", e.target.value)}
                placeholder="Answer"
                className="w-full bg-white/5 rounded-lg px-3.5 py-2 text-[13px] outline-none focus:bg-white/8 placeholder:text-white/25"
              />
            </div>
          ))}
          {answers.faqs.length > 0 && (
            <button
              onClick={saveFaqsToDb}
              className="mt-2 text-[12px] bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-lg px-3 py-1.5"
            >
              Save FAQs
            </button>
          )}
        </div>
      </Reveal>
    </div>
  );
}
