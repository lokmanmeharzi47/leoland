import { getTeachers } from "../services/admin-services";

export default async function TeachersPage() {
  const teachers = await getTeachers();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Teacher Management</h2>
          <p className="text-slate-500 mt-2">Manage teacher accounts, class assignments, and access.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-zinc-800/50">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Teacher</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Classes</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Students Assigned</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {teachers.length > 0 ? teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600 text-lg">
                    {(teacher.full_name || teacher.username || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium block">{teacher.full_name || teacher.username || "Unknown"}</span>
                    <span className="text-xs text-slate-500">Last active: {new Date(teacher.updated_at).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg text-sm">2 Classes</span></td>
                <td className="p-4 font-medium text-slate-700 dark:text-slate-300">45 Students</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View</button>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-800 font-medium text-sm">Suspend</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">No teachers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
