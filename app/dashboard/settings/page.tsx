export default function SettingsPage() {
  return (
    <div className="max-w-6xl px-8 lg:px-12 py-10">
      <div className="text-xs font-mono tracking-widest text-ink/40">SETTINGS</div>
      <h1 className="font-serif text-3xl font-semibold mt-2">How Lewy is allowed to act.</h1>
      <p className="text-ink/55 mt-2 max-w-lg">
        Control what Lewy can do on its own, and what needs your approval.
      </p>

      <div className="border border-ink/20 mt-10 max-w-2xl">
        <div className="border-b border-ink/15 px-6 py-4 font-serif font-semibold">Approval thresholds</div>
        <div className="divide-y divide-ink/10">
          <div className="px-6 py-4 flex justify-between items-center text-sm">
            <span>Auto-approve bookings under</span>
            <span className="font-mono tabular border border-ink/20 px-3 py-1.5">KES 5,000</span>
          </div>
          <div className="px-6 py-4 flex justify-between items-center text-sm">
            <span>Auto-send payment links under</span>
            <span className="font-mono tabular border border-ink/20 px-3 py-1.5">KES 10,000</span>
          </div>
          <div className="px-6 py-4 flex justify-between items-center text-sm">
            <span>Always alert me for orders over</span>
            <span className="font-mono tabular border border-ink/20 px-3 py-1.5">KES 50,000</span>
          </div>
        </div>
      </div>

      <div className="border border-ink/20 mt-6 max-w-2xl">
        <div className="border-b border-ink/15 px-6 py-4 font-serif font-semibold">Team members</div>
        <div className="divide-y divide-ink/10">
          <div className="px-6 py-4 flex justify-between items-center text-sm">
            <span>Amina Njoroge — Owner</span>
            <span className="text-xs text-ink/40">Full access</span>
          </div>
          <div className="px-6 py-4 flex justify-between items-center text-sm">
            <span>Brian K. — Front desk</span>
            <span className="text-xs text-ink/40">Bookings & inbox only</span>
          </div>
        </div>
      </div>

      <div className="border border-ink/20 mt-6 max-w-2xl">
        <div className="border-b border-ink/15 px-6 py-4 font-serif font-semibold">Notifications</div>
        <div className="divide-y divide-ink/10">
          <div className="px-6 py-4 flex justify-between items-center text-sm">
            <span>Hot lead alerts</span>
            <span className="text-xs text-ink/40">Push + SMS</span>
          </div>
          <div className="px-6 py-4 flex justify-between items-center text-sm">
            <span>Daily revenue digest</span>
            <span className="text-xs text-ink/40">7:00 AM, WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  );
}
