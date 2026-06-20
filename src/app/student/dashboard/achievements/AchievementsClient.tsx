"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

type Badge = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  icon: string | null;
  requirement_type: string;
  requirement_value: number;
};

type StudentBadge = {
  id: string;
  badge_id: string;
  earned_at: string;
};

export default function AchievementsClient({ 
  allBadges, 
  studentBadges,
  totalXp
}: { 
  allBadges: Badge[], 
  studentBadges: StudentBadge[],
  totalXp: number
}) {
  const [claimed, setClaimed] = useState(false);

  const celebrate = () => {
    if (claimed) return;
    setClaimed(true);
    confetti({ 
      particleCount: 150, 
      spread: 80, 
      origin: { y: 0.6 },
    });
  };

  const unlockedBadgeIds = new Set(studentBadges.map(sb => sb.badge_id));
  const unlockedBadges = allBadges.filter(b => unlockedBadgeIds.has(b.id));
  const lockedBadges = allBadges.filter(b => !unlockedBadgeIds.has(b.id));

  // Determine user level based on XP (every 500 XP is a level)
  const currentLevel = Math.floor(totalXp / 500) + 1;
  const xpInCurrentLevel = totalXp % 500;
  const xpPercentage = (xpInCurrentLevel / 500) * 100;
  const xpToNextLevel = 500 - xpInCurrentLevel;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Treasure Kingdom 👑
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Track your progress, claim rewards, and show off your badges!</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Level Progress Banner */}
          <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors" onClick={celebrate}>
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-1 bg-white/20 text-blue-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                Master Explorer
              </div>
              <h2 className="text-2xl font-bold mb-4">Level {currentLevel}</h2>
              <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                 <div className="h-full bg-white rounded-full" style={{ width: `${xpPercentage}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-sm font-medium text-blue-100">
                <span>{totalXp.toLocaleString()} XP</span>
                <span>{xpToNextLevel.toLocaleString()} XP to Next Level</span>
              </div>
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl shrink-0">
              💎
            </div>
          </div>

          {/* Badges Gallery */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">My Unlocked Badges</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
            </div>
            {unlockedBadges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {unlockedBadges.map((b) => (
                  <div key={b.id} className="p-4 border border-blue-100 dark:border-blue-900/50 rounded-xl flex flex-col items-center text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer bg-blue-50/50 dark:bg-blue-900/10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 text-blue-500 bg-blue-100 dark:bg-blue-900/30">
                      {b.icon || "🏅"}
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{b.title}</h4>
                    <span className="text-xs font-medium text-slate-500 dark:text-zinc-400 capitalize">{b.category}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500 dark:text-zinc-400">You haven't unlocked any badges yet.</p>
                <p className="text-sm mt-1 text-blue-600">Keep playing games and reading stories to earn them!</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          
          {/* Claim Trophy Card */}
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-sm text-center">
             <div className="text-5xl mb-3">🏅</div>
             <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Daily Bonus</p>
             <h3 className="text-xl font-bold mb-2">Login Streak</h3>
             <p className="text-sm opacity-90 mb-4">Claim your daily login bonus XP!</p>
             <button 
               onClick={celebrate}
               className="w-full bg-white text-red-600 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
             >
               <span className="material-symbols-outlined text-sm">{claimed ? "check_circle" : "redeem"}</span>
               {claimed ? "Reward Claimed!" : "Claim 50 XP"}
             </button>
          </div>

          {/* Next Rewards (Locked) */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
             <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
               <span className="material-symbols-outlined text-slate-400 text-lg">lock</span> Next Rewards
             </h2>
             <div className="space-y-3">
               {lockedBadges.slice(0, 5).map(l => (
                 <div key={l.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-100 dark:border-zinc-800">
                   <div className="text-2xl grayscale opacity-50">{l.icon || "🔒"}</div>
                   <div>
                     <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{l.title}</h4>
                     <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mt-0.5">
                        {l.requirement_value} {l.requirement_type} to unlock
                     </p>
                   </div>
                 </div>
               ))}
               {lockedBadges.length === 0 && (
                 <p className="text-sm text-slate-500 text-center py-4">You have unlocked everything!</p>
               )}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
