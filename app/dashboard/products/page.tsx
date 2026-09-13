import Reveal from "@/components/Reveal";

const files = [
  { name: "Price list — 2026.pdf", type: "PDF", used: "Used in 89 conversations" },
  { name: "Premium package photos.zip", type: "Images", used: "Used in 34 conversations" },
  { name: "Delivery & returns policy.pdf", type: "PDF", used: "Used in 22 conversations" },
  { name: "Size chart.pdf", type: "PDF", used: "Used in 15 conversations" },
];

export default function ProductsPage() {
  return (
    <div className="max-w-5xl px-6 lg:px-10 py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Products & Media</div>
        <h1 className="text-2xl font-semibold mt-1.5">What Lewy knows about your business.</h1>
        <p className="text-white/45 text-[14px] mt-1.5 max-w-md">
          Upload your catalogue, pricing, policies, images and documents.
          Lewy uses this — and only this — when answering customers.
        </p>
      </Reveal>

      <Reveal delay={100} className="border-2 border-dashed border-white/12 rounded-xl mt-8 max-w-lg p-8 text-center hover:border-white/20 transition">
        <div className="font-medium text-[14px]">Drop files here, or browse</div>
        <div className="text-[12px] text-white/35 mt-1.5">PDF, images, video, price lists, FAQs — up to 25MB each</div>
      </Reveal>

      <Reveal delay={150} className="rounded-xl border border-white/8 bg-white/[0.02] mt-4 max-w-lg divide-y divide-white/6">
        {files.map((f) => (
          <div key={f.name} className="flex items-center justify-between px-5 py-3.5">
            <div>
              <div className="font-medium text-[13px]">{f.name}</div>
              <div className="text-[12px] text-white/40 mt-0.5">{f.used}</div>
            </div>
            <span className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded text-white/40">
              {f.type.toUpperCase()}
            </span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
