"use client";

import Link from "next/link";

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
);
const IconAlert = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);
const IconLayers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>
);
const IconInbox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/></svg>
);
const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>
);
const IconCard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
);
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
);
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>
);

const heroStats = [
  { label: "Revenue at risk", value: "KES 184,500", tone: "text-red-400", icon: <IconAlert /> },
  { label: "Revenue recovered", value: "KES 97,200", tone: "text-emerald-400", icon: <IconLayers /> },
  { label: "AI conversations", value: "428", tone: "text-violet-400", icon: <IconInbox /> },
];

const leaks = [
  { figure: "62%", caption: "of business messages and calls go unanswered", icon: <IconInbox /> },
  { figure: "78%", caption: "of customers buy from whoever replies first", icon: <IconClock /> },
  { figure: "85%", caption: "of ignored customers never come back", icon: <IconAlert /> },
  { figure: "40%", caption: "of inquiries arrive outside business hours", icon: <IconCalendar /> },
];

const steps = [
  { n: "01", label: "Capture", detail: "Every channel feeds into one inbox — WhatsApp, Instagram, Facebook, Gmail, Telegram, your website, even phone calls.", icon: <IconInbox /> },
  { n: "02", label: "Understand", detail: "Lewy reads intent, urgency and language, including Sheng, using your business's own information.", icon: <IconTarget /> },
  { n: "03", label: "Act", detail: "It replies, qualifies the buyer, follows up if they go quiet, and books the appointment.", icon: <IconLayers /> },
  { n: "04", label: "Collect", detail: "When they're ready to pay, Lewy sends an M-Pesa link right in the chat and confirms it automatically.", icon: <IconCard /> },
  { n: "05", label: "Recover", detail: "Every recovered shilling and every conversation still needing you shows up in one report.", icon: <IconShield /> },
];

const groups = [
  {
    tag: "Capture more revenue",
    grad: "from-violet-500 to-fuchsia-500",
    items: [
      ["Unified inbox", "Every conversation, from every channel, in one place."],
      ["Lead qualification", "Sorts conversations into hot, warm and cold automatically."],
      ["Payment links in chat", "Customers pay by M-Pesa without leaving the conversation."],
      ["Abandoned inquiry recovery", "Follows up when a customer goes quiet."],
    ],
  },
  {
    tag: "Keep customers longer",
    grad: "from-emerald-500 to-teal-400",
    items: [
      ["Appointment reminders", "Automatic reminders before every booking to cut no-shows."],
      ["Post-visit check-ins", "Asks how it went and turns good answers into reviews."],
      ["Win-back messages", "Nudges customers who've gone quiet for a while."],
      ["Human escalation", "Hands off to your team the moment a customer needs one."],
    ],
  },
  {
    tag: "Save your team time",
    grad: "from-amber-400 to-orange-500",
    items: [
      ["Business knowledge", "Teach it your prices and policies once — it answers consistently."],
      ["Daily digest", "A short morning summary: hot leads, no-shows, revenue at risk."],
      ["Team assignment", "Routes bookings, complaints and sales to the right person."],
      ["Appointments", "Connects to your calendar so customers can book themselves."],
    ],
  },
  {
    tag: "Built on trust",
    grad: "from-sky-400 to-blue-500",
    items: [
      ["Full conversation history", "See exactly what was said in every exchange."],
      ["Clear data handling", "A plain explanation of what's stored and for how long."],
      ["Sentiment detection", "Frustration is caught early and routed to a human."],
      ["Nothing hidden", "Every action Lewy takes shows up in your dashboard."],
    ],
  },
];

const channels = ["WhatsApp", "M-Pesa", "Instagram", "Facebook", "Gmail", "Telegram", "Phone calls", "Website"];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07070c] text-white overflow-hidden">
      <nav className="border-b border-white/10 bg-[#07070c]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-black text-xl shadow-lg shadow-violet-500/30">L</div>
            <div>
              <div className="font-bold text-xl tracking-tight">Lewy AI</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Revenue OS</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#how-it-works" className="hover:text-white transition">How it works</a>
            <a href="#what-it-does" className="hover:text-white transition">What it does</a>
            <a href="#kenya" className="hover:text-white transition">Built for Kenya</a>
            <a href="#channels" className="hover:text-white transition">Channels</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm text-white/70 hover:text-white px-4 py-2">Log in</Link>
            <Link href="/signup" className="rounded-xl bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition">Get started</Link>
          </div>
        </div>
      </nav>

      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.25),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.18),transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm text-violet-200 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Your AI revenue employee is online
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Never lose a customer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300">
                because you replied too late.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mt-7 text-lg md:text-xl text-white/55 leading-8">
              Lewy AI connects WhatsApp, Instagram, Facebook, Gmail, Telegram and
              your website into one system, answers customers instantly, and
              shows you exactly what it recovered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link href="/signup" className="px-7 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold shadow-2xl shadow-violet-600/30 hover:scale-[1.03] transition">
                Start recovering revenue
              </Link>
              <a href="#how-it-works" className="px-7 py-4 rounded-2xl border border-white/15 bg-white/[0.04] font-semibold text-white/80 hover:bg-white/[0.08] transition">
                See how it works
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8 text-sm text-white/35">
              <span>✓ No complicated setup</span>
              <span>✓ Works in English and Sheng</span>
              <span>✓ Human handoff included</span>
            </div>
          </div>

          <div className="mt-20 max-w-6xl mx-auto">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-violet-950/40 overflow-hidden">
              <div className="h-14 border-b border-white/10 flex items-center justify-between px-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <div className="text-xs text-white/30">Lewy AI · Revenue Dashboard</div>
                <div className="w-16" />
              </div>
              <div className="p-5 md:p-8">
                <div className="grid md:grid-cols-3 gap-4">
                  {heroStats.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                      <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${s.tone}`}>{s.icon}</div>
                      <div className="text-sm text-white/40 mt-3">{s.label}</div>
                      <div className={`text-2xl font-bold mt-1 ${s.tone}`}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="font-semibold">Revenue performance</div>
                      <div className="text-xs text-white/30 mt-1">Recovered revenue over the last 7 days</div>
                    </div>
                    <div className="text-xs text-emerald-400 font-medium">+18.6%</div>
                  </div>
                  <div className="h-44 flex items-end gap-3 md:gap-6">
                    {[35, 55, 42, 70, 62, 86, 100].map((height, i) => (
                      <div key={i} className="flex-1 h-full flex items-end">
                        <div style={{ height: `${height}%` }} className="w-full rounded-t-lg bg-gradient-to-t from-violet-700 to-fuchsia-400 opacity-90" />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-white/25 mt-3">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-violet-400 text-sm font-semibold uppercase tracking-[0.2em]">The problem</div>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Your business is losing money in conversations.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {leaks.map((leak) => (
              <div key={leak.caption} className="rounded-3xl border border-white/10 bg-[#0d0d14] p-7 hover:border-violet-500/30 transition">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center text-violet-300">
                  {leak.icon}
                </div>
                <div className="text-4xl font-extrabold mt-5 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{leak.figure}</div>
                <p className="text-white/45 leading-6 mt-2 text-sm">{leak.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-violet-400 text-sm font-semibold uppercase tracking-[0.2em]">How it works</div>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">From missed message to recovered revenue.</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-5 mt-16">
            {steps.map((step) => (
              <div key={step.n} className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center text-violet-300">
                  {step.icon}
                </div>
                <div className="text-xs font-mono text-white/25 mt-4">{step.n}</div>
                <h3 className="text-lg font-bold mt-1">{step.label}</h3>
                <p className="text-white/40 text-sm mt-2 leading-6">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="revenue" className="bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-violet-400 text-sm font-semibold uppercase tracking-[0.2em]">Revenue intelligence</div>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">Know exactly what's slipping through the cracks.</h2>
              <p className="text-white/45 text-lg leading-8 mt-6">
                Lewy flags which conversations are worth real money and tracks
                every shilling it recovers, including payments collected
                directly in chat.
              </p>
              <Link href="/signup" className="inline-flex mt-8 rounded-xl bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition">
                Protect your revenue
              </Link>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-red-500/15 bg-red-500/[0.06] p-7">
                <div className="text-sm text-white/40">Revenue at risk</div>
                <div className="text-4xl font-extrabold mt-2 text-red-400">KES 184,500</div>
                <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[68%] bg-red-400 rounded-full" />
                </div>
                <div className="text-xs text-red-300/70 mt-3">14 high-value conversations need attention</div>
              </div>
              <div className="rounded-3xl border border-emerald-500/15 bg-emerald-500/[0.06] p-7">
                <div className="text-sm text-white/40">Revenue recovered</div>
                <div className="text-4xl font-extrabold mt-2 text-emerald-400">KES 97,200</div>
                <div className="text-xs text-emerald-300/70 mt-3">Includes KES 32,400 via M-Pesa in chat</div>
              </div>
              <div className="rounded-3xl border border-violet-500/15 bg-violet-500/[0.06] p-7">
                <div className="text-sm text-white/40">Revenue intelligence</div>
                <div className="text-xl font-bold mt-2">Stop guessing. Start knowing.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="what-it-does">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-violet-400 text-sm font-semibold uppercase tracking-[0.2em]">Everything your team needs</div>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">One AI system for the entire customer journey.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {groups.map((group) => (
              <div key={group.tag} className="rounded-3xl border border-white/10 bg-[#0b0b11] p-8">
                <div className={`inline-block text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${group.grad}`}>
                  {group.tag}
                </div>
                <div className="mt-6 space-y-5">
                  {group.items.map(([title, detail]) => (
                    <div key={title} className="flex gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-gradient-to-br ${group.grad}`} />
                      <div>
                        <div className="font-semibold">{title}</div>
                        <div className="text-white/40 text-sm leading-6 mt-0.5">{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kenya" className="border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-violet-400 text-sm font-semibold uppercase tracking-[0.2em]">Built for Kenyan businesses</div>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">Speaks how your customers speak. Gets paid how they pay.</h2>
              <p className="text-white/45 text-lg leading-8 mt-6">
                Most AI tools are built for US English and card payments. Lewy
                understands English and Sheng, and takes M-Pesa payments
                without ever leaving the chat.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-300 flex items-center justify-center"><IconCard /></div>
                  <div className="font-semibold mt-3">M-Pesa in chat</div>
                  <div className="text-white/40 text-sm mt-1">STK push or till link, confirmed automatically.</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/10 text-violet-300 flex items-center justify-center"><IconUser /></div>
                  <div className="font-semibold mt-3">English and Sheng</div>
                  <div className="text-white/40 text-sm mt-1">Lewy replies the way the customer wrote in.</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
              <div className="text-xs text-white/30 mb-5">CUSTOMER CONVERSATION</div>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm">
                    Niaje, hiyo package ya premium bado iko wiki hii?
                  </div>
                </div>
                <div className="flex">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/10 px-4 py-3 text-sm text-white/85">
                    Poa! Iko available. Nikutumie slot za wiki hii?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm">
                    Ndio, na naeza lipa sasa?
                  </div>
                </div>
                <div className="flex">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/10 px-4 py-3 text-sm text-white/85">
                    Hakika. Nimekutumia M-Pesa STK push ya KES 3,500.
                  </div>
                </div>
                <div className="flex">
                  <div className="max-w-[75%] rounded-2xl rounded-bl-md bg-emerald-500/10 border border-emerald-400/25 px-4 py-2.5 text-xs text-emerald-300">
                    ✓ Payment received. Appointment confirmed for Thursday, 10:00 AM.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="channels">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-violet-400 text-sm font-semibold uppercase tracking-[0.2em]">Your channels. One brain.</div>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Meet customers wherever they message or pay you.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {channels.map((channel) => (
              <div key={channel} className="rounded-2xl border border-white/10 bg-[#0c0c12] p-6 text-center hover:border-violet-500/30 hover:bg-white/[0.03] transition">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center font-bold text-white/70">
                  {channel.charAt(0)}
                </div>
                <div className="font-semibold mt-4">{channel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="rounded-[2rem] border border-violet-500/15 bg-gradient-to-br from-violet-950/40 via-[#0d0d14] to-fuchsia-950/25 p-8 md:p-14">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Lewy is active
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mt-5">An AI employee that never clocks out.</h2>
                <p className="text-white/45 text-lg leading-8 mt-6">
                  Lewy responds instantly, understands intent, qualifies
                  opportunities, follows up, takes payment and keeps your team
                  informed, without replacing the humans who matter.
                </p>
                <Link href="/signup" className="inline-flex mt-8 rounded-xl bg-white text-black px-6 py-3 font-semibold">
                  Meet Lewy
                </Link>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <div className="text-xs text-white/30 mb-5">CUSTOMER CONVERSATION</div>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm">
                      Hi, I&apos;m interested in your premium package. Is it available this week?
                    </div>
                  </div>
                  <div className="flex">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/10 px-4 py-3 text-sm text-white/85">
                      Absolutely. I have it available this week. Want me to check appointment times?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm">
                      Yes please.
                    </div>
                  </div>
                  <div className="flex">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.07] border border-white/10 px-4 py-3 text-sm text-white/85">
                      Found an opening tomorrow at 10:00 AM. Shall I reserve it and send a payment link?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[300px] bg-violet-600/15 blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 py-28 text-center relative">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Stop losing customers.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-300">
              Start recovering revenue.
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/45 text-lg mt-6 leading-8">
            Give your business an AI employee that responds, follows up, gets
            paid and turns conversations into revenue.
          </p>
          <Link href="/signup" className="inline-flex mt-10 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-bold shadow-2xl shadow-violet-600/30 hover:scale-[1.03] transition">
            Start with Lewy AI
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-black">L</div>
                <span className="font-bold text-lg">Lewy AI</span>
              </div>
              <p className="text-white/35 text-sm leading-6 max-w-md mt-5">
                The AI Revenue & Customer Response OS for businesses that
                refuse to lose customers because of slow replies.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-4">Product</div>
              <div className="space-y-3 text-sm text-white/40">
                <a href="#what-it-does" className="block hover:text-white">What it does</a>
                <a href="#kenya" className="block hover:text-white">Built for Kenya</a>
                <a href="#channels" className="block hover:text-white">Channels</a>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4">Get started</div>
              <div className="space-y-3 text-sm text-white/40">
                <Link href="/login" className="block hover:text-white">Log in</Link>
                <Link href="/signup" className="block hover:text-white">Create account</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-7 text-xs text-white/25 flex flex-col sm:flex-row justify-between gap-3">
            <span>© 2026 Lewy AI. All rights reserved.</span>
            <span>Built for businesses that want to recover every opportunity.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
