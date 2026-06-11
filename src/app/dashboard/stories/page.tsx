"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChunkyButton, ProgressBar, Floaty } from "@/components/leo/ui";

type Book = {
  id: number;
  title: string;
  emoji: string;
  color: string;
  level: string;
  minutes: number;
  progress?: number;
  audio?: boolean;
  tag?: string;
};

const continueReading: Book[] = [
  { id: 1, title: "Leo's Galactic Quest", emoji: "🚀", color: "from-[#0F2A8A] to-[#38BDF8]", level: "Lvl 1", minutes: 8, progress: 75, audio: true },
  { id: 5, title: "The Pumpkin Palace", emoji: "🎃", color: "from-[#EC4899] to-[#BE185D]", level: "Lvl 1", minutes: 9, progress: 25, audio: true },
];

const featuredStories: Book[] = [
  { id: 2, title: "Leo & the Lost Word", emoji: "🔤", color: "from-[#F5B21B] to-[#FF8A00]", level: "Lvl 1", minutes: 6, progress: 0, audio: true },
  { id: 10, title: "The Moon Bunny", emoji: "🌙", color: "from-[#7C3AED] to-[#5B21B6]", level: "Lvl 1", minutes: 6 },
  { id: 15, title: "Coral the Brave", emoji: "🐠", color: "from-[#4CAF50] to-[#16A34A]", level: "Lvl 2", minutes: 8 },
];

const recommendedStories: Book[] = [
  { id: 8, title: "Three Little Wishes", emoji: "🪄", color: "from-[#F5B21B] to-[#D97706]", level: "Lvl 2", minutes: 7 },
  { id: 11, title: "Rocket to Mars", emoji: "🛸", color: "from-[#EC4899] to-[#E11D48]", level: "Lvl 3", minutes: 12, audio: true },
  { id: 14, title: "The Big Blue Whale", emoji: "🐋", color: "from-[#0F2A8A] to-[#1D4ED8]", level: "Lvl 1", minutes: 6, audio: true },
];

const categories = [
  { icon: "pets", title: "Leo Adventures", color: "bg-[#EAE6FF] text-[#7C3AED]" },
  { icon: "castle", title: "Fairy Tales", color: "bg-[#FFE8F0] text-[#EC4899]" },
  { icon: "rocket", title: "Space Stories", color: "bg-[#E2F4FB] text-[#38BDF8]" },
  { icon: "water", title: "Ocean Stories", color: "bg-[#E6F6E8] text-[#4CAF50]" },
];

export default function LibraryPage() {
  const [lang, setLang] = useState("English");

  const BookCard = ({ b }: { b: Book }) => (
    <motion.div
      whileHover={{ y: -8 }}
      className="shrink-0 w-60 group cursor-pointer"
    >
      <div className={`relative h-64 rounded-[32px] bg-gradient-to-br ${b.color} p-5 shadow-[0_12px_24px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col overflow-hidden border-4 border-white`}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-auto">
             {b.audio && (
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-black text-white border border-white/30 shadow-sm">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                Audio
              </span>
            )}
            <span className="inline-block px-2.5 py-1 bg-black/20 rounded-full text-[11px] font-black text-white uppercase tracking-wider ml-auto">
               {b.level}
            </span>
          </div>

          <div className="flex items-center justify-center flex-grow py-4">
            <span className="text-7xl drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">{b.emoji}</span>
          </div>

          <div className="mt-auto">
             <h4 className="font-extrabold text-white text-lg leading-tight line-clamp-2 drop-shadow-md">{b.title}</h4>
          </div>
        </div>
      </div>
      
      <div className="mt-4 px-2 space-y-3">
        {typeof b.progress === "number" && b.progress > 0 && b.progress < 100 ? (
          <div>
            <div className="flex justify-between text-xs font-bold text-[#0F2A8A]/60 mb-1.5">
              <span>In progress</span>
              <span>{b.progress}%</span>
            </div>
            <ProgressBar value={b.progress} tone="gold" className="h-2.5" />
          </div>
        ) : (
          <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#0F2A8A]/50 bg-gray-50 py-2 rounded-xl border border-gray-100">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {b.minutes} min read
          </p>
        )}
        <button className="w-full py-2.5 bg-[#F5B21B] text-[#0F2A8A] font-extrabold text-sm rounded-full shadow-[0_4px_0_#d97706] active:translate-y-1 active:shadow-none transition-all">
          Read Now
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-12 pb-12">
      {/* Compact Hero Section (Max 250px height) */}
      <section className="w-full relative h-[220px] rounded-[36px] bg-gradient-to-br from-[#0F2A8A] to-[#6366f1] p-6 md:p-8 flex items-center justify-between overflow-hidden border-4 border-white shadow-[0_10px_30px_rgba(15,42,138,0.2)]">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
        <Floaty className="absolute top-6 right-1/4 text-3xl opacity-60" duration={4}>📖</Floaty>
        <Floaty className="absolute bottom-4 right-1/3 text-2xl opacity-60" duration={5} delay={1}>⭐</Floaty>
        <Floaty className="absolute top-8 right-12 text-4xl opacity-80" duration={6} delay={2}>✨</Floaty>
        
        <div className="relative z-10 max-w-[60%]">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md mb-2">Story Library</h1>
          <p className="text-blue-100 font-semibold text-base md:text-lg">Discover magical adventures with Leo</p>
        </div>
        
        {/* Leo reading emoji */}
        <div className="relative z-10 text-[100px] md:text-[130px] leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] select-none shrink-0">
          🦁<span className="absolute bottom-0 right-0 text-5xl">📖</span>
        </div>
      </section>

      {/* Story of the Day */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-3xl text-[#F5B21B]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <h2 className="text-2xl font-extrabold text-[#0F2A8A]">Story of the Day</h2>
        </div>
        <div className="bg-gradient-to-r from-[#FFF6E2] to-[#FFE8F0] rounded-[32px] p-6 border-2 border-white shadow-lg flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 bg-[#F5B21B] rounded-[24px] flex items-center justify-center text-7xl shadow-inner shadow-white/50 border-4 border-white shrink-0">
            🌟
          </div>
          <div className="flex-1">
            <span className="inline-block px-3 py-1 bg-white text-[#d97706] rounded-full text-xs font-black uppercase tracking-wider mb-2 shadow-sm border border-[#F5B21B]/30">New Adventure</span>
            <h3 className="text-2xl font-extrabold text-[#0F2A8A] mb-2">The Wishing Star</h3>
            <p className="text-[#4B5563] font-medium text-sm md:text-base mb-4">A beautiful tale about hoping, dreaming, and the magic of friendship.</p>
            <div className="flex gap-3">
              <ChunkyButton variant="gold" leftIcon="play_arrow" className="py-2.5 px-6 text-sm">Read Now</ChunkyButton>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Reading */}
      <section>
        <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6">Continue Reading</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
          {continueReading.map(book => <BookCard key={book.id} b={book} />)}
        </div>
      </section>

      {/* Story Categories */}
      <section>
        <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className={`${cat.color} rounded-[24px] p-4 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm border-2 border-white`}>
              <span className="material-symbols-outlined text-[32px]">{cat.icon}</span>
              <span className="font-extrabold text-sm text-center">{cat.title}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Stories */}
      <section>
        <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6">Featured Stories</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
          {featuredStories.map(book => <BookCard key={book.id} b={book} />)}
        </div>
      </section>

      {/* Recommended Stories */}
      <section>
        <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6">Recommended for You</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
          {recommendedStories.map(book => <BookCard key={book.id} b={book} />)}
        </div>
      </section>
    </div>
  );
}
