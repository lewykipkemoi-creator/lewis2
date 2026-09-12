const files = [
  { name: "Price list — 2026.pdf", type: "PDF", used: "Used in 89 conversations" },
  { name: "Premium package photos.zip", type: "Images", used: "Used in 34 conversations" },
  { name: "Delivery & returns policy.pdf", type: "PDF", used: "Used in 22 conversations" },
  { name: "Size chart.pdf", type: "PDF", used: "Used in 15 conversations" },
];

export default function ProductsPage() {
  return (
    <div className="max-w-6xl px-8 lg:px-12 py-10">
      <div className="text-xs font-mono tracking-widest text-ink/40">PRODUCTS & MEDIA</div>
      <h1 className="font-serif text-3xl font-semibold mt-2">What Lewy knows about your business.</h1>
      <p className="text-ink/55 mt-2 max-w-lg">
        Upload your catalogue, pricing, policies, images and documents. Lewy
        uses this — and only this — when answering customers.
      </p>

      <div className="border-2 border-dashed border-ink/25 mt-10 max-w-2xl p-10 text-center">
        <div className="font-serif font-semibold">Drop files here, or browse</div>
        <div className="text-xs text-ink/45 mt-2">PDF, images, video, price lists, FAQs — up to 25MB each</div>
      </div>

      <div className="border border-ink/20 mt-6 max-w-2xl divide-y divide-ink/10">
        {files.map((f) => (
          <div key={f.name} className="flex items-center justify-between px-6 py-4">
            <div>
              <div className="font-medium text-sm">{f.name}</div>
              <div className="text-xs text-ink/45 mt-0.5">{f.used}</div>
            </div>
            <span className="text-[10px] font-mono tracking-wider border border-ink/20 px-2 py-1 text-ink/50">
              {f.type.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
