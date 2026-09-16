export function ChannelIcon({ name }: { name: string }) {
  const base = "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0";

  if (name === "WhatsApp") {
    return (
      <div className={`${base} bg-[#25D366]`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.25.7-1.22 1.29-1.99 1.45-.53.11-1.22.2-3.55-.76-2.98-1.24-4.9-4.26-5.05-4.46-.15-.2-1.2-1.6-1.2-3.06s.75-2.17 1.02-2.47c.25-.29.55-.36.73-.36h.53c.17 0 .4-.03.63.48.25.55.85 1.9.92 2.04.07.15.12.32.02.51-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.31.3-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.48.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.3.15.5.22.57.35.08.13.08.75-.17 1.45Z"/></svg>
      </div>
    );
  }

  if (name === "Instagram") {
    return (
      <div className={`${base} bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]`}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1"/></svg>
      </div>
    );
  }

  if (name === "Facebook Messenger") {
    return (
      <div className={`${base} bg-[#0084FF]`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.5 2 2 6.14 2 11.25c0 2.9 1.45 5.48 3.72 7.17V22l3.4-1.87c.9.25 1.87.38 2.88.38 5.5 0 10-4.14 10-9.26C22 6.14 17.5 2 12 2Zm1.02 12.47-2.55-2.72-4.98 2.72 5.48-5.82 2.6 2.72 4.93-2.72-5.48 5.82Z"/></svg>
      </div>
    );
  }

  if (name === "Gmail") {
    return (
      <div className={`${base} bg-white`}>
        <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#4285F4" d="M4 6h16v12H4z"/><path fill="#EA4335" d="M4 6l8 7 8-7"/><path fill="#34A853" d="M4 18h4V9.2L4 6v12Z"/><path fill="#EA4335" d="M16 18h4V6l-4 3.2V18Z"/><path fill="#FBBC05" d="M4 6l8 6.4L20 6l-1.64-1.2L12 9.6 5.64 4.8 4 6Z"/></svg>
      </div>
    );
  }

  if (name === "Telegram") {
    return (
      <div className={`${base} bg-[#26A5E4]`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="m21.5 4-19 7.3c-.9.35-.9 1.65.02 1.98l4.6 1.62 1.78 5.72c.24.76 1.2.98 1.76.4l2.5-2.6 4.86 3.58c.68.5 1.65.13 1.83-.7l3.1-15.1c.2-.98-.77-1.75-1.45-1.2ZM8.9 13.9l-3.35-1.18 12.1-6.9-8.75 8.08Zm1.1 4.35-.9-2.9 8.05-7.44-7.15 10.34Z"/></svg>
      </div>
    );
  }

  if (name === "Website chat") {
    return (
      <div className={`${base} bg-white/8`}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>
      </div>
    );
  }

  if (name === "M-Pesa") {
    return (
      <div className={`${base} bg-[#4CAF50]`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4" strokeWidth="2.4"/><path d="M9 7h6M9 10h6" strokeWidth="1.4"/></svg>
      </div>
    );
  }

  if (name === "Google Calendar") {
    return (
      <div className={`${base} bg-white`}>
        <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2" fill="#fff" stroke="#dadce0"/><rect x="3" y="4" width="18" height="5" fill="#1a73e8"/><rect x="3" y="9" width="9" height="6" fill="#ea4335"/><rect x="12" y="9" width="9" height="6" fill="#fbbc04"/><rect x="3" y="15" width="9" height="6" fill="#34a853"/><rect x="12" y="15" width="9" height="6" fill="#4285f4"/></svg>
      </div>
    );
  }

  return <div className={`${base} bg-white/8`} />;
}
