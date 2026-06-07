"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function GamesMarketingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-xl md:pt-24 pb-xl px-margin-mobile bg-surface-container-low">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-container/20 blur-3xl rounded-full -mt-40 -mr-40 pointer-events-none"></div>
        <div className="max-w-container-max mx-auto grid lg:grid-cols-2 gap-xl items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block bg-secondary-container/30 text-secondary px-md py-xs rounded-full font-label-caps text-label-caps mb-base border border-secondary/20">
              GAMIFIED LEARNING
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-md leading-tight">
              Play Your Way to <span className="text-secondary">Fluency</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-[36rem]">
              Learning a new language shouldn't feel like a chore. In LeoLand's Game Center, kids master vocabulary and grammar through exciting, interactive challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-base">
              <Link href="/register" className="px-xl py-md bg-secondary text-white rounded-xl font-ui-button text-ui-button shadow-lg shadow-secondary/30 active:scale-95 transition-all flex items-center justify-center gap-xs hover:bg-secondary/90">
                Start Playing Free
                <span className="material-symbols-outlined">sports_esports</span>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative glass-card p-4 rounded-[2rem] shadow-2xl border border-white/40 transform rotate-2 hover:rotate-0 transition-transform duration-500 bg-white/50">
              <img 
                alt="LeoLand Game Center Dashboard" 
                className="w-full h-auto rounded-xl shadow-inner border border-outline-variant/10" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTNKSJWvjyJMIad-4jfxOaQUoxl56lkTbxyaOKA25Vz8a7_EyPV50KsSnpWEO7yaLVJCxjqGXENQ-fBKbuj815hn4phXwq9q2PGQ0v0ZIT_qgJQS1jC9dWCOp294hOMJgH3cPluAkXxxATPPyyg874EXKRmMwBQbWqO08hSBubjYK9QrWQwNmRgVQEKLzLjyM8loBZsJVytZ1zS10GCWk_WrnVaIPszWUdFbL4Qt9KUw3ceydzs0OvCJK0rQ6ZnEsptFGJYD2aYT7R"
              />
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass-card p-md rounded-2xl shadow-xl flex items-center gap-sm border border-white/50"
              >
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant">EARNED</p>
                  <p className="font-headline-sm text-on-surface">+50 Leo Coins</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-xl max-w-container-max mx-auto px-margin-mobile">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-xl">
          <h2 className="font-display-lg text-headline-md md:text-display-lg text-on-surface mb-base">Explore the Arcade</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Our games are specifically designed by language experts to reinforce what kids learn in their lessons.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <motion.div variants={fadeInUp} className="glass-card p-lg rounded-3xl border border-outline-variant/10 hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-primary text-3xl">extension</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Vocabulary Puzzles</h3>
            <p className="font-body-md text-on-surface-variant">Match words to pictures, solve word searches, and build a strong vocabulary foundation through fun visual challenges.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-lg rounded-3xl border border-outline-variant/10 hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-secondary-container/30 rounded-2xl flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-secondary text-3xl">psychology</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Grammar Quests</h3>
            <p className="font-body-md text-on-surface-variant">Embark on adventures where correct sentence structure defeats monsters and unlocks hidden treasures.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-lg rounded-3xl border border-outline-variant/10 hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-tertiary-container/20 rounded-2xl flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-tertiary text-3xl">record_voice_over</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Pronunciation Challenges</h3>
            <p className="font-body-md text-on-surface-variant">Use our kid-safe voice recognition to speak phrases aloud. Get the accent right to score maximum points!</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Rewards Section */}
      <section className="py-xl bg-surface-container-highest/20 overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile grid md:grid-cols-2 gap-xl items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-md rounded-2xl flex flex-col items-center justify-center text-center shadow-md">
                <span className="material-symbols-outlined text-4xl text-primary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                <p className="font-bold">Earn Badges</p>
              </div>
              <div className="glass-card p-md rounded-2xl flex flex-col items-center justify-center text-center shadow-md mt-8">
                <span className="material-symbols-outlined text-4xl text-secondary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                <p className="font-bold">Avatar Shop</p>
              </div>
              <div className="glass-card p-md rounded-2xl flex flex-col items-center justify-center text-center shadow-md -mt-8">
                <span className="material-symbols-outlined text-4xl text-tertiary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                <p className="font-bold">Leaderboards</p>
              </div>
              <div className="glass-card p-md rounded-2xl flex flex-col items-center justify-center text-center shadow-md">
                <span className="material-symbols-outlined text-4xl text-success mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                <p className="font-bold">Certificates</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="order-1 md:order-2">
            <h2 className="font-display-lg text-headline-md md:text-display-lg text-on-surface mb-base">The Reward Economy</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">
              Every lesson completed and every game won earns your child Leo Coins. This built-in reward system keeps motivation sky-high.
            </p>
            <ul className="space-y-4 mb-lg">
              <li className="flex items-center gap-3 text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Collect coins to unlock outfits for their avatar
              </li>
              <li className="flex items-center gap-3 text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Earn rare badges for consistent daily streaks
              </li>
              <li className="flex items-center gap-3 text-body-md text-on-surface">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                Show off achievements to friends in the safe social hub
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
