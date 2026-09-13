"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
);
const IconAlert = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);
const IconLayers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>
);
const IconInbox = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/></svg>
);
const IconTarget = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>
);
const IconCard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
);
const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>
);

const leaks = [
  { value: 62, suffix: "%", caption: "of business messages and calls go unanswered", icon: <IconInbox /> },
  { value: 78, suffix: "%", caption: "of customers buy from whoever replies first", icon: <IconClock /> },
  { value: 85, suffix: "%", caption: "of ignored customers never come back", icon: <IconAlert /> },
  { value: 40, suffix: "%", caption: "of inquiries arrive outside business hours", icon: <IconCalendar /> },
];

const steps = [
  { n: "01", label: "Capture", detail: "Every channel feeds into one inbox — WhatsApp, Instagram, Facebook, Gmail, Telegram, your website, even calls.", icon: <IconInbox /> },
  { n: "02", label: "Understand", detail: "Lewy reads intent, urgency and language, including Sheng, using your business's own information.", icon: <IconTarget /> },
  { n: "03", label: "Act", detail: "It replies, qualifies the buyer, follows up if they go quiet, and books the appointment.", icon: <IconLayers /> },
  { n: "04", label: "Collect", detail: "When they're ready to pay, Lewy sends an M-Pesa link right in the chat and confirms it.", icon: <IconCard /> },
  { n: "05", label: "Recover", detail: "Every recovered shilling and every open conversation shows up in one report.", icon: <IconShield /> },
];

const groups = [
  {
    tag: "Capture more revenue",
    items: [
      ["Unified inbox", "Every conversation, from every channel, in one place."],
      ["Lead qualification", "Sorts conversations into hot, warm and cold automatically."],
      ["Payment links in chat", "Customers pay by M-Pesa without leaving the conversation."],
      ["Abandoned inquiry recovery", "Follows up when a customer goes quiet."],
    ],
  },
  {
    tag: "Keep customers longer",
    items: [
      ["Appointment reminders", "Automatic reminders before every booking to cut no-shows."],
      ["Post-visit check-ins", "Asks how it went and turns good answers into reviews."],
      ["Win-back messages", "Nudges customers who've gone quiet for a while."],
      ["Human escalation", "Hands off to your team the moment a customer needs one."],
    ],
  },
  {
    tag: "Save your team time",
    items: [
      ["Business knowledge", "Teach it your prices and policies once — it answers consistently."],
      ["Daily digest", "A short morning summary: hot leads, no-shows, revenue at risk."],
      ["Team assignment", "Routes bookings, complaints and sales to the right person."],
      ["Appointments", "Connects to your calendar so customers can book themselves."],
    ],
  },
  {
    tag: "Built on trust",
    items: [
      ["Full conversation history", "See exactly what was said in every exchange."],
      ["Clear data handling", "A plain explanation of what's stored and for how long."],
      ["Sentiment detection", "Frustration is caught early and routed to a human."],
      ["Nothing hidden", "Every action Lewy takes shows up in your dashboard."],
    ],
  },
];

const channels = ["WhatsApp", "M-Pesa", "Instagram", "Facebook", "Gmail", "Telegram", "Phone calls", "Website", "Google Calendar"];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#08080d] text-white overflow-hidden">
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] animate-floatSlow pointer-events-none" />
      <div className="fixed top-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] animate-float pointer-events-none" />

      <nav className="border-b border-white/8 bg-[#08080d]/85 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-sm">L</div>
            <span className="font-semibold text-sm tracking-tight">Lewy AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-[13px] text-white/50">
            <a href="#how-it-works" className="hover:text-white transition">How it works</a>
            <a href="#what-it-does" className="hover:text-white transition">What it does</a>
            <a href="#kenya" className="hover:text-white transition">Built for Kenya</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden sm:block text-[13px] text-white/60 hover:text-white px-3 py-1.5">Log in</Link>
            <Link href="/signup" className="rounded-full bg-white text-black px-4 py-1.5 text-[13px] font-medium hover:bg-white/90 transition">Get started</Link>
          </div>
        </div>
      </nav>

      <section className="relative">
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <Reveal className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Your AI revenue employee is online
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
              Never lose a customer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">
                because you replied too late.
              </span>
            </h1>
            <p className="max-w-lg mx-auto mt-5 text-[15px] text-white/45 leading-7">
              Lewy AI connects WhatsApp, Instagram, Facebook, Gmail, Telegram
              and your website into one system, answers customers instantly,
              and shows you exactly what it recovered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
              <Link href="/signup" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-[14px] font-medium text-black shadow-lg shadow-indigo-500/20 hover:scale-[1.03] transition">
                Start recovering revenue
              </Link>
              <a href="#how-it-works" className="px-5 py-2.5 rounded-full border border-white/12 text-[14px] font-medium text-white/70 hover:bg-white/[0.05] transition">
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
              <div className="h-11 border-b border-white/8 flex items-center justify-between px-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </div>
                <div className="text-[11px] text-white/25">Lewy AI · Revenue Dashboard</div>
                <div className="w-14" />
              </div>
              <div className="p-4 md:p-7">
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
                    <div className="text-[12px] text-white/35">Revenue at risk</div>
                    <div className="text-xl font-semibold mt-1 text-red-400">
                      <CountUp value={184500} prefix="KES " />
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
                    <div className="text-[12px] text-white/35">Revenue recovered</div>
                    <div className="text-xl font-semibold mt-1 text-emerald-400">
                      <CountUp value={97200} prefix="KES " />
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
                    <div className="text-[12px] text-white/35">AI conversations</div>
                    <div className="text-xl font-semibold mt-1 text-indigo-300">
                      <CountUp value={428} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.015] p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[13px] font-medium text-white/70">Revenue performance</div>
                    <div className="text-[11px] text-emerald-400">+18.6%</div>
                  </div>
                  <div className="h-28 flex items-end gap-2 md:gap-4">
                    {[35, 55, 42, 70, 62, 86, 100].map((h, i) => (
                      <div key={i} className="flex-1 h-full flex items-end">
                        <div style={{ height: `${h}%` }} className="w-full rounded-t bg-gradient-to-t from-indigo-600 to-cyan-400 opacity-80" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/6 bg-white/[0.012]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <Reveal className="max-w-xl mx-auto text-center">
            <div className="text-indigo-300 text-[11px] font-medium uppercase tracking-[0.15em]">The problem</div>
            <h2 className="text-2xl md:text-3xl font-semibold mt-3">Your business is losing money in conversations.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {leaks.map((leak, i) => (
              <Reveal key={leak.caption} delay={i * 100}>
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5 h-full hover:border-white/15 transition">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50">{leak.icon}</div>
                  <div className="text-2xl font-semibold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">
                    <CountUp value={leak.value} suffix={leak.suffix} />
                  </div>
                  <p className="text-white/40 leading-6 mt-1.5 text-[13px]">{leak.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <Reveal className="text-center max-w-xl mx-auto">
            <div className="text-indigo-300 text-[11px] font-medium uppercase tracking-[0.15em]">How it works</div>
            <h2 className="text-2xl md:text-3xl font-semibold mt-3">From missed message to recovered revenue.</h2>
          </Reveal>
          <div className="grid md:grid-cols-5 gap-4 mt-12">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 90}>
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5 h-full hover:bg-white/[0.035] transition">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/15 to-cyan-400/15 border border-white/8 flex items-center justify-center text-indigo-300">
                    {step.icon}
                  </div>
                  <div className="text-[10px] font-mono text-white/25 mt-3">{step.n}</div>
                  <h3 className="text-[15px] font-semibold mt-1">{step.label}</h3>
                  <p className="text-white/40 text-[13px] mt-2 leading-6">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/[0.012] border-y border-white/6">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="text-indigo-300 text-[11px] font-medium uppercase tracking-[0.15em]">Revenue intelligence</div>
            <h2 className="text-2xl md:text-3xl font-semibold mt-3 leading-snug">Know exactly what's slipping through the cracks.</h2>
            <p className="text-white/45 text-[14px] leading-7 mt-4 max-w-md">
              Lewy flags which conversations are worth real money and tracks
              every shilling it recovers, including payments collected
              directly in chat.
            </p>
            <Link href="/signup" className="inline-flex mt-6 rounded-full bg-white text-black px-5 py-2 text-[13px] font-medium hover:bg-white/90 transition">
              Protect your revenue
            </Link>
          </Reveal>
          <Reveal delay={120} className="grid gap-3">
            <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] p-5">
              <div className="text-[12px] text-white/40">Revenue at risk</div>
              <div className="text-2xl font-semibold mt-1 text-red-400"><CountUp value={184500} prefix="KES " /></div>
            </div>
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5">
              <div className="text-[12px] text-white/40">Revenue recovered</div>
              <div className="text-2xl font-semibold mt-1 text-emerald-400"><CountUp value={97200} prefix="KES " /></div>
              <div className="text-[11px] text-emerald-300/60 mt-1">Includes KES 32,400 via M-Pesa in chat</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="what-it-does">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <Reveal className="text-center max-w-xl mx-auto">
            <div className="text-indigo-300 text-[11px] font-medium uppercase tracking-[0.15em]">Everything your team needs</div>
            <h2 className="text-2xl md:text-3xl font-semibold mt-3">One AI system for the entire customer journey.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4 mt-12">
            {groups.map((group, gi) => (
              <Reveal key={group.tag} delay={gi * 100}>
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6 h-full">
                  <div className="text-[12px] font-medium text-indigo-300">{group.tag}</div>
                  <div className="mt-4 space-y-4">
                    {group.items.map(([title, detail]) => (
                      <div key={title} className="flex gap-3">
                        <div className="w-1 h-1 rounded-full mt-2 shrink-0 bg-indigo-300/60" />
                        <div>
                          <div className="text-[14px] font-medium">{title}</div>
                          <div className="text-white/40 text-[13px] leading-6 mt-0.5">{detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="kenya" className="border-y border-white/6 bg-white/[0.012]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="text-indigo-300 text-[11px] font-medium uppercase tracking-[0.15em]">Built for Kenyan businesses</div>
            <h2 className="text-2xl md:text-3xl font-semibold mt-3 leading-snug">Speaks how your customers speak. Gets paid how they pay.</h2>
            <p className="text-white/45 text-[14px] leading-7 mt-4 max-w-md">
              Most AI tools are built for US English and card payments. Lewy
              understands English and Sheng, and takes M-Pesa payments
              without ever leaving the chat.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-300 flex items-center justify-center"><IconCard /></div>
                <div className="text-[14px] font-medium mt-2.5">M-Pesa in chat</div>
                <div className="text-white/40 text-[12px] mt-1 leading-5">STK push or till link, confirmed automatically.</div>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-300 flex items-center justify-center"><IconUser /></div>
                <div className="text-[14px] font-medium mt-2.5">English and Sheng</div>
                <div className="text-white/40 text-[12px] mt-1 leading-5">Lewy replies the way the customer wrote in.</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-[11px] text-white/30 mb-4">CUSTOMER CONVERSATION</div>
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-xl rounded-br-sm bg-gradient-to-r from-indigo-500 to-cyan-400 text-black px-3.5 py-2 text-[13px] font-medium">
                  Niaje, hiyo package ya premium bado iko wiki hii?
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-white/[0.06] border border-white/8 px-3.5 py-2 text-[13px] text-white/80">
                  Poa! Iko available. Nikutumie slot za wiki hii?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-xl rounded-br-sm bg-gradient-to-r from-indigo-500 to-cyan-400 text-black px-3.5 py-2 text-[13px] font-medium">
                  Ndio, na naeza lipa sasa?
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[75%] rounded-xl rounded-bl-sm bg-emerald-500/10 border border-emerald-400/20 px-3.5 py-2 text-[12px] text-emerald-300">
                  ✓ Payment received. Booked for Thursday, 10:00 AM.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 overflow-hidden">
        <Reveal className="text-center mb-8">
          <div className="text-indigo-300 text-[11px] font-medium uppercase tracking-[0.15em]">Your channels. One brain.</div>
        </Reveal>
        <div className="relative">
          <div className="flex gap-3 animate-marquee w-max">
            {[...channels, ...channels].map((c, i) => (
              <div key={i} className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[13px] text-white/60 whitespace-nowrap">
                {c}
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#08080d] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#08080d] to-transparent" />
        </div>
      </section>

      <section className="border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <Reveal className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 via-[#0d0d14] to-cyan-950/15 p-6 md:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-400 text-[12px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Lewy is active
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold mt-3">An AI employee that never clocks out.</h2>
                <p className="text-white/45 text-[14px] leading-7 mt-4">
                  Lewy responds instantly, qualifies opportunities, follows
                  up, takes payment and keeps your team informed — without
                  replacing the humans who matter.
                </p>
                <Link href="/signup" className="inline-flex mt-6 rounded-full bg-white text-black px-5 py-2 text-[13px] font-medium">
                  Meet Lewy
                </Link>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="text-[11px] text-white/30 mb-4">CUSTOMER CONVERSATION</div>
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-xl rounded-br-sm bg-gradient-to-r from-indigo-500 to-cyan-400 text-black px-3.5 py-2 text-[13px] font-medium">
                      Is the premium package available this week?
                    </div>
                  </div>
                  <div className="flex">
                    <div className="max-w-[80%] rounded-xl rounded-bl-sm bg-white/[0.06] border border-white/8 px-3.5 py-2 text-[13px] text-white/80">
                      Yes, want me to check appointment times?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-xl rounded-br-sm bg-gradient-to-r from-indigo-500 to-cyan-400 text-black px-3.5 py-2 text-[13px] font-medium">
                      Yes please.
                    </div>
                  </div>
                  <div className="flex">
                    <div className="max-w-[80%] rounded-xl rounded-bl-sm bg-white/[0.06] border border-white/8 px-3.5 py-2 text-[13px] text-white/80">
                      Tomorrow 10am is open — shall I book it and send a payment link?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <Reveal className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Stop losing customers.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">
              Start recovering revenue.
            </span>
          </h2>
          <p className="max-w-md mx-auto text-white/45 text-[14px] mt-4 leading-7">
            Give your business an AI employee that responds, follows up, gets
            paid and turns conversations into revenue.
          </p>
          <Link href="/signup" className="inline-flex mt-7 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-black px-6 py-2.5 text-[14px] font-medium shadow-lg shadow-indigo-500/20 hover:scale-[1.03] transition">
            Start with Lewy AI
          </Link>
        </Reveal>
      </section>

      <footer className="border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8 flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-white/35">
          <span>© 2026 Lewy AI</span>
          <div className="flex gap-5">
            <Link href="/login" className="hover:text-white">Log in</Link>
            <Link href="/signup" className="hover:text-white">Create account</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
