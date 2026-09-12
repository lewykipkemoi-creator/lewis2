export default function CustomersPage() {
  return (
    <div className="max-w-6xl px-8 lg:px-12 py-10">
      <div className="text-xs font-mono tracking-widest text-ink/40">CUSTOMERS</div>
      <h1 className="font-serif text-3xl font-semibold mt-2">Business memory, not just messages.</h1>
      <p className="text-ink/55 mt-2">Every interaction builds one profile, across every channel.</p>

      <div className="border border-ink/20 mt-10 max-w-2xl">
        <div className="border-b border-ink/15 px-6 py-4 flex justify-between items-center">
          <div>
            <div className="font-serif font-semibold text-lg">Jane Wambui</div>
            <div className="text-xs text-ink/45 mt-1">First contacted March 12, 2026</div>
          </div>
          <span className="text-[10px] font-mono tracking-wider border border-loss/30 text-loss px-2 py-1">HOT</span>
        </div>

        <div className="divide-y divide-ink/10">
          <div className="px-6 py-4 flex justify-between text-sm">
            <span className="text-ink/50">Interested in</span>
            <span className="font-medium">Premium package</span>
          </div>
          <div className="px-6 py-4 flex justify-between text-sm">
            <span className="text-ink/50">Estimated value</span>
            <span className="font-mono tabular font-medium">KES 18,000</span>
          </div>
          <div className="px-6 py-4 flex justify-between text-sm">
            <span className="text-ink/50">Previous purchases</span>
            <span className="font-medium">2 — total KES 9,400</span>
          </div>
          <div className="px-6 py-4 flex justify-between text-sm">
            <span className="text-ink/50">Last interaction</span>
            <span className="font-medium">Today, 9:14 AM · WhatsApp</span>
          </div>
          <div className="px-6 py-4 flex justify-between text-sm">
            <span className="text-ink/50">Outstanding follow-up</span>
            <span className="font-medium">Delivery confirmation to Nakuru</span>
          </div>
        </div>

        <div className="border-t border-ink/15 px-6 py-4">
          <div className="text-xs font-mono tracking-widest text-ink/40 mb-2">CONVERSATION HISTORY</div>
          <div className="text-sm text-ink/60 leading-6">
            3 conversations across WhatsApp and Instagram. Full transcript
            available on click.
          </div>
        </div>
      </div>
    </div>
  );
}
