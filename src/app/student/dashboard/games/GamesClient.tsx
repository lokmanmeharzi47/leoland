"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Game = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  difficulty: string;
  xp_reward: number;
  status: string;
};

type Session = {
  id: string;
  game_id: string;
  score: number;
  completed_at: string;
};

const categoryTheme: Record<string, { emoji: string, color: string }> = {
  Vocabulary: { emoji: "🔠", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600" },
  Grammar: { emoji: "🧩", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600" },
  Phonics: { emoji: "🔊", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" },
  Memory: { emoji: "🧠", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" },
  Alphabet: { emoji: "🔤", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
  Numbers: { emoji: "🔢", color: "bg-green-100 dark:bg-green-900/30 text-green-600" },
  Languages: { emoji: "🌍", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600" },
  Puzzle: { emoji: "🧩", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" },
  Creativity: { emoji: "🎨", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600" },
  Default: { emoji: "🎮", color: "bg-slate-100 dark:bg-slate-800 text-slate-600" }
};

export default function GamesClient({ games, sessions }: { games: Game[], sessions: Session[] }) {
  // Sort recently played by looking at sessions
  const recentlyPlayedIds = new Set(sessions.map(s => s.game_id));
  const recentlyPlayedGames = games.filter(g => recentlyPlayedIds.has(g.id)).slice(0, 5);
  
  // Featured game could be the first one, or randomly selected, or highest XP reward
  const featuredGame = games.length > 0 ? games.reduce((prev, current) => (prev.xp_reward > current.xp_reward) ? prev : current) : null;

  const categories = [
    { name: "Alphabet", emoji: "🔤", color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20" },
    { name: "Numbers", emoji: "🔢", color: "text-green-500 bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20" },
    { name: "Languages", emoji: "🌍", color: "text-purple-500 bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/20" },
    { name: "Puzzle", emoji: "🧩", color: "text-orange-500 bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20" },
    { name: "Creativity", emoji: "🎨", color: "text-pink-500 bg-pink-50 dark:bg-pink-500/10 border-pink-100 dark:border-pink-500/20" },
    { name: "Memory", emoji: "🧠", color: "text-teal-500 bg-teal-50 dark:bg-teal-500/10 border-teal-100 dark:border-teal-500/20" },
  ];

  const GameCard = ({ game }: { game: Game }) => {
    const theme = categoryTheme[game.category] || categoryTheme.Default;
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col shrink-0 w-64 hover:border-blue-200 dark:hover:border-blue-900 transition-colors group cursor-pointer">
        <div className={`w-full h-32 ${theme.color} rounded-xl flex items-center justify-center text-5xl mb-4`}>
          {theme.emoji}
        </div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate" title={game.title}>{game.title}</h3>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{game.category}</span>
          <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold text-xs bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded capitalize">
            {game.difficulty}
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-zinc-800 pt-4">
          <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-md text-xs">+{game.xp_reward} XP</span>
          <button className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            Game Center <span className="text-4xl">🎮</span>
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Play, Learn and Grow with educational mini-games.</p>
        </div>
        <Link href="/student/dashboard/games/library" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-800 px-4 py-2 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
           View Full Library
        </Link>
      </div>

      {/* Featured Banner */}
      {featuredGame && (
        <div className="bg-purple-600 dark:bg-purple-700 rounded-2xl p-8 text-white shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 bg-white/20 text-purple-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Game of the Week
            </div>
            <h2 className="text-3xl font-bold mb-2">{featuredGame.title}</h2>
            <p className="text-purple-100 mb-6 max-w-md">{featuredGame.description || "Embark on an epic journey through this educational adventure!"}</p>
            <button className="bg-white text-purple-600 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors inline-flex items-center gap-2">
               <span className="material-symbols-outlined text-xl">play_circle</span> Play Now
            </button>
          </div>
          <div className="relative z-10 text-8xl mt-6 md:mt-0">{categoryTheme[featuredGame.category]?.emoji || "🧩"}</div>
        </div>
      )}

      {/* Categories */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className={`border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-sm transition-shadow`}>
              <span className="text-3xl mb-1">{cat.emoji}</span>
              <span className="font-semibold text-slate-900 dark:text-white text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured / Recently Played */}
      {recentlyPlayedGames.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Jump Back In</h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide snap-x">
            {recentlyPlayedGames.map(game => <GameCard key={game.id} game={game} />)}
          </div>
        </section>
      )}

      {recentlyPlayedGames.length === 0 && games.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Start Playing</h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide snap-x">
            {games.slice(0, 5).map(game => <GameCard key={game.id} game={game} />)}
          </div>
        </section>
      )}
      
      {games.length === 0 && (
         <div className="text-center py-12">
           <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No games available yet.</h3>
           <p className="text-slate-500 mt-2">Check back later for new games!</p>
         </div>
      )}
    </div>
  );
}
