"use client";

import { motion } from "framer-motion";
import { StatCard, SectionTitle, Floaty, ProgressBar } from "@/components/leo/ui";

export default function RapportPage() {
  const weeklyData = [
    { day: "M", val: 40 },
    { day: "T", val: 60 },
    { day: "W", val: 30 },
    { day: "T", val: 80 },
    { day: "F", val: 90 },
    { day: "S", val: 100 },
    { day: "S", val: 50 },
  ];

  const categories = [
    { name: "Vocabulary", progress: 85, color: "bg-blue-500" },
    { name: "Grammar", progress: 40, color: "bg-purple-500" },
    { name: "Listening", progress: 60, color: "bg-green-500" },
    { name: "Speaking", progress: 30, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="w-full relative h-[220px] rounded-[36px] bg-gradient-to-br from-[#4CAF50] to-[#059669] p-6 md:p-8 flex items-center justify-between overflow-hidden border-4 border-white shadow-[0_10px_30px_rgba(76,175,80,0.3)]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <Floaty className="absolute top-6 right-1/4 text-4xl opacity-80" duration={4}>🎉</Floaty>
        <Floaty className="absolute bottom-8 right-1/3 text-3xl opacity-80" duration={5} delay={1}>🌟</Floaty>
        <Floaty className="absolute top-1/2 left-2/3 text-2xl opacity-60" duration={6}>✨</Floaty>
        
        <div className="relative z-10 max-w-[60%]">
          <div className="inline-flex items-center gap-1 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
             <span className="material-symbols-outlined text-[14px]">insights</span> Progress Report
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md mb-2">Your Learning Journey</h1>
          <p className="text-green-100 font-semibold text-base md:text-lg">Amazing progress this week!</p>
        </div>
        
        {/* Leo celebrating emoji */}
        <div className="relative z-10 flex items-center justify-center shrink-0">
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            className="text-[120px] md:text-[140px] leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] select-none"
          >
            🦁
          </motion.div>
          <span className="absolute -top-4 -right-4 text-5xl animate-bounce">🎊</span>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon="schedule" value="3.5h" label="Learning Time" tone="blue" />
        <StatCard icon="menu_book" value="124" label="Words Learned" tone="green" />
        <StatCard icon="auto_stories" value="12" label="Stories Read" tone="pink" />
        <StatCard icon="sports_esports" value="28" label="Games Played" tone="sky" />
        <StatCard icon="workspace_premium" value="5" label="Badges Earned" tone="gold" />
        <StatCard icon="local_fire_department" value="12" label="Day Streak" tone="gold" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Weekly Activity Chart */}
        <section className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-white shadow-xl flex flex-col">
          <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F5B21B] text-3xl">bar_chart</span> Weekly Activity
          </h2>
          <div className="flex-grow flex items-end justify-between gap-2 sm:gap-4 h-64 border-b-2 border-gray-100 pb-2">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group">
                {/* Custom animated bar */}
                <div className="w-full relative flex justify-center h-full items-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${d.val}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    className={`w-full max-w-[40px] rounded-t-xl group-hover:opacity-80 transition-opacity relative ${d.val === 100 ? 'bg-[#F5B21B]' : 'bg-[#0F2A8A]'}`}
                  >
                    {d.val === 100 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-lg">⭐</span>}
                  </motion.div>
                </div>
                <span className={`mt-3 font-black text-sm ${d.val === 100 ? 'text-[#d97706]' : 'text-gray-400'}`}>{d.day}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Categories Progress */}
        <section className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-white shadow-xl">
           <h2 className="text-2xl font-extrabold text-[#0F2A8A] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-500 text-3xl">donut_small</span> Skill Levels
          </h2>
          <div className="space-y-6">
            {categories.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#0F2A8A]">{cat.name}</span>
                  <span className="font-black text-gray-400">{cat.progress}%</span>
                </div>
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className={`h-full rounded-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Leo Insights & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leo Insights */}
        <section className="lg:col-span-2 bg-[#E2F4FB] rounded-[32px] p-6 sm:p-8 border-4 border-white shadow-xl flex flex-col md:flex-row gap-6 items-center">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-[80px] shadow-inner shrink-0">
            🦁
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0F2A8A] mb-2">Leo's Insight</h3>
            <p className="text-[#0F2A8A]/80 font-bold text-lg mb-4">
              "You're doing amazing with Vocabulary! I noticed you struggled a bit with Speaking games. Would you like to practice pronunciation together?"
            </p>
            <button className="px-6 py-2.5 bg-[#0F2A8A] text-white font-bold rounded-full shadow-[0_4px_0_#061342] active:translate-y-1 active:shadow-none transition-all">
              Practice Speaking
            </button>
          </div>
        </section>

        {/* Milestones */}
        <section className="bg-[#FFF6E2] rounded-[32px] p-6 border-4 border-white shadow-xl">
          <h3 className="text-xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Next Milestones
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-2xl border-2 border-orange-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl shrink-0">🔥</div>
               <div className="flex-1">
                 <h4 className="font-bold text-sm text-[#0F2A8A]">14 Day Streak</h4>
                 <ProgressBar value={85} tone="gold" className="h-2 mt-1" />
               </div>
            </div>
            <div className="bg-white p-3 rounded-2xl border-2 border-blue-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl shrink-0">📚</div>
               <div className="flex-1">
                 <h4 className="font-bold text-sm text-[#0F2A8A]">150 Words</h4>
                 <ProgressBar value={82} tone="blue" className="h-2 mt-1" />
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
