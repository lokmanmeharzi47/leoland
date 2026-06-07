"use client";

import { motion } from "framer-motion";

export default function AchievementsPage() {
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

  const activeBadges = [
    {
      id: 1,
      title: "Daily Streak",
      level: "Level 3",
      value: "12 Days",
      icon: "local_fire_department",
      color: "text-secondary",
      bgColor: "bg-secondary-container/20",
      valueBg: "bg-secondary-fixed",
      valueText: "text-on-secondary-fixed"
    },
    {
      id: 2,
      title: "Word Master",
      level: "Mastery",
      value: "500 Words",
      icon: "menu_book",
      color: "text-tertiary",
      bgColor: "bg-tertiary-container/20",
      valueBg: "bg-tertiary-fixed",
      valueText: "text-on-tertiary-fixed"
    },
    {
      id: 3,
      title: "Quiz Whiz",
      level: "Perfect",
      value: "10 Wins",
      icon: "psychology",
      color: "text-primary",
      bgColor: "bg-primary-container/20",
      valueBg: "bg-primary-fixed",
      valueText: "text-on-primary-fixed"
    }
  ];

  const lockedAchievements = [
    { id: 1, title: "Polyglot", desc: "Learn 3 languages", icon: "lock" },
    { id: 2, title: "Mentor", desc: "Help 5 friends", icon: "lock" },
    { id: 3, title: "Speed Demon", desc: "Finish in 10 min", icon: "lock" },
    { id: 4, title: "Legendary", desc: "Reach Level 50", icon: "lock" }
  ];

  const leaderboard = [
    { id: 1, rank: 1, name: "Sarah J.", xp: "12,450 XP", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO1oZc0OZ9I_CqEMLGxYUQ4lTBT8xzCVbqvOEZCWnRMsTfvL3WSuMLyU_2S5z7evlqUn52wCJT809Xi7cR6tJJSv5Wop_jUBeribz8oIm_KjTOmAxrT-f31Gx4ksRqkqtpdG54MaBiIIFzdoTHJYM9L-AUxLjYHWcx1v8uFieRnwl39PYtp15TYqjOz8k5iFGWx6yS-aiu6wX5dWvkvvMT_lZuKf6YFvCO2xH_L-Yo-W0uxj_1GA9Wwhn09k9mHKwsoLN4yCb6CJR0", bgClass: "bg-secondary-fixed/30 border border-secondary-fixed-dim/20" },
    { id: 2, rank: 2, name: "Alex Chen", xp: "10,120 XP", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzP91OY4n4wMd1X5rYqxPFYYluW7nRz0p-kR8oFwxqM1ouqyN-zuzozgGkK0db8wmcXAnwckDz-7Fpp7ZrsY0gBC1SRaQ6sIznqxSblHmRa12d-0pyLlicbSyTOB9_w2hTJc05ZlTOzJiyPveU_0v8OIeHDkMRV6H1xCzvGvyy4-mbWxjyhEqvWOD6I84swlHgJ3VJEB-BrNiDDGQJe4Iyly3RxlEYkz24OjwdOFZNVMlYsiCU3AiIf__Zb7ZNZkYogdJAayFjXl59" },
    { id: 3, rank: 3, name: "You", xp: "7,550 XP", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHI4LSZYyVUnkRN6JvqCnoXExMcyv3_x1sa2lEWhTLec5Ni2Tvqgr2zVqJCeDdseIG_s3eOmFv_-2OF71-iHpHkJpb0pGvRaUmqJ3pifgvh3DDgsFm1Cg2cbUdw3Y8GTJA8EbVKzwDYh-NpLopgpTfYyJpl35MkTsz_gppHxQG6zQTl3yHBkYIId0s-yo9A1qo-VHIxIQoz5x_ci9LpUBu6CYdgsIgy3vKMdSuZ7aX__pKNSx7cWI_ViK8GgBRP8PSUfs13d179bh-", bgClass: "bg-primary/10 border border-primary/20", highlight: true },
    { id: 4, rank: 4, name: "Mila Rose", xp: "6,890 XP", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWFGrvWWlfQXHKkS17kf_J0ZyiB6Zx_0eW2rlge6in2bHMr4xYWiRUg2OJuMQ1lZ47iYDG_cHlCT3LllRA9xJ9ZMBlMtg6Nn8o7MH2-6hFFuUpIMGSzu0NEMGsWRpO_C_JM3fom5tVuIybUcLPWwzqe1xHoNsMn-aWnLddygUUFWDt3aGkzU1EiOPxe6cg363KvEk7ToiJJZPKNbyf7mQouTZxXkByUMLyIlTIM9aBFr2ymNWJXMnFu4AlePaqWB3bBGf5U9G5pfYS" },
    { id: 5, rank: 5, name: "Oscar T.", xp: "5,200 XP", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAe768jJBNU_MXc_NdAhnbHo6yy8rWS5HDHhpD8KsZc2MqBbxRegNZ8LNHNWP2BURrgS5nxzTRkHa4dBtjSZ6IWWOlNSYnOBaDxUHbbo-ajQ9qQRndB9tgBZ3MRPzFaK3qwJca3pyTMM876nEG3e86OFLIfwDQ606Z0reCFWhLFj9PTp46RoDhE00ufs4xpvGsW8GOYKi-i9sTRTBx4Qz6W1U-uL1_mMfCqMbjCfROK8uPpBqOBw3m2QKietqnoaliJweXMiolMqZ8h" }
  ];

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={staggerContainer}
      className="max-w-container-max mx-auto px-margin-mobile md:px-lg py-md lg:py-xl flex-grow w-full"
    >
      {/* XP Progress Section */}
      <motion.section variants={fadeInUp} className="mb-xl">
        <div className="glass-card rounded-[2rem] p-md md:p-lg shadow-[0_4px_20px_rgba(37,99,235,0.08)] border border-outline-variant/10 bg-white/70 backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-md mb-md">
            <div className="text-center md:text-left">
              <h3 className="font-headline-sm text-headline-sm text-primary">Master Explorer</h3>
              <p className="text-body-md text-on-surface-variant">Level 14 • 450 XP until next tier</p>
            </div>
            <div className="flex items-center gap-sm bg-primary-container text-on-primary-container px-md py-sm rounded-full">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              <span className="font-ui-button text-ui-button">Tier: Diamond Explorer</span>
            </div>
          </div>
          <div className="relative w-full h-6 bg-surface-container rounded-full overflow-hidden mb-sm border border-outline-variant/20">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary-container shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
            />
          </div>
          <div className="flex justify-between font-label-caps text-label-caps text-outline">
            <span>7,550 XP</span>
            <span>8,000 XP</span>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* Left Column: Badges */}
        <div className="lg:col-span-8 space-y-xl">
          {/* Active Badges */}
          <motion.section variants={fadeInUp}>
            <div className="flex justify-between items-end mb-md">
              <h3 className="font-headline-md text-headline-md">Active Badges</h3>
              <a className="font-label-caps text-label-caps text-primary hover:underline" href="#">View All</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-md">
              {activeBadges.map(badge => (
                <div key={badge.id} className="glass-card rounded-2xl p-md flex flex-col items-center text-center group cursor-pointer border border-outline-variant/10 bg-white/70 hover:shadow-lg transition-all hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-full group-hover:translate-x-full duration-1000"></div>
                  <div className={`w-20 h-20 mb-sm flex items-center justify-center ${badge.bgColor} rounded-full group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined ${badge.color} text-[40px]`} style={{ fontVariationSettings: "'FILL' 1" }}>{badge.icon}</span>
                  </div>
                  <h4 className="font-ui-button text-ui-button mb-xs">{badge.title}</h4>
                  <p className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">{badge.level}</p>
                  <div className={`mt-sm px-sm py-0.5 ${badge.valueBg} ${badge.valueText} rounded-full text-[12px] font-bold`}>{badge.value}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Recent Trophies */}
          <motion.section variants={fadeInUp}>
            <h3 className="font-headline-md text-headline-md mb-md">Recent Trophies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="relative bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-lg text-white overflow-hidden group">
                <div className="relative z-10">
                  <span className="font-label-caps text-label-caps bg-white/20 px-sm py-1 rounded-full mb-md inline-block">Unlocked 2h ago</span>
                  <h4 className="font-headline-sm text-headline-sm mb-xs">Linguistics Legend</h4>
                  <p className="text-body-md opacity-90 mb-md">Achieved a 100% score on the Advanced Grammar Journey.</p>
                  <button className="bg-white text-primary px-md py-sm rounded-xl font-ui-button text-ui-button hover:scale-105 active:scale-95 transition-transform shadow-md">Claim Reward</button>
                </div>
                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-20 pointer-events-none transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              </div>
              <div className="grid grid-cols-1 gap-md">
                <div className="glass-card rounded-2xl p-md flex items-center gap-md border border-outline-variant/10 bg-white/70 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-secondary-fixed-dim/20 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                  </div>
                  <div>
                    <h4 className="font-ui-button text-ui-button">Game Night Hero</h4>
                    <p className="text-label-caps font-label-caps text-on-surface-variant">Winner's Circle • Silver</p>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-md flex items-center gap-md border border-outline-variant/10 bg-white/70 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-outline-variant/20 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  </div>
                  <div>
                    <h4 className="font-ui-button text-ui-button">Early Bird</h4>
                    <p className="text-label-caps font-label-caps text-on-surface-variant">7AM Sessions • Bronze</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Locked Badges */}
          <motion.section variants={fadeInUp}>
            <h3 className="font-headline-md text-headline-md mb-md">Locked Achievements</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-md opacity-60">
              {lockedAchievements.map(locked => (
                <div key={locked.id} className="border-2 border-dashed border-outline-variant rounded-2xl p-md flex flex-col items-center text-center grayscale">
                  <span className="material-symbols-outlined text-outline text-[32px] mb-xs">{locked.icon}</span>
                  <h4 className="font-label-caps text-label-caps">{locked.title}</h4>
                  <p className="text-[10px] text-outline">{locked.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right Column: Leaderboard & Friends */}
        <motion.div variants={fadeInUp} className="lg:col-span-4 space-y-xl">
          <section className="glass-card rounded-[2rem] p-md md:p-lg sticky top-32 border border-outline-variant/10 bg-white/70">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              <h3 className="font-headline-sm text-headline-sm">Friends League</h3>
            </div>
            <div className="space-y-sm">
              {leaderboard.map(user => (
                <div key={user.id} className={`flex items-center gap-sm p-sm rounded-xl transition-colors ${user.bgClass || 'hover:bg-surface-container-low'}`}>
                  <div className={`w-8 text-center font-display-lg text-headline-sm italic ${user.highlight ? 'text-primary' : user.rank === 1 ? 'text-secondary-fixed-dim' : 'text-outline-variant'}`}>{user.rank}</div>
                  <img alt={user.name} className="w-10 h-10 rounded-full bg-white object-cover shadow-sm" src={user.image} />
                  <div className="flex-1">
                    <p className={`font-ui-button text-ui-button ${user.highlight ? 'text-primary' : ''}`}>{user.name}</p>
                    <p className={`text-label-caps text-[10px] ${user.highlight ? 'text-primary' : ''}`}>{user.xp}</p>
                  </div>
                  {user.rank <= 3 && (
                    <span 
                      className={`material-symbols-outlined ${user.highlight ? 'text-primary/40' : user.rank === 1 ? 'text-secondary-fixed-dim' : 'text-outline-variant'}`} 
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      emoji_events
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button className="mt-lg w-full py-md border-2 border-primary text-primary font-ui-button text-ui-button rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95">Invite Friends</button>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}
