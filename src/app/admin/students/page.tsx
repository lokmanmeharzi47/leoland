import { getStudents } from "../services/admin-services";

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Student Management</h2>
          <p className="text-slate-500 mt-2">Manage student progress, assignments, and accounts.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-zinc-800/50">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Student</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Level</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">XP</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Coins</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Streak</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {students.length > 0 ? students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                    {(student.full_name || student.username || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium block">{student.full_name || student.username || "Unknown"}</span>
                    <span className="text-xs text-slate-500">Last active: {new Date(student.updated_at).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm">{student.level || 1}</span></td>
                <td className="p-4 text-blue-600 font-bold">{student.total_xp || 0}</td>
                <td className="p-4 text-yellow-500 font-bold">{student.coins || 0}</td>
                <td className="p-4 text-orange-500 font-bold">{student.streak || 0}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Profile</button>
                  <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">Assign Content</button>
                  <button className="text-red-600 hover:text-red-800 font-medium text-sm">Reset Progress</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
