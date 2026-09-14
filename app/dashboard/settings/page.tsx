import Reveal from "@/components/Reveal";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal>
        <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Settings</div>
        <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">How Lewy is allowed to act.</h1>
        <p className="text-white/45 text-[14px] mt-1.5 max-w-md">
          Control what Lewy can do on its own, and what needs your approval.
        </p>
      </Reveal>

      <Reveal delay={100} className="rounded-2xl border border-white/8 bg-white/[0.02] mt-8 max-w-lg">
        <div className="border-b border-white/8 px-5 py-3 font-medium text-[14px]">Approval thresholds</div>
        <div className="divide-y divide-white/6">
          <div className="px-5 py-3.5 flex justify-between items-center text-[13px]">
            <span className="text-white/60">Auto-approve bookings under</span>
            <span className="font-mono border border-white/10 rounded px-2.5 py-1">KES 5,000</span>
          </div>
          <div className="px-5 py-3.5 flex justify-between items-center text-[13px]">
            <span className="text-white/60">Auto-send payment links under</span>
            <span className="font-mono border border-white/10 rounded px-2.5 py-1">KES 10,000</span>
          </div>
          <div className="px-5 py-3.5 flex justify-between items-center text-[13px]">
            <span className="text-white/60">Always alert me for orders over</span>
            <span className="font-mono border border-white/10 rounded px-2.5 py-1">KES 50,000</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150} className="rounded-2xl border border-white/8 bg-white/[0.02] mt-4 max-w-lg">
        <div className="border-b border-white/8 px-5 py-3 font-medium text-[14px]">Team members</div>
        <div className="divide-y divide-white/6">
          <div className="px-5 py-3.5 flex justify-between items-center text-[13px]">
            <span className="text-white/60">Amina Njoroge — Owner</span>
            <span className="text-[11px] text-white/35">Full access</span>
          </div>
          <div className="px-5 py-3.5 flex justify-between items-center text-[13px]">
            <span className="text-white/60">Brian K. — Front desk</span>
            <span className="text-[11px] text-white/35">Bookings & inbox only</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200} className="rounded-2xl border border-white/8 bg-white/[0.02] mt-4 max-w-lg">
        <div className="border-b border-white/8 px-5 py-3 font-medium text-[14px]">Notifications</div>
        <div className="divide-y divide-white/6">
          <div className="px-5 py-3.5 flex justify-between items-center text-[13px]">
            <span className="text-white/60">Hot lead alerts</span>
            <span className="text-[11px] text-white/35">Push + SMS</span>
          </div>
          <div className="px-5 py-3.5 flex justify-between items-center text-[13px]">
            <span className="text-white/60">Daily revenue digest</span>
            <span className="text-[11px] text-white/35">7:00 AM, WhatsApp</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
