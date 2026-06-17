"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TeacherDashboardClient({ initialStats, roster }: { initialStats: any; roster: any[] }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8">
      {/* Title + Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0F2A8A]">Classroom Overview 🍎</h1>
          <p className="text-[#0F2A8A]/60 font-semibold mt-1">Monitor student learning and engagement.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#0F2A8A] text-white px-4 py-2 rounded-full font-black text-sm shadow-[0_4px_0_#0a1d61] hover:translate-y-0.5 hover:shadow-[0_2px_0_#0a1d61] transition-all">
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            New Assignment
          </button>
        </div>
      </div>

      {/* Class Overview Banner */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0F2A8A] to-[#1e3fb8] text-white p-6 md:p-8 shadow-[0_15px_40px_rgba(15,42,138,0.25)] flex flex-col md:flex-row gap-6 justify-between items-center"
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        
        <div className="relative z-10 flex flex-col gap-2 w-full md:w-auto">
          <h2 className="text-2xl font-black">My Classroom</h2>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {roster.slice(0, 4).map((s) => (
                <div key={s.id} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg border-2 border-[#0F2A8A] z-10 relative shadow-sm font-bold text-blue-600">
                  {(s.full_name || s.username || "?")[0].toUpperCase()}
                </div>
              ))}
            </div>
            <span className="font-bold text-white/80 text-sm">{initialStats?.totalStudents || 0} Students Enrolled</span>
          </div>
        </div>

        <div className="relative z-10 flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4 min-w-[140px]">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Active Today</p>
            <p className="text-3xl font-black">{initialStats?.activeToday || 0}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4 min-w-[140px]">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Avg XP</p>
            <p className="text-3xl font-black flex items-center gap-1"><span className="material-symbols-outlined text-[#F5B21B] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {initialStats?.avgXp || 0}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4 min-w-[140px]">
            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Avg Streak</p>
            <p className="text-3xl font-black flex items-center gap-1"><span className="material-symbols-outlined text-orange-400 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span> {initialStats?.avgStreak || 0}</p>
          </div>
        </div>
      </motion.section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Quick Stats & Attention */}
        <div className="space-y-6">
          <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
            <h3 className="text-xl font-black text-[#0F2A8A] mb-4">Content Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#F4F6FF] rounded-xl">
                <span className="font-bold text-[#0F2A8A]/70 text-sm">Stories Completed</span>
                <span className="font-black text-[#0F2A8A]">{initialStats?.storiesCompleted || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#F4F6FF] rounded-xl">
                <span className="font-bold text-[#0F2A8A]/70 text-sm">Games Played</span>
                <span className="font-black text-[#0F2A8A]">{initialStats?.gamesPlayed || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#F4F6FF] rounded-xl">
                <span className="font-bold text-[#0F2A8A]/70 text-sm">AI Tutor Sessions</span>
                <span className="font-black text-[#0F2A8A]">{initialStats?.aiSessions || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
            <div className="flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
              <h3 className="text-xl font-black text-[#0F2A8A]">Needs Attention</h3>
            </div>
            <div className="space-y-3">
              {roster.filter(s => (s.streak || 0) < 3).slice(0, 2).map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl border bg-orange-50 border-orange-200">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm shrink-0 font-bold text-orange-500">
                    {(s.full_name || s.username || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-black text-[#0F2A8A] text-sm leading-tight mb-1">{s.full_name || s.username} needs a boost!</p>
                    <p className="text-xs font-semibold text-[#0F2A8A]/60">Low streak. Assign a fun game?</p>
                  </div>
                </div>
              ))}
              {roster.length === 0 && (
                 <p className="text-sm font-semibold text-[#0F2A8A]/60">Add students to your class to see alerts here.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
            <h3 className="text-xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5B21B]">school</span>
              Quick Assignments
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm hover:bg-blue-100 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined">sports_esports</span>
                Games
              </button>
              <button className="p-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm hover:bg-emerald-100 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined">menu_book</span>
                Stories
              </button>
              <button className="p-3 bg-purple-50 text-purple-700 rounded-xl font-bold text-sm hover:bg-purple-100 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined">assignment</span>
                Lessons
              </button>
              <button className="p-3 bg-pink-50 text-pink-700 rounded-xl font-bold text-sm hover:bg-pink-100 flex flex-col items-center gap-1">
                <span className="material-symbols-outlined">public</span>
                Worlds
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Student Roster & Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Continue Learning Widget */}
          <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
             <h3 className="text-xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">play_circle</span>
                Continue Learning
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roster.slice(0, 4).map((s) => (
                  <div key={s.id} className="p-4 bg-[#F4F6FF] rounded-2xl border border-[#0F2A8A]/10">
                     <div className="flex justify-between items-center mb-3">
                       <span className="font-bold text-[#0F2A8A]">{s.full_name || s.username}</span>
                       <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Resume Available</span>
                     </div>
                     <p className="text-xs text-[#0F2A8A]/60 font-semibold mb-1">Last World: Vocabulary Forest</p>
                     <p className="text-xs text-[#0F2A8A]/60 font-semibold mb-3">Next: Wild Animals (65% Progress)</p>
                     <Link href={`/teacher/students/${s.id}`} className="block text-center w-full py-2 bg-white text-[#0F2A8A] border border-[#0F2A8A]/20 rounded-xl font-bold text-xs hover:bg-[#0F2A8A]/5">
                        View Progress
                     </Link>
                  </div>
                ))}
                {roster.length === 0 && (
                   <p className="text-sm font-semibold text-[#0F2A8A]/60">Assign students to see their continue learning status.</p>
                )}
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-[#0F2A8A]/5 shadow-[0_4px_20px_rgba(15,42,138,0.05)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-[#0F2A8A]">Student Roster</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#0F2A8A]/5">
                    <th className="pb-3 text-xs font-black uppercase tracking-wider text-[#0F2A8A]/50">Student</th>
                    <th className="pb-3 text-xs font-black uppercase tracking-wider text-[#0F2A8A]/50 hidden sm:table-cell">Level</th>
                    <th className="pb-3 text-xs font-black uppercase tracking-wider text-[#0F2A8A]/50">XP</th>
                    <th className="pb-3 text-xs font-black uppercase tracking-wider text-[#0F2A8A]/50">Streak</th>
                    <th className="pb-3 text-xs font-black uppercase tracking-wider text-[#0F2A8A]/50 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0F2A8A]/5">
                  {roster.map((s) => (
                    <tr key={s.id} className="group hover:bg-[#F4F6FF]/50 transition-colors">
                      <td className="py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-[#0F2A8A]/10 flex items-center justify-center text-lg font-bold text-[#0F2A8A]">
                          {(s.full_name || s.username || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-[#0F2A8A] text-sm">{s.full_name || s.username}</p>
                          <p className="text-[10px] font-bold text-[#0F2A8A]/40 uppercase">Active: {new Date(s.updated_at).toLocaleDateString()}</p>
                        </div>
                      </td>
                      <td className="py-4 hidden sm:table-cell">
                        <span className="bg-[#E8EDFF] text-[#0F2A8A] px-2 py-1 rounded font-black text-xs">Lvl {s.level || 1}</span>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-[#0F2A8A] text-xs">{s.total_xp || 0} XP</span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-orange-500 text-[16px]">local_fire_department</span>
                          <span className="font-bold text-[#0F2A8A] text-xs">{s.streak || 0}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <Link href={`/teacher/students/${s.id}`} className="text-blue-600 font-bold text-xs hover:underline mr-3">View Profile</Link>
                      </td>
                    </tr>
                  ))}
                  {roster.length === 0 && (
                     <tr>
                       <td colSpan={5} className="py-8 text-center text-sm font-semibold text-[#0F2A8A]/50">No students assigned to your classroom yet.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
