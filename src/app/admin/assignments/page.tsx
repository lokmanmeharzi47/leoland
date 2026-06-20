import { getAssignments, getTeachers, getStudents, getGames, getStories } from "../services/admin-services";
import CreateAssignmentModal from "./CreateAssignmentModal";

export default async function AssignmentsPage() {
  const [assignments, teachers, students, games, stories] = await Promise.all([
    getAssignments(),
    getTeachers(),
    getStudents(),
    getGames(),
    getStories()
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Assignments</h2>
          <p className="text-slate-500 mt-2">Manage and monitor student tasks, homework, and deadlines.</p>
        </div>
        <CreateAssignmentModal teachers={teachers} students={students} games={games} stories={stories} />
      </div>
      
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-zinc-800/50">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Title</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Type</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Status</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b">Due Date</th>
              <th className="p-4 text-sm font-semibold text-slate-500 dark:text-zinc-400 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {assignments.length > 0 ? assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                <td className="p-4 font-medium text-slate-900 dark:text-white">{assignment.title}</td>
                <td className="p-4 text-sm text-slate-500 capitalize">{assignment.content_type}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    assignment.status === 'completed' ? 'bg-green-100 text-green-700' : 
                    assignment.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {assignment.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-500">
                  {assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : "No Due Date"}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">No assignments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
