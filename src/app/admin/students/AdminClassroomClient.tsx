"use client";

import { useState, useTransition } from "react";
import { adminAssignStudentToClassroom, adminCreateClassroom } from "@/app/actions/admin-mutations";

type Classroom = { id: string; name: string; teacher_id: string; profiles?: { full_name: string | null; username: string | null } };
type Profile = { id: string; full_name: string | null; username: string | null; role: string };

export default function AdminClassroomClient({
  classrooms,
  unassignedStudents,
  teachers
}: {
  classrooms: Classroom[];
  unassignedStudents: Profile[];
  teachers: Profile[];
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedClassroom, setSelectedClassroom] = useState<string>(classrooms[0]?.id || "");
  const [error, setError] = useState("");
  
  // For creating classroom
  const [newClassName, setNewClassName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<string>(teachers[0]?.id || "");

  const handleCreateClass = async () => {
    if (!newClassName.trim() || !selectedTeacher) return;
    setError("");
    startTransition(async () => {
      const res = await adminCreateClassroom(selectedTeacher, newClassName);
      if (res.success) {
        setNewClassName("");
      } else {
        setError(res.error || "Failed to create classroom");
      }
    });
  };

  const handleAddStudent = async (studentId: string) => {
    if (!selectedClassroom) {
      setError("Please select a classroom first.");
      return;
    }
    setError("");
    startTransition(async () => {
      const res = await adminAssignStudentToClassroom(selectedClassroom, studentId);
      if (!res.success) {
        setError(res.error || "Failed to add student");
      }
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-100 dark:border-zinc-800 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Global Classroom Management</h2>
      
      {error && <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-xl">{error}</div>}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-xl">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Create Classroom for Teacher</h3>
            <div className="flex flex-col gap-2">
              <select
                className="px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.full_name || t.username || "Unknown Teacher"}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Classroom Name"
                  className="flex-1 px-4 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                />
                <button
                  onClick={handleCreateClass}
                  disabled={isPending || !newClassName.trim()}
                  className="bg-blue-600 text-white px-4 py-2 font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Create
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Target Classroom</h3>
            <select
              className="w-full px-4 py-3 border border-slate-200 dark:border-zinc-700 rounded-lg focus:outline-none"
              value={selectedClassroom}
              onChange={(e) => setSelectedClassroom(e.target.value)}
            >
              {classrooms.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.profiles?.full_name || "Unknown Teacher"})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Unassigned Students</h3>
          <div className="border border-slate-200 dark:border-zinc-700 rounded-xl overflow-hidden h-64 overflow-y-auto">
            {unassignedStudents.length === 0 ? (
              <div className="p-4 text-center text-slate-500 text-sm">
                No unassigned students available.
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-zinc-800">
                {unassignedStudents.map(student => (
                  <li key={student.id} className="p-3 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                    <span className="font-medium text-slate-900 dark:text-slate-200 text-sm">
                      {student.full_name || student.username || "Unknown Student"}
                    </span>
                    <button
                      onClick={() => handleAddStudent(student.id)}
                      disabled={isPending || !selectedClassroom}
                      className="text-xs bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md font-medium hover:bg-slate-200 disabled:opacity-50"
                    >
                      Assign to Class
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
