"use client";

import { motion } from "framer-motion";
import { SectionTitle, ChunkyButton, ProgressBar, Floaty } from "@/components/leo/ui";

const courses = [
  {
    flag: "🇸🇦",
    name: "العربية",
    tag: "Fluent Goal",
    tagColor: "#4CAF50",
    note: "7 lessons left to unlock Tier 3.",
    units: [
      { name: "Unit 4: Nature", state: "2/5 Done", progress: 40 },
      { name: "Unit 5: Family", state: "Locked", progress: 0 },
    ],
  },
  {
    flag: "🇬🇧",
    name: "English",
    tag: "Expert Mode",
    tagColor: "#0F2A8A",
    note: "Refine your accent and idioms.",
    units: [
      { name: "Unit 12: Animals", state: "90%", progress: 90 },
      { name: "Unit 13: Stories", state: "15%", progress: 15 },
    ],
  },
  {
    flag: "🇫🇷",
    name: "Français",
    tag: "Beginner",
    tagColor: "#7C3AED",
    note: "Start your journey in Paris!",
    units: [
      { name: "Unit 1: Basics", state: "Completed", progress: 100 },
      { name: "Unit 2: Food", state: "Next", progress: 0 },
    ],
  },
];

const upcoming = [
  { title: "Space Exploration: The Moon", meta: "English • Tomorrow 10:00 AM", xp: 30, emoji: "🚀", color: "#7C3AED" },
  { title: "French Bistro Etiquette", meta: "French • Live Session", xp: 50, emoji: "🥐", color: "#F5B21B" },
];

const recentBadges = [
  { name: "Jungle Scout", emoji: "🌿", owned: true },
  { name: "Big Saver", emoji: "🪙", owned: true },
  { name: "Worldly", emoji: "🌍", owned: false },
  { name: "Astronaut", emoji: "👨‍🚀", owned: false },
];

export default function LessonsPage() {
  return (
    <div className="space-y-8">
      {/* Grammar Castle hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0F2A8A] to-[#1e3fb8] p-6 md:p-10 text-white border-4 border-white shadow-[0_20px_50px_rgba(15,42,138,0.3)]"
      >
        <Floaty className="absolute top-6 right-8 text-5xl hidden md:block" duration={6}>🏰</Floaty>
        <Floaty className="absolute bottom-6 right-28 text-3xl hidden md:block" duration={4} delay={1}>✨</Floaty>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <Floaty distance={10}>
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-[32px] bg-white/15 flex items-center justify-center text-7xl border-4 border-white/40">🦁</div>
          </Floaty>
          <div className="flex-grow">
            <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide mb-3">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              Ongoing Quest
            </span>
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2">Wild Animals: The Jungle</h1>
            <p className="text-white/85 font-semibold mb-5 max-w-lg">Master jungle words and grammar with Leo on a trip to the Amazon Rainforest!</p>
            <div className="flex flex-wrap items-center gap-4">
              <ChunkyButton variant="gold" leftIcon="play_arrow">Resume Quest</ChunkyButton>
              <div className="flex items-center gap-3">
                <div className="w-32"><ProgressBar value={65} tone="gold" className="bg-white/20" /></div>
                <span className="font-black">65%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Language courses */}
      <section>
        <SectionTitle icon="translate" title="Choose Your Language Kingdom" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[32px] bg-white p-5 border-4 border-white shadow-[0_10px_30px_rgba(15,42,138,0.1)] flex flex-col hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E8EDFF] flex items-center justify-center text-3xl">{c.flag}</div>
                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide text-white" style={{ backgroundColor: c.tagColor }}>{c.tag}</span>
              </div>
              <h3 className="text-2xl font-black text-[#0F2A8A] mb-1">{c.name}</h3>
              <p className="text-sm font-semibold text-[#0F2A8A]/60 mb-4">{c.note}</p>
              <div className="space-y-3 mb-5">
                {c.units.map((u) => (
                  <div key={u.name} className="bg-[#0F2A8A]/5 rounded-2xl p-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-black text-sm text-[#0F2A8A]">{u.name}</span>
                      <span className="text-xs font-black text-[#0F2A8A]/60">{u.state}</span>
                    </div>
                    <ProgressBar value={u.progress} tone={u.progress === 100 ? "green" : "gold"} className="h-2.5" />
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <ChunkyButton variant="blue" fullWidth rightIcon="arrow_forward">Enter Course</ChunkyButton>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming */}
        <section className="lg:col-span-2">
          <SectionTitle icon="event_upcoming" title="Upcoming Lessons" />
          <div className="space-y-4">
            {upcoming.map((u) => (
              <div key={u.title} className="flex items-center gap-4 p-4 bg-white rounded-[28px] border-4 border-white shadow-[0_8px_20px_rgba(15,42,138,0.08)] hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 border-4 border-white shadow-sm" style={{ backgroundColor: `${u.color}22` }}>{u.emoji}</div>
                <div className="flex-1">
                  <h4 className="font-black text-[#0F2A8A]">{u.title}</h4>
                  <p className="text-sm font-semibold text-[#0F2A8A]/60">{u.meta}</p>
                </div>
                <span className="flex items-center gap-1 bg-[#FFF6E2] text-[#d97706] px-3 py-1 rounded-full text-sm font-black shrink-0">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  {u.xp}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent badges */}
        <section>
          <SectionTitle icon="military_tech" title="Recent Badges" />
          <div className="rounded-[28px] bg-white p-5 border-4 border-white shadow-[0_8px_20px_rgba(15,42,138,0.08)]">
            <div className="grid grid-cols-2 gap-3">
              {recentBadges.map((b) => (
                <div key={b.name} className={`rounded-2xl p-3 text-center flex flex-col items-center gap-1.5 ${b.owned ? "bg-[#FFF6E2]" : "bg-[#0F2A8A]/5"}`}>
                  <div className={`text-3xl ${b.owned ? "" : "grayscale opacity-50"}`}>{b.emoji}</div>
                  <p className="text-[10px] font-black uppercase text-[#0F2A8A]/70">{b.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <ChunkyButton variant="white" fullWidth>View Hall of Fame</ChunkyButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
