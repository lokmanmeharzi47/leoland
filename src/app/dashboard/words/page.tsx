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
  { emoji: "⭐", en: "Star", fr: "Étoile", ar: "نجمة", color: "from-amber-300 to-yellow-500" },
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

  return (
    <div className="relative max-w-2xl mx-auto min-h-[80vh] flex flex-col justify-center py-12 px-4">
      {/* Decorative background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg pointer-events-none opacity-30 dark:opacity-15 blur-[80px] transition-colors duration-700">
        <div className={`w-full h-full bg-gradient-to-br ${word.color} rounded-full transform scale-110`} />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-10 w-full">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.h1 
            key={`title-${lang}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display-lg text-display-sm md:text-display-md font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 tracking-tight"
          >
            {t("words.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-on-surface-variant font-medium bg-surface/60 px-5 py-2 rounded-full inline-block backdrop-blur-md border border-outline-variant/30 shadow-sm"
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
              className={`w-full aspect-[4/5] sm:aspect-[4/3] bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-2xl rounded-[48px] shadow-2xl border-2 border-white/40 dark:border-white/10 flex flex-col items-center justify-center gap-6 active:scale-[0.97] transition-all relative overflow-hidden group`}
            >
              {/* Card internal gradient shine */}
              <div className={`absolute inset-0 bg-gradient-to-br ${word.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              
              <motion.div 
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.15, bounce: 0.6 }}
                className="text-[140px] sm:text-[180px] leading-none drop-shadow-2xl"
              >
                {word.emoji}
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col items-center gap-6"
              >
                <span className="font-display-lg text-display-md md:text-display-lg font-black tracking-tight text-on-surface">
                  {text}
                </span>
                
                {/* Volume Button Indicator */}
                <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:scale-110 group-active:scale-95 transition-all duration-300">
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
                  ? "w-10 bg-gradient-to-r from-primary to-blue-500 shadow-md shadow-primary/30" 
                  : "w-3 bg-outline-variant/40 hover:bg-outline-variant/60 hover:scale-110"
              }`}
              aria-label={`Go to word ${i + 1}`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 w-full max-w-lg mt-4">
          <button
            onClick={() => go(-1)}
            className="group relative flex-1 py-5 rounded-3xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-body-lg overflow-hidden active:scale-95 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3 border border-outline-variant/20"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1">
              arrow_back
            </span>
            {t("words.prev")}
          </button>
          <button
            onClick={() => go(1)}
            className="group relative flex-1 py-5 rounded-3xl bg-primary text-on-primary font-bold text-body-lg overflow-hidden active:scale-95 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 flex items-center justify-center gap-3"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            {t("words.next")}
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
