"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, CheckCircle, Video, Star } from "lucide-react";

type Story = {
  id: string;
  title: string;
  content: string | null;
  level: string | null;
  language: string | null;
  published: boolean | null;
  slug?: string | null;
};

type Activity = {
  id: string;
  story_id: string;
  xp_earned: number;
  created_at: string;
};

export default function StoriesClient({ stories, activity }: { stories: Story[], activity: Activity[] }) {
  const readStoryIds = new Set(activity.map(a => a.story_id));
  
  // We only expect one featured video story now based on the DB reset
  const featuredStory = stories[0];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-16">
      
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[450px] rounded-[40px] overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 shadow-2xl flex items-center p-8 md:p-16 border-4 border-white/20">
        
        {/* Magical Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-50 overflow-hidden">
          <div className="absolute top-10 left-10 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-pink-400/30 rounded-full blur-3xl"></div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-32 text-6xl opacity-80 drop-shadow-lg"
          >
            ☁️
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-16 right-10 text-7xl opacity-90 drop-shadow-lg"
          >
            🏝️
          </motion.div>
          <div className="absolute top-16 left-1/2 text-yellow-300 text-3xl animate-pulse">✨</div>
          <div className="absolute bottom-24 left-1/3 text-pink-300 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-bold text-sm mb-6 border border-white/30 shadow-sm">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-yellow-100 uppercase tracking-wider">Video Experience</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 drop-shadow-md leading-tight">
            Leo’s Story World
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 font-medium max-w-xl drop-shadow-sm leading-relaxed">
            Watch magical adventures, learn new words, and grow with Leo!
          </p>
        </div>
        
        {/* Hero Illustration */}
        <div className="absolute right-10 bottom-0 z-10 hidden md:block">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[180px] leading-none drop-shadow-2xl"
          >
            🦁
          </motion.div>
        </div>
      </div>

      {/* Featured Video Story Card */}
      {featuredStory && (
        <div className="relative z-20 -mt-16 max-w-4xl mx-auto">
          <Link href={`/student/dashboard/stories/${featuredStory.id}`} className="block bg-white dark:bg-zinc-900 rounded-[32px] p-6 md:p-8 shadow-2xl border border-slate-100 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all group overflow-hidden relative">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              
              {/* Thumbnail Area */}
              <div className="w-full md:w-1/2 shrink-0 relative rounded-2xl overflow-hidden aspect-video bg-indigo-900 shadow-inner group-hover:shadow-lg transition-shadow">
                <img 
                  src={`https://img.youtube.com/vi/${featuredStory.content}/maxresdefault.jpg`} 
                  alt="Leo's Magical Adventure"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault doesn't exist
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featuredStory.content}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 group-hover:bg-white group-hover:text-purple-600 group-hover:scale-110 text-white transition-all shadow-lg">
                    <PlayCircle className="w-8 h-8 ml-1" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold border border-white/20">
                  <Video className="w-4 h-4" />
                  ANIMATED STORY
                </div>
              </div>

              {/* Info Area */}
              <div className="flex-1 w-full flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {featuredStory.level || "Beginner"}
                  </span>
                  <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    {featuredStory.language?.toUpperCase() || "FR"}
                  </span>
                  <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    +100 XP
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {featuredStory.title}
                </h2>
                
                <p className="text-slate-500 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
                  Join Leo on a magical adventure and discover new French words through a fun animated story.
                </p>

                <div className="mt-auto">
                  {readStoryIds.has(featuredStory.id) ? (
                    <div className="w-full">
                      <div className="flex justify-between items-end mb-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Completed</span>
                        <span>100%</span>
                      </div>
                      <div className="w-full h-3 bg-emerald-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-emerald-200 dark:border-zinc-700">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: `100%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-center transition-colors shadow-lg shadow-purple-600/20 group-hover:shadow-purple-600/40">
                      Watch Now
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
