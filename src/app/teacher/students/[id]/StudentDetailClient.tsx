"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function StudentDetailClient({ student, activity }: { student: any; activity: any[] }) {
  const gamesActivity = activity.filter(a => a.activity_type === "played_game");
  const storiesActivity = activity.filter(a => a.activity_type === "completed_story");
  const aiActivity = activity.filter(a => a.activity_type === "ai_conversation");

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/teacher/dashboard" className="w-10 h-10 rounded-full bg-white border border-[#0F2A8A]/10 flex items-center justify-center text-[#0F2A8A] hover:bg-[#0F2A8A]/5 transition-colors">
             <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-black text-blue-600 border-4 border-white shadow-sm">
             {(student.full_name || student.username || "?")[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#0F2A8A]">{student.full_name || student.username}</h1>
            <p className="text-[#0F2A8A]/60 font-semibold mt-1">Level {student.level || 1} • {student.language || 'English'}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="bg-white px-4 py-2 rounded-xl border border-[#0F2A8A]/10 shadow-sm flex items-center gap-2">
             <span className="material-symbols-outlined text-[#F5B21B]">star</span>
             <span className="font-black text-[#0F2A8A]">{student.total_xp || 0} XP</span>
           </div>
           <div className="bg-white px-4 py-2 rounded-xl border border-[#0F2A8A]/10 shadow-sm flex items-center gap-2">
             <span className="material-symbols-outlined text-yellow-500">monetization_on</span>
             <span className="font-black text-[#0F2A8A]">{student.coins || 0}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Continue Learning & Progress */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Continue Learning Status */}
          <div className="bg-gradient-to-br from-[#0F2A8A] to-[#1e3fb8] rounded-[24px] p-8 text-white shadow-[0_10px_30px_rgba(15,42,138,0.2)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block">Continue Learning</span>
                <h2 className="text-3xl font-black mb-1">Vocabulary Forest</h2>
                <p className="text-white/80 font-bold mb-6">Current Lesson: Animals and Nature</p>
              </div>
              <div className="text-right">
                 <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Last Activity</p>
                 <p className="font-bold">2 hours ago</p>
              </div>
            </div>

            <div className="relative z-10 mb-6">
              <div className="flex justify-between text-sm font-bold mb-2">
                 <span>Progress</span>
                 <span>65%</span>
              </div>
              <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                 <div className="h-full bg-[#F5B21B] rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20 relative z-10 flex justify-between items-center">
               <div>
                 <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Next Lesson</p>
                 <p className="font-black">Wild Animals</p>
               </div>
               <button className="bg-white text-[#0F2A8A] px-4 py-2 rounded-lg font-black text-sm hover:bg-white/90 transition-colors">
                  Send Encouragement
               </button>
            </div>
          </div>

          {/* Learning Worlds Progress */}
          <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
             <h3 className="text-xl font-black text-[#0F2A8A] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#F5B21B]">public</span>
                Learning Worlds Progress
             </h3>
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-[#0F2A8A]">Vocabulary Forest</span>
                     <span className="text-sm font-bold text-[#0F2A8A]/60">18 / 25 lessons completed</span>
                   </div>
                   <div className="w-full h-2 bg-[#F4F6FF] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-[#0F2A8A]">Grammar Castle</span>
                     <span className="text-sm font-bold text-[#0F2A8A]/60">7 / 30 lessons completed</span>
                   </div>
                   <div className="w-full h-2 bg-[#F4F6FF] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '23%' }}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-[#0F2A8A]">Speaking Ocean</span>
                     <span className="text-sm font-bold text-[#0F2A8A]/60">4 / 20 lessons completed</span>
                   </div>
                   <div className="w-full h-2 bg-[#F4F6FF] rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '20%' }}></div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Tables for Games & Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
                <h3 className="text-lg font-black text-[#0F2A8A] mb-4">Games Activity</h3>
                <div className="space-y-3">
                   {gamesActivity.length > 0 ? gamesActivity.slice(0, 3).map((g) => (
                      <div key={g.id} className="p-3 bg-[#F4F6FF] rounded-xl flex justify-between items-center">
                         <div>
                            <p className="font-bold text-sm text-[#0F2A8A]">{g.title}</p>
                            <p className="text-xs text-[#0F2A8A]/60">{new Date(g.created_at).toLocaleDateString()}</p>
                         </div>
                         <div className="text-right">
                            <p className="font-bold text-sm text-[#0F2A8A]">{g.score || 0} pts</p>
                            <p className="text-xs text-emerald-600 font-bold">+{g.xp_earned} XP</p>
                         </div>
                      </div>
                   )) : <p className="text-sm text-[#0F2A8A]/50 font-semibold text-center py-4">No recent games played.</p>}
                </div>
             </div>

             <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
                <h3 className="text-lg font-black text-[#0F2A8A] mb-4">Stories Activity</h3>
                <div className="space-y-3">
                   {storiesActivity.length > 0 ? storiesActivity.slice(0, 3).map((s) => (
                      <div key={s.id} className="p-3 bg-[#F4F6FF] rounded-xl flex justify-between items-center">
                         <div>
                            <p className="font-bold text-sm text-[#0F2A8A]">{s.title}</p>
                            <p className="text-xs text-[#0F2A8A]/60">{new Date(s.created_at).toLocaleDateString()}</p>
                         </div>
                         <div className="text-right">
                            <p className="font-bold text-sm text-[#0F2A8A]">{s.score || 100}%</p>
                            <p className="text-xs text-[#0F2A8A]/50">Completed</p>
                         </div>
                      </div>
                   )) : <p className="text-sm text-[#0F2A8A]/50 font-semibold text-center py-4">No recent stories read.</p>}
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Strengths & AI Tutor */}
        <div className="space-y-6">
           {/* Student Strengths */}
           <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
              <h3 className="text-xl font-black text-[#0F2A8A] mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined text-[#F5B21B]">monitoring</span>
                 Subject Mastery
              </h3>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
                 <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-1">Strongest Subject</p>
                 <div className="flex justify-between items-center">
                    <span className="font-black text-emerald-900 text-lg">Vocabulary</span>
                    <span className="font-black text-emerald-600">92%</span>
                 </div>
              </div>

              <div className="bg-error/10 border border-error/20 rounded-xl p-4">
                 <p className="text-xs font-black text-error uppercase tracking-wider mb-1">Weakest Subject</p>
                 <div className="flex justify-between items-center">
                    <span className="font-black text-error text-lg">Speaking</span>
                    <span className="font-black text-error">58%</span>
                 </div>
              </div>
           </div>

           {/* AI Tutor Activity */}
           <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
              <h3 className="text-xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
                 <span className="material-symbols-outlined text-pink-500">smart_toy</span>
                 AI Tutor Activity
              </h3>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center pb-4 border-b border-[#0F2A8A]/10">
                    <div>
                       <p className="text-xs text-[#0F2A8A]/60 font-bold uppercase">Total Sessions</p>
                       <p className="font-black text-[#0F2A8A] text-xl">{aiActivity.length}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-[#0F2A8A]/60 font-bold uppercase">Last Chat</p>
                       <p className="font-black text-[#0F2A8A]">
                          {aiActivity.length > 0 ? new Date(aiActivity[0].created_at).toLocaleDateString() : 'Never'}
                       </p>
                    </div>
                 </div>

                 <div>
                    <p className="text-xs text-[#0F2A8A]/60 font-bold uppercase mb-2">Recent Topics</p>
                    <div className="flex flex-wrap gap-2">
                       <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-bold border border-pink-100">Animals</span>
                       <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-bold border border-pink-100">Colors</span>
                       <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-bold border border-pink-100">Greetings</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
