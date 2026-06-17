"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Lang } from "@/lib/i18n";

type Word = { emoji: string; en: string; fr: string; ar: string; color: string };

const WORDS: Word[] = [
  { emoji: "🍎", en: "Apple", fr: "Pomme", ar: "تفّاحة", color: "from-red-400 to-pink-500" },
  { emoji: "🐱", en: "Cat", fr: "Chat", ar: "قطّة", color: "from-orange-400 to-amber-500" },
  { emoji: "☀️", en: "Sun", fr: "Soleil", ar: "شمس", color: "from-yellow-300 to-orange-400" },
  { emoji: "🏠", en: "House", fr: "Maison", ar: "منزل", color: "from-blue-400 to-indigo-500" },
  { emoji: "📖", en: "Book", fr: "Livre", ar: "كتاب", color: "from-emerald-400 to-teal-500" },
  { emoji: "💧", en: "Water", fr: "Eau", ar: "ماء", color: "from-cyan-400 to-blue-500" },
  { emoji: "🌸", en: "Flower", fr: "Fleur", ar: "زهرة", color: "from-fuchsia-400 to-purple-500" },
  { emoji: "⭐", en: "Star", fr: "Étoile", ar: "نجمة", color: "from-[#F5B21B] to-yellow-500" },
];

const speechLang: Record<Lang, string> = { en: "en-US", fr: "fr-FR", ar: "ar-SA" };

export default function WordsPage() {
  const { t, lang, dir } = useLanguage();
  const [index, setIndex] = useState(0);

  const word = WORDS[index];
  const text = word[lang];

  function speak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = speechLang[lang];
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }

  const go = (delta: number) => {
    setIndex((i) => (i + delta + WORDS.length) % WORDS.length);
  };

  const isRtl = dir === "rtl";

  const floatAnimation = {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
  };

  return (
    <div className="relative max-w-2xl mx-auto min-h-[80vh] flex flex-col justify-center py-12 px-4 selection:bg-[#F5B21B] selection:text-[#0F2A8A]">
      {/* Decorative background magic glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg pointer-events-none opacity-40 blur-[100px] transition-colors duration-700">
        <div className={`w-full h-full bg-gradient-to-br ${word.color} rounded-full transform scale-110`} />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-10 w-full">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 bg-[#F5B21B]/20 text-[#d97706] px-4 py-2 rounded-full font-bold text-sm mb-2 uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            Magic Words
          </motion.div>
          <motion.h1 
            key={`title-${lang}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[#0F2A8A] drop-shadow-sm tracking-tight"
          >
            {t("words.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#434655] font-medium"
          >
            {t("words.tapToHear")}
          </motion.p>
        </div>

        {/* Flashcard Area */}
        <div className="w-full perspective-[1200px]">
          <AnimatePresence mode="wait">
            <motion.button
              key={index}
              onClick={speak}
              initial={{ opacity: 0, rotateY: isRtl ? -20 : 20, scale: 0.9, x: isRtl ? -60 : 60 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, rotateY: isRtl ? 20 : -20, scale: 0.9, x: isRtl ? 60 : -60 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className={`w-full aspect-[4/5] sm:aspect-[4/3] bg-white/90 backdrop-blur-2xl rounded-[48px] shadow-2xl border-4 border-white flex flex-col items-center justify-center gap-6 active:scale-[0.97] transition-all relative overflow-hidden group`}
            >
              {/* Card internal gradient shine */}
              <div className={`absolute inset-0 bg-gradient-to-br ${word.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              
              <motion.div 
                animate={floatAnimation}
                className="text-[140px] sm:text-[180px] leading-none drop-shadow-2xl relative z-10"
              >
                {word.emoji}
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col items-center gap-6 relative z-10"
              >
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F2A8A]">
                  {text}
                </span>
                
                {/* Magical Volume Button */}
                <div className="w-16 h-16 bg-[#F5B21B] text-[#0F2A8A] rounded-full flex items-center justify-center shadow-[0_8px_0_#d97706] group-hover:translate-y-1 group-hover:shadow-[0_4px_0_#d97706] group-active:translate-y-2 group-active:shadow-none transition-all duration-200">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                </div>
              </motion.div>
            </motion.button>
          </AnimatePresence>
        </div>

        {/* Counter dots */}
        <div className="flex justify-center gap-3">
          {WORDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                i === index 
                  ? "w-10 bg-[#0F2A8A] shadow-md shadow-[#0F2A8A]/30" 
                  : "w-3 bg-[#0F2A8A]/20 hover:bg-[#0F2A8A]/40 hover:scale-110"
              }`}
              aria-label={`Go to word ${i + 1}`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-8 px-2">
          <button
            onClick={() => go(-1)}
            className="group relative w-full py-4 rounded-full bg-white text-[#0F2A8A] border-2 border-[#0F2A8A]/10 font-bold text-lg active:scale-95 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1">
              arrow_back
            </span>
            <span className="truncate">{t("words.prev")}</span>
          </button>
          <button
            onClick={() => go(1)}
            className="group relative w-full py-4 rounded-full bg-[#0F2A8A] text-white font-bold text-lg hover:-translate-y-1 active:translate-y-0 transition-all shadow-[0_8px_0_#0a1d61] hover:shadow-[0_10px_0_#0a1d61] active:shadow-none flex items-center justify-center gap-2"
          >
            <span className="truncate">{t("words.next")}</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
