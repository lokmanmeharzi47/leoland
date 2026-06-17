import { getAssignments } from "../services/teacher-services";

export default async function TeacherAssignmentsPage() {
  const assignments = await getAssignments();

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F2A8A]">Assignments</h1>
          <p className="text-[#0F2A8A]/60 font-bold mt-2">Manage and track student assignments.</p>
        </div>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-black shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors">
          + New Assignment
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#0F2A8A]/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#0F2A8A]/10 text-sm uppercase tracking-wider text-[#0F2A8A]/50">
                <th className="pb-4 font-black px-4">Content</th>
                <th className="pb-4 font-black px-4">Type</th>
                <th className="pb-4 font-black px-4">Assigned To</th>
                <th className="pb-4 font-black px-4">Status</th>
                <th className="pb-4 font-black px-4">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment: any) => (
                <tr key={assignment.id} className="border-b border-[#0F2A8A]/5 last:border-0 hover:bg-[#F4F6FF]/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#0F2A8A]">{assignment.title}</td>
                  <td className="py-4 px-4">
                    <span className="bg-[#F4F6FF] text-[#0F2A8A] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                      {assignment.content_type}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-[#0F2A8A]/80">
                    {assignment.student_id ? assignment.profiles?.full_name || assignment.profiles?.username : "Entire Class"}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      assignment.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-[#0F2A8A]/60">
                    {assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : 'No Due Date'}
                  </td>
                </tr>
              ))}
              {assignments.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#0F2A8A]/50 font-bold">No assignments yet. Click "New Assignment" to start.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
