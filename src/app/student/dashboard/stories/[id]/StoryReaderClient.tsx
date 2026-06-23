"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { completeStory } from "../actions";

type Story = {
  id: string;
  title: string;
  content: string | null;
  level: string | null;
  language: string | null;
  cover_url?: string | null;
  audio_url?: string | null;
};

export default function StoryReaderClient({ story, hasRead }: { story: Story, hasRead: boolean }) {
  const router = useRouter();
  const [isFinishing, setIsFinishing] = useState(false);
  const [justFinished, setJustFinished] = useState(false);
  const isRtl = story.language === 'ar';

  const handleFinish = async () => {
    setIsFinishing(true);
    try {
      // Award 100 XP for completing a story
      const result = await completeStory(story.id, 100, story.title);
      if (result.success) {
        setJustFinished(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/student/dashboard/stories" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-zinc-900 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-zinc-800"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span className="font-bold text-sm">Back to Library</span>
        </Link>
      </div>

      {/* Book Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-zinc-800">
        
        {/* Cover Image Header */}
        <div className="w-full h-64 md:h-80 bg-blue-50 dark:bg-blue-500/10 relative flex flex-col items-center justify-center text-blue-500">
          {story.cover_url ? (
            <img src={story.cover_url} alt={story.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-8xl">📖</div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
            <div className="w-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                  {story.level || "Beginner"}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">translate</span>
                  {story.language || "EN"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                {story.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div 
          className="p-8 md:p-12 text-slate-800 dark:text-slate-200 text-xl leading-relaxed md:leading-loose font-medium"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {story.content ? (
            <div className="whitespace-pre-wrap">{story.content}</div>
          ) : (
            <div className="italic text-slate-400 text-center py-10">Story content is missing.</div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-slate-50 dark:bg-zinc-950 border-t border-slate-100 dark:border-zinc-800 flex justify-center">
          {hasRead || justFinished ? (
            <div className="flex flex-col items-center text-emerald-500 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fantastic Reading!</h3>
              <p className="text-slate-500 mt-1">You earned +100 XP for this story.</p>
              
              <Link 
                href="/student/dashboard/stories"
                className="mt-6 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-colors"
              >
                Find Another Story
              </Link>
            </div>
          ) : (
            <button
              onClick={handleFinish}
              disabled={isFinishing}
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-50 disabled:active:scale-100 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-3"
            >
              {isFinishing ? (
                <span className="material-symbols-outlined animate-spin">refresh</span>
              ) : (
                <span className="material-symbols-outlined">auto_awesome</span>
              )}
              {isFinishing ? "Finishing..." : "I Finished the Story!"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
