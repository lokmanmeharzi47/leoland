import { getClassRoster } from "../services/teacher-services";
import Link from "next/link";

export default async function TeacherStudentsPage() {
  const students = await getClassRoster();

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-black text-[#0F2A8A]">Student Roster</h1>
        <p className="text-[#0F2A8A]/60 font-bold mt-2">Manage your classroom and view individual progress.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#0F2A8A]/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#0F2A8A]/10 text-sm uppercase tracking-wider text-[#0F2A8A]/50">
                <th className="pb-4 font-black px-4">Student</th>
                <th className="pb-4 font-black px-4">Level</th>
                <th className="pb-4 font-black px-4">XP</th>
                <th className="pb-4 font-black px-4">Streak</th>
                <th className="pb-4 font-black px-4">Last Active</th>
                <th className="pb-4 font-black px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-[#0F2A8A]/5 last:border-0 hover:bg-[#F4F6FF]/50 transition-colors">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600">
                      {(student.full_name || student.username || "?")[0].toUpperCase()}
                    </div>
                    <span className="font-bold text-[#0F2A8A]">{student.full_name || student.username}</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-[#0F2A8A]">{student.level || 1}</td>
                  <td className="py-4 px-4 font-black text-[#F5B21B]">{student.total_xp || 0}</td>
                  <td className="py-4 px-4 font-bold text-orange-500 flex items-center gap-1">
                    {student.streak || 0} <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-[#0F2A8A]/60">
                    {new Date(student.updated_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link href={`/teacher/students/${student.id}`} className="inline-flex items-center gap-2 bg-[#0F2A8A]/5 text-[#0F2A8A] px-4 py-2 rounded-xl font-bold hover:bg-[#0F2A8A]/10 transition-colors text-sm">
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#0F2A8A]/50 font-bold">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
