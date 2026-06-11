"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChunkyButton, Floaty } from "@/components/leo/ui";

const wordCards = [
  { emoji: "🐱", word: "Le chat", meaning: "The cat" },
  { emoji: "🌳", word: "L'arbre", meaning: "The tree" },
  { emoji: "🏃", word: "Il court", meaning: "He runs" },
];

const shelfBooks = [
  { emoji: "🦁", color: "#0F2A8A" },
  { emoji: "🚀", color: "#7C3AED" },
  { emoji: "🌊", color: "#38BDF8" },
  { emoji: "🏰", color: "#EC4899" },
  { emoji: "🌳", color: "#4CAF50" },
];

export default function LibraryMarketingPage() {
  return (
    <div className="bg-[#FAF8FF] min-h-screen text-[#191b23]">
      <Navbar />

      {/* Hero */}
      <header className="relative overflow-hidden pt-12 md:pt-20 pb-16 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFE7FF] to-[#FAF8FF] -z-10" />
        <Floaty className="absolute top-16 left-[10%] text-5xl hidden md:block" duration={6}>☁️</Floaty>
        <Floaty className="absolute top-28 right-[12%] text-5xl hidden md:block" duration={5} delay={1}>✨</Floaty>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
          <span className="inline-block bg-[#EDE4FF] text-[#7C3AED] px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider mb-5">The Grand Library</span>
          <h1 className="text-4xl md:text-6xl font-black text-[#0F2A8A] mb-5 leading-tight">
            Step Into The <span className="text-[#7C3AED]">Story</span>
          </h1>
          <p className="text-lg md:text-xl text-[#0F2A8A]/70 font-semibold mb-8">
            Immerse your child in bilingual tales. Interactive storybooks teach languages naturally through context, beautiful art, and adventure.
          </p>
          <ChunkyButton href="/register" variant="gold" rightIcon="auto_stories">Explore the Library</ChunkyButton>
        </motion.div>

        {/* floating bookshelf */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-14 max-w-3xl mx-auto flex justify-center gap-4">
          {shelfBooks.map((b, i) => (
            <Floaty key={i} duration={4 + i * 0.4} delay={i * 0.2} distance={12}>
              <div className="w-20 h-28 md:w-24 md:h-32 rounded-2xl flex items-center justify-center text-4xl md:text-5xl border-4 border-white shadow-xl" style={{ backgroundColor: b.color }}>{b.emoji}</div>
            </Floaty>
          ))}
        </motion.div>
      </header>

      {/* Read-along audio */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-[#E2F4FB] flex items-center justify-center text-4xl mb-5 border-4 border-white shadow">🔊</div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F2A8A] mb-3">Read-Along Audio</h2>
          <p className="text-lg text-[#0F2A8A]/70 font-semibold mb-5">
            Every story features narration by native speakers. Kids listen and read along — perfect for linking sounds to written words.
          </p>
          <ul className="space-y-3">
            {["Words highlight as they're read", "Adjustable reading speeds", "Authentic accents & pronunciation"].map((t) => (
              <li key={t} className="flex items-center gap-3 font-bold text-[#0F2A8A]">
                <span className="w-6 h-6 rounded-full bg-[#38BDF8] text-white flex items-center justify-center"><span className="material-symbols-outlined text-[15px]">check</span></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-[36px] bg-gradient-to-br from-[#38BDF8] to-[#0F2A8A] p-8 border-4 border-white shadow-[0_20px_50px_rgba(15,42,138,0.25)] aspect-[4/3] flex items-center justify-center relative">
          <Floaty distance={14}><div className="text-[110px]">📖</div></Floaty>
          <div className="absolute bottom-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl text-[#0F2A8A]">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        </motion.div>
      </section>

      {/* Tap to translate */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1 rounded-[36px] bg-white p-6 border-4 border-white shadow-[0_15px_40px_rgba(15,42,138,0.1)] space-y-4">
          {wordCards.map((w, i) => (
            <div key={w.word} className={`flex items-center gap-4 p-4 rounded-2xl bg-[#F4F6FF] ${i === 1 ? "ml-8" : ""}`}>
              <span className="text-3xl">{w.emoji}</span>
              <div>
                <p className="font-black text-[#0F2A8A]">{w.word}</p>
                <p className="text-sm font-semibold text-[#0F2A8A]/50">{w.meaning}</p>
              </div>
              <span className="material-symbols-outlined ml-auto text-[#F5B21B]" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
            </div>
          ))}
        </motion.div>
        <div className="order-1 md:order-2">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF6E2] flex items-center justify-center text-4xl mb-5 border-4 border-white shadow">👆</div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F2A8A] mb-3">Tap to Translate</h2>
          <p className="text-lg text-[#0F2A8A]/70 font-semibold">
            Stuck on a word? Just tap it! Kids instantly see the translation, hear it pronounced, and add it to their own word collection.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
