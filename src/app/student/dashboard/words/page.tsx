"use client";

import { useState } from "react";
import { useLanguage, type Lang } from "@/lib/i18n";

type Word = { emoji: string; en: string; fr: string; ar: string; color: string; category: string };

const WORDS: Word[] = [
  { emoji: "🍎", en: "Apple", fr: "Pomme", ar: "تفّاحة", color: "text-red-500 bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20", category: "Food" },
  { emoji: "🐱", en: "Cat", fr: "Chat", ar: "قطّة", color: "text-orange-500 bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20", category: "Animals" },
  { emoji: "☀️", en: "Sun", fr: "Soleil", ar: "شمس", color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20", category: "Nature" },
  { emoji: "🏠", en: "House", fr: "Maison", ar: "منزل", color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20", category: "Places" },
  { emoji: "📖", en: "Book", fr: "Livre", ar: "كتاب", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20", category: "Objects" },
  { emoji: "💧", en: "Water", fr: "Eau", ar: "ماء", color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-100 dark:border-cyan-500/20", category: "Nature" },
  { emoji: "🌸", en: "Flower", fr: "Fleur", ar: "زهرة", color: "text-pink-500 bg-pink-50 dark:bg-pink-500/10 border-pink-100 dark:border-pink-500/20", category: "Nature" },
  { emoji: "⭐", en: "Star", fr: "Étoile", ar: "نجمة", color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 border-yellow-100 dark:border-yellow-500/20", category: "Nature" },
];

const speechLang: Record<Lang, string> = { en: "en-US", fr: "fr-FR", ar: "ar-SA" };

export default function WordsPage() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Nature", "Animals", "Food", "Places", "Objects"];

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = speechLang[lang];
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }

  const filteredWords = filter === "All" ? WORDS : WORDS.filter(w => w.category === filter);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 px-3 py-1 rounded-full font-bold text-xs mb-2 uppercase tracking-wider border border-amber-100 dark:border-amber-500/20">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Magic Words
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            {t("words.title")}
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">{t("words.tapToHear")}</p>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Search words..." 
            className="px-4 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${
              filter === c 
                ? "bg-blue-600 text-white border-blue-600" 
                : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Flashcard Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredWords.map((w, i) => (
          <div 
            key={i} 
            onClick={() => speak(w[lang])}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-md transition-all group"
          >
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-5xl border ${w.color} group-hover:scale-105 transition-transform`}>
              {w.emoji}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{w[lang]}</h3>
              <p className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mt-1">{w.category}</p>
            </div>
            <div className="mt-2 w-10 h-10 bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 rounded-full flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <span className="material-symbols-outlined text-[20px]">volume_up</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
