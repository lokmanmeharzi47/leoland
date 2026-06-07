"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function GameCenterPage() {
  const [activeFilter, setActiveFilter] = useState("All Games");
  
  const filters = ["All Games", "Vocabulary", "Memory", "Speaking"];

  const games = [
    {
      id: 1,
      title: "Vocabulary Safari",
      category: "Vocabulary",
      desc: "Explore the wild jungle and identify exotic animals to expand your word bank.",
      xp: "150 XP",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk1COv3ltByyHwiEti9DLsQwiaa837AOuUdzKzubIBz0KeiDpXsLe_nvGuJK0d_bJ52Kv8QwSzMcoFthwixKmZhSPnzd2RYGt_LVT5wV-Swh_Y3m9B__r3X47NDW4MIYCD7xJ5_oLSbO3Wu_RHP2viibFBjGVyhYcHRl4BTshF4my4Tvq7wwO7gZMCvNZOiG4lkAY8tW2AyTYWuZUlz-9cH7RualKsQyMGEzQxZs0bT9IbKnYV2WZsCadbd9fPcW50jt_Gsj6Y4owm",
      stars: 2,
      icon: "stars",
      bgClass: "bg-surface-container-lowest"
    },
    {
      id: 2,
      title: "Word Matcher",
      category: "Memory",
      desc: "Connect matching pairs of words and pictures before the timer runs out!",
      xp: "200 XP",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxiW27yZjF3SZQ2nViONtoHJ5SDp5GVJssCNy4IRNNW-_OdcL_Isbi3-WWvOIST9WLB8XPYboYAk_XjLa7y1QjzaOcPjxiVY_ACUURbdBSf92FI0WK1rx2Nzss0gdtpsQhFUQR7HK1hZoGclrG5OGDdn-jSdD5Qi2k53EsJW8g4V-TTSGqOVTCuE7dQtDixUpB2XR6Qck71GV9bWjMRYRY08VG85mxyi6k0QnOESWEdjpRoYVq4QtYJ08IkbwxXoGKjk-HFJhnWBnW",
      stars: 3,
      icon: "extension",
      bgClass: "bg-tertiary-container/10"
    },
    {
      id: 3,
      title: "Sound Echo",
      category: "Speaking",
      desc: "Listen to Leo and repeat the sounds to master your pronunciation.",
      xp: "100 XP",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7zjqjGGjRavMrhQUFbcIY9fseZDGkNHhqO9Rr3aww6v26a6kuCKeoyB5aFIYsmuk2y6DFP-cupEIQTqg9OROgHjS8xiW5aAs02f_degfZuExZ82qh3MftUWzUEwhvU5aaOr_Pg6kB8MIqlnogNvyPd_SlBlJUrwfrQlmgNEXTAabxLOcSMntwszHqzMJxQegXEOXtB6FZEEADH0vr7sQRYQlGNewmC-B-3dWYYJka7fmrLko5GMYnB3U8NaaUm_5MYqEYMNhgFvkO",
      stars: 1,
      icon: "mic",
      bgClass: "bg-error-container/10"
    },
    {
      id: 4,
      title: "Memory Flip",
      category: "Memory",
      desc: "Test your focus! Flip the cards and find all the matching animal friends.",
      xp: "180 XP",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6VdyxEZLRDARgDpfqGV5lP2buSkU97mHcBQonjRcQGhEYIuHAX1ZAdUCDYODgIXgQbkktwmJwcpP2ppl0ffDj2RTdcRJMOawqK8qGHeEyxRCLo1eF0V0LgKV1t22sfPOJwwIZvchcswsm8oOLckxYcfA8hf52HNn6_RmNT64M84uhvFAdApRX55muS2pnZtLM-zF9sqeuRpJxsJCbY8Wy9QJLPfKeqpzctpeZBtx5QF4464aAs_9J_dDoySIve8VIMYsVl1Ze3c_g",
      stars: 3,
      icon: "memory",
      bgClass: "bg-primary-container/10"
    }
  ];

  const filteredGames = activeFilter === "All Games" 
    ? games 
    : games.filter(g => g.category === activeFilter);

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

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={staggerContainer}
      className="flex-grow p-margin-mobile md:p-xl max-w-[1440px] mx-auto overflow-x-hidden w-full"
    >
      {/* Weekly Challenge Banner */}
      <motion.section variants={fadeInUp} className="relative mb-xl rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,74,198,0.15)] bg-gradient-to-r from-primary to-tertiary-container group">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-container rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-lg md:p-xl gap-lg">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-xs px-sm py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-caps mb-md animate-bounce">
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              LIVE CHALLENGE
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-sm leading-tight">Word Safari: Jungle Mystery</h1>
            <p className="text-on-primary-container text-lg md:text-xl opacity-90 mb-lg">Complete 5 vocabulary games this week to unlock the 'Jungle King' crown and earn 500 bonus XP!</p>
            <div className="flex flex-wrap gap-md justify-center md:justify-start">
              <button className="bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container px-xl py-md rounded-full font-ui-button text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-sm group/btn active:scale-95">
                Play Now
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">play_arrow</span>
              </button>
              <div className="flex items-center gap-sm text-white">
                <div className="w-32 h-3 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-secondary-container"></div>
                </div>
                <span className="font-bold">3/5 Completed</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <img 
                alt="Leo the Lion Mascot" 
                className="w-64 h-64 drop-shadow-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajFBXR2QWYv3_xaTl8N1NvMoWafbWIORYHGKxHVz9HmHEl41Pk1_SP1kU-b3lHywaNcZi4ShTqL8oCC-zgtR0xs7ueRHZIfTk4JHfVLXRPmXvZYyb8Rb4c-zfpdjC-YxkxjBq3zSvlVMEtBAYd6sLCEY16kd-lmdy4VirJ5qoSKGgi9vDND1Hl6Nzdd4JkPfMlzwuW4JYI3vGj5AlMOoi5wSbBE9RZr4rikyr1wUdzFK1tM6SzJgn4o-ZhXIjb69rP0R5jMb1oHew"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-between gap-md mb-lg">
        <div className="flex items-center gap-sm p-1 bg-surface-container rounded-full flex-wrap">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-lg py-sm rounded-full font-ui-button transition-all active:scale-95 ${
                activeFilter === filter 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-variant/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative flex-grow md:flex-grow-0 min-w-[280px]">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            className="w-full pl-xl pr-md py-sm bg-surface-container-lowest border-2 border-outline-variant/30 rounded-full focus:border-primary focus:ring-0 transition-all outline-none text-body-md" 
            placeholder="Search for games..." 
            type="text"
          />
        </div>
      </motion.div>

      {/* Games Grid */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md lg:gap-gutter">
        <AnimatePresence>
          {filteredGames.map((game) => (
            <motion.div 
              key={game.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group bg-surface-container-lowest rounded-[2rem] border border-outline-variant/20 shadow-sm hover:shadow-[0_20px_40px_rgba(0,74,198,0.08)] transition-all overflow-hidden cursor-pointer flex flex-col"
            >
              <div className={`relative h-48 overflow-hidden ${game.bgClass}`}>
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={game.image}
                  alt={game.title}
                />
                <div className="absolute top-md left-md bg-secondary-container px-sm py-1 rounded-full flex items-center gap-xs shadow-md">
                  <span className="material-symbols-outlined text-on-secondary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{game.icon}</span>
                  <span className="font-bold text-xs text-on-secondary-container uppercase">{game.category}</span>
                </div>
              </div>
              
              <div className="p-lg flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-sm">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{game.title}</h3>
                  <div className="flex items-center gap-xs">
                    {[...Array(3)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`material-symbols-outlined text-lg ${i < game.stars ? 'text-secondary-fixed-dim' : 'text-outline-variant'}`}
                        style={{ fontVariationSettings: i < game.stars ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-on-surface-variant text-body-md mb-lg line-clamp-2 flex-grow">{game.desc}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-xs text-primary font-bold">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    {game.xp}
                  </div>
                  <button className="bg-primary-container/10 hover:bg-primary-container text-primary hover:text-white p-sm rounded-xl transition-all group-hover:scale-110 active:scale-95">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
