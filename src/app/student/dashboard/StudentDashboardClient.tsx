"use client";

import { motion } from "framer-motion";
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
    <div className="space-y-8 lg:space-y-12 w-full">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F2A8A]">Hi, {firstName}! 👋</h1>
          <p className="text-[#0F2A8A]/60 font-bold mt-2 text-lg">Ready for another adventure today?</p>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl p-5 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)] relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-[100px]">star</span>
          </div>
          <p className="text-[#0F2A8A]/60 font-black text-xs uppercase tracking-wider mb-2 relative z-10">Total XP</p>
          <p className="text-3xl font-black text-[#0F2A8A] relative z-10">{student.total_xp || 0}</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl p-5 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)] relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-[100px]">military_tech</span>
          </div>
          <p className="text-[#0F2A8A]/60 font-black text-xs uppercase tracking-wider mb-2 relative z-10">Badges Earned</p>
          <p className="text-3xl font-black text-[#0F2A8A] relative z-10">{badges?.length || 0}</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl p-5 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)] relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-[100px]">menu_book</span>
          </div>
          <p className="text-[#0F2A8A]/60 font-black text-xs uppercase tracking-wider mb-2 relative z-10">Words Learned</p>
          <p className="text-3xl font-black text-[#0F2A8A] relative z-10">{wordsCount}</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl p-5 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)] relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-[100px] text-orange-500">local_fire_department</span>
          </div>
          <p className="text-[#0F2A8A]/60 font-black text-xs uppercase tracking-wider mb-2 relative z-10">Day Streak</p>
          <p className="text-3xl font-black text-orange-500 relative z-10 flex items-center gap-2">
            {student.streak || 0}
            <span className="material-symbols-outlined text-orange-500 text-[28px]">local_fire_department</span>
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Keep Learning Section */}
          <section>
            <h2 className="text-2xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500 text-[28px]">play_circle</span>
              Continue Learning
            </h2>
            <div className="bg-gradient-to-br from-[#0F2A8A] to-[#1e3fb8] rounded-[32px] p-8 text-white shadow-[0_15px_40px_rgba(15,42,138,0.25)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4"></div>
              
              {latestProgress ? (
                <>
                  <div className="relative z-10">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block shadow-sm">Up Next</span>
                    <h3 className="text-3xl font-black mb-2">{latestProgress.worlds?.title}</h3>
                    <p className="text-white/80 font-bold mb-6 text-lg">Lesson: {latestProgress.lessons?.title}</p>
                    
                    <div className="mb-8">
                      <div className="flex justify-between text-sm font-bold mb-2">
                         <span>Progress</span>
                         <span>{latestProgress.progress_percentage}% Complete</span>
                      </div>
                      <div className="w-full h-4 bg-black/20 rounded-full overflow-hidden shadow-inner">
                         <div className="h-full bg-[#F5B21B] rounded-full" style={{ width: `${latestProgress.progress_percentage}%` }}></div>
                      </div>
                    </div>

                    <Link href={`/student/worlds/${latestProgress.worlds?.id}/lesson/${latestProgress.lessons?.id}`} className="inline-flex items-center gap-2 bg-white text-[#0F2A8A] px-6 py-3 rounded-full font-black hover:bg-white/90 hover:scale-105 transition-all shadow-md">
                       Resume Lesson
                       <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="relative z-10 text-center py-6">
                   <span className="material-symbols-outlined text-[64px] mb-4 text-white/50">explore</span>
                   <h3 className="text-2xl font-black mb-2">Start Your Journey!</h3>
                   <p className="text-white/80 font-bold mb-6">You haven't started any lessons yet.</p>
                   <Link href="/student/worlds" className="inline-flex items-center gap-2 bg-white text-[#0F2A8A] px-6 py-3 rounded-full font-black hover:bg-white/90 hover:scale-105 transition-all shadow-md">
                       Explore Worlds
                       <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
              )}
            </div>
          </section>

          {/* Progress Analytics (XP Growth) */}
          <section>
            <h2 className="text-2xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-500 text-[28px]">trending_up</span>
              XP Growth
            </h2>
            <div className="bg-white rounded-[32px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={xpGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5B21B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F5B21B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', opacity: 0.5, fontSize: 12, fontWeight: 'bold'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#0F2A8A', opacity: 0.5, fontSize: 12, fontWeight: 'bold'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(15,42,138,0.1)', fontWeight: 'bold', color: '#0F2A8A' }}
                    itemStyle={{ color: '#F5B21B', fontWeight: '900' }}
                  />
                  <Area type="monotone" dataKey="xp" stroke="#F5B21B" strokeWidth={4} fillOpacity={1} fill="url(#colorXp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Learning Worlds */}
          <section>
            <h2 className="text-2xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500 text-[28px]">public</span>
              Learning Worlds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {worldsProgress.map((world: any) => (
                <div key={world.id} className="bg-white rounded-3xl p-5 border border-[#0F2A8A]/5 shadow-sm">
                   <div className="flex justify-between items-center mb-3">
                     <span className="font-black text-[#0F2A8A] text-lg">{world.title}</span>
                     <span className="text-xs font-black text-[#0F2A8A]/50 bg-[#F4F6FF] px-2 py-1 rounded-md">{world.completedLessons} / {world.totalLessons}</span>
                   </div>
                   <div className="w-full h-3 bg-[#F4F6FF] rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${world.percentage}%` }}></div>
                   </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div className="space-y-8">

          {/* Recommendations */}
          <section>
            <h2 className="text-2xl font-black text-[#0F2A8A] mb-4">Recommended</h2>
            <div className="space-y-4">
               {/* Game */}
               <Link href="/student/games" className="block bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 inline-block">Game</span>
                  <h3 className="text-xl font-black mb-1">Word Match Challenge</h3>
                  <p className="text-white/80 text-sm font-bold">Boost your vocabulary!</p>
               </Link>
               {/* Story */}
               <Link href="/student/stories" className="block bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 inline-block">Story</span>
                  <h3 className="text-xl font-black mb-1">The Lost Lion</h3>
                  <p className="text-white/80 text-sm font-bold">Perfect for your level.</p>
               </Link>
            </div>
          </section>

          {/* AI Tutor Widget */}
          <section>
             <h2 className="text-2xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-pink-500 text-[28px]">smart_toy</span>
                AI Tutor
             </h2>
             <div className="bg-white rounded-3xl p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
                <div className="flex justify-between items-center mb-6">
                   <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-3xl shrink-0 border border-pink-200">
                      🤖
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-black text-[#0F2A8A]/50 uppercase tracking-wider">Conversations</p>
                      <p className="text-2xl font-black text-[#0F2A8A]">{aiStats.totalConversations}</p>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center p-3 bg-[#F4F6FF] rounded-xl">
                      <span className="font-bold text-[#0F2A8A] text-sm">Minutes Practiced</span>
                      <span className="font-black text-[#0F2A8A]">{aiStats.totalMinutes}</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-[#F4F6FF] rounded-xl">
                      <span className="font-bold text-[#0F2A8A] text-sm">Last Session</span>
                      <span className="font-black text-[#0F2A8A] text-sm">
                         {aiStats.lastSession ? new Date(aiStats.lastSession).toLocaleDateString() : 'Never'}
                      </span>
                   </div>
                </div>
                <Link href="/student/tutor" className="mt-4 block w-full py-3 bg-pink-50 text-pink-600 rounded-xl font-black text-center hover:bg-pink-100 transition-colors border border-pink-200">
                   Chat Now
                </Link>
             </div>
          </section>

          {/* Recent Activity */}
          <section>
             <h2 className="text-2xl font-black text-[#0F2A8A] mb-4">Recent Activity</h2>
             <div className="bg-white rounded-3xl p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)] space-y-4">
                {recentActivity.length > 0 ? recentActivity.map((activity: any) => (
                   <div key={activity.id} className="flex items-center justify-between border-b border-[#0F2A8A]/5 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-[#F4F6FF] flex items-center justify-center text-blue-500">
                            <span className="material-symbols-outlined text-[20px]">
                               {activity.activity_type.includes('game') ? 'sports_esports' : activity.activity_type.includes('story') ? 'menu_book' : 'task_alt'}
                            </span>
                         </div>
                         <div>
                            <p className="font-bold text-[#0F2A8A] text-sm">{activity.title}</p>
                            <p className="text-xs text-[#0F2A8A]/50 font-semibold">{new Date(activity.created_at).toLocaleDateString()}</p>
                         </div>
                      </div>
                      {activity.xp_earned > 0 && (
                         <div className="text-right">
                            <span className="font-black text-emerald-500 text-sm">+{activity.xp_earned} XP</span>
                         </div>
                      )}
                   </div>
                )) : (
                   <p className="text-center text-sm font-semibold text-[#0F2A8A]/50 py-4">No recent activity yet. Start exploring!</p>
                )}
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}
