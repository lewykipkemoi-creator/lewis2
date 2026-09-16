"use client";

import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";

const products = [
  { name: "Premium Package", desc: "Complete business automation package.", price: "KES 24,000", grad: "from-indigo-500/40 to-cyan-500/20", emoji: "◈" },
  { name: "Growth Package", desc: "Automated customer response and lead capture.", price: "KES 7,500", grad: "from-cyan-500/30 to-indigo-600/20", emoji: "◇" },
  { name: "Starter Package", desc: "Essential AI customer response tools.", price: "KES 2,500", grad: "from-indigo-400/30 to-cyan-400/20", emoji: "✦" },
];

const files = [
  { name: "Price list — 2026.pdf", type: "PDF", used: "Used in 89 conversations" },
  { name: "Premium package photos.zip", type: "Images", used: "Used in 34 conversations" },
  { name: "Delivery & returns policy.pdf", type: "PDF", used: "Used in 22 conversations" },
  { name: "Size chart.pdf", type: "PDF", used: "Used in 15 conversations" },
];

export default function ProductsPage() {
  const { showToast } = useToast();

  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Products & Media</div>
          <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">What Lewy knows about your business.</h1>
          <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5 max-w-md">
            Give Lewy the products, prices and documents it needs to sell for you.
          </p>
        </div>
        <button
          onClick={() => showToast("Product editor opened")}
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl px-4 py-2.5 text-[13px] font-medium shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 transition self-start"
        >
          + Add product
        </button>
      </Reveal>

      <Reveal delay={100} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.map((p) => (
          <div key={p.name} className="rounded-2xl bg-[#15151f] shadow-lg shadow-black/20 overflow-hidden hover:-translate-y-1 transition">
            <div className={`h-28 bg-gradient-to-br ${p.grad} flex items-center justify-center text-4xl`}>
              {p.emoji}
            </div>
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
      </Reveal>

      <Reveal delay={200} className="mt-8">
        <div className="text-[14px] font-semibold mb-3">Knowledge documents</div>
        <div className="border-2 border-dashed border-white/12 rounded-2xl p-8 text-center hover:border-white/20 transition">
          <div className="font-medium text-[14px]">Drop files here, or browse</div>
          <div className="text-[12px] text-white/35 mt-1.5">PDF, images, video, price lists, FAQs — up to 25MB each</div>
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
