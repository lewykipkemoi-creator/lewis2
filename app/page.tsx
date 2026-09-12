"use client";

import Link from "next/link";

const lossLog = [
  { time: "09:14", channel: "WhatsApp", who: "Amina K.", status: "no reply", amount: "3,500" },
  { time: "11:02", channel: "Instagram", who: "New DM", status: "no reply", amount: "1,200" },
  { time: "13:45", channel: "Phone", who: "Unknown caller", status: "missed", amount: "2,800" },
  { time: "16:20", channel: "Website", who: "Chat form", status: "no reply", amount: "4,100" },
];

const lossTotal = "11,600";

const leaks = [
  {
    title: "Messages sit unanswered",
    detail:
      "A customer messages while your team is busy. Most businesses never reply within the window that actually converts.",
    figure: "62%",
    caption: "of business messages and calls go unanswered",
  },
  {
    title: "The first reply wins",
    detail:
      "Customers rarely wait. Whoever answers first usually gets the sale, and the rest lose it silently.",
    figure: "78%",
    caption: "of customers buy from whoever responds first",
  },
  {
    title: "Silence ends the conversation",
    detail:
      "Almost no one calls or messages a second time after being ignored once. They just go elsewhere.",
    figure: "85%",
    caption: "of ignored customers never come back",
  },
  {
    title: "Business doesn't stop at 5pm",
    detail:
      "A large share of inquiries and booking requests arrive after hours, when nobody is watching the inbox.",
    figure: "40%",
    caption: "of inquiries arrive outside business hours",
  },
];

const steps = [
  { n: "01", label: "Capture", detail: "Every channel feeds into one inbox — WhatsApp, Instagram, Facebook, Gmail, Telegram, your website, even phone calls." },
  { n: "02", label: "Understand", detail: "Lewy reads intent, urgency and language, including Sheng, using your business's own information to answer accurately." },
  { n: "03", label: "Act", detail: "It replies, qualifies the buyer, follows up if they go quiet, and books the appointment." },
  { n: "04", label: "Collect", detail: "When they're ready to pay, Lewy sends an M-Pesa link right in the chat and confirms it automatically." },
  { n: "05", label: "Recover", detail: "Every recovered shilling and every conversation still needing you shows up in one report." },
];

const groups = [
  {
    tag: "Capture",
    color: "text-loss",
    items: [
      ["Unified inbox", "Every conversation, from every channel, in one place."],
      ["Lead qualification", "Sorts conversations into hot, warm and cold automatically."],
      ["Payment links in chat", "Customers pay by M-Pesa without leaving the conversation."],
      ["Abandoned inquiry recovery", "Follows up when a customer goes quiet instead of losing them."],
    ],
  },
  {
    tag: "Retain",
    color: "text-gain",
    items: [
      ["Appointment reminders", "Automatic reminders before every booking to cut no-shows."],
      ["Post-visit check-ins", "Asks how it went and turns good answers into reviews."],
      ["Win-back messages", "Nudges customers who've gone quiet for a while."],
      ["Human escalation", "Hands off to your team the moment a customer needs one."],
    ],
  },
  {
    tag: "Operate",
    color: "text-seal",
    items: [
      ["Business knowledge", "Teach it your prices and policies once — it answers consistently."],
      ["Daily digest", "A short morning summary: hot leads, no-shows, revenue at risk."],
      ["Team assignment", "Routes bookings, complaints and sales to the right person."],
      ["Appointments", "Connects to your calendar so customers can book themselves."],
    ],
  },
  {
    tag: "Trust",
    color: "text-ink",
    items: [
      ["Full conversation history", "See exactly what was said in every exchange."],
      ["Clear data handling", "A plain explanation of what's stored and for how long."],
      ["Sentiment detection", "Frustration is caught early and routed to a human."],
      ["Nothing hidden", "Every action Lewy takes shows up in your dashboard."],
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* NAV */}
      <nav className="border-b border-ink/15 sticky top-0 z-50 bg-paper/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 border border-ink/70 flex items-center justify-center font-serif font-semibold text-lg">
              L
            </div>
            <span className="font-serif font-semibold text-lg tracking-tight">Lewy AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm text-ink/60">
            <a href="#leak" className="hover:text-ink transition">01 — The leak</a>
            <a href="#works" className="hover:text-ink transition">02 — How it works</a>
            <a href="#does" className="hover:text-ink transition">03 — What it does</a>
            <a href="#kenya" className="hover:text-ink transition">04 — Built for Kenya</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm text-ink/60 hover:text-ink px-3 py-2">
              Log in
            </Link>
            <Link href="/signup" className="text-sm font-medium bg-ink text-paper px-5 py-2.5 hover:bg-ink/85 transition">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO — the loss report */}
      <section className="border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
          <div>
            <div className="text-xs tracking-widest text-ink/45 font-mono">TODAY, 4:32 PM</div>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.08] mt-4">
              Every unanswered message has a price.
            </h1>
            <p className="text-ink/60 text-lg leading-8 mt-6 max-w-lg">
              Lewy AI connects WhatsApp, Instagram, Facebook, Gmail, Telegram and
              your website into one system, answers customers the moment they
              write in, and shows you exactly what it saved you.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <Link href="/signup" className="bg-ink text-paper px-7 py-3.5 font-medium hover:bg-ink/85 transition">
                Start recovering revenue
              </Link>
              <a href="#works" className="border border-ink/30 px-7 py-3.5 font-medium hover:border-ink/60 transition">
                See how it works
              </a>
            </div>
          </div>

          {/* the receipt */}
          <div className="border border-ink/20 bg-white/40">
            <div className="border-b border-dashed border-ink/25 px-6 py-4 flex items-center justify-between">
              <span className="font-serif font-semibold">Daily Loss Report</span>
              <span className="text-xs font-mono text-ink/45">#0412</span>
            </div>

            <div className="px-6 py-5">
              {lossLog.map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-ink/10 text-sm">
                  <div className="flex gap-3 text-ink/55 font-mono text-xs w-24 shrink-0">{row.time}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{row.channel} · {row.who}</div>
                    <div className="text-loss text-xs mt-0.5">{row.status}</div>
                  </div>
                  <div className="font-mono tabular text-loss text-sm shrink-0">KES {row.amount}</div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-4 mt-1">
                <span className="font-serif font-semibold">Total at risk today</span>
                <span className="font-mono tabular text-loss font-semibold text-lg">KES {lossTotal}</span>
              </div>
            </div>

            <div className="border-t border-dashed border-ink/25 px-6 py-4 text-xs text-ink/50 leading-6">
              Every line above could have been answered in seconds.
              Lewy AI never lets a message sit.
            </div>
          </div>
        </div>
      </section>

      {/* THE LEAK */}
      <section id="leak" className="border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="text-xs font-mono tracking-widest text-ink/40">01</div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-3 max-w-xl">
            This is where the money actually goes.
          </h2>

          <div className="grid md:grid-cols-2 mt-12 border-t border-l border-ink/15">
            {leaks.map((leak) => (
              <div key={leak.title} className="border-b border-r border-ink/15 p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-semibold text-loss">{leak.figure}</span>
                  <span className="text-sm text-ink/50">{leak.caption}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold mt-5">{leak.title}</h3>
                <p className="text-ink/55 leading-7 mt-2">{leak.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="works" className="border-b border-ink/15 bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="text-xs font-mono tracking-widest text-paper/40">02</div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-3 max-w-xl">
            From missed message to money in your account.
          </h2>

          <div className="mt-12 divide-y divide-paper/15 border-t border-b border-paper/15">
            {steps.map((step) => (
              <div key={step.n} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-6">
                <div className="font-mono text-paper/40 text-sm w-10 shrink-0">{step.n}</div>
                <div className="font-serif font-semibold text-lg w-32 shrink-0">{step.label}</div>
                <div className="text-paper/60 leading-7">{step.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVENUE — bank statement style */}
      <section className="border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          <div>
            <div className="text-xs font-mono tracking-widest text-ink/40">REVENUE INTELLIGENCE</div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-3 leading-tight">
              Know exactly what's slipping through the cracks — and what came back.
            </h2>
            <p className="text-ink/55 leading-8 mt-5 max-w-md">
              Lewy doesn't just answer messages. It flags which conversations
              are worth real money, and tracks every shilling it recovers,
              including payments collected directly in chat.
            </p>
            <Link href="/signup" className="inline-flex mt-8 bg-ink text-paper px-6 py-3 font-medium hover:bg-ink/85 transition">
              Protect your revenue
            </Link>
          </div>

          <div className="border border-ink/20">
            <div className="border-b border-ink/15 px-6 py-4 flex justify-between items-center">
              <span className="font-serif font-semibold">Statement — This month</span>
              <span className="text-xs font-mono text-ink/40">Sept 2026</span>
            </div>
            <div className="divide-y divide-ink/10">
              <div className="flex justify-between items-center px-6 py-5">
                <div>
                  <div className="font-medium">Revenue at risk</div>
                  <div className="text-xs text-ink/45 mt-1">14 unanswered conversations</div>
                </div>
                <div className="font-mono tabular text-loss font-semibold text-lg">KES 184,500</div>
              </div>
              <div className="flex justify-between items-center px-6 py-5">
                <div>
                  <div className="font-medium">Revenue recovered</div>
                  <div className="text-xs text-ink/45 mt-1">Includes KES 32,400 via M-Pesa in chat</div>
                </div>
                <div className="font-mono tabular text-gain font-semibold text-lg">KES 97,200</div>
              </div>
              <div className="flex justify-between items-center px-6 py-5">
                <div>
                  <div className="font-medium">AI conversations handled</div>
                  <div className="text-xs text-ink/45 mt-1">24/7, across every channel</div>
                </div>
                <div className="font-mono tabular font-semibold text-lg">428</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section id="does" className="border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
          <div className="text-xs font-mono tracking-widest text-ink/40">03</div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-3 max-w-xl">
            One system. Four jobs.
          </h2>

          <div className="grid md:grid-cols-2 mt-12 border-t border-l border-ink/15">
            {groups.map((group) => (
              <div key={group.tag} className="border-b border-r border-ink/15 p-8">
                <div className={`font-mono text-xs tracking-widest ${group.color}`}>{group.tag.toUpperCase()}</div>
                <div className="mt-5 space-y-5">
                  {group.items.map(([title, detail]) => (
                    <div key={title}>
                      <div className="font-serif font-semibold">{title}</div>
                      <div className="text-ink/55 text-sm leading-6 mt-1">{detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR KENYA */}
      <section id="kenya" className="border-b border-ink/15 bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-[1fr_1fr] gap-14 items-center">
          <div>
            <div className="text-xs font-mono tracking-widest text-paper/40">04</div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mt-3 leading-tight">
              Speaks how your customers speak. Gets paid how they pay.
            </h2>
            <p className="text-paper/55 leading-8 mt-5 max-w-md">
              Most AI tools are built for US English and card payments. Lewy
              understands English and Sheng, and takes M-Pesa payments without
              the customer ever leaving the chat.
            </p>

            <div className="grid sm:grid-cols-2 gap-px mt-8 bg-paper/15">
              <div className="bg-ink p-5">
                <div className="font-serif font-semibold">M-Pesa in chat</div>
                <div className="text-paper/50 text-sm mt-2 leading-6">STK push or till link, sent and confirmed automatically.</div>
              </div>
              <div className="bg-ink p-5">
                <div className="font-serif font-semibold">English and Sheng</div>
                <div className="text-paper/50 text-sm mt-2 leading-6">Lewy replies the way the customer wrote in.</div>
              </div>
            </div>
          </div>

          {/* mpesa-style receipt */}
          <div className="bg-paper text-ink border border-paper/20">
            <div className="px-6 py-4 border-b border-dashed border-ink/25 text-xs font-mono text-ink/45">
              CONVERSATION — WHATSAPP
            </div>
            <div className="px-6 py-5 space-y-4 text-sm">
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-ink text-paper px-4 py-2.5">
                  Niaje, hiyo package ya premium bado iko wiki hii?
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[85%] border border-ink/20 px-4 py-2.5">
                  Poa! Iko available. Nikutumie slot za wiki hii?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-ink text-paper px-4 py-2.5">
                  Ndio, na naeza lipa sasa?
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[85%] border border-ink/20 px-4 py-2.5">
                  Hakika. Nimekutumia M-Pesa STK push ya KES 3,500.
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-ink/25 px-6 py-4">
              <div className="text-xs font-mono text-ink/45">M-PESA CONFIRMATION</div>
              <div className="text-sm mt-2 leading-6">
                Confirmed. You have received <span className="font-mono">Ksh3,500.00</span>.
                Appointment booked for Thursday, 10:00 AM.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="border-b border-ink/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
          <div className="text-xs font-mono tracking-widest text-ink/40 mb-8">CONNECTED CHANNELS</div>
          <div className="flex flex-wrap gap-x-10 gap-y-4 text-ink/55 text-sm">
            {["WhatsApp", "M-Pesa", "Instagram", "Facebook", "Gmail", "Telegram", "Phone calls", "Website", "Google Calendar"].map((c) => (
              <span key={c} className="border-b border-ink/25 pb-1">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 text-center">
          <div className="text-xs font-mono tracking-widest text-ink/40">CLOSE TODAY'S REPORT</div>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-4 max-w-2xl mx-auto leading-tight">
            Stop losing customers to slow replies.
          </h2>
          <p className="text-ink/55 text-lg mt-5 max-w-xl mx-auto leading-8">
            Give your business an AI employee that answers instantly, follows
            up, gets paid, and shows you exactly what it recovered.
          </p>
          <Link href="/signup" className="inline-flex mt-9 bg-ink text-paper px-8 py-4 font-medium hover:bg-ink/85 transition">
            Start with Lewy AI
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ink/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm text-ink/50">
          <span>© 2026 Lewy AI</span>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-ink">Log in</Link>
            <Link href="/signup" className="hover:text-ink">Create account</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
