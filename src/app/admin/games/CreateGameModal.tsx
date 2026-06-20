"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGame } from "../services/admin-actions";

export default function CreateGameModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createGame(formData);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to create game:", error);
      alert("Failed to create game");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
      >
        + Create Game
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
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Create New Game</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input 
                  name="title" 
                  required 
                  className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  placeholder="e.g. Math Quest"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea 
                  name="description" 
                  className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  placeholder="A fun math game..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <input 
                    name="category" 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                    placeholder="e.g. math"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
                  <select 
                    name="difficulty" 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">XP Reward</label>
                  <input 
                    type="number" 
                    name="xp_reward" 
                    required 
                    min="0"
                    defaultValue="10"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select 
                    name="status" 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
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
                  {isSubmitting ? "Creating..." : "Create Game"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
