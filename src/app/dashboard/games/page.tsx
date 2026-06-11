"use client";

import { motion } from "framer-motion";
import { ChunkyButton, Floaty } from "@/components/leo/ui";

type Game = {
  id: number;
  title: string;
  category: string;
  level: number;
  xp: number;
  color: string;
  emoji: string;
};

const featuredGames: Game[] = [
  { id: 1, title: "Word Journey", category: "Vocabulary", level: 5, xp: 50, color: "bg-[#EAE6FF]", emoji: "🔠" },
  { id: 2, title: "Grammar Quest", category: "Grammar", level: 8, xp: 120, color: "bg-[#FFE8F0]", emoji: "🧩" },
];

const recentlyPlayed: Game[] = [
  { id: 3, title: "Sentence Builder", category: "Grammar", level: 6, xp: 80, color: "bg-[#E2F4FB]", emoji: "🏗️" },
  { id: 4, title: "Sound Explorer", category: "Phonics", level: 4, xp: 45, color: "bg-[#E6F6E8]", emoji: "🔊" },
  { id: 5, title: "Memory Match", category: "Memory", level: 3, xp: 60, color: "bg-[#FFF6E2]", emoji: "🧠" },
];

const recommendedGames: Game[] = [
  { id: 6, title: "Alphabet Bubbles", category: "Alphabet", level: 1, xp: 20, color: "bg-[#E2F4FB]", emoji: "🫧" },
  { id: 7, title: "Number Train", category: "Numbers", level: 2, xp: 35, color: "bg-[#FFE8F0]", emoji: "🚂" },
  { id: 8, title: "Color Splash", category: "Creativity", level: 1, xp: 25, color: "bg-[#EAE6FF]", emoji: "🎨" },
];

const categories = [
  { name: "Alphabet", emoji: "🔤", color: "text-blue-500 bg-blue-50 border-blue-100" },
  { name: "Numbers", emoji: "🔢", color: "text-green-500 bg-green-50 border-green-100" },
  { name: "Languages", emoji: "🌍", color: "text-purple-500 bg-purple-50 border-purple-100" },
  { name: "Puzzle", emoji: "🧩", color: "text-orange-500 bg-orange-50 border-orange-100" },
  { name: "Creativity", emoji: "🎨", color: "text-pink-500 bg-pink-50 border-pink-100" },
  { name: "Memory", emoji: "🧠", color: "text-teal-500 bg-teal-50 border-teal-100" },
];

export default function GameCenterPage() {
  const GameCard = ({ game }: { game: Game }) => (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-[32px] p-5 shadow-[0_8px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)] border-2 border-gray-100 flex flex-col shrink-0 w-64 group cursor-pointer transition-all"
    >
      <div className={`w-full h-32 ${game.color} rounded-2xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform duration-300`}>
        {game.emoji}
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-extrabold text-[#0F2A8A] leading-tight">{game.title}</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{game.category}</span>
        <div className="flex items-center gap-1 text-[#F5B21B] font-bold text-xs bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
          Lvl {game.level} <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-extrabold text-[#0F2A8A] bg-blue-50 px-3 py-1.5 rounded-full text-sm">+{game.xp} XP</span>
        <button className="w-10 h-10 bg-[#4CAF50] text-white rounded-full flex items-center justify-center shadow-[0_4px_0_#357a38] active:translate-y-1 active:shadow-none transition-all">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section (Max 250px) */}
      <section className="w-full relative h-[220px] rounded-[36px] bg-gradient-to-br from-[#EAE6FF] to-[#c7b8ff] p-6 md:p-8 flex items-center justify-between overflow-hidden border-4 border-white shadow-[0_10px_30px_rgba(124,58,237,0.2)]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circles-and-angles.png')] opacity-20 mix-blend-overlay"></div>
        <Floaty className="absolute top-4 right-1/4 text-4xl opacity-70" duration={3}>🎮</Floaty>
        <Floaty className="absolute bottom-6 right-1/3 text-3xl opacity-70" duration={4} delay={1}>🎲</Floaty>
        
        <div className="relative z-10 max-w-[60%]">
          <div className="inline-flex items-center gap-1 bg-white/40 text-[#4C1D95] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
             <span className="text-[14px]">⭐</span> Play & Learn
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#4C1D95] leading-tight drop-shadow-sm mb-1">Game Center</h1>
          <p className="text-[#4C1D95]/80 font-bold text-base md:text-lg">Play, Learn and Grow with Leo</p>
        </div>
        
        {/* Leo playing emoji */}
        <div className="relative z-10 flex items-center shrink-0">
          <div className="text-[100px] md:text-[130px] leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] select-none">🦁</div>
          <motion.div animate={{ rotate: [0, 15, -15, 0], y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-6xl absolute -right-4 bottom-0 drop-shadow-lg">
            🎮
          </motion.div>
        </div>
      </section>

      {/* Featured Games */}
      <section>
        <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6 flex items-center gap-2">
          <span className="text-3xl">🏆</span> Featured Games
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
          {featuredGames.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className={`${cat.color} border-2 rounded-[24px] p-4 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm`}>
              <span className="text-4xl">{cat.emoji}</span>
              <span className="font-extrabold text-sm">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#F5B21B] text-3xl">history</span> Recently Played
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
          {recentlyPlayed.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      </section>

      {/* Recommended Games */}
      <section>
        <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6 flex items-center gap-2">
          <span className="text-3xl">✨</span> Recommended Games
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
          {recommendedGames.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      </section>
    </div>
  );
}
