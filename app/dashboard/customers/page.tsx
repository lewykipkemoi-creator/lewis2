import Reveal from "@/components/Reveal";

export default function CustomersPage() {
  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Customers</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">Business memory, not just messages.</h1>
        <p className="text-white/45 text-[14px] mt-1.5">Every interaction builds one profile, across every channel.</p>
      </Reveal>

      <Reveal delay={100} className="rounded-xl border border-white/8 bg-white/[0.02] mt-8 max-w-lg">
        <div className="border-b border-white/8 px-5 py-4 flex justify-between items-center">
          <div>
            <div className="font-semibold">Jane Wambui</div>
            <div className="text-[11px] text-white/35 mt-0.5">First contacted March 12, 2026</div>
          </div>
          <span className="text-[10px] font-mono border border-red-500/25 text-red-400 px-2 py-0.5 rounded">HOT</span>
        </div>

        <div className="divide-y divide-white/6">
          <div className="px-5 py-3 flex justify-between text-[13px]">
            <span className="text-white/45">Interested in</span>
            <span className="font-medium">Premium package</span>
          </div>
          <div className="px-5 py-3 flex justify-between text-[13px]">
            <span className="text-white/45">Estimated value</span>
            <span className="font-mono font-medium">KES 18,000</span>
          </div>
          <div className="px-5 py-3 flex justify-between text-[13px]">
            <span className="text-white/45">Previous purchases</span>
            <span className="font-medium">2 — total KES 9,400</span>
          </div>
          <div className="px-5 py-3 flex justify-between text-[13px]">
            <span className="text-white/45">Last interaction</span>
            <span className="font-medium">Today, 9:14 AM · WhatsApp</span>
          </div>
          <div className="px-5 py-3 flex justify-between text-[13px]">
            <span className="text-white/45">Outstanding follow-up</span>
            <span className="font-medium">Delivery confirmation to Nakuru</span>
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-4">
          <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide mb-1.5">Conversation history</div>
          <div className="text-[13px] text-white/50 leading-6">
            3 conversations across WhatsApp and Instagram. Full transcript
            available on click.
          </div>
        </div>
      </Reveal>
    </div>
  );
}
