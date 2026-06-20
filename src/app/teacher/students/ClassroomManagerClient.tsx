"use client";

import { useState, useTransition } from "react";
import { createClassroom, addStudentToClassroom, removeStudentFromClassroom } from "@/app/actions/teacher-mutations";

type Classroom = { id: string; name: string };
type Profile = { id: string; full_name: string | null; username: string | null };

export default function ClassroomManagerClient({
  classrooms,
  unassignedStudents,
}: {
  classrooms: Classroom[];
  unassignedStudents: Profile[];
}) {
  const [isPending, startTransition] = useTransition();
  const [newClassName, setNewClassName] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState<string>(classrooms[0]?.id || "");
  const [error, setError] = useState("");

  const handleCreateClass = async () => {
    if (!newClassName.trim()) return;
    setError("");
    startTransition(async () => {
      const res = await createClassroom(newClassName);
      if (res.success) {
        setNewClassName("");
      } else {
        setError(res.error || "Failed to create classroom");
      }
    });
  };

  const handleAddStudent = async (studentId: string) => {
    if (!selectedClassroom) {
      setError("Please select or create a classroom first.");
      return;
    }
    setError("");
    startTransition(async () => {
      const res = await addStudentToClassroom(selectedClassroom, studentId);
      if (!res.success) {
        setError(res.error || "Failed to add student");
      }
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#0F2A8A]/5 shadow-sm mb-8">
      <h2 className="text-xl font-black text-[#0F2A8A] mb-4">Manage Classrooms</h2>
      
      {error && <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-xl">{error}</div>}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Create & Select Classroom */}
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="font-bold text-[#0F2A8A]/70 mb-2">Create New Classroom</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Classroom Name (e.g., Grade 3)"
                className="flex-1 px-4 py-2 border border-[#0F2A8A]/10 rounded-xl focus:outline-none focus:border-[#F5B21B]"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                disabled={isPending}
              />
              <button
                onClick={handleCreateClass}
                disabled={isPending || !newClassName.trim()}
                className="bg-[#F5B21B] text-[#0F2A8A] px-4 py-2 font-bold rounded-xl hover:bg-[#F5B21B]/90 disabled:opacity-50 transition-colors"
              >
                {isPending ? "Saving..." : "Create"}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#0F2A8A]/70 mb-2">Select Active Classroom</h3>
            <select
              className="w-full px-4 py-3 border border-[#0F2A8A]/10 rounded-xl bg-white focus:outline-none focus:border-[#F5B21B] font-bold text-[#0F2A8A]"
              value={selectedClassroom}
              onChange={(e) => setSelectedClassroom(e.target.value)}
              disabled={classrooms.length === 0}
            >
              {classrooms.length === 0 && <option value="">No classrooms available</option>}
              {classrooms.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side: Add Unassigned Students */}
        <div className="flex-1">
          <h3 className="font-bold text-[#0F2A8A]/70 mb-2">Unassigned Students Pool</h3>
          <div className="border border-[#0F2A8A]/10 rounded-xl overflow-hidden h-48 overflow-y-auto">
            {unassignedStudents.length === 0 ? (
              <div className="p-4 text-center text-[#0F2A8A]/50 text-sm font-semibold">
                No unassigned students available.
              </div>
            ) : (
              <ul className="divide-y divide-[#0F2A8A]/5">
                {unassignedStudents.map(student => (
                  <li key={student.id} className="p-3 flex justify-between items-center hover:bg-[#F4F6FF]/50 transition-colors">
                    <span className="font-bold text-[#0F2A8A] text-sm">
                      {student.full_name || student.username || "Unknown Student"}
                    </span>
                    <button
                      onClick={() => handleAddStudent(student.id)}
                      disabled={isPending || !selectedClassroom}
                      className="text-xs bg-[#0F2A8A]/5 text-[#0F2A8A] px-3 py-1.5 rounded-lg font-bold hover:bg-[#0F2A8A]/10 disabled:opacity-50"
                    >
                      Add to Class
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
