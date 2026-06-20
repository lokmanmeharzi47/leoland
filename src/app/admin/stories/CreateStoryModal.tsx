"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStory } from "../services/admin-actions";

export default function CreateStoryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createStory(formData);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to create story:", error);
      alert("Failed to create story");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold"
      >
        + Create Story
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
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Create New Story</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input 
                  name="title" 
                  required 
                  className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  placeholder="e.g. The Brave Little Fox"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content</label>
                <textarea 
                  name="content" 
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  placeholder="Once upon a time..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Level</label>
                  <input 
                    name="level" 
                    required
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                    placeholder="e.g. A1, Beginner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Language</label>
                  <input 
                    name="language" 
                    required
                    defaultValue="en"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                    placeholder="e.g. en, fr, es"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <input 
                    type="checkbox" 
                    name="published" 
                    value="true"
                    className="rounded border-slate-300 dark:border-zinc-700"
                  />
                  <span>Published</span>
                </label>
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
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg font-bold"
                >
                  {isSubmitting ? "Creating..." : "Create Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
