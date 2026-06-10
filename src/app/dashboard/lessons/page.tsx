"use client";

import { motion } from "framer-motion";

export default function LessonsPage() {
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
      className="max-w-container-max mx-auto px-margin-mobile md:px-lg py-md lg:py-xl flex-grow w-full"
    >
      {/* Current Lesson Hero */}
      <motion.section variants={fadeInUp} className="mb-xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary-container to-tertiary-container text-on-primary shadow-[0_20px_50px_rgba(37,99,235,0.2)] p-md md:p-xl flex flex-col md:flex-row items-center gap-lg">
          <div className="relative z-10 flex-1 space-y-md text-center md:text-left">
            <div className="inline-flex items-center gap-xs bg-white/20 backdrop-blur-md px-sm py-1 rounded-full border border-white/30">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              <span className="font-label-caps text-label-caps uppercase tracking-widest">Ongoing Lesson</span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight">Wild Animals: The Jungle</h1>
            <p className="font-body-lg text-body-lg opacity-90 max-w-[36rem]">Master jungle vocabulary and grammar in عربية! Join Leo on a trip to the Amazon Rainforest.</p>
            <div className="flex flex-col sm:flex-row items-center gap-md pt-sm justify-center md:justify-start">
              <button className="bg-secondary-container text-on-secondary-container font-ui-button px-xl py-md rounded-full flex items-center gap-sm hover:scale-105 transition-transform shadow-lg active:scale-95 group">
                <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                Resume Lesson
              </button>
              <div className="flex items-center gap-sm">
                <div className="w-32 h-3 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-secondary-container"></div>
                </div>
                <span className="font-bold">65%</span>
              </div>
            </div>
          </div>
          <div className="relative flex-1 flex justify-center">
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-110"></div>
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <img
                alt="Leo the Lion in a jungle"
                className="relative z-10 w-full max-w-[320px] drop-shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK3vAL3kXjo4HGkOzSBTSUD14TmutdXHI0eNLgnX4yeFQou2XR2pmrBcVB6k5ec-7zkeO_rvgjvnykRK_I7LLjVjpSWYC0ZEQh9CfQShi7rR10S6OlnCWesOP9QrlTfOLnM5S68PWHnMqn4yTom_3PzVOQZh0GxARgc7JuyXEWZ7eL4tiYrQaPWIT4D_YvWSZuQzSRdaiFG9HaUsEi7zuOFyxjMkDpwOyCWV4O6ilAU5Tf1i0Vp4LEwk0QtWaGpI6OUTR_DxWq24Lm"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Language Categories Bento Grid */}
      <motion.section variants={fadeInUp} className="mb-xl">
        <div className="flex items-center justify-between mb-md">
          <h2 className="font-headline-md text-headline-md text-on-surface">Browse by Language</h2>
          <button className="text-primary font-ui-button flex items-center gap-xs hover:underline">
            View All <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* عربية */}
          <div className="glass-card rounded-[2rem] p-md shadow-md border border-outline-variant/10 flex flex-col hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-md">
              <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-2xl">🇪🇸</div>
              <span className="bg-secondary-fixed-dim/20 text-on-secondary-fixed-variant px-sm py-1 rounded-full text-xs font-bold uppercase tracking-wider">Fluent Goal</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-xs">عربية</h3>
            <p className="text-on-surface-variant text-sm mb-lg">7 Lessons remaining to unlock Tier 3.</p>
            <div className="space-y-sm mb-lg">
              <div className="bg-surface p-sm rounded-xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-bold text-sm">Unit 4: Nature</span>
                  <span className="text-xs text-primary font-bold">2/5 Done</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-[40%] h-full bg-primary"></div>
                </div>
              </div>
              <div className="bg-surface p-sm rounded-xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-bold text-sm">Unit 5: Family</span>
                  <span className="text-xs text-outline font-bold">Locked</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-outline-variant"></div>
                </div>
              </div>
            </div>
            <button className="mt-auto w-full py-sm rounded-xl bg-surface-container-high text-on-surface font-ui-button hover:bg-primary hover:text-white transition-colors active:scale-95">Enter Course</button>
          </div>

          {/* English */}
          <div className="glass-card rounded-[2rem] p-md shadow-md border border-outline-variant/10 flex flex-col hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-md">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-2xl">EN</div>
              <span className="bg-primary-container text-white px-sm py-1 rounded-full text-xs font-bold uppercase tracking-wider">Expert Mode</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-xs">English</h3>
            <p className="text-on-surface-variant text-sm mb-lg">Refine your accent and idioms.</p>
            <div className="space-y-sm mb-lg">
              <div className="bg-surface p-sm rounded-xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-bold text-sm">Unit 12: Business</span>
                  <span className="text-xs text-primary font-bold">90%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-primary"></div>
                </div>
              </div>
              <div className="bg-surface p-sm rounded-xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-bold text-sm">Unit 13: Literature</span>
                  <span className="text-xs text-primary font-bold">15%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-primary"></div>
                </div>
              </div>
            </div>
            <button className="mt-auto w-full py-sm rounded-xl bg-surface-container-high text-on-surface font-ui-button hover:bg-primary hover:text-white transition-colors active:scale-95">Enter Course</button>
          </div>

          {/* French */}
          <div className="glass-card rounded-[2rem] p-md shadow-md border border-outline-variant/10 flex flex-col hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-md">
              <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-2xl">🇫🇷</div>
              <span className="bg-tertiary-container text-white px-sm py-1 rounded-full text-xs font-bold uppercase tracking-wider">Beginner</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-xs">French</h3>
            <p className="text-on-surface-variant text-sm mb-lg">Start your journey in Paris!</p>
            <div className="space-y-sm mb-lg">
              <div className="bg-surface p-sm rounded-xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-bold text-sm">Unit 1: Basics</span>
                  <span className="text-xs text-primary font-bold">Completed</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-full h-full bg-primary"></div>
                </div>
              </div>
              <div className="bg-surface p-sm rounded-xl border border-outline-variant/30">
                <div className="flex justify-between items-center mb-xs">
                  <span className="font-bold text-sm">Unit 2: Food</span>
                  <span className="text-xs text-primary font-bold">Next</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-primary"></div>
                </div>
              </div>
            </div>
            <button className="mt-auto w-full py-sm rounded-xl bg-surface-container-high text-on-surface font-ui-button hover:bg-primary hover:text-white transition-colors active:scale-95">Enter Course</button>
          </div>
        </div>
      </motion.section>

      <motion.div variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Upcoming Lessons */}
        <motion.section variants={fadeInUp} className="lg:col-span-2">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-md">Upcoming Lessons</h2>
          <div className="space-y-sm">
            <div className="flex items-center gap-md p-md bg-white rounded-3xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-primary-container group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">auto_stories</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-on-surface">Space Exploration: The Moon</h4>
                <p className="text-sm text-on-surface-variant">English • Starts tomorrow at 10:00 AM</p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-xs">
                <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">30 XP</span>
                <button className="text-primary font-ui-button text-sm hover:underline">Set Reminder</button>
              </div>
            </div>

            <div className="flex items-center gap-md p-md bg-white rounded-3xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-tertiary-container group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">restaurant</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-on-surface">French Bistro Etiquette</h4>
                <p className="text-sm text-on-surface-variant">French • Virtual Live Session</p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-xs">
                <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">50 XP</span>
                <button className="text-primary font-ui-button text-sm hover:underline">Register</button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Completed Units & Badges */}
        <motion.section variants={fadeInUp}>
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-md">Recent Badges</h2>
          <div className="bg-surface-container-low rounded-3xl p-md border border-outline-variant/10">
            <div className="grid grid-cols-2 gap-sm">
              <div className="bg-white p-sm rounded-2xl shadow-sm text-center flex flex-col items-center gap-xs">
                <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">Jungle Scout</p>
              </div>
              <div className="bg-white p-sm rounded-2xl shadow-sm text-center flex flex-col items-center gap-xs">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">Big Saver</p>
              </div>
              <div className="bg-white p-sm rounded-2xl shadow-sm text-center flex flex-col items-center gap-xs opacity-50">
                <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center grayscale">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">Worldly</p>
              </div>
              <div className="bg-white p-sm rounded-2xl shadow-sm text-center flex flex-col items-center gap-xs opacity-50">
                <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center grayscale">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">Astronaut</p>
              </div>
            </div>
            <button className="w-full mt-md py-sm rounded-xl border border-outline-variant text-on-surface-variant font-ui-button hover:bg-white transition-all active:scale-95">View Hall of Fame</button>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
}
