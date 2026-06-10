"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function StoriesPage() {
  const [activeLanguage, setActiveLanguage] = useState("English");
  const [activeDifficulty, setActiveDifficulty] = useState("Level 1: Beginner");

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const newStories = [
    {
      id: 1,
      title: "The Pumpkin Palace",
      level: "Lvl 1",
      progress: 75,
      status: "75% Complete",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC71zFD20Fq5Dzv2PXSju4xHciaXFx1fLKsIFnqKCzxFOG-jkrBCmEF5QwNoNwLMScSLeB_sMEYY_wx0Oik8Yx1Mg-xyO254ra-shrW6CnnDCLwBYu15NoUmmXkpkTM9BlsudrvGoFcjwY_XRD_FCmF0XqS3F0hn9XebROZ5v8WuAsBg9niws1eiBlqdDMbAltsOY55u0dThIO-I_GJVp-Z8IXv745BYlZ4YAyEpIMUYG9D0SCIJ-KEE61srGcceOckHCO2eLtcs5J",
      badge: { icon: "volume_up", text: "AUDIO", color: "text-secondary" },
      actionIcon: "arrow_forward"
    },
    {
      id: 2,
      title: "Rusty's Garden",
      level: "Lvl 2",
      progress: 0,
      status: "Not Started",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdZHDbWp6V1dE4ntIjKyfK1OjtdMWFfNGRw8F6VHXtLPbTuStHnqMRQ0P_hkgetK2ZUgGmQMVc5XJ_lN7CO-0tbCW0HMP_iGjF88bu-HBAO4cIRY_yMPJNoWrWOZLrRlo4-xTI6SDYVddF58o_x5fl6HbfKZ3K_3cdLnpLXXMZg63HmIm7fswQiOoikXr36VBIXHeG7nCOistQb5E27BzpzBv4KXV55VslRYH3rqZFw8NFxej5oKYI2JJaY7PSMNP0cCNiAXpEL3W-",
      badge: { icon: "auto_awesome", text: "NEW", color: "text-secondary" },
      actionIcon: "play_circle"
    },
    {
      id: 3,
      title: "Pearl's Deep Discovery",
      level: "Lvl 1",
      progress: 100,
      status: "Completed!",
      statusColor: "text-secondary",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4rRGPX-QMKWov2m4FYjKQODz_2jwMrDcSPY5hwkVxgar9FviOomaB1v-w9oamlDhM7NhVrFvb_yxPVnp9NrKA2PJn54n_R2RQ9o7XH2AMuXwT0be4fA9Jn9kj3E41NyOVEZ95ovEAM2MkX5s7XWdO2ZU9ifUyHsIAy7mLa8W1U-R-B4a9FnVKQY3iA3U3AIEODIaFWcWDIzX4cQwNKpJuueeGyTGi9zfEp5SQjS42YmxBF5r70bpxOwwAEfJyS3eqh0pUXVZzAUMp",
      actionIcon: "verified",
      actionColor: "text-secondary"
    },
    {
      id: 4,
      title: "Puff's Big Birthday",
      level: "Lvl 1",
      progress: 25,
      status: "25% Complete",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdnLW8OQ9xmhtJKSzcwXgszfMbofzoGBu4KoVcU_dF4iiUYz1pSfOqkCCyzh0EKGeCYmSUeZJlRu63qhqUKfdl68Y4rj18f7PQNKMK7ub95R45LXkUN-UehsJw3IRHbj4UkxJZKvd5tO5WcT4umnYP72eUWq1aPFZykekiW_vg9j6HBrCeVbdorgmAwdz2O9k3dr8dAG9Gto-WB6d-TIRO30MQkeLoOh93CO_G2gxSNv1jdvijlg5VS5z1lN_6Ww44_vSBI2qDVL1f",
      actionIcon: "arrow_forward"
    }
  ];

  const popularStories = [
    {
      id: 1,
      title: "Starry Skies",
      badge: "Top Rated",
      meta: "15 min read • Lvl 2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv5RsmYu_HOozd9SCN6aRfHHihUeAQFv1wSGiZ2J1fHDvtYqGPM6k8jfwCxXti6fatblj5WR06lGp87qP674ru1fhI0JzrOCEckLqiAxgBBfV7JfrDGW-tdsxND3NcEwb-IGaZLnEtBcQoeDV8u3t0BW7khkg5gkR3lXYF8Q18O0amwqJ5p_BrR46GbIIQ66DnH-uy1MDFZ5uQ6hTVZY6Aa0FYObq1hP9h-cYE81cYmpJJ2udyUp_n8BSYnri69JEmNk5_Ca-r_AXB"
    },
    {
      id: 2,
      title: "Cave Quest",
      badge: "Bestseller",
      meta: "10 min read • Lvl 1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAerIz47wAcsXGKJax3_5IqZctdXlLMb2l04v88gshpIHHs7ZHdv-PruNHhwioThaMVj0oisvnO-j0PP8XN48c8sGgJ5bStxIlz7GVIoS2WqxwQrB1gPtDV-wfOLF8gK9kd6844bV-mW_95aTfD16ToYjyvO4FeB8NGDtN_nK_9NurX42pmOv4I3Af3q6H3vUVsvZN-zotKjOeGsGGBea0vQu34tPXS-lv2qGtoaZ5UeTAY4vKg5iSFOc2hi-AegyoOCFPzXBTqmKYC"
    },
    {
      id: 3,
      title: "Cloud Cakes",
      badge: "Fan Favorite",
      meta: "12 min read • Lvl 3",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1GbkoUmwcFIU2-c3O62YDswUhQFZXZ1I4KlJsyMuiQo-42MXXh7Udk7CjEJ8hq6LNPNHaHUPrI2OE46ohKqRi-7YKDWzvNuvwp-GVE1ltMONK4__9fX7838QT3XpIGMspAxBfYQtGPcSwbV2kfQRLMpCfVui9VGX44KolCrl6uTl-7pWlF79yS6xbtyliqp_zadiwuMvVoTXGPj-P0W1Lso1CqTaj17uBffs9cS5KdVjl6RQg1THarDq2TMjFvf_0snluUGZke1ac"
    }
  ];

  const beginnerStories = [
    {
      id: 1,
      title: "A is for Apple",
      time: "5 min",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgK35w9zfqRCG9vD-sZ0YhRW81bgHAgRecEzQxyuBaukZBK62tJsO3BeknYZLrd41AoDKgZnCEWfKxuALMjI6IxR1E_JPhHvUPmi29CsGZl9W20SZFyxm3vFkRh4tNRSMQpvvuS-IOiVTSlYfVxhquqjN9hKajXpAQltfQ_gGzigmysu3vM4GPdWf3iZfizRATRyFTIUtUG8weJD8pqBOCmDoY4UUHq4XjjGgxwRBMgjbUIXI90wieHQnpIg3nLojUVIB1leKveKz7"
    },
    {
      id: 2,
      title: "The Tiny Ant",
      time: "8 min",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJjmBdKWZ711jPS__5hVqKX8CEYPFoySvYd9I8vXhVzhqPhAsunHM9nRV57447GCvcx9v6naY8vBaRXhcRI1wmfZIorlhRHR5EyiTLi-BgNxxrNax1ER8P9__E69G1j4foQNV1SvTyjb2gQnCYixWyNLFXfHgaRS-3YjrHqPwX4pz3W24-d2zbqpuieLlyxc5jfbA9YzpK7QzSfY4lG0ZeCR6KQOm74PAHvJ6JZ1yewplaE95kiCgaw8SMHLJGS3M5NH43EvIwtWd1"
    },
    {
      id: 3,
      title: "The Big Blue Whale",
      time: "6 min",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn3ztEmq4Dnsht0-iBc7O9r0xz1eprcSSjOwejas1KEUQhXEDnL0-lfMbZaq5N8iQ8tSZIBFsJ5qoRKgFmv_wUuDrC8lO4vyYniRj4Z0afY8A3UitD6qUOPaX9Raannvj-wYi6EoMQoWnQyhUpG88MWduOGpypu9IvuWCpQiP1p6YH-6S-9ZbGqVtVn7_R6dHxZpViOXoqlCOX_zvLBcP2LfBgxJK3F4JZp72bFa6HI5li6AfZ_SYH7-BZsdhe7pTRauv4Yc4XHl1y"
    },
    {
      id: 4,
      title: "Sunny Days",
      time: "4 min",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN7a3ZFlSTnZl8Cqow90E2nYezdp2m5rh2WTV4J-5bAKkK8B2TOrTkpCu8Y3S9Q3OJ5JSo0wiAgKCz5CFpw9Seqn0MH0iNbWYdKoRL8ieTclzNtl5aL0sak9XSM--kZBCKENmYSFH1K2LrmrrRv90_J4p1Ti3ThZRhq5MOEkBL2NDtRXQ6Lg9MgqO1ucwD3DFWAXIZIMpTtCqRjh_2XqbpbZs5dkPRfAQv0-9PQLoPwOyGq5yPg6QQw4ffu0kt3PPBNe62aDLKDRrO"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex-grow w-full max-w-[1440px] mx-auto overflow-x-hidden flex"
    >
      {/* Sidebar Shell (Filters) */}
      <motion.aside variants={fadeInUp} className="h-[calc(100vh-80px)] w-64 sticky top-20 hidden lg:flex flex-col bg-surface-container-lowest border-r border-outline-variant/10 p-md gap-base">
        <div className="mb-md">
          <div className="flex items-center gap-sm mb-xs">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container">auto_stories</span>
            </div>
            <div>
              <h2 className="font-display-lg text-headline-sm text-primary">Stories</h2>
              <p className="font-label-caps text-label-caps text-on-surface-variant">Ready to Learn?</p>
            </div>
          </div>
        </div>
        <div className="space-y-lg">
          {/* Search */}
          <div className="relative group">
            <input className="w-full h-12 pl-10 pr-4 rounded-xl bg-surface-container border-none focus:ring-2 focus:ring-primary-container font-body-md outline-none transition-shadow" placeholder="Search stories..." type="text" />
            <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant">search</span>
          </div>
          {/* Languages */}
          <div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase tracking-widest">Language</h3>
            <div className="flex flex-col gap-xs">
              {['English', 'عربية', 'French'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`flex items-center justify-between px-md py-sm rounded-xl transition-all ${activeLanguage === lang
                      ? 'bg-primary-container text-on-primary-container font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                >
                  <span>{lang}</span>
                  {activeLanguage === lang && <span className="material-symbols-outlined text-sm">check</span>}
                </button>
              ))}
            </div>
          </div>
          {/* Difficulty */}
          <div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-sm uppercase tracking-widest">Difficulty</h3>
            <div className="flex flex-col gap-xs">
              {['Level 1: Beginner', 'Level 2: Intermediate', 'Level 3: Explorer'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setActiveDifficulty(diff)}
                  className={`flex items-center px-md py-sm rounded-xl transition-all text-left ${activeDifficulty === diff
                      ? 'bg-primary-container text-on-primary-container font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto pt-md space-y-xs">
          <button className="w-full flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-caps text-label-caps">Settings</span>
          </button>
          <div className="p-md bg-secondary-fixed text-on-secondary-fixed rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <p className="font-bold mb-xs">Upgrade to Pro</p>
              <p className="text-xs opacity-80 mb-sm">Unlock 500+ premium animated stories.</p>
              <button className="bg-on-secondary-fixed text-secondary-fixed px-4 py-2 rounded-lg text-xs font-bold active:scale-95 transition-transform">Go Pro</button>
            </div>
            <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-6xl opacity-10 rotate-12">military_tech</span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden pb-xl w-full">
        {/* Hero Feature Section */}
        <motion.section variants={fadeInUp} className="p-margin-mobile md:p-lg pt-base">
          <div className="relative w-full h-80 rounded-[32px] overflow-hidden group shadow-[0_8px_30px_rgb(37,99,235,0.15)] cursor-pointer">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAshwjd7qWaGj_2CpWjvlkTR2waaeLK_-WEO_yAw7EDjVMBp2WMY9wc8_v8eZBelb_sKk04XcdxeSJmQ5-6O4YIoE6zsOY3a9P7qiHXybJiiJwAIne2KMXPEURrxma1WEaZt6OmbmGH2wSazt4lyFKYHCROKSHNaXjKFFanXThqZyBVomiy1CgrGJxZ6S2f3vELMkTgCX2S2Mf8sh9m9tUeqVgLNOHzK2SPiDe1sBMdJiyZrG9phODPnO1aQ0LLZV0cm1f9lEjNxwdT"
              alt="Story of the Day"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#191b23]/80 to-transparent flex flex-col justify-center px-lg">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold w-fit mb-md">STORY OF THE DAY</span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-headline-md text-white mb-base max-w-[32rem]">Leo's Galactic Quest: The Missing Star</h1>
              <p className="text-white/80 font-body-md max-w-[28rem] mb-md">Join Leo as he journeys through the Milky Way to help a tiny star find its way back home. Perfect for early readers!</p>
              <div className="flex gap-md">
                <button className="flex items-center gap-sm px-xl py-4 bg-secondary-container text-on-secondary-container rounded-full font-bold shadow-lg hover:scale-105 transition-transform active:scale-95">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Start Reading
                </button>
                <button className="flex items-center gap-sm px-md py-4 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold hover:bg-white/40 transition-all active:scale-95">
                  <span className="material-symbols-outlined">add</span>
                  Add to Library
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Netflix-style Carousel: New Stories */}
        <motion.section variants={fadeInUp} className="mt-base pl-margin-mobile md:pl-lg">
          <div className="flex justify-between items-center pr-margin-mobile md:pr-lg mb-sm">
            <h2 className="font-display-lg text-headline-sm text-primary">New Stories</h2>
            <a className="text-primary font-bold text-sm hover:underline" href="#">View All</a>
          </div>
          <div className="flex gap-md overflow-x-auto pb-md scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {newStories.map(story => (
              <div key={story.id} className="min-w-[280px] md:min-w-[320px] bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src={story.image} alt={story.title} />
                  {story.badge && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                      <span className={`material-symbols-outlined text-xs ${story.badge.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{story.badge.icon}</span>
                      <span className="text-[10px] font-bold text-on-surface-variant">{story.badge.text}</span>
                    </div>
                  )}
                </div>
                <div className="p-md">
                  <div className="flex justify-between items-start mb-xs">
                    <h3 className="font-headline-sm text-body-lg text-on-surface">{story.title}</h3>
                    <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">{story.level}</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full mb-md overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${story.progress}%`, backgroundColor: story.progress === 100 ? '#4CAF50' : '#004ac6' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${story.statusColor || 'text-on-surface-variant'} ${story.progress === 100 ? 'font-bold' : ''}`}>{story.status}</span>
                    <span className={`material-symbols-outlined ${story.actionColor || 'text-primary'}`} style={{ fontVariationSettings: story.progress === 100 ? "'FILL' 1" : "'FILL' 0" }}>{story.actionIcon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Popular Stories Section */}
        <motion.section variants={fadeInUp} className="mt-xl pl-margin-mobile md:pl-lg">
          <div className="flex justify-between items-center pr-margin-mobile md:pr-lg mb-sm">
            <h2 className="font-display-lg text-headline-sm text-primary">Popular Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md pr-margin-mobile md:pr-lg">
            {popularStories.map(story => (
              <div key={story.id} className="flex items-center gap-md bg-white/70 backdrop-blur-md border border-white/30 p-md rounded-2xl group hover:shadow-lg transition-all cursor-pointer">
                <img className="w-24 h-24 rounded-xl object-cover" src={story.image} alt={story.title} />
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-xs">{story.badge}</p>
                  <h4 className="font-headline-sm text-body-lg text-on-surface">{story.title}</h4>
                  <p className="text-xs text-on-surface-variant">{story.meta}</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-primary transition-colors">chevron_right</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Level 1: Beginners */}
        <motion.section variants={fadeInUp} className="mt-xl pl-margin-mobile md:pl-lg">
          <div className="flex justify-between items-center pr-margin-mobile md:pr-lg mb-sm">
            <h2 className="font-display-lg text-headline-sm text-primary">Level 1: Beginners</h2>
          </div>
          <div className="flex gap-md overflow-x-auto pb-md scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {beginnerStories.map(story => (
              <div key={story.id} className="min-w-[200px] bg-white rounded-2xl p-sm shadow-sm border border-outline-variant/10 hover:shadow-md transition-all cursor-pointer hover:-translate-y-1">
                <img className="w-full h-32 object-cover rounded-xl mb-sm" src={story.image} alt={story.title} />
                <h4 className="font-bold text-sm text-on-surface mb-xs">{story.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-on-surface-variant">timer</span>
                  <span className="text-[10px] text-on-surface-variant">{story.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}
