"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LANGUAGES, useLanguage } from "@/lib/i18n";
import { ChunkyButton, StatCard, SectionTitle, ProgressBar, Floaty } from "@/components/leo/ui";

const worlds = [
  { href: "/dashboard/words", name: "Vocabulary Forest", icon: "forest", color: "#4CAF50", progress: 80, status: "play" },
  { href: "/dashboard/lessons", name: "Grammar Castle", icon: "castle", color: "#0F2A8A", progress: 45, status: "play" },
  { href: "/dashboard/games", name: "Speaking Ocean", icon: "water", color: "#38BDF8", progress: 20, status: "play" },
  { href: "#", name: "Language Galaxy", icon: "rocket", color: "#7C3AED", progress: 0, status: "locked" },
  { href: "#", name: "Fluency Mountain", icon: "landscape", color: "#475569", progress: 0, status: "locked" },
] as const;

const tiles = [
  { href: "/dashboard/stories", icon: "auto_stories", titleKey: "nav.library", descKey: "card.stories", color: "#7C3AED" },
  { href: "/dashboard/games", icon: "sports_esports", titleKey: "nav.games", descKey: "card.games", color: "#EC4899" },
  { href: "/dashboard/tutor", icon: "pets", titleKey: "nav.tutor", descKey: "card.tutor", color: "#F5B21B" },
  { href: "/dashboard/achievements", icon: "emoji_events", titleKey: "nav.rewards", descKey: "card.rewards", color: "#38BDF8" },
] as const;

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Welcome hero — Leo greets the explorer */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0F2A8A] to-[#1e3fb8] p-6 md:p-10 text-white shadow-[0_20px_50px_rgba(15,42,138,0.3)] border-4 border-white"
      >
        <Floaty className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <Floaty className="absolute top-6 right-10 text-[#F5B21B] text-5xl" duration={5}>
          <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        </Floaty>

        <div className="relative z-10 flex items-center gap-4">
          <motion.span
            animate={{ rotate: [0, -8, 0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="material-symbols-outlined text-[64px] md:text-[88px] text-[#F5B21B] drop-shadow-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            pets
          </motion.span>
          <div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight drop-shadow-sm">
              {t("home.hello", { name: "Alex" })}
            </h1>
            <p className="text-lg md:text-xl text-white/85 mt-1 font-semibold">{t("home.sub")}</p>
          </div>
        </div>

        <div className="relative z-10 mt-6">
          <ChunkyButton href="/dashboard/words" variant="gold" leftIcon="play_circle">
            {t("home.continue")}
          </ChunkyButton>
        </div>
      </motion.section>

      {/* Stats row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="star" value="1,240" label="XP" tone="gold" />
        <StatCard icon="workspace_premium" value="8" label="Badges" tone="pink" />
        <StatCard icon="menu_book" value="124" label="Words" tone="green" />
        <StatCard icon="local_fire_department" value="12" label="Day Streak" tone="sky" />
      </section>

      {/* Learning Worlds — the adventure map */}
      <section>
        <SectionTitle icon="map" title="Your Adventure Map" subtitle="Explore worlds and unlock new lands!" />
        <div className="relative rounded-[36px] bg-gradient-to-b from-[#E2F4FB] to-[#E6F6E8] p-5 md:p-8 border-4 border-white shadow-inner overflow-hidden">
          {/* dotted path */}
          <div className="absolute inset-x-10 top-1/2 hidden lg:block -translate-y-1/2 border-t-4 border-dashed border-[#0F2A8A]/15" />
          <Floaty className="absolute top-6 right-12 hidden md:block" duration={6}>
            <span className="text-5xl">☁️</span>
          </Floaty>

          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {worlds.map((w, i) => {
              const locked = w.status === "locked";
              const Inner = (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="relative w-24 h-24 md:w-28 md:h-28 rounded-[32px] flex items-center justify-center border-4 border-white shadow-xl transition-transform hover:-translate-y-2"
                    style={{ backgroundColor: w.color }}
                  >
                    {locked && (
                      <div className="absolute inset-0 rounded-[28px] bg-black/35 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-3xl">lock</span>
                      </div>
                    )}
                    <span className="material-symbols-outlined text-white text-[44px] md:text-[52px] drop-shadow" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {w.icon}
                    </span>
                  </div>
                  <h3 className="mt-3 font-black text-[#0F2A8A] text-sm md:text-base leading-tight">{w.name}</h3>
                  {locked ? (
                    <span className="mt-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0F2A8A]/40">Locked</span>
                  ) : (
                    <div className="mt-2 w-20 md:w-24">
                      <ProgressBar value={w.progress} tone="gold" className="h-2.5" />
                    </div>
                  )}
                </motion.div>
              );
              return locked ? (
                <div key={w.name} className="cursor-not-allowed opacity-90">{Inner}</div>
              ) : (
                <Link key={w.name} href={w.href}>{Inner}</Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pick a language */}
      <section>
        <SectionTitle icon="translate" title={t("home.pickLanguage")} />
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {LANGUAGES.map((l, i) => (
            <motion.div key={l.code} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.08 }}>
              <Link
                href="/dashboard/words"
                className="flex flex-col items-center gap-2 rounded-[28px] bg-white p-4 md:p-5 border-2 border-[#0F2A8A]/5 shadow-[0_6px_0_rgba(15,42,138,0.08)] hover:-translate-y-1 hover:shadow-[0_8px_0_rgba(15,42,138,0.12)] active:translate-y-1 active:shadow-none transition-all"
              >
                <span className="text-5xl leading-none">{l.flag}</span>
                <span className="font-black text-[15px] md:text-[17px] text-[#0F2A8A] text-center">{l.native}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick activity tiles */}
      <section>
        <SectionTitle icon="rocket_launch" title="What do you want to do?" />
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {tiles.map((tile, i) => (
            <motion.div key={tile.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
              <Link
                href={tile.href}
                className="group flex flex-col gap-3 rounded-[28px] p-5 md:p-6 text-white h-full border-4 border-white shadow-lg hover:-translate-y-1 active:scale-95 transition-all"
                style={{ backgroundColor: tile.color }}
              >
                <span className="material-symbols-outlined text-[40px] drop-shadow group-hover:scale-110 transition-transform w-fit" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {tile.icon}
                </span>
                <div>
                  <p className="font-black text-lg md:text-xl">{t(tile.titleKey)}</p>
                  <p className="text-sm font-semibold text-white/85">{t(tile.descKey)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Daily goal */}
      <section className="rounded-[32px] bg-white p-5 md:p-7 border-4 border-white shadow-[0_10px_30px_rgba(15,42,138,0.08)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F5B21B] text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
            <h3 className="text-xl font-black text-[#0F2A8A]">{t("home.dailyGoal")}</h3>
          </div>
          <span className="font-black text-[#F5B21B] bg-[#FFF6E2] px-3 py-1 rounded-full text-sm">{t("home.tasksDone", { done: 3, total: 4 })}</span>
        </div>
        <ProgressBar value={75} tone="gold" className="h-5" />
        <p className="text-[#0F2A8A]/70 font-semibold mt-3">{t("home.keepGoing")}</p>
      </section>
    </div>
  );
}
