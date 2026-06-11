"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SectionTitle, StatCard, ProgressBar, ChunkyButton, Floaty } from "@/components/leo/ui";

const badges = [
  { id: 1, title: "Daily Streak", level: "Level 3", value: "12 Days", emoji: "🔥", color: "#F5B21B" },
  { id: 2, title: "Word Master", level: "Mastery", value: "500 Words", emoji: "📚", color: "#7C3AED" },
  { id: 3, title: "Quiz Whiz", level: "Perfect", value: "10 Wins", emoji: "🧠", color: "#0F2A8A" },
  { id: 4, title: "Story Reader", level: "Gold", value: "30 Stories", emoji: "📖", color: "#4CAF50" },
];

const unlockedRewards = [
  { id: 1, name: "Golden Crown", emoji: "👑", isNew: true },
  { id: 2, name: "Wizard Hat", emoji: "🧙", isNew: false },
  { id: 3, name: "Cool Shades", emoji: "🕶️", isNew: false },
];

const lockedRewards = [
  { id: 4, name: "Superhero Cape", emoji: "🦸", cost: 500 },
  { id: 5, name: "Rainbow Wings", emoji: "🦋", cost: 800 },
];

export default function RewardsPage() {
  const [claimed, setClaimed] = useState(false);

  const celebrate = () => {
    if (claimed) return;
    setClaimed(true);
    confetti({ 
      particleCount: 200, 
      spread: 100, 
      origin: { y: 0.5 }, 
      colors: ["#F5B21B", "#0F2A8A", "#ffffff", "#4CAF50", "#38BDF8", "#EC4899"] 
    });
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Magic Treasure Kingdom Hero (Max 250px) */}
      <section className="w-full relative h-[220px] overflow-hidden rounded-[36px] bg-gradient-to-br from-[#F5B21B] via-[#d97706] to-[#b45309] p-6 md:p-8 flex items-center justify-between border-4 border-white shadow-[0_10px_30px_rgba(245,178,27,0.35)] cursor-pointer" onClick={celebrate}>
        {/* Castle / Treasure background vibes */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
        <Floaty className="absolute top-4 right-10 text-5xl opacity-80" duration={4}>✨</Floaty>
        <Floaty className="absolute bottom-6 right-1/4 text-4xl opacity-80" duration={5} delay={1}>⭐</Floaty>
        <Floaty className="absolute top-1/3 left-1/2 text-5xl opacity-40" duration={6}>🏰</Floaty>
        
        <div className="relative z-10 max-w-[60%]">
             <div className="inline-flex items-center gap-1 bg-white/30 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
               <span className="text-[14px]">⭐</span> Master Explorer
             </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-md">Treasure Kingdom</h1>
            <div className="mt-4 w-full max-w-sm">
              <ProgressBar value={72} tone="blue" className="h-4 bg-white/40" />
              <div className="flex justify-between mt-1 text-xs font-black text-white">
                <span>Level 14</span>
                <span>450 XP to Diamond</span>
              </div>
            </div>
        </div>

        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-[32px] bg-white/20 backdrop-blur-md flex items-center justify-center text-7xl border-4 border-white shadow-xl shrink-0">
          👑
        </motion.div>
      </section>

      {/* Stats - XP Progress & Daily Streak */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="star" value="7,550" label="Total XP" tone="gold" />
        <StatCard icon="local_fire_department" value="12" label="Day Streak" tone="pink" />
        <StatCard icon="workspace_premium" value="8" label="Badges" tone="blue" />
        <StatCard icon="redeem" value="3" label="Rewards" tone="green" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Unlocked Rewards */}
          <section>
            <SectionTitle icon="redeem" title="Unlocked Rewards" subtitle="Treasures you've collected!" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {unlockedRewards.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="rounded-[28px] p-5 border-4 bg-white border-white shadow-[0_8px_20px_rgba(15,42,138,0.1)] flex flex-col items-center text-center relative"
                >
                  {item.isNew && <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-bounce">NEW</span>}
                  <div className="text-6xl mb-3 drop-shadow-md">{item.emoji}</div>
                  <p className="font-extrabold text-[#0F2A8A] leading-tight text-sm">{item.name}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Badges / Achievements */}
          <section>
            <SectionTitle icon="military_tech" title="My Badges" subtitle="Challenges you completed." action={<button className="text-sm font-black text-[#0F2A8A]/60">View all →</button>} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((b) => (
                <motion.div
                  key={b.id}
                  whileHover={{ y: -6, rotate: -2 }}
                  className="rounded-[28px] bg-white p-4 border-4 border-white shadow-[0_10px_24px_rgba(15,42,138,0.1)] flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-4xl border-4 border-white shadow-md mb-2" style={{ backgroundColor: `${b.color}22` }}>
                    {b.emoji}
                  </div>
                  <h4 className="font-black text-[#0F2A8A] text-sm leading-tight mb-1">{b.title}</h4>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: b.color }}>{b.value}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar / Locked stuff */}
        <aside className="space-y-8">
           {/* Recent trophy + claim */}
           <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F2A8A] to-[#38BDF8] p-6 text-white border-4 border-white shadow-xl">
             <div className="relative z-10 flex flex-col items-center text-center">
               <div className="text-6xl mb-4 drop-shadow-lg">🏅</div>
               <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">New Achievement</span>
               <h4 className="text-2xl font-black mb-2">Linguistics Legend</h4>
               <p className="text-white/90 font-semibold mb-6 text-sm">You scored 100% on the Advanced Grammar Journey!</p>
               <ChunkyButton variant="gold" leftIcon={claimed ? "check_circle" : "redeem"} onClick={celebrate} fullWidth>
                 {claimed ? "Reward Claimed!" : "Claim 500 XP"}
               </ChunkyButton>
             </div>
           </div>

           {/* Locked Rewards to work towards */}
           <div className="rounded-[32px] bg-white p-6 border-4 border-white shadow-[0_10px_30px_rgba(15,42,138,0.1)]">
             <h3 className="text-xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
               <span className="material-symbols-outlined text-gray-400">lock</span> Next Rewards
             </h3>
             <div className="space-y-4">
               {lockedRewards.map(l => (
                 <div key={l.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border-2 border-gray-100">
                   <div className="text-3xl grayscale opacity-50">{l.emoji}</div>
                   <div className="flex-grow">
                     <h4 className="font-bold text-[#0F2A8A] text-sm">{l.name}</h4>
                     <p className="flex items-center gap-1 text-[11px] font-black text-[#d97706]">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {l.cost} XP to unlock
                     </p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
