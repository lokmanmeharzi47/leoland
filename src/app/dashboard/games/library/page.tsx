"use client";

import { motion } from "framer-motion";

export default function GameCenterLibraryPage() {
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

  const games = [
    {
      id: 1,
      title: "Vocabulary Safari",
      type: "Vocabulary",
      typeColor: "bg-secondary-container text-on-secondary-container",
      typeIcon: "stars",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk1COv3ltByyHwiEti9DLsQwiaa837AOuUdzKzubIBz0KeiDpXsLe_nvGuJK0d_bJ52Kv8QwSzMcoFthwixKmZhSPnzd2RYGt_LVT5wV-Swh_Y3m9B__r3X47NDW4MIYCD7xJ5_oLSbO3Wu_RHP2viibFBjGVyhYcHRl4BTshF4my4Tvq7wwO7gZMCvNZOiG4lkAY8tW2AyTYWuZUlz-9cH7RualKsQyMGEzQxZs0bT9IbKnYV2WZsCadbd9fPcW50jt_Gsj6Y4owm",
      stars: 2,
      description: "Explore the wild jungle and identify exotic animals to expand your word bank.",
      xp: "150 XP"
    },
    {
      id: 2,
      title: "Word Matcher",
      type: "Memory",
      typeColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
      typeIcon: "extension",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxiW27yZjF3SZQ2nViONtoHJ5SDp5GVJssCNy4IRNNW-_OdcL_Isbi3-WWvOIST9WLB8XPYboYAk_XjLa7y1QjzaOcPjxiVY_ACUURbdBSf92FI0WK1rx2Nzss0gdtpsQhFUQR7HK1hZoGclrG5OGDdn-jSdD5Qi2k53EsJW8g4V-TTSGqOVTCuE7dQtDixUpB2XR6Qck71GV9bWjMRYRY08VG85mxyi6k0QnOESWEdjpRoYVq4QtYJ08IkbwxXoGKjk-HFJhnWBnW",
      stars: 3,
      description: "Connect matching pairs of words and pictures before the timer runs out!",
      xp: "200 XP"
    },
    {
      id: 3,
      title: "Sound Echo",
      type: "Speaking",
      typeColor: "bg-secondary-fixed text-on-secondary-fixed-variant",
      typeIcon: "mic",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7zjqjGGjRavMrhQUFbcIY9fseZDGkNHhqO9Rr3aww6v26a6kuCKeoyB5aFIYsmuk2y6DFP-cupEIQTqg9OROgHjS8xiW5aAs02f_degfZuExZ82qh3MftUWzUEwhvU5aaOr_Pg6kB8MIqlnogNvyPd_SlBlJUrwfrQlmgNEXTAabxLOcSMntwszHqzMJxQegXEOXtB6FZEEADH0vr7sQRYQlGNewmC-B-3dWYYJka7fmrLko5GMYnB3U8NaaUm_5MYqEYMNhgFvkO",
      stars: 1,
      description: "Listen to Leo and repeat the sounds to master your pronunciation.",
      xp: "100 XP"
    },
    {
      id: 4,
      title: "Memory Flip",
      type: "Memory",
      typeColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
      typeIcon: "memory",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6VdyxEZLRDARgDpfqGV5lP2buSkU97mHcBQonjRcQGhEYIuHAX1ZAdUCDYODgIXgQbkktwmJwcpP2ppl0ffDj2RTdcRJMOawqK8qGHeEyxRCLo1eF0V0LgKV1t22sfPOJwwIZvchcswsm8oOLckxYcfA8hf52HNn6_RmNT64M84uhvFAdApRX55muS2pnZtLM-zF9sqeuRpJxsJCbY8Wy9QJLPfKeqpzctpeZBtx5QF4464aAs_9J_dDoySIve8VIMYsVl1Ze3c_g",
      stars: 3,
      description: "Test your focus! Flip the cards and find all the matching animal friends.",
      xp: "180 XP"
    }
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-10">
      
      {/* Weekly Challenge Banner */}
      <motion.section variants={fadeInUp} className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,74,198,0.15)] bg-gradient-to-r from-primary to-tertiary-container group">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-container rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 gap-10">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label-caps text-label-caps mb-6 animate-bounce">
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              LIVE CHALLENGE
            </span>
            <h1 className="font-display-lg text-4xl md:text-5xl text-white font-extrabold mb-3 leading-tight">Word Safari: Jungle Mystery</h1>
            <p className="text-on-primary-container text-lg md:text-xl opacity-90 mb-10">Complete 5 vocabulary games this week to unlock the 'Jungle King' crown and earn 500 bonus XP!</p>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <button className="bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 group/btn">
                Play Now
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">play_arrow</span>
              </button>
              <div className="flex items-center gap-3 text-white">
                <div className="w-32 h-3 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-secondary-container"></div>
                </div>
                <span className="font-bold">3/5 Completed</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
              <img alt="Leo the Lion Mascot" className="w-64 h-64 drop-shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajFBXR2QWYv3_xaTl8N1NvMoWafbWIORYHGKxHVz9HmHEl41Pk1_SP1kU-b3lHywaNcZi4ShTqL8oCC-zgtR0xs7ueRHZIfTk4JHfVLXRPmXvZYyb8Rb4c-zfpdjC-YxkxjBq3zSvlVMEtBAYd6sLCEY16kd-lmdy4VirJ5qoSKGgi9vDND1Hl6Nzdd4JkPfMlzwuW4JYI3vGj5AlMOoi5wSbBE9RZr4rikyr1wUdzFK1tM6SzJgn4o-ZhXIjb69rP0R5jMb1oHew" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Filters */}
      <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2 p-1 bg-surface-container rounded-full">
          <button className="px-6 py-2 rounded-full bg-primary text-white font-bold shadow-sm transition-all">All Games</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 font-bold transition-all">Vocabulary</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 font-bold transition-all">Memory</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 font-bold transition-all">Speaking</button>
        </div>
        <div className="relative flex-grow md:flex-grow-0 min-w-[280px]">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-2 border-outline-variant/30 rounded-full focus:border-primary focus:ring-0 transition-all outline-none font-body-md" placeholder="Search for games..." type="text" />
        </div>
      </motion.div>

      {/* Games Grid */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game.id} className="group bg-surface-container-lowest rounded-[2rem] border border-outline-variant/20 shadow-sm hover:shadow-[0_20px_40px_rgba(0,74,198,0.08)] transition-all overflow-hidden cursor-pointer">
            <div className="relative h-48 overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={game.image} alt={game.title} />
              <div className={`absolute top-4 left-4 ${game.typeColor} px-3 py-1 rounded-full flex items-center gap-1 shadow-md`}>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{game.typeIcon}</span>
                <span className="font-bold text-xs uppercase">{game.type}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-headline-md text-xl font-bold text-on-surface">{game.title}</h3>
                <div className="flex items-center gap-1 text-secondary-fixed-dim">
                  {[1, 2, 3].map((star) => (
                    <span key={star} className={`material-symbols-outlined text-lg ${star <= game.stars ? '' : 'text-outline-variant'}`} style={{ fontVariationSettings: star <= game.stars ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                  ))}
                </div>
              </div>
              <p className="text-on-surface-variant text-body-md mb-6 line-clamp-2">{game.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-primary font-bold">
                  <span className="material-symbols-outlined text-xl">bolt</span>
                  {game.xp}
                </div>
                <button className="bg-primary-container/10 hover:bg-primary-container text-primary hover:text-white p-3 rounded-xl transition-all group-hover:scale-110">
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
