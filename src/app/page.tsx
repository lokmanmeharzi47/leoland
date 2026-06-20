"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";

export default function LandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const floatAnimation = {
    y: [0, -20, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
  };

  return (
    <div className="bg-[#FAF8FF] overflow-hidden text-[#191b23] selection:bg-[#F5B21B] selection:text-[#0F2A8A]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 lg:px-8">
        
        {/* PC Browser Mockup Background */}
        <div className="w-full max-w-7xl mx-auto relative z-0 mb-8 rounded-[20px] overflow-hidden shadow-2xl border border-[#E5E7EB] bg-white ring-8 ring-white/50">
          {/* Browser Header */}
          <div className="bg-[#F3F4F6] h-8 md:h-10 w-full flex items-center px-4 gap-2 border-b border-[#E5E7EB]">
            <div className="w-3 h-3 rounded-full bg-[#F87171]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FBBF24]"></div>
            <div className="w-3 h-3 rounded-full bg-[#34D399]"></div>
            <div className="ml-4 flex-1 hidden sm:block max-w-[200px] h-5 bg-white rounded-md border border-[#E5E7EB]"></div>
          </div>
        {/* Browser Content */}
          <div className="relative w-full bg-[#FAF8FF] h-[50vh] lg:h-[70vh] overflow-hidden">
            <img src="/hero_bg.png" alt="LeoLand Magical World" className="w-full h-full object-cover object-top border-b border-[#E5E7EB]" />
          </div>
        </div>

        {/* Floating Elements */}
        <motion.img animate={floatAnimation} src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" className="absolute top-32 left-10 w-24 opacity-80 z-10 drop-shadow-2xl hidden lg:block" alt="Cloud" />
        <motion.img animate={{ y: [0, -30, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const } }} src="https://cdn-icons-png.flaticon.com/512/2854/2854341.png" className="absolute top-40 right-10 w-32 opacity-90 z-10 drop-shadow-2xl hidden lg:block" alt="Hot Air Balloon" />

        <div className="relative z-20 max-w-4xl mx-auto w-full mt-[-4rem]">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[40px] border-4 border-white shadow-2xl flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-[#F5B21B]/20 text-[#d97706] px-4 py-2 rounded-full font-bold text-sm mb-4 md:mb-6 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              Parent Approved
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#0F2A8A] leading-tight mb-4 md:mb-6 drop-shadow-sm">
              Learn Languages Through <span className="text-[#F5B21B] drop-shadow-md">Adventure</span>
            </h1>
            <p className="text-lg md:text-xl text-[#434655] mb-6 md:mb-8 font-medium max-w-2xl mx-auto">
              Arabic, French and English become exciting adventures with Leo and his friends.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8 justify-center">
              <button className="px-8 py-3 md:py-4 bg-[#F5B21B] text-[#0F2A8A] rounded-full font-bold text-lg shadow-[0_8px_0_#d97706] hover:translate-y-1 hover:shadow-[0_4px_0_#d97706] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-2">
                Start Learning
                <span className="material-symbols-outlined">rocket_launch</span>
              </button>
              <button className="px-8 py-3 md:py-4 bg-white/80 md:bg-white text-[#0F2A8A] border-2 border-[#0F2A8A]/10 rounded-full font-bold text-lg hover:bg-[#0F2A8A]/5 transition-all flex items-center justify-center">
                Explore Worlds
              </button>
            </div>

            <div className="flex justify-center items-center gap-6 text-sm font-semibold text-[#434655]">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#0F2A8A]/10 rounded-full flex items-center justify-center text-[#0F2A8A]">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span>10,000+ Kids Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#F5B21B]/20 rounded-full flex items-center justify-center text-[#d97706]">
                  <span className="material-symbols-outlined">extension</span>
                </div>
                <span>500+ Activities</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LEO'S LEARNING CORNER */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F2A8A] mb-4">Leo's Learning Corner</h2>
            <p className="text-xl text-[#434655]">Step into our magical classroom where questions lead to adventures!</p>
          </motion.div>

          <div className="bg-[#0F2A8A] rounded-[48px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Decorative Stars */}
            <span className="material-symbols-outlined absolute top-10 left-10 text-[#F5B21B] text-5xl opacity-50 animate-pulse">star</span>
            <span className="material-symbols-outlined absolute bottom-20 right-10 text-[#F5B21B] text-6xl opacity-30 animate-pulse delay-150">star</span>

            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              {/* Leo Illustration Area */}
              <div className="w-full md:w-1/2 relative flex justify-center">
                 <div className="w-64 h-64 bg-[#F5B21B] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-40"></div>
                 <div className="text-[200px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] z-10 leading-none select-none">🦁</div>
                 
                 {/* Learning Card Floating */}
                 <motion.div animate={floatAnimation} className="absolute -right-4 top-10 bg-white p-4 rounded-3xl shadow-xl border-4 border-[#F5B21B] rotate-12">
                   <div className="text-4xl mb-2 text-center">👋</div>
                   <p className="font-bold text-[#0F2A8A] text-center">Bonjour!</p>
                 </motion.div>
              </div>

              {/* Chat Interaction */}
              <div className="w-full md:w-1/2 space-y-6">
                {/* Child Question */}
                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex justify-end">
                  <div className="bg-white text-[#0F2A8A] p-5 rounded-3xl rounded-tr-sm shadow-lg max-w-[80%] border-2 border-white">
                    <p className="font-bold text-lg">"How do we say hello in French?"</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-[#434655]">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" alt="Child Avatar" className="w-6 h-6 rounded-full bg-[#FAF8FF]" />
                      <span>Mia, Age 7</span>
                    </div>
                  </div>
                </motion.div>

                {/* Leo Response */}
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex justify-start">
                  <div className="bg-[#F5B21B] text-[#0F2A8A] p-5 rounded-3xl rounded-tl-sm shadow-lg max-w-[80%] border-2 border-[#F5B21B]">
                    <p className="font-bold text-lg">"Bonjour! Let's practice together! Press the microphone and try it with me."</p>
                    <div className="flex items-center gap-3 mt-4">
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0F2A8A] shadow-md hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">mic</span>
                      </button>
                      <button className="px-4 py-2 bg-[#0F2A8A]/10 rounded-full font-bold text-sm flex items-center gap-1 hover:bg-[#0F2A8A]/20 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">volume_up</span>
                        Hear it again
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING WORLDS */}
      <section className="py-24 bg-[#0F2A8A]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F2A8A] mb-4">Explore 5 Magical Worlds</h2>
            <p className="text-xl text-[#434655]">Unlock new lands as you master new words and phrases.</p>
          </motion.div>

          <div className="relative">
             {/* Path line connecting worlds */}
             <div className="absolute top-1/2 left-0 w-full h-4 bg-[#F5B21B]/30 rounded-full -translate-y-1/2 hidden lg:block"></div>
             
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                
                {[
                  { name: "Vocabulary Forest", icon: "forest", color: "bg-emerald-500", shadow: "shadow-emerald-500/40", status: "Unlocked" },
                  { name: "Grammar Castle", icon: "castle", color: "bg-[#0F2A8A]", shadow: "shadow-[#0F2A8A]/40", status: "In Progress" },
                  { name: "Speaking Ocean", icon: "water", color: "bg-cyan-500", shadow: "shadow-cyan-500/40", status: "Locked" },
                  { name: "Language Galaxy", icon: "rocket", color: "bg-purple-600", shadow: "shadow-purple-600/40", status: "Locked" },
                  { name: "Fluency Mountain", icon: "landscape", color: "bg-slate-700", shadow: "shadow-slate-700/40", status: "Locked" }
                ].map((world, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="relative z-10 flex flex-col items-center">
                    <div className={`w-32 h-32 ${world.color} rounded-[40px] flex items-center justify-center text-white shadow-xl ${world.shadow} mb-6 border-4 border-white transform hover:-translate-y-2 transition-transform cursor-pointer overflow-hidden relative`}>
                      {world.status === "Locked" && <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"><span className="material-symbols-outlined text-3xl">lock</span></div>}
                      <span className="material-symbols-outlined text-6xl">{world.icon}</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#0F2A8A] text-center leading-tight mb-2">{world.name}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${world.status === 'Unlocked' ? 'bg-green-100 text-green-700' : world.status === 'In Progress' ? 'bg-[#F5B21B]/20 text-[#d97706]' : 'bg-gray-200 text-gray-500'}`}>
                      {world.status}
                    </span>
                  </motion.div>
                ))}
             </motion.div>
          </div>
        </div>
      </section>

      {/* GAMES SECTION (Adventure Cards) */}
      <section className="py-24 px-6">
         <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F2A8A] mb-4">Epic Mini-Games</h2>
            <p className="text-xl text-[#434655]">Play to learn. Earn XP, unlock rewards, and become a language hero.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Word Match Quest", time: "5 mins", xp: "+50 XP", difficulty: "Easy", img: "https://cdn-icons-png.flaticon.com/512/103/103445.png", color: "bg-pink-100" },
              { title: "Pronunciation Challenge", time: "10 mins", xp: "+120 XP", difficulty: "Medium", img: "https://cdn-icons-png.flaticon.com/512/709/709748.png", color: "bg-blue-100" },
              { title: "Memory Adventure", time: "8 mins", xp: "+80 XP", difficulty: "Easy", img: "https://cdn-icons-png.flaticon.com/512/3405/3405080.png", color: "bg-yellow-100" }
            ].map((game, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-[40px] p-6 shadow-xl border-2 border-transparent hover:border-[#F5B21B] transition-colors cursor-pointer group">
                <div className={`w-full h-48 ${game.color} rounded-3xl mb-6 flex items-center justify-center overflow-hidden`}>
                  <img src={game.img} alt={game.title} className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#0F2A8A]">{game.title}</h3>
                  <span className="bg-[#F5B21B] text-[#0F2A8A] font-bold text-sm px-3 py-1 rounded-full">{game.xp}</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-semibold text-[#434655]">
                  <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">schedule</span> {game.time}</div>
                  <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span> {game.difficulty}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
         </div>
      </section>

      {/* AI FEATURES AS MAGIC POWERS */}
      <section className="py-24 bg-[#0F2A8A] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/worlds_bg.png" alt="Magic Background" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Leo's Magic Powers</h2>
            <p className="text-xl text-blue-200">Our advanced AI technology presented as pure magic.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Smart Tutor", desc: "Leo adapts to your child's learning speed automatically.", icon: "psychology" },
              { title: "Voice Magic", desc: "Instant feedback on pronunciation to sound like a native.", icon: "record_voice_over" },
              { title: "Story Generator", desc: "Infinite bedtime stories created around the words they learned.", icon: "auto_stories" },
              { title: "Adaptive Difficulty", desc: "The challenges grow precisely as your child's skills grow.", icon: "monitoring" }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white/10 backdrop-blur-md rounded-[32px] p-8 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F5B21B] to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                  <span className="material-symbols-outlined text-white text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-blue-100 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PARENTS SECTION (Dashboard Preview) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-[#0F2A8A]/10 text-[#0F2A8A] px-4 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">shield_person</span>
              Parent Portal
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F2A8A] mb-6">Stay involved in their magical journey.</h2>
            <p className="text-xl text-[#434655] mb-8 font-medium">
              Access premium insights into your child's progress. We make screen time educational, safe, and transparent.
            </p>
            <ul className="space-y-4 mb-8">
              {['Detailed weekly progress reports', 'Pronunciation accuracy metrics', 'Screen time management controls', 'Celebrate achievements together'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 font-bold text-[#0F2A8A]">
                  <div className="w-6 h-6 rounded-full bg-[#F5B21B] flex items-center justify-center text-white"><span className="material-symbols-outlined text-[14px]">check</span></div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="px-8 py-4 bg-[#0F2A8A] text-white rounded-full font-bold text-lg shadow-[0_8px_0_#0a1d61] hover:translate-y-1 hover:shadow-[0_4px_0_#0a1d61] active:translate-y-2 active:shadow-none transition-all">
              Explore Parent Dashboard
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
             <div className="absolute inset-0 bg-[#F5B21B] rounded-[48px] rotate-3 blur-sm opacity-50"></div>
             <div className="bg-white border border-gray-100 rounded-[40px] shadow-2xl overflow-hidden relative z-10 p-6">
               <div className="flex items-center justify-between mb-8 border-b pb-4">
                 <div className="flex items-center gap-4">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" alt="Avatar" className="w-12 h-12 rounded-full bg-blue-50" />
                   <div>
                     <h4 className="font-bold text-[#0F2A8A]">Mia's Progress</h4>
                     <p className="text-sm text-gray-500 font-semibold">This Week</p>
                   </div>
                 </div>
                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">+15% vs Last Week</span>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="bg-blue-50 rounded-3xl p-4">
                   <span className="text-gray-500 font-semibold text-sm">Words Learned</span>
                   <p className="text-3xl font-black text-[#0F2A8A] mt-1">124</p>
                 </div>
                 <div className="bg-orange-50 rounded-3xl p-4">
                   <span className="text-gray-500 font-semibold text-sm">Pronunciation</span>
                   <p className="text-3xl font-black text-[#d97706] mt-1">92%</p>
                 </div>
               </div>

               <div className="bg-gray-50 rounded-3xl p-4">
                 <span className="text-gray-500 font-semibold text-sm mb-2 block">Learning Time (Minutes)</span>
                 <div className="flex items-end gap-2 h-24">
                   {[30, 45, 20, 60, 40, 50, 35].map((h, i) => (
                     <div key={i} className="flex-1 bg-[#0F2A8A] rounded-t-lg opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                   ))}
                 </div>
               </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS (Story Cards) */}
      <section className="py-24 bg-[#FAF8FF]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F2A8A] mb-4">Magical Transformations</h2>
            <p className="text-xl text-[#434655]">Real stories from families inside LeoLand.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { parent: "Ms. Sarah", child: "Leo's Class (1st Grade)", text: "My students used to hate learning French. Now they wake up asking to 'play with Leo'. Their accents are incredible!", before: "0 French words", after: "Holds basic conversations" },
              { parent: "Mr. Ahmed", child: "Zainab (3rd Grade)", text: "The Arabic stories are beautiful. She doesn't even realize she's studying grammar because she's so invested in saving the Vocabulary Forest.", before: "Struggled with reading", after: "Reads stories independently" }
            ].map((story, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-[40px] p-8 shadow-xl border-2 border-transparent hover:border-[#0F2A8A]/10 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.parent}`} alt={story.parent} className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-md" />
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.child}`} alt={story.child} className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white shadow-sm absolute -bottom-2 -right-2" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#0F2A8A]">{story.parent}</h4>
                    <p className="text-sm font-semibold text-gray-500">Teacher of {story.child}</p>
                  </div>
                </div>
                <p className="text-lg font-medium text-[#434655] italic mb-8">"{story.text}"</p>
                
                <div className="bg-blue-50 rounded-2xl p-4 flex justify-between items-center relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#F5B21B]">
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </div>
                  <div className="w-1/2 pr-6">
                    <span className="text-xs font-bold text-gray-400 uppercase">Before</span>
                    <p className="font-bold text-[#0F2A8A]">{story.before}</p>
                  </div>
                  <div className="w-1/2 pl-6 text-right">
                    <span className="text-xs font-bold text-gray-400 uppercase">After 3 Months</span>
                    <p className="font-bold text-green-600">{story.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEW EDUCATIONAL FOOTER */}
      <footer className="bg-[#0F2A8A] text-white pt-24 pb-12 px-6 rounded-t-[64px] relative overflow-hidden mt-12">
        <div className="absolute top-0 right-10 opacity-20 pointer-events-none">
          <img src="https://cdn-icons-png.flaticon.com/512/2436/2436636.png" alt="Book" className="w-64 h-64 blur-sm opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1 flex flex-col items-start">
               <div className="flex items-center gap-2 mb-4">
                 <span className="material-symbols-outlined text-[#F5B21B] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                   pets
                 </span>
                 <h3 className="text-4xl font-extrabold text-[#F5B21B] tracking-tighter">LeoLand<span className="text-white">.</span></h3>
               </div>
               <p className="text-blue-200 font-medium mb-6">Making language learning the greatest adventure for children worldwide.</p>
               {/* Mascot Small */}
               <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full p-2 flex items-center justify-center shadow-lg border border-white/20">
                 <div className="text-[60px] leading-none select-none">🦁</div>
               </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Worlds</h4>
              <ul className="space-y-4 text-blue-200 font-medium">
                <li><a href="#" className="hover:text-[#F5B21B] transition-colors">Vocabulary Forest</a></li>
                <li><a href="#" className="hover:text-[#F5B21B] transition-colors">Grammar Castle</a></li>
                <li><a href="#" className="hover:text-[#F5B21B] transition-colors">Fluency Mountain</a></li>
                <li><a href="#" className="hover:text-[#F5B21B] transition-colors">Games</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Parents</h4>
              <ul className="space-y-4 text-blue-200 font-medium">
                <li><a href="#" className="hover:text-[#F5B21B] transition-colors">Parent Dashboard</a></li>
                <li><a href="#" className="hover:text-[#F5B21B] transition-colors">Learning Methodology</a></li>
                <li><a href="#" className="hover:text-[#F5B21B] transition-colors">Pricing & Plans</a></li>
                <li><a href="#" className="hover:text-[#F5B21B] transition-colors">Safety & Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Connect</h4>
              <div className="flex gap-4">
                {['facebook', 'instagram', 'youtube'].map((social, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F5B21B] hover:text-[#0F2A8A] transition-all">
                    {/* Placeholder for social icons */}
                    <span className="material-symbols-outlined">{social === 'youtube' ? 'smart_display' : social === 'facebook' ? 'thumb_up' : 'photo_camera'}</span>
                  </a>
                ))}
              </div>
              <p className="text-blue-200 font-medium mt-6">hello@leoland.com</p>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-blue-300 font-medium text-sm">
            <p>© 2026 LeoLand Education. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Terms of Adventure</a>
              <a href="#" className="hover:text-white">Privacy Spell</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
