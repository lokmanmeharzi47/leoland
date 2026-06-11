"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChunkyButton, SectionTitle, Floaty } from "@/components/leo/ui";

const features = [
  { 
    image: "/games_marketing/puzzle.png", 
    title: "Vocabulary Puzzles", 
    desc: "Match words to pictures and solve word searches to build a strong word foundation.", 
    color: "from-green-400 to-emerald-600" 
  },
  { 
    image: "/games_marketing/quest.png", 
    title: "Grammar Quests", 
    desc: "Adventure where correct sentences defeat monsters and unlock hidden treasures.", 
    color: "from-[#0F2A8A] to-blue-600" 
  },
  { 
    image: "/games_marketing/voice.png", 
    title: "Speaking Challenges", 
    desc: "Kid-safe voice recognition — say it right to score maximum points!", 
    color: "from-pink-400 to-rose-600" 
  },
];

const rewards = [
  { emoji: "🏅", label: "Earn Badges", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { emoji: "🛍️", label: "Avatar Shop", color: "bg-pink-100 text-pink-700 border-pink-200" },
  { emoji: "🏆", label: "Leaderboards", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { emoji: "📜", label: "Certificates", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
];

export default function GamesMarketingPage() {
  return (
    <div className="bg-[#FAF8FF] min-h-screen text-[#191b23] overflow-hidden">
      <Navbar />

      {/* Hero */}
      <header className="relative z-0 pt-12 md:pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] via-[#4338CA] to-[#7C3AED] -z-10" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay -z-10" />
        
        <Floaty className="absolute top-20 right-[10%] text-6xl hidden md:block opacity-50" duration={6}>🪐</Floaty>
        <Floaty className="absolute bottom-20 left-[15%] text-5xl hidden md:block opacity-70" duration={8} delay={2}>✨</Floaty>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring" }}>
            <div className="inline-flex items-center gap-2 bg-[#F5B21B] text-[#0F2A8A] px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 shadow-lg shadow-[#F5B21B]/20 animate-pulse">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>sports_esports</span>
              Gamified Learning
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
              Play Your Way to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B21B] to-[#FF8A00] drop-shadow-none">Fluency</span>
            </h1>
            <p className="text-xl text-blue-100 font-medium mb-10 max-w-lg leading-relaxed">
              Learning a language shouldn&apos;t feel like a chore. In LeoLand&apos;s arcade, kids master words and grammar through exciting magical missions.
            </p>
            <div className="flex gap-4">
              <ChunkyButton href="/register" variant="gold" rightIcon="rocket_launch">Start Playing Free</ChunkyButton>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            transition={{ duration: 1, type: "spring", bounce: 0.4 }} 
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px]">
              {/* Glowing behind the arcade */}
              <div className="absolute inset-0 bg-[#F5B21B] rounded-full blur-[100px] opacity-30 transform scale-75"></div>
              
              <img 
                src="/games_marketing/hero.png" 
                alt="Magical Arcade Machine" 
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              />
              
              {/* Floating coin element */}
              <Floaty className="absolute top-10 -left-10 z-20 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3 border-2 border-[#F5B21B]" duration={4}>
                <span className="text-4xl drop-shadow-md">🪙</span>
                <div>
                  <p className="text-[11px] font-black text-[#0F2A8A]/50 uppercase tracking-wider">Level Complete</p>
                  <p className="font-black text-[#0F2A8A] text-lg">+100 Coins</p>
                </div>
              </Floaty>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#FAF8FF] to-transparent pointer-events-none -mt-10" />
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F2A8A] mb-4">Explore the Arcade</h2>
          <p className="text-xl text-[#0F2A8A]/60 font-medium max-w-2xl mx-auto">Every game is designed by language experts to powerfully reinforce what kids learn in lessons.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={f.title} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ delay: i * 0.15, type: "spring" }} 
              className="group rounded-[40px] bg-white p-8 border-4 border-transparent hover:border-[#F5B21B]/30 shadow-[0_15px_40px_rgba(15,42,138,0.06)] hover:shadow-[0_25px_50px_rgba(15,42,138,0.12)] hover:-translate-y-2 transition-all cursor-pointer flex flex-col items-center text-center"
            >
              <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-8 shadow-xl border-4 border-white transform group-hover:rotate-6 transition-transform duration-300 relative`}>
                 <div className="absolute inset-0 bg-black/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <img src={f.image} alt={f.title} className="w-24 h-24 object-contain drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F2A8A] mb-3">{f.title}</h3>
              <p className="text-[#0F2A8A]/70 font-medium leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rewards */}
      <section className="px-6 py-24 bg-gradient-to-br from-[#0F2A8A] via-[#1e3fb8] to-[#0F2A8A] relative overflow-hidden rounded-t-[64px] shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <div className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-[#F5B21B] rounded-full blur-[120px] opacity-20 transform scale-110" />
             <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring" }}
                src="/games_marketing/rewards.png" 
                alt="Rewards Trophy" 
                className="w-full max-w-[500px] mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500" 
             />
             
             {/* Floating mini rewards */}
             <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {rewards.map((r, i) => (
                  <Floaty key={r.label} duration={4 + i} delay={i * 0.5} className="absolute" style={{ top: `${20 + (i * 25)}%`, left: i % 2 === 0 ? '-10%' : '80%' }}>
                     <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 border-2 shadow-lg backdrop-blur-md bg-white/90`}>
                        <span className="text-2xl drop-shadow-sm">{r.emoji}</span>
                        <span className="font-extrabold text-xs uppercase tracking-wider text-gray-800">{r.label}</span>
                     </div>
                  </Floaty>
                ))}
             </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-4 border border-white/20">
              <span className="material-symbols-outlined text-[16px]">redeem</span>
              Unlock Magic
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">The Reward <br/><span className="text-[#F5B21B]">Treasure</span></h2>
            <p className="text-xl text-blue-100 font-medium mb-8 leading-relaxed max-w-lg">
              Every lesson completed and every game won earns Leo Coins. Our built-in reward system keeps motivation sky-high!
            </p>
            <ul className="space-y-4 mb-10">
              {["Unlock cool outfits for their avatar", "Earn rare badges for daily streaks", "Show off in the safe friends hub"].map((t) => (
                <li key={t} className="flex items-center gap-4 font-bold text-lg text-white">
                  <span className="w-8 h-8 rounded-full bg-[#4CAF50] text-white flex items-center justify-center shadow-lg border border-white/20 shrink-0">
                     <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <ChunkyButton href="/register" variant="gold" rightIcon="arrow_forward">Join the Fun</ChunkyButton>
          </div>
          
        </div>
      </section>

      <Footer />
    </div>
  );
}
