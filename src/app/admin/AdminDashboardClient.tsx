"use client";

import { motion } from "framer-motion";

export default function AdminDashboardClient({ 
  initialStats, 
  topStudents 
}: { 
  initialStats: any;
  topStudents: any[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-12"
    >
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Learning Platform Overview</h2>
        <p className="text-slate-500 dark:text-zinc-400 mt-2">Monitor learning content, student engagement, and platform activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: initialStats.totalStudents, icon: "school", color: "bg-blue-500" },
          { label: "Total Teachers", value: initialStats.totalTeachers, icon: "local_library", color: "bg-purple-500" },
          { label: "Total Games", value: initialStats.totalGames, icon: "sports_esports", color: "bg-orange-500" },
          { label: "Total Stories", value: initialStats.totalStories, icon: "menu_book", color: "bg-emerald-500" },
          { label: "Total XP Earned", value: initialStats.totalXp, icon: "star", color: "bg-yellow-500" },
          { label: "AI Conversations", value: initialStats.aiConversations, icon: "forum", color: "bg-pink-500" },
          { label: "Active Lessons", value: initialStats.activeLessons, icon: "assignment", color: "bg-indigo-500" },
          { label: "Daily Active Students", value: initialStats.dailyActiveStudents, icon: "trending_up", color: "bg-green-500" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${stat.color}`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <h3 className="text-slate-500 dark:text-zinc-400 text-sm font-semibold tracking-wider">{stat.label}</h3>
            </div>
            <p className="text-3xl font-black text-slate-800 dark:text-white">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Learning Content */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">Learning Content</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Learning Worlds Preview */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">public</span>
              Learning Worlds
            </h4>
            <div className="space-y-4">
              {[
                { title: "Vocabulary Forest", lessons: 45, students: 120, rate: 85 },
                { title: "Grammar Castle", lessons: 32, students: 95, rate: 78 },
                { title: "Speaking Ocean", lessons: 28, students: 110, rate: 92 },
                { title: "Reading Valley", lessons: 50, students: 150, rate: 88 },
                { title: "Writing Mountain", lessons: 40, students: 85, rate: 75 },
              ].map((world, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl">
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">{world.title}</h5>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">{world.lessons} lessons</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-blue-400">{world.students} active</p>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">{world.rate}% completion</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Games & Stories Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">sports_esports</span>
                Games Management
              </h4>
              <p className="text-slate-500 dark:text-zinc-400 mb-4 text-sm">Manage educational mini-games, difficulty levels, and XP rewards.</p>
              <a href="/admin/games" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 rounded-lg font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
                View All Games
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">menu_book</span>
                Stories Management
              </h4>
              <p className="text-slate-500 dark:text-zinc-400 mb-4 text-sm">Manage interactive reading content, reading levels, and languages.</p>
              <a href="/admin/stories" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 rounded-lg font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
                View All Stories
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Student Engagement */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-2">Student Engagement</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Top Students */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-zinc-800">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-500">military_tech</span>
                Top Students
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-800/50">
                    <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-800">Name</th>
                    <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-800">Level</th>
                    <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-800">XP</th>
                    <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-800">Streak</th>
                    <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-800">Coins</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                  {topStudents.length > 0 ? topStudents.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                          {idx + 1}
                        </div>
                        <span className="font-medium">{student.username || student.full_name || 'Unknown'}</span>
                      </td>
                      <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm">{student.level || 1}</span></td>
                      <td className="p-4 font-bold text-blue-600 dark:text-blue-400">{student.total_xp || 0}</td>
                      <td className="p-4 flex items-center gap-1">
                        <span className="material-symbols-outlined text-orange-500 text-sm">local_fire_department</span>
                        {student.streak || 0}
                      </td>
                      <td className="p-4 flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-500 text-sm">monetization_on</span>
                        {student.coins || 0}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No students found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attention Needed */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-6">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <span className="material-symbols-outlined">warning</span>
              Needs Attention
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
                <p className="font-bold text-red-800 dark:text-red-300">Low Activity</p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">12 students have not logged in for over 7 days.</p>
                <button className="mt-3 text-sm font-bold text-red-700 dark:text-red-400 hover:underline">View Students</button>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl">
                <p className="font-bold text-orange-800 dark:text-orange-300">Struggling</p>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">5 students have a lesson completion rate below 40%.</p>
                <button className="mt-3 text-sm font-bold text-orange-700 dark:text-orange-400 hover:underline">View Details</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
