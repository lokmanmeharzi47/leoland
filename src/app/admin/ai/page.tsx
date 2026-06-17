import { getAIAnalytics } from "../services/admin-services";

export default async function AIAnalyticsPage() {
  const analytics = await getAIAnalytics();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">AI Tutor Analytics</h2>
          <p className="text-slate-500 mt-2">Monitor AI tutoring interactions, topic trends, and student satisfaction.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">forum</span>
            </div>
            <h3 className="text-slate-500 dark:text-zinc-400 text-sm font-semibold tracking-wider">Total Conversations</h3>
          </div>
          <p className="text-3xl font-black text-slate-800 dark:text-white">{analytics.totalConversations.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">today</span>
            </div>
            <h3 className="text-slate-500 dark:text-zinc-400 text-sm font-semibold tracking-wider">Daily Conversations</h3>
          </div>
          <p className="text-3xl font-black text-slate-800 dark:text-white">{analytics.dailyConversations.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <h3 className="text-slate-500 dark:text-zinc-400 text-sm font-semibold tracking-wider">Average Session Length</h3>
          </div>
          <p className="text-3xl font-black text-slate-800 dark:text-white">{analytics.averageSessionLength}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-6">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-500">category</span>
            Most Common Topics
          </h4>
          <ul className="space-y-3">
            {analytics.mostCommonTopics.map((topic, idx) => (
              <li key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl">
                <span className="font-medium text-slate-700 dark:text-slate-300">{topic}</span>
                <span className="text-sm text-slate-500 dark:text-zinc-400">#{(idx + 1)} Popular</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-6 flex flex-col justify-center items-center text-center">
          <h4 className="text-xl font-bold mb-6 flex items-center gap-2 w-full justify-center">
            <span className="material-symbols-outlined text-yellow-500">sentiment_very_satisfied</span>
            Student Satisfaction Score
          </h4>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-zinc-800" />
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * (analytics.satisfactionScore / 5))} className="text-emerald-500" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-800 dark:text-white">{analytics.satisfactionScore}</span>
              <span className="text-sm text-slate-500 dark:text-zinc-400">out of 5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
