"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const children = [
  { id: "mia", name: "Mia", emoji: "🦁", age: 7, level: 14 },
  { id: "leo", name: "Leo", emoji: "🐼", age: 9, level: 8 },
];

const weekTime = [
  { day: "Mon", min: 32 },
  { day: "Tue", min: 45 },
  { day: "Wed", min: 20 },
  { day: "Thu", min: 60 },
  { day: "Fri", min: 40 },
  { day: "Sat", min: 52 },
  { day: "Sun", min: 28 },
];

const skills = [
  { name: "Speaking", value: 78, color: "#EC4899", icon: "record_voice_over" },
  { name: "Vocabulary", value: 92, color: "#4CAF50", icon: "menu_book" },
  { name: "Grammar", value: 64, color: "#0F2A8A", icon: "school" },
  { name: "Listening", value: 85, color: "#38BDF8", icon: "hearing" },
  { name: "Reading", value: 71, color: "#F5B21B", icon: "auto_stories" },
];

const recommendations = [
  { title: "Practice Grammar Castle", reason: "Grammar is Mia's lowest skill this week.", emoji: "🏰", cta: "Assign lesson" },
  { title: "Try the Speaking Ocean", reason: "Boost pronunciation with 10 min of voice practice.", emoji: "🌊", cta: "Open activity" },
  { title: "Read 'Starry Skies'", reason: "Matches Mia's reading level and space interest.", emoji: "⭐", cta: "Add to library" },
];

const achievements = [
  { name: "Linguistics Legend", when: "2h ago", emoji: "🏅" },
  { name: "12-Day Streak", when: "Today", emoji: "🔥" },
  { name: "Word Master (500)", when: "Yesterday", emoji: "📚" },
];

export default function ParentDashboard() {
  const [activeChild, setActiveChild] = useState(children[0].id);
  const child = children.find((c) => c.id === activeChild)!;
  const maxMin = Math.max(...weekTime.map((d) => d.min));
  const totalMin = weekTime.reduce((a, b) => a + b.min, 0);

  return (
    <div className="min-h-screen bg-[#F4F6FF] text-[#191b23]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#0F2A8A]/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦁</span>
            <span className="text-xl font-black text-[#0F2A8A]">Leo<span className="text-[#F5B21B]">Land</span></span>
            <span className="ml-2 hidden sm:inline text-[11px] font-black uppercase tracking-wider text-[#0F2A8A]/50 bg-[#0F2A8A]/5 px-2.5 py-1 rounded-full">Parent Portal</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-full hover:bg-[#0F2A8A]/5 flex items-center justify-center text-[#0F2A8A]">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EC4899] rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#E8EDFF] flex items-center justify-center text-xl">👩</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8">
        {/* Title + child switcher */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#0F2A8A]">Welcome back! 👋</h1>
            <p className="text-[#0F2A8A]/60 font-semibold mt-1">Here&apos;s how your explorers are progressing this week.</p>
          </div>
          <div className="flex items-center gap-2">
            {children.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveChild(c.id)}
                className={`flex items-center gap-2 pl-2 pr-4 py-2 rounded-full font-black text-sm transition-all ${
                  activeChild === c.id ? "bg-[#0F2A8A] text-white shadow-[0_4px_0_#0a1d61]" : "bg-white text-[#0F2A8A]/70 border-2 border-[#0F2A8A]/10"
                }`}
              >
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">{c.emoji}</span>
                {c.name}
              </button>
            ))}
            <button className="w-11 h-11 rounded-full bg-white border-2 border-dashed border-[#0F2A8A]/20 text-[#0F2A8A]/50 flex items-center justify-center hover:border-[#0F2A8A]/40">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        {/* Summary banner */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0F2A8A] to-[#1e3fb8] text-white p-6 md:p-8 shadow-[0_15px_40px_rgba(15,42,138,0.25)]"
        >
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-4xl border border-white/20">{child.emoji}</div>
            <div className="flex-grow">
              <h2 className="text-2xl font-black">{child.name}, Level {child.level}</h2>
              <p className="text-white/80 font-semibold">Age {child.age} · Learning English, French & Arabic</p>
            </div>
            <div className="flex items-center gap-2 bg-[#4CAF50]/90 px-4 py-2 rounded-full font-black text-sm">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              +15% vs last week
            </div>
          </div>
        </motion.section>

        {/* Stat cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "schedule", label: "Time This Week", value: `${Math.round(totalMin / 60)}h ${totalMin % 60}m`, tone: "#0F2A8A" },
            { icon: "menu_book", label: "Words Learned", value: "124", tone: "#4CAF50" },
            { icon: "task_alt", label: "Lessons Done", value: "38", tone: "#EC4899" },
            { icon: "local_fire_department", label: "Day Streak", value: "12", tone: "#F5B21B" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-[22px] p-5 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${s.tone}15`, color: s.tone }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
              </div>
              <p className="text-2xl font-black text-[#0F2A8A]">{s.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0F2A8A]/50 mt-0.5">{s.label}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly time chart */}
          <div className="lg:col-span-2 bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-[#0F2A8A]">Learning Time</h3>
                <p className="text-sm font-semibold text-[#0F2A8A]/50">Minutes per day, this week</p>
              </div>
              <span className="text-sm font-black text-[#4CAF50] bg-[#E6F6E8] px-3 py-1 rounded-full">{totalMin} min total</span>
            </div>
            <div className="flex items-end justify-between gap-2 md:gap-3 h-48">
              {weekTime.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-black text-[#0F2A8A]/60">{d.min}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.min / maxMin) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-[#0F2A8A] to-[#3b5fd0] min-h-[8px]"
                  />
                  <span className="text-xs font-bold text-[#0F2A8A]/50">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills acquired */}
          <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
            <h3 className="text-xl font-black text-[#0F2A8A] mb-5">Skills Acquired</h3>
            <div className="space-y-4">
              {skills.map((sk) => (
                <div key={sk.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1.5 text-sm font-black text-[#0F2A8A]">
                      <span className="material-symbols-outlined text-[18px]" style={{ color: sk.color }}>{sk.icon}</span>
                      {sk.name}
                    </span>
                    <span className="text-sm font-black" style={{ color: sk.color }}>{sk.value}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#0F2A8A]/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${sk.value}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full" style={{ backgroundColor: sk.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommendations */}
          <div className="lg:col-span-2 bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
            <div className="flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-[#F5B21B]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              <h3 className="text-xl font-black text-[#0F2A8A]">Leo&apos;s Recommendations</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((r) => (
                <div key={r.title} className="flex items-center gap-4 p-4 rounded-2xl bg-[#F4F6FF] hover:bg-[#EAEFFF] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm shrink-0">{r.emoji}</div>
                  <div className="flex-grow">
                    <p className="font-black text-[#0F2A8A]">{r.title}</p>
                    <p className="text-sm font-semibold text-[#0F2A8A]/55">{r.reason}</p>
                  </div>
                  <button className="shrink-0 text-sm font-black text-[#0F2A8A] bg-white px-4 py-2 rounded-full border-2 border-[#0F2A8A]/10 hover:border-[#0F2A8A]/30 transition-colors">{r.cta}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements + safety */}
          <div className="space-y-6">
            <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
              <h3 className="text-xl font-black text-[#0F2A8A] mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {achievements.map((a) => (
                  <div key={a.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF6E2] flex items-center justify-center text-xl">{a.emoji}</div>
                    <div className="flex-grow">
                      <p className="font-black text-sm text-[#0F2A8A]">{a.name}</p>
                      <p className="text-xs font-semibold text-[#0F2A8A]/45">{a.when}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] p-6 bg-gradient-to-br from-[#4CAF50] to-[#3a9c3e] text-white shadow-[0_10px_30px_rgba(76,175,80,0.25)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <h3 className="text-lg font-black">Safe & Sound</h3>
              </div>
              <p className="text-white/85 font-semibold text-sm mb-4">Screen-time limits are on and all content is kid-safe and ad-free.</p>
              <button className="w-full py-3 rounded-full bg-white text-[#357a38] font-black text-sm hover:bg-white/90 transition-colors">Manage Controls</button>
            </div>
          </div>
        </div>

        {/* Weekly report CTA */}
        <section className="rounded-[24px] bg-white p-6 md:p-8 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E8EDFF] flex items-center justify-center text-[#0F2A8A]">
              <span className="material-symbols-outlined text-[28px]">summarize</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0F2A8A]">Weekly Progress Report</h3>
              <p className="text-sm font-semibold text-[#0F2A8A]/55">Get {child.name}&apos;s full report emailed every Sunday.</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#0F2A8A] text-white px-6 py-3 font-black shadow-[0_5px_0_#0a1d61] hover:translate-y-0.5 hover:shadow-[0_3px_0_#0a1d61] active:translate-y-1 active:shadow-none transition-all">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Download Report
          </button>
        </section>
      </main>
    </div>
  );
}
