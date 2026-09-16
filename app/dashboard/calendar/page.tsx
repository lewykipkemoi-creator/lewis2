"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { IconCalendar, IconCheck, IconZap, IconAlertTriangle } from "@/components/icons";
import { useToast } from "@/components/Toast";

const week = [
  { day: "Mon", date: 9, count: 2 },
  { day: "Tue", date: 10, count: 1 },
  { day: "Wed", date: 11, count: 3 },
  { day: "Thu", date: 12, count: 4, active: true },
  { day: "Fri", date: 13, count: 2 },
  { day: "Sat", date: 14, count: 0 },
  { day: "Sun", date: 15, count: 0 },
];

const stats = [
  { label: "Today's bookings", value: "4", icon: IconCalendar, tone: "text-indigo-300", bg: "bg-indigo-500/10" },
  { label: "Confirmed", value: "2", icon: IconCheck, tone: "text-emerald-300", bg: "bg-emerald-500/10" },
  { label: "Awaiting payment", value: "1", icon: IconAlertTriangle, tone: "text-amber-300", bg: "bg-amber-500/10" },
  { label: "Open slots left", value: "3", icon: IconZap, tone: "text-cyan-300", bg: "bg-cyan-500/10" },
];

const todayAppointments = [
  { initials: "JW", name: "Jane Wambui", service: "Premium package", time: "10:00 AM", status: "Confirmed" },
  { initials: "DO", name: "David O.", service: "Consultation", time: "1:30 PM", status: "Confirmed" },
  { initials: "—", name: "Open slot", service: "Available for booking", time: "3:00 PM", status: "Available" },
  { initials: "GK", name: "Grace K.", service: "Standard package", time: "4:15 PM", status: "Awaiting payment" },
];

const upcoming = [
  { initials: "PM", name: "Peter M.", service: "Bulk order consultation", time: "Fri, 11:00 AM", status: "Confirmed" },
  { initials: "WT", name: "Wanjiru T.", service: "Consultation", time: "Fri, 2:30 PM", status: "Confirmed" },
  { initials: "—", name: "3 open slots", service: "Monday, next week", time: "9:00 AM–1:00 PM", status: "Available" },
];

function statusStyle(status: string) {
  if (status === "Confirmed") return "bg-emerald-500/15 text-emerald-300";
  if (status === "Available") return "bg-white/8 text-white/45";
  return "bg-amber-500/15 text-amber-300";
}

export default function CalendarPage() {
  const { showToast } = useToast();
  const [selectedDay, setSelectedDay] = useState(3);

  return (
    <div className="max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <Reveal className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <div className="text-[11px] font-mono text-white/35 uppercase tracking-wide">Calendar</div>
          <h1 className="text-xl sm:text-2xl font-semibold mt-1.5">Thursday, September 12</h1>
          <p className="text-white/45 text-[13px] sm:text-[14px] mt-1.5">Connected to Google Calendar. Lewy books directly into open slots.</p>
        </div>
        <button
          onClick={() => showToast("New appointment form opened")}
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl px-4 py-2.5 text-[13px] font-medium shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 transition self-start"
        >
          + New appointment
        </button>
      </Reveal>

      <Reveal delay={80} className="grid grid-cols-7 gap-2 mt-6">
        {week.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(i)}
            className={`rounded-xl py-3 flex flex-col items-center gap-1.5 transition ${
              selectedDay === i
                ? "bg-gradient-to-br from-indigo-500/25 to-cyan-500/10 border border-indigo-400/30"
                : "bg-white/[0.02] hover:bg-white/[0.04]"
            }`}
          >
            <div className="text-[10px] text-white/40 uppercase">{d.day}</div>
            <div className={`text-[14px] font-semibold ${selectedDay === i ? "text-white" : "text-white/70"}`}>{d.date}</div>
            <div className="flex gap-0.5 h-1.5 items-center">
              {d.count === 0 ? (
                <span className="w-1 h-1 rounded-full bg-white/15" />
              ) : (
                Array.from({ length: Math.min(d.count, 3) }).map((_, j) => (
                  <span key={j} className="w-1 h-1 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400" />
                ))
              )}
            </div>
          </button>
        ))}
      </Reveal>

      <Reveal delay={120} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-white/[0.02] p-4">
              <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.tone} flex items-center justify-center`}>
                <Icon />
              </div>
              <div className="text-xl font-bold mt-3">{s.value}</div>
              <div className="text-[11px] text-white/40 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </Reveal>

      <Reveal delay={160} className="rounded-2xl bg-white/[0.02] mt-5">
        <div className="px-5 py-3.5 text-[14px] font-semibold">Today's schedule</div>
        <div className="divide-y divide-transparent">
          {todayAppointments.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition">
              <div className="w-16 font-mono text-[12px] text-white/45 shrink-0">{a.time}</div>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  a.initials === "—" ? "bg-white/8 text-white/30" : "bg-gradient-to-br from-indigo-600 to-cyan-500"
                }`}
              >
                {a.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[13px] truncate">{a.name}</div>
                <div className="text-[11px] text-white/40 truncate">{a.service}</div>
              </div>
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusStyle(a.status)}`}>
                {a.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={200} className="rounded-2xl bg-white/[0.02] mt-5">
        <div className="px-5 py-3.5 text-[14px] font-semibold">Coming up this week</div>
        <div className="divide-y divide-transparent">
          {upcoming.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5">
              <div className="w-24 font-mono text-[12px] text-white/45 shrink-0">{a.time}</div>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  a.initials === "—" ? "bg-white/8 text-white/30" : "bg-gradient-to-br from-indigo-600 to-cyan-500"
                }`}
              >
                {a.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[13px] truncate">{a.name}</div>
                <div className="text-[11px] text-white/40 truncate">{a.service}</div>
              </div>
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusStyle(a.status)}`}>
                {a.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={240} className="rounded-2xl border border-dashed border-white/15 mt-5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="font-semibold text-[14px]">Connect another calendar</div>
          <div className="text-white/40 text-[12px] mt-1">Sync a second staff member's calendar so Lewy can book across your whole team.</div>
        </div>
        <button
          onClick={() => showToast("Calendar connection flow opened")}
          className="bg-white/8 hover:bg-white/15 rounded-full px-4 py-2 text-[13px] font-medium transition shrink-0"
        >
          Connect calendar
        </button>
      </Reveal>
    </div>
  );
}
