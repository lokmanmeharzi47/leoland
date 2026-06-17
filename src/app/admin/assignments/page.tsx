export default function AssignmentsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Assignments</h2>
          <p className="text-slate-500 mt-2">Manage and monitor student tasks, homework, and deadlines.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold">
          + New Assignment
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
        <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-zinc-600 mb-4">assignment</span>
        <p className="text-slate-500 dark:text-zinc-400">Assignments management module coming soon.</p>
      </div>
    </div>
  );
}
