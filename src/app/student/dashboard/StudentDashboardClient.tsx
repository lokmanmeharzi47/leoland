"use client";

import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentDashboardClient({ initialData }: { initialData: any }) {
  const { 
    student, 
    badges, 
    wordsCount, 
    latestProgress, 
    worldsProgress, 
    recentActivity, 
    aiStats, 
    xpGrowth 
  } = initialData;

  const firstName = (student?.full_name || student?.username || "Explorer").split(" ")[0];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Here is what's happening with your learning progress today.</p>
        </div>
      </div>

      {/* Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat: Total XP */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-blue-500 bg-blue-50 dark:bg-blue-500/10 p-2 rounded-lg">star</span>
            <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Total XP</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{student.total_xp || 0}</p>
        </div>

        {/* Stat: Badges */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 p-2 rounded-lg">military_tech</span>
            <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Badges</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{badges?.length || 0}</p>
        </div>

        {/* Stat: Words */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-lg">menu_book</span>
            <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Words Learned</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{wordsCount}</p>
        </div>

        {/* Stat: Streak */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-orange-500 bg-orange-50 dark:bg-orange-500/10 p-2 rounded-lg">local_fire_department</span>
            <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Day Streak</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{student.streak || 0}</p>
        </div>

        {/* Continue Learning (Span 2) */}
        <div className="lg:col-span-2 bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          {latestProgress ? (
            <div className="relative z-10">
              <h2 className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-2">Up Next</h2>
              <h3 className="text-2xl font-bold mb-1">{latestProgress.worlds?.title}</h3>
              <p className="text-blue-100 mb-6">Lesson: {latestProgress.lessons?.title}</p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm font-medium mb-2 text-blue-100">
                   <span>Progress</span>
                   <span>{latestProgress.progress_percentage}% Complete</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-white rounded-full" 
                     style={{ width: `${latestProgress.progress_percentage}%` }}
                   />
                </div>
              </div>

              <Link href={`/student/worlds/${latestProgress.worlds?.id}/lesson/${latestProgress.lessons?.id}`} className="inline-block bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                 Resume Lesson
              </Link>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col h-full justify-center">
               <h3 className="text-2xl font-bold mb-2">Start Your Journey!</h3>
               <p className="text-blue-100 mb-6">You haven't started any lessons yet.</p>
               <div>
                 <Link href="/student/worlds" className="inline-block bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                     Explore Worlds
                  </Link>
               </div>
            </div>
          )}
        </div>

        {/* XP Analytics (Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">XP Growth</h2>
          <div className="flex-1 min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={xpGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Learning Worlds List (Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Learning Worlds</h2>
            <Link href="/student/worlds" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="space-y-4">
            {worldsProgress.map((world: any) => (
              <div key={world.id} className="p-4 border border-slate-100 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                 <div className="flex justify-between items-center mb-2">
                   <span className="font-semibold text-slate-900 dark:text-white">{world.title}</span>
                   <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">
                     {world.completedLessons} / {world.totalLessons}
                   </span>
                 </div>
                 <div className="w-full h-2 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${world.percentage}%` }} 
                    />
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tutor Widget (Span 1) */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-2xl">🤖</div>
               <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI Tutor</h2>
            </div>
            <div className="space-y-4 mb-6">
               <div>
                  <p className="text-sm text-slate-500 dark:text-zinc-400">Conversations</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{aiStats.totalConversations}</p>
               </div>
               <div>
                  <p className="text-sm text-slate-500 dark:text-zinc-400">Minutes Practiced</p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">{aiStats.totalMinutes}</p>
               </div>
            </div>
          </div>
          <Link href="/student/tutor" className="block w-full py-2.5 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-lg font-bold text-center hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors">
             Chat Now
          </Link>
        </div>

        {/* Recommended & Recent Activity (Span 1) */}
        <div className="space-y-6">
          {/* Recommended Game */}
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Recommended</p>
            <h3 className="text-xl font-bold mb-1">Word Match</h3>
            <p className="text-sm opacity-90 mb-4">Boost your vocabulary!</p>
            <Link href="/student/games" className="inline-block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              Play Now
            </Link>
          </div>
          
          {/* Recent Activity Mini */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Recent</h2>
            <div className="space-y-3">
              {recentActivity.slice(0, 3).map((activity: any) => (
                 <div key={activity.id} className="flex justify-between items-center">
                    <div className="truncate pr-4">
                       <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{activity.title}</p>
                    </div>
                    {activity.xp_earned > 0 && (
                       <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">+{activity.xp_earned}</span>
                    )}
                 </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
