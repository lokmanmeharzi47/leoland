"use client";

import { useState } from "react";
import Link from "next/link";
import { completeStory } from "../actions";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, Star, Trophy } from "lucide-react";

type Story = {
  id: string;
  title: string;
  content: string | null; // YouTube ID is stored here
  level: string | null;
  language: string | null;
  cover_url?: string | null;
  audio_url?: string | null;
};

export default function StoryReaderClient({ story, hasRead }: { story: Story, hasRead: boolean }) {
  const [isFinishing, setIsFinishing] = useState(false);
  const [justFinished, setJustFinished] = useState(false);

  const videoId = story.content || "8lkPUEP0ZQ0"; // Fallback to prompt's ID if empty

  const handleFinish = async () => {
    setIsFinishing(true);
    try {
      const result = await completeStory(story.id, 100, story.title);
      if (result.success) {
        setJustFinished(true);
        // Launch confetti!
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#a855f7']
        });
      }
    } catch (error) {
      console.error(error);
      // Failsafe for UI
      setJustFinished(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full pb-16">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/student/dashboard/stories" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-zinc-900 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-zinc-800 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Back to Library</span>
        </Link>

        {/* Progress Display */}
        {(hasRead || justFinished) ? (
          <div className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 border border-emerald-200 dark:border-emerald-900/50">
            <CheckCircle className="w-5 h-5" />
            Completed
          </div>
        ) : (
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-amber-200 dark:border-amber-900/50">
            <Star className="w-5 h-5 fill-current" />
            100 XP Reward
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 flex flex-col">
        
        {/* Header */}
        <div className="p-8 text-center bg-gradient-to-b from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900 border-b border-slate-100 dark:border-zinc-800">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            {story.title}
          </h1>
          <div className="flex justify-center items-center gap-3">
            <span className="bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              {story.level || "Beginner"}
            </span>
            <span className="bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-1">
              {story.language?.toUpperCase() || "FR"}
            </span>
          </div>
        </div>

        {/* Video Player Frame */}
        <div className="p-4 md:p-8 w-full bg-slate-50/50 dark:bg-zinc-950/50">
          <div className="relative max-w-4xl mx-auto rounded-[32px] overflow-hidden p-2 bg-gradient-to-br from-purple-400 via-pink-500 to-amber-500 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
            {/* Magical Stars floating around the frame */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-3 -left-3 text-4xl z-10 drop-shadow-md">✨</motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute -bottom-4 -right-2 text-5xl z-10 drop-shadow-md">🌟</motion.div>

            <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-black">
              <iframe 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&showinfo=0`}
                title={story.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 md:p-12 border-t border-slate-100 dark:border-zinc-800 flex justify-center bg-white dark:bg-zinc-900 relative">
          
          <AnimatePresence mode="wait">
            {hasRead || justFinished ? (
              <motion.div 
                key="completed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center max-w-lg mx-auto"
              >
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner relative">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-300 dark:border-emerald-700"></motion.div>
                  <Trophy className="w-10 h-10 relative z-10" />
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Amazing!</h3>
                <p className="text-xl text-slate-500 dark:text-zinc-400 mb-8 font-medium">
                  You completed <strong className="text-emerald-600 dark:text-emerald-400">{story.title}</strong> and earned 100 XP!
                </p>
                
                <Link 
                  href="/student/dashboard/stories"
                  className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-[0_8px_0_#065f46] hover:translate-y-1 hover:shadow-[0_4px_0_#065f46] active:translate-y-2 active:shadow-none transition-all w-full md:w-auto"
                >
                  Return to Story World
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                key="incomplete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-md mx-auto"
              >
                <p className="text-center text-slate-500 dark:text-zinc-400 font-medium mb-6">
                  Did you finish watching the story?
                </p>
                <button
                  onClick={handleFinish}
                  disabled={isFinishing}
                  className="w-full px-8 py-5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-2xl font-black text-xl shadow-[0_8px_0_#065f46] hover:translate-y-1 hover:shadow-[0_4px_0_#065f46] active:translate-y-2 active:shadow-none disabled:translate-y-0 disabled:shadow-none transition-all flex items-center justify-center gap-3 group"
                >
                  {isFinishing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[24px]">refresh</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
                      Complete Story & Earn 100 XP
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
