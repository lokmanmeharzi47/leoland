"use client";

import { motion } from "framer-motion";

const games = [
  { id: 1, title: "Vocabulary Safari", type: "Vocabulary", emoji: "🦒", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10", stars: 2, description: "Explore the wild jungle and identify exotic animals to expand your word bank.", xp: 150 },
  { id: 2, title: "Word Matcher", type: "Memory", emoji: "🧩", color: "text-purple-500 bg-purple-50 dark:bg-purple-500/10", stars: 3, description: "Connect matching pairs of words and pictures before the timer runs out!", xp: 200 },
  { id: 3, title: "Sound Echo", type: "Speaking", emoji: "🔊", color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10", stars: 1, description: "Listen to Leo and repeat the sounds to master your pronunciation.", xp: 100 },
  { id: 4, title: "Memory Flip", type: "Memory", emoji: "🎴", color: "text-pink-500 bg-pink-50 dark:bg-pink-500/10", stars: 3, description: "Test your focus! Flip the cards and find all the matching animal friends.", xp: 180 },
  { id: 5, title: "Letter Lava", type: "Vocabulary", emoji: "🌋", color: "text-orange-500 bg-orange-50 dark:bg-orange-500/10", stars: 2, description: "Hop across letter stones to spell words before the lava rises!", xp: 160 },
  { id: 6, title: "Rhyme Time", type: "Speaking", emoji: "🎵", color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10", stars: 2, description: "Find the rhyming words and sing along with Leo's band.", xp: 140 },
];

export default function GameCenterLibraryPage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Game Library
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">All your favourite educational mini-games in one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Search games..." 
            className="px-4 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Live Challenge Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-sm flex items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Live Challenge
          </span>
          <h2 className="text-3xl font-bold mb-2">Word Safari: Jungle Mystery</h2>
          <p className="text-indigo-100 mb-6 text-lg">Complete 5 games this week to unlock the Jungle King crown and 500 bonus XP!</p>
          <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">play_circle</span> Play Now
          </button>
        </div>
        <div className="hidden md:block relative z-10 text-8xl opacity-90 drop-shadow-lg">🦒</div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, i) => (
          <div key={game.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all cursor-pointer group">
            <div className={`h-40 flex items-center justify-center text-6xl relative ${game.color}`}>
              <span className="group-hover:scale-110 transition-transform">{game.emoji}</span>
              <span className="absolute top-3 left-3 bg-white/90 dark:bg-black/50 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200 shadow-sm">
                {game.type}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{game.title}</h3>
                <div className="flex shrink-0 gap-0.5">
                  {[0, 1, 2].map((s) => (
                    <span key={s} className={`material-symbols-outlined text-[16px] ${s < game.stars ? "text-orange-500" : "text-slate-200 dark:text-zinc-700"}`} style={{ fontVariationSettings: s < game.stars ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6 flex-grow">{game.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
                <span className="flex items-center gap-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-md text-xs font-bold">
                  +{game.xp} XP
                </span>
                <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
