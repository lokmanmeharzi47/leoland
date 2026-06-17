export default function AnalyticsDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-slate-500 mt-2">Platform-wide statistics, growth charts, and retention data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* XP Growth Chart Placeholder */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-6 h-96 flex flex-col">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-500">show_chart</span>
            XP Growth
          </h4>
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/50 rounded-xl">
             <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-zinc-600 mb-2">bar_chart</span>
             <p className="text-slate-500 dark:text-zinc-400">Total XP earned by day chart loading...</p>
          </div>
        </div>

        {/* Student Retention Placeholder */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-6 h-96 flex flex-col">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">group_add</span>
            Student Retention
          </h4>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-bold text-slate-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">7-Day Retention</span>
              <span className="text-4xl font-black text-emerald-500">82%</span>
            </div>
            <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-bold text-slate-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">30-Day Retention</span>
              <span className="text-4xl font-black text-blue-500">68%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-6">
        <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-purple-500">workspace_premium</span>
          Content Popularity
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-4">
            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-200 dark:border-zinc-700 pb-2">Most Played Games</h5>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-zinc-400">
              <li>Math Ninjas</li>
              <li>Word Explorer</li>
              <li>Space Spelling</li>
            </ol>
          </div>
          <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-4">
            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-200 dark:border-zinc-700 pb-2">Most Read Stories</h5>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-zinc-400">
              <li>The Magic Treehouse</li>
              <li>Lost in the Forest</li>
              <li>Dinosaur Adventures</li>
            </ol>
          </div>
          <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-4">
            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-200 dark:border-zinc-700 pb-2">Most Completed Lessons</h5>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-zinc-400">
              <li>Basic Addition</li>
              <li>Nouns and Verbs</li>
              <li>Phonics: Long A</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
