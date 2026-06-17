"use client";

import { motion } from "framer-motion";
import { SectionTitle, Floaty, ChunkyButton } from "@/components/leo/ui";

const games = [
  { id: 1, title: "Vocabulary Safari", type: "Vocabulary", emoji: "🦒", color: "#4CAF50", stars: 2, description: "Explore the wild jungle and identify exotic animals to expand your word bank.", xp: 150 },
  { id: 2, title: "Word Matcher", type: "Memory", emoji: "🧩", color: "#7C3AED", stars: 3, description: "Connect matching pairs of words and pictures before the timer runs out!", xp: 200 },
  { id: 3, title: "Sound Echo", type: "Speaking", emoji: "🔊", color: "#38BDF8", stars: 1, description: "Listen to Leo and repeat the sounds to master your pronunciation.", xp: 100 },
  { id: 4, title: "Memory Flip", type: "Memory", emoji: "🎴", color: "#EC4899", stars: 3, description: "Test your focus! Flip the cards and find all the matching animal friends.", xp: 180 },
  { id: 5, title: "Letter Lava", type: "Vocabulary", emoji: "🌋", color: "#F5B21B", stars: 2, description: "Hop across letter stones to spell words before the lava rises!", xp: 160 },
  { id: 6, title: "Rhyme Time", type: "Speaking", emoji: "🎵", color: "#0F2A8A", stars: 2, description: "Find the rhyming words and sing along with Leo's band.", xp: 140 },
];

export default function GameCenterLibraryPage() {
  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#0F2A8A] to-[#7C3AED] p-6 md:p-10 text-white border-4 border-white shadow-[0_20px_50px_rgba(15,42,138,0.3)]"
      >
        <Floaty className="absolute top-8 right-12 text-6xl hidden md:block" duration={5}>🎮</Floaty>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#F5B21B] text-[#0F2A8A] rounded-full text-xs font-black uppercase tracking-wider mb-4 animate-bounce">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            Live Challenge
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">Word Safari: Jungle Mystery</h1>
          <p className="text-white/85 text-base md:text-lg mb-6 font-semibold">Complete 5 games this week to unlock the Jungle King crown and 500 bonus XP!</p>
          <ChunkyButton variant="gold" leftIcon="play_arrow">Play Now</ChunkyButton>
        </div>
      </motion.section>

      <SectionTitle icon="grid_view" title="Game Library" subtitle="All your favourite mini-games in one place" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-[32px] bg-white border-4 border-white shadow-[0_10px_30px_rgba(15,42,138,0.1)] overflow-hidden flex flex-col hover:-translate-y-1.5 transition-transform cursor-pointer"
          >
            <div className="relative h-40 flex items-center justify-center overflow-hidden" style={{ backgroundColor: game.color }}>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
              <span className="text-7xl drop-shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform">{game.emoji}</span>
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide text-[#0F2A8A]">{game.type}</span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-xl font-black text-[#0F2A8A] leading-tight">{game.title}</h3>
                <div className="flex shrink-0">
                  {[0, 1, 2].map((s) => (
                    <span key={s} className={`material-symbols-outlined text-[18px] ${s < game.stars ? "text-[#F5B21B]" : "text-[#0F2A8A]/15"}`} style={{ fontVariationSettings: s < game.stars ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                  ))}
                </div>
              </div>
              <p className="text-sm font-medium text-[#0F2A8A]/60 mb-4 flex-grow line-clamp-2">{game.description}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 bg-[#FFF6E2] text-[#d97706] px-3 py-1 rounded-full text-sm font-black">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  +{game.xp}
                </span>
                <span className="w-11 h-11 rounded-full bg-[#0F2A8A] text-white flex items-center justify-center shadow-[0_4px_0_#0a1d61] group-hover:bg-[#F5B21B] group-hover:text-[#0F2A8A] group-hover:shadow-[0_4px_0_#d97706] transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
