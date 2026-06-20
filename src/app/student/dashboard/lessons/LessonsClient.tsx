"use client";

import Link from "next/link";

type Assignment = {
  id: string;
  class_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  content_type: string;
  content_id: string;
};

type LearningWorld = {
  id: string;
  name: string;
  description: string | null;
  level_requirement: number;
};

export default function LessonsClient({ 
  assignments, 
  worlds,
  studentLevel
}: { 
  assignments: Assignment[], 
  worlds: LearningWorld[],
  studentLevel: number
}) {
  const ongoingWorld = worlds.find(w => studentLevel >= w.level_requirement) || worlds[0];
  
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            My Learning Path
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Continue your curriculum and unlock new worlds.</p>
        </div>
      </div>

      {/* Ongoing Quest Banner */}
      {ongoingWorld && (
        <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 text-white shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center text-5xl shrink-0 relative z-10 border border-white/30">
            🦁
          </div>
          <div className="flex-grow relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-blue-50 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Ongoing Quest
            </span>
            <h2 className="text-3xl font-bold mb-2">{ongoingWorld.name}</h2>
            <p className="text-blue-100 mb-5 max-w-lg">{ongoingWorld.description || "Explore and master new skills in this learning world!"}</p>
            <div className="flex flex-wrap items-center gap-6">
              <button className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">play_circle</span> Enter World
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignments Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">My Assignments</h2>
        {assignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">
                    {assignment.content_type === "game" ? "🎮" : "📖"}
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400`}>
                    {assignment.content_type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{assignment.title}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4 flex-1">{assignment.description || "Complete this assignment."}</p>
                
                <div className="space-y-4 mb-6">
                  {assignment.due_date && (
                    <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-3 border border-slate-100 dark:border-zinc-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">event</span> Due Date
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                        {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" }).format(new Date(assignment.due_date))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-auto">
                  <Link href={`/student/dashboard/${assignment.content_type}s`} className="block text-center w-full py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-white rounded-lg font-bold transition-colors">
                    Start
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-slate-200 dark:border-zinc-800 shadow-sm text-center">
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No active assignments</h3>
            <p className="text-slate-500 mt-2">You're all caught up! Explore games and stories to keep learning.</p>
          </div>
        )}
      </div>

      {/* Learning Worlds */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">All Learning Worlds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {worlds.map((world) => {
            const isUnlocked = studentLevel >= world.level_requirement;
            return (
              <div key={world.id} className={`bg-white dark:bg-zinc-900 rounded-2xl p-6 border ${isUnlocked ? 'border-emerald-200 dark:border-emerald-900' : 'border-slate-200 dark:border-zinc-800'} shadow-sm flex items-start gap-4`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${isUnlocked ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-100 dark:bg-zinc-800 grayscale'}`}>
                  {isUnlocked ? "🌍" : "🔒"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {world.name}
                    {isUnlocked && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Unlocked</span>}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">{world.description}</p>
                  {!isUnlocked && (
                    <p className="text-xs font-semibold text-orange-500 mt-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">lock</span> Requires Level {world.level_requirement}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
