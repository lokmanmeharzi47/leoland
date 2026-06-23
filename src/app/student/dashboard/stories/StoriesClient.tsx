"use client";

import Link from "next/link";
import { useMemo } from "react";

type Story = {
  id: string;
  title: string;
  content: string | null;
  level: string | null;
  language: string | null;
  published: boolean | null;
  cover_url?: string | null;
  audio_url?: string | null;
  slug?: string | null;
};

type Activity = {
  id: string;
  story_id: string;
  xp_earned: number;
  created_at: string;
};

const categories = [
  { icon: "pets", title: "Leo Adventures", color: "text-purple-600 bg-purple-50 border-purple-100 dark:bg-purple-500/10 dark:border-purple-500/20" },
  { icon: "castle", title: "Fairy Tales", color: "text-pink-600 bg-pink-50 border-pink-100 dark:bg-pink-500/10 dark:border-pink-500/20" },
  { icon: "rocket", title: "Space Stories", color: "text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20" },
  { icon: "water", title: "Ocean Stories", color: "text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20" },
];

export default function StoriesClient({ stories, activity }: { stories: Story[], activity: Activity[] }) {
  // Determine which stories have been read
  const readStoryIds = new Set(activity.map(a => a.story_id));
  
  // Sort stories into Continue Reading vs Unread
  const continueReading = stories.filter(s => readStoryIds.has(s.id));
  const unreadStories = stories.filter(s => !readStoryIds.has(s.id));
  
  // Featured could just be the latest published unread story
  const featuredStories = unreadStories.slice(0, 3);
  const recommendedStories = unreadStories.slice(3, 8);

  const BookCard = ({ b, hasRead }: { b: Story, hasRead: boolean }) => (
    <Link href={`/student/dashboard/stories/${b.id}`} className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col shrink-0 w-64 hover:border-blue-200 dark:hover:border-blue-900 transition-colors group cursor-pointer" dir={b.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`w-full h-32 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center text-5xl mb-4 relative overflow-hidden`}>
        {b.cover_url ? (
          <img src={b.cover_url} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <span className="group-hover:scale-110 transition-transform">📖</span>
        )}
        {b.audio_url && (
          <span className={`absolute top-2 ${b.language === 'ar' ? 'left-2' : 'right-2'} bg-white/90 dark:bg-black/50 backdrop-blur p-1.5 rounded-lg text-slate-800 dark:text-slate-200 shadow-sm flex items-center justify-center`}>
            <span className="material-symbols-outlined text-[14px]">volume_up</span>
          </span>
        )}
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight line-clamp-2" title={b.title}>{b.title}</h3>
      </div>
      <div className="flex justify-between items-center mb-4 mt-auto pt-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{b.level || "Beginner"}</span>
        <div className="flex items-center gap-1 text-slate-500 dark:text-zinc-400 font-medium text-xs bg-slate-50 dark:bg-zinc-800 px-2 py-1 rounded border border-slate-100 dark:border-zinc-700">
          <span className="material-symbols-outlined text-[14px]">translate</span> {b.language || "EN"}
        </div>
      </div>

      {hasRead ? (
        <div className="mt-2">
          <div className="flex justify-between text-xs font-bold text-emerald-500 mb-1.5">
            <span>Completed</span>
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-100 dark:bg-zinc-800 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-500 rounded-full" style={{ width: `100%` }} />
          </div>
        </div>
      ) : (
        <div className="w-full mt-2 py-2 bg-slate-100 dark:bg-zinc-800 group-hover:bg-slate-200 dark:group-hover:bg-zinc-700 text-slate-900 dark:text-white rounded-lg font-bold text-sm transition-colors text-center">
          Read Now
        </div>
      )}
    </Link>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            Story Library <span className="text-4xl">📖</span>
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Discover magical adventures with Leo.</p>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Search stories..." 
            className="px-4 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Story of the Day Banner */}
      {stories.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm" dir={stories[0].language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="w-24 h-24 bg-amber-400 text-white rounded-2xl flex items-center justify-center text-5xl shrink-0 shadow-inner overflow-hidden relative">
            {stories[0].cover_url ? (
              <img src={stories[0].cover_url} alt={stories[0].title} className="w-full h-full object-cover" />
            ) : (
              "🌟"
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-amber-500">auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">Story of the Day</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{stories[0].title}</h2>
            <p className="text-slate-600 dark:text-zinc-300 mb-4 line-clamp-2">{stories[0].content || "A beautiful tale about hoping, dreaming, and the magic of friendship."}</p>
            <Link href={`/student/dashboard/stories/${stories[0].id}`} className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-bold transition-colors">
              Read Now
            </Link>
          </div>
        </div>
      )}

      {/* Categories */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className={`${cat.color} rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer border hover:shadow-sm transition-shadow`}>
              <span className="material-symbols-outlined text-[32px]">{cat.icon}</span>
              <span className="font-bold text-sm text-center">{cat.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Continue Reading */}
      {continueReading.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Read Again</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide snap-x">
            {continueReading.map(book => <BookCard key={book.id} b={book} hasRead={true} />)}
          </div>
        </section>
      )}

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Featured Stories</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide snap-x">
            {featuredStories.map(book => <BookCard key={book.id} b={book} hasRead={false} />)}
          </div>
        </section>
      )}

      {/* Recommended Stories */}
      {recommendedStories.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recommended for You</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide snap-x">
            {recommendedStories.map(book => <BookCard key={book.id} b={book} hasRead={false} />)}
          </div>
        </section>
      )}

      {stories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No stories available yet.</h3>
          <p className="text-slate-500 mt-2">Check back later for magical adventures!</p>
        </div>
      )}
      
    </div>
  );
}
