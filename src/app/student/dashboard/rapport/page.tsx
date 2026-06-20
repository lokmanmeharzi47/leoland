"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

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
    { name: "Listening", progress: 60, color: "bg-emerald-500" },
    { name: "Speaking", progress: 30, color: "bg-orange-500" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Progress Report 📊
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Review your learning journey and skill levels.</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Top Stats */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-blue-500 bg-blue-50 dark:bg-blue-500/10 p-2 rounded-lg text-sm">schedule</span>
            <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Learning Time</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">3.5h</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-lg text-sm">menu_book</span>
            <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Words Learned</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">124</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-pink-500 bg-pink-50 dark:bg-pink-500/10 p-2 rounded-lg text-sm">auto_stories</span>
            <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Stories Read</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-purple-500 bg-purple-50 dark:bg-purple-500/10 p-2 rounded-lg text-sm">sports_esports</span>
            <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Games Played</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">28</p>
        </div>

        {/* Weekly Activity Chart (Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Weekly Activity</h2>
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', color: '#0f172a' }}
                />
                <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Levels (Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
           <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Skill Levels</h2>
          <div className="space-y-6">
            {categories.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{cat.name}</span>
                  <span className="font-bold text-slate-500 dark:text-zinc-400">{cat.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leo's Insight (Span 3) */}
        <div className="lg:col-span-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/50 shadow-sm flex flex-col md:flex-row gap-6 items-center">
          <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center text-5xl shadow-sm shrink-0">
            🦁
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">Leo's Insight</h3>
            <p className="text-blue-800 dark:text-blue-200 font-medium mb-4">
              "You're doing amazing with Vocabulary! I noticed you struggled a bit with Speaking games. Would you like to practice pronunciation together?"
            </p>
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              Practice Speaking
            </button>
          </div>
        </div>

        {/* Next Milestones (Span 1) */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Next Milestones</h3>
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3">
               <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg flex items-center justify-center text-lg shrink-0">🔥</div>
               <div className="flex-1">
                 <h4 className="font-bold text-sm text-slate-900 dark:text-white">14 Day Streak</h4>
                 <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full mt-1.5">
                   <div className="h-full bg-orange-500 rounded-full" style={{ width: '85%' }} />
                 </div>
               </div>
            </div>
            <div className="bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center text-lg shrink-0">📚</div>
               <div className="flex-1">
                 <h4 className="font-bold text-sm text-slate-900 dark:text-white">150 Words</h4>
                 <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full mt-1.5">
                   <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }} />
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
