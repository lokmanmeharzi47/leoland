"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LANGUAGES, useLanguage } from "@/lib/i18n";

const tiles = [
  { href: "/dashboard/stories", icon: "auto_stories", titleKey: "nav.stories", descKey: "card.stories", color: "bg-tertiary-container text-on-tertiary-container" },
  { href: "/dashboard/games", icon: "sports_esports", titleKey: "nav.games", descKey: "card.games", color: "bg-primary-container text-on-primary-container" },
  { href: "/dashboard/words", icon: "style", titleKey: "nav.words", descKey: "card.words", color: "bg-secondary-container text-on-secondary-container" },
  { href: "/dashboard/tutor", icon: "pets", titleKey: "nav.tutor", descKey: "card.tutor", color: "bg-tertiary text-on-tertiary" },
] as const;

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-lg">
      {/* Welcome + Leo */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[32px] bg-primary text-on-primary p-lg md:p-xl shadow-xl"
      >
        <div className="absolute -top-8 -end-8 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex items-center gap-4">
          <motion.span
            animate={{ rotate: [0, -8, 0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="material-symbols-outlined text-[64px] md:text-[88px] text-secondary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            pets
          </motion.span>
          <div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight">
              {t("home.hello", { name: "Alex" })}
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary/85 mt-1">{t("home.sub")}</p>
          </div>
        </div>

        <Link
          href="/dashboard/words"
          className="relative z-10 mt-lg inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-xl py-md rounded-2xl font-display-lg text-headline-sm shadow-lg active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
          {t("home.start")}
        </Link>
      </motion.section>

      {/* Pick a language to learn */}
      <section>
        <h2 className="font-headline-sm text-headline-sm text-on-surface mb-md px-1">{t("home.pickLanguage")}</h2>
        <div className="grid grid-cols-3 gap-md">
          {LANGUAGES.map((l, i) => (
            <motion.div
              key={l.code}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <Link
                href="/dashboard/words"
                className="flex flex-col items-center gap-2 bg-surface-container-lowest rounded-3xl p-md shadow-sm border border-outline-variant/10 active:scale-95 hover:-translate-y-1 transition-all"
              >
                <span className="text-5xl leading-none">{l.flag}</span>
                <span className="font-headline-sm text-[16px] md:text-[18px] text-on-surface text-center">{l.native}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Big activity tiles */}
      <section className="grid grid-cols-2 gap-md">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
          >
            <Link
              href={tile.href}
              className={`flex flex-col gap-3 ${tile.color} rounded-3xl p-lg shadow-md active:scale-95 hover:-translate-y-1 transition-all h-full`}
            >
              <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>{tile.icon}</span>
              <div>
                <p className="font-headline-sm text-[18px]">{t(tile.titleKey)}</p>
                <p className="text-body-sm opacity-90">{t(tile.descKey)}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Daily goal */}
      <section className="bg-surface-container-lowest rounded-3xl p-lg shadow-sm border border-outline-variant/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-headline-sm text-on-surface">{t("home.dailyGoal")}</h3>
          <span className="font-bold text-primary">{t("home.tasksDone", { done: 3, total: 4 })}</span>
        </div>
        <div className="h-5 w-full bg-surface-container-high rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-full bg-secondary-container rounded-full"
          />
        </div>
        <p className="text-body-md text-on-surface-variant mt-3">{t("home.keepGoing")}</p>
      </section>
    </div>
  );
}
