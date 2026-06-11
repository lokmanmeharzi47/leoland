"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChunkyButton, Floaty } from "@/components/leo/ui";

const powers = [
  { emoji: "🎙️", title: "Voice Magic", desc: "Leo listens carefully and gives gentle, real-time feedback on pronunciation.", color: "#EC4899" },
  { emoji: "🌍", title: "Bilingual Helper", desc: "Stuck? Leo gives a hint in your native language to keep the conversation flowing.", color: "#4CAF50" },
  { emoji: "🛡️", title: "100% Kid-Safe", desc: "Leo's conversations are strictly guarded and age-appropriate, always.", color: "#0F2A8A" },
];

export default function TutorMarketingPage() {
  return (
    <div className="bg-[#FAF8FF] min-h-screen text-[#191b23]">
      <Navbar />

      {/* Hero — Leo's Learning Corner scene */}
      <header className="relative z-0 overflow-hidden pt-12 md:pt-20 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E2F4FB] to-[#FAF8FF] -z-10" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#FFF6E2] text-[#d97706] px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider mb-5">Talk & Learn with Leo</span>
            <h1 className="text-4xl md:text-6xl font-black text-[#0F2A8A] mb-5 leading-tight">
              Meet <span className="text-[#F5B21B]">Leo</span>, your child&apos;s friendly language coach
            </h1>
            <p className="text-lg md:text-xl text-[#0F2A8A]/70 font-semibold mb-8 max-w-xl">
              Speaking takes practice. With Leo, kids hold real conversations out loud in a safe, cheerful, judgment-free corner — any time they like.
            </p>
            <ChunkyButton href="/dashboard/tutor" variant="gold" rightIcon="pets">Talk with Leo</ChunkyButton>
          </motion.div>

          {/* Magical scene: Leo + children + speech bubbles */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="relative rounded-[44px] bg-gradient-to-b from-[#87CEEB] to-[#bfe6f5] p-6 border-4 border-white shadow-[0_20px_50px_rgba(15,42,138,0.3)] overflow-hidden min-h-[420px]">
              <Floaty className="absolute top-6 left-8 text-4xl" duration={6}>☁️</Floaty>
              <Floaty className="absolute top-10 right-10 text-3xl" duration={5} delay={1}>🎈</Floaty>
              {/* ground */}
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#4CAF50] to-[#7bd17f] rounded-b-[40px] border-t-4 border-[#a5e0a8]" />

              {/* Leo speech bubble */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="absolute top-10 left-6 bg-white rounded-3xl rounded-bl-none px-4 py-3 shadow-xl border-2 border-[#F5B21B] max-w-[55%] z-20">
                <p className="font-black text-[#0F2A8A] text-sm">Bonjour! Can you say &quot;hello&quot; in French?</p>
              </motion.div>

              {/* child speech bubble */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} className="absolute top-32 right-6 bg-[#F5B21B] rounded-3xl rounded-br-none px-4 py-3 shadow-xl max-w-[55%] z-20">
                <p className="font-black text-[#0F2A8A] text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                  &quot;Bonjour, Leo!&quot;
                </p>
              </motion.div>

              {/* characters */}
              <div className="absolute bottom-4 inset-x-0 flex items-end justify-center gap-3 z-10">
                <Floaty distance={8} delay={0.3}><span className="text-6xl">🧒</span></Floaty>
                <Floaty distance={12}><span className="text-8xl drop-shadow-lg">🦁</span></Floaty>
                <Floaty distance={8} delay={0.6}><span className="text-6xl">👧</span></Floaty>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Magic powers */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-[#0F2A8A] mb-3">Leo&apos;s Magic Powers</h2>
          <p className="text-lg text-[#0F2A8A]/60 font-semibold max-w-2xl mx-auto">Smart AI dressed up as pure magic — adapting to every child&apos;s level to build speaking confidence.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {powers.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-[32px] bg-white p-7 border-4 border-white shadow-[0_10px_30px_rgba(15,42,138,0.08)] hover:-translate-y-1.5 transition-transform">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-5 border-4 border-white shadow" style={{ backgroundColor: `${p.color}22` }}>{p.emoji}</div>
              <h3 className="text-xl font-black text-[#0F2A8A] mb-2">{p.title}</h3>
              <p className="text-[#0F2A8A]/60 font-medium">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <div className="inline-flex flex-col items-center gap-5 rounded-[36px] bg-gradient-to-br from-[#0F2A8A] to-[#1e3fb8] text-white px-10 py-10 border-4 border-white shadow-xl max-w-2xl">
            <span className="text-6xl">🦁</span>
            <h3 className="text-2xl md:text-3xl font-black">Leo can&apos;t wait to meet your explorer!</h3>
            <ChunkyButton href="/register" variant="gold" rightIcon="rocket_launch">Start the Adventure</ChunkyButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
