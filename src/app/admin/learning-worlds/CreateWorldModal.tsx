"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorld } from "../services/admin-actions";

export default function CreateWorldModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createWorld(formData);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to create world:", error);
      alert("Failed to create world");
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
        + Create World
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
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Create New World</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input 
                  name="title" 
                  required 
                  className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  placeholder="e.g. Science Lab"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea 
                  name="description" 
                  className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                  placeholder="Explore the wonders of science..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Icon (Material Symbol)</label>
                  <input 
                    name="icon" 
                    defaultValue="public"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white"
                    placeholder="e.g. public, science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Order Index</label>
                  <input 
                    type="number"
                    name="order_index" 
                    defaultValue="10"
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
                  {isSubmitting ? "Creating..." : "Create World"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
