"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAssignment } from "../services/admin-actions";

type Profile = {
  id: string;
  email: string;
  full_name?: string;
};

export default function CreateAssignmentModal({ teachers, students, games, stories }: { teachers: Profile[], students: Profile[], games: any[], stories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentType, setContentType] = useState("story");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createAssignment(formData);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to create assignment:", error);
      alert("Failed to create assignment");
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentContentOptions = contentType === "story" ? stories : contentType === "game" ? games : [];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
      >
        + New Assignment
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6 shadow-xl relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Create New Assignment</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input 
                  name="title" 
                  required 
                  className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  placeholder="e.g. Weekend Reading"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content Type</label>
                  <select 
                    name="content_type" 
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  >
                    <option value="story">Story</option>
                    <option value="game">Game</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content Item</label>
                  <select 
                    name="content_id" 
                    required
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  >
                    {currentContentOptions.map(item => (
                      <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                    {currentContentOptions.length === 0 && <option value="">No items found</option>}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Assign To Teacher</label>
                  <select 
                    name="teacher_id" 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  >
                    <option value="">-- No Teacher --</option>
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.full_name || t.email}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Assign To Student</label>
                  <select 
                    name="student_id" 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  >
                    <option value="">-- No Student --</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.full_name || s.email}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select 
                    name="status" 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                  <input 
                    type="date"
                    name="due_date" 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-bold"
                >
                  {isSubmitting ? "Creating..." : "Create Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
