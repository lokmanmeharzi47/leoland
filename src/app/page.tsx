"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-xl md:pt-24 pb-xl px-margin-mobile">
        <div className="max-w-container-max mx-auto grid lg:grid-cols-2 gap-xl items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="z-10">
            <span className="inline-block bg-tertiary-container/10 text-tertiary px-md py-xs rounded-full font-label-caps text-label-caps mb-base">
              THE DIGITAL PLAYGROUND
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-md leading-tight">
              Learn Languages Through <span className="text-primary">Play</span>, Stories &amp; <span className="text-tertiary">AI</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-[36rem]">
              Arabic, French and English for children aged 5-12. Experience the future of bilingual education with Leo the Lion.
            </p>
            <div className="flex flex-col sm:flex-row gap-base">
              <button className="px-xl py-md bg-secondary-container text-on-secondary-container rounded-xl font-ui-button text-ui-button shadow-lg shadow-secondary-container/20 active:scale-95 transition-all flex items-center justify-center gap-xs">
                Start Learning
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="px-xl py-md bg-surface-container-high text-on-surface-variant rounded-xl font-ui-button text-ui-button hover:bg-surface-container-highest transition-all flex items-center justify-center">
                Book a Demo
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -z-10 w-full h-full bg-primary/5 blur-3xl rounded-full scale-110 top-10 left-10"></div>
            <div className="relative glass-card p-base rounded-3xl overflow-hidden shadow-2xl border-white/50">
              <img 
                alt="Leo the Lion and Kids Learning" 
                className="w-full aspect-video md:aspect-[4/3] object-cover rounded-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTNKSJWvjyJMIad-4jfxOaQUoxl56lkTbxyaOKA25Vz8a7_EyPV50KsSnpWEO7yaLVJCxjqGXENQ-fBKbuj815hn4phXwq9q2PGQ0v0ZIT_qgJQS1jC9dWCOp294hOMJgH3cPluAkXxxATPPyyg874EXKRmMwBQbWqO08hSBubjYK9QrWQwNmRgVQEKLzLjyM8loBZsJVytZ1zS10GCWk_WrnVaIPszWUdFbL4Qt9KUw3ceydzs0OvCJK0rQ6ZnEsptFGJYD2aYT7R"
              />
              {/* Floating Widget */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute bottom-md right-md bg-surface p-sm rounded-xl shadow-xl flex items-center gap-sm"
              >
                <div className="bg-success-green/20 p-xs rounded-lg">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant">DAILY GOAL</p>
                  <p className="font-headline-sm text-[16px] text-on-surface">85% Complete!</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-xl bg-surface-container-low">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="max-w-container-max mx-auto px-margin-mobile grid grid-cols-1 md:grid-cols-3 gap-md"
        >
          <motion.div variants={fadeInUp} className="glass-card p-lg rounded-2xl flex flex-col items-center text-center group hover:translate-y-[-4px] transition-all">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-base group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-headline-md">groups</span>
            </div>
            <h3 className="font-display-lg text-headline-md text-on-surface">50,000+</h3>
            <p className="font-body-md text-on-surface-variant">Students</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="glass-card p-lg rounded-2xl flex flex-col items-center text-center group hover:translate-y-[-4px] transition-all">
            <div className="w-16 h-16 bg-secondary-container/20 rounded-full flex items-center justify-center mb-base group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary text-headline-md">book_2</span>
            </div>
            <h3 className="font-display-lg text-headline-md text-on-surface">10,000+</h3>
            <p className="font-body-md text-on-surface-variant">Lessons</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="glass-card p-lg rounded-2xl flex flex-col items-center text-center group hover:translate-y-[-4px] transition-all">
            <div className="w-16 h-16 bg-tertiary-container/10 rounded-full flex items-center justify-center mb-base group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-tertiary text-headline-md">translate</span>
            </div>
            <h3 className="font-display-lg text-headline-md text-on-surface">3</h3>
            <p className="font-body-md text-on-surface-variant">Languages</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-xl max-w-container-max mx-auto px-margin-mobile">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-xl">
          <h2 className="font-display-lg text-headline-md md:text-display-lg text-on-surface mb-base">Why Kids Love LeoLand</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Innovative tools designed by educators to make every lesson a memorable adventure.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Big Feature */}
          <motion.div variants={fadeInUp} className="md:col-span-2 glass-card rounded-3xl p-lg relative overflow-hidden group">
            <div className="relative z-10 md:w-1/2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-base">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-base">AI Tutor: Meet Leo</h3>
              <p className="font-body-md text-on-surface-variant mb-md">Personalized learning that adapts to your child's pace. Leo knows when to cheer and when to challenge.</p>
              <button className="text-primary font-ui-button text-ui-button flex items-center gap-xs hover:gap-sm transition-all">
                Try Leo AI <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <img 
              alt="AI Tutor Feature" 
              className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity hidden md:block" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN43npM4Vix1fl_Y55h0C5dpEaYJ4Ss-PvrA0FgGRD-_HRHellvs8rnIktSlUTp_YIBYab_HVeugSFG5YoI00xQYsMp1K5yf13Znion7LzIscWKhmaupB3q-IjbnC-uW8LHqDEmkZKCIr4QX7vZdd4_5M5hfLLK1ndViR7IVZVXBOM4H-IIF93LH-XYhp7lPmcqDe8o8WhXH-x2r7G8rBULcdOKFxpdZdhZ1jokkG89HGq3FOxNNvK7v_SRQNCDe7saMbVTc5q4-9t"
            />
          </motion.div>

          {/* Small Feature 1 */}
          <motion.div variants={fadeInUp} className="bg-surface-container-high rounded-3xl p-lg hover:shadow-xl transition-shadow cursor-default">
            <div className="w-12 h-12 bg-secondary-container/20 rounded-xl flex items-center justify-center mb-base">
              <span className="material-symbols-outlined text-secondary">sports_esports</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-base">Gamified Learning</h3>
            <p className="font-body-md text-on-surface-variant">Earn badges and unlock new worlds as you master new words.</p>
          </motion.div>

          {/* Small Feature 2 */}
          <motion.div variants={fadeInUp} className="bg-surface-container-highest rounded-3xl p-lg hover:shadow-xl transition-shadow cursor-default">
            <div className="w-12 h-12 bg-tertiary-container/10 rounded-xl flex items-center justify-center mb-base">
              <span className="material-symbols-outlined text-tertiary">auto_stories</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-base">Story-Based</h3>
            <p className="font-body-md text-on-surface-variant">Language learning woven into interactive cinematic tales.</p>
          </motion.div>

          {/* Small Feature 3 */}
          <motion.div variants={fadeInUp} className="bg-primary-container text-on-primary-container rounded-3xl p-lg shadow-xl cursor-default hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-base">
              <span className="material-symbols-outlined text-white">record_voice_over</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-base text-white">Pronunciation</h3>
            <p className="font-body-md text-on-primary-container/80">Real-time feedback on accent and fluency using voice recognition.</p>
          </motion.div>

          {/* Small Feature 4 */}
          <motion.div variants={fadeInUp} className="glass-card rounded-3xl p-lg hover:shadow-xl transition-shadow border-primary/10 cursor-default">
            <div className="w-12 h-12 bg-outline-variant/30 rounded-xl flex items-center justify-center mb-base">
              <span className="material-symbols-outlined text-on-surface">monitoring</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-base">Parent Analytics</h3>
            <p className="font-body-md text-on-surface-variant">Detailed reports on progress delivered straight to your dashboard.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Learning Journey Map */}
      <section className="py-xl bg-surface relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-xl">
            <h2 className="font-display-lg text-headline-md md:text-display-lg text-on-surface mb-base">The Learning Journey</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Traverse the magical lands of language.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-surface-container-low rounded-[40px] shadow-inner overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent"></div>
            
            <svg className="absolute w-full h-full p-lg overflow-visible" viewBox="0 0 1000 400">
              <path d="M100,300 Q250,100 450,250 T850,150" fill="none" opacity="0.4" stroke="#2563eb" strokeDasharray="12,12" strokeWidth="6"></path>
            </svg>

            <div className="absolute inset-0 p-lg">
              {/* Point 1 */}
              <div className="absolute left-[10%] bottom-[20%] group">
                <div className="w-12 h-12 bg-primary-container text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-all">
                  <span className="material-symbols-outlined text-[20px]">forest</span>
                </div>
                <div className="mt-base bg-white px-md py-xs rounded-xl shadow-md border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-label-caps text-label-caps text-primary">STAGE 1</p>
                  <p className="font-ui-button text-on-surface">Vocabulary Forest</p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="absolute left-[45%] top-[40%] group">
                <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-all">
                  <span className="material-symbols-outlined text-[20px]">castle</span>
                </div>
                <div className="mt-base bg-white px-md py-xs rounded-xl shadow-md border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-label-caps text-label-caps text-secondary">STAGE 2</p>
                  <p className="font-ui-button text-on-surface">Grammar Castle</p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="absolute right-[15%] top-[25%] group">
                <div className="w-12 h-12 bg-tertiary-container text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-all">
                  <span className="material-symbols-outlined text-[20px]">flag</span>
                </div>
                <div className="mt-base bg-white px-md py-xs rounded-xl shadow-md border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-label-caps text-label-caps text-tertiary">STAGE 3</p>
                  <p className="font-ui-button text-on-surface">Fluency Summit</p>
                </div>
              </div>
            </div>
            
            <p className="relative z-10 font-display-lg text-headline-sm text-primary/30 uppercase tracking-[0.5em] pointer-events-none">Explore the World</p>
          </motion.div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-xl bg-surface-container-highest/20">
        <div className="max-w-container-max mx-auto px-margin-mobile">
          <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-[36rem]">
              <h2 className="font-display-lg text-headline-md md:text-display-lg text-on-surface mb-base">Speak Your Dreams</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">We currently offer immersion in 3 beautiful languages, with more arriving soon.</p>
            </motion.div>
            <button className="px-lg py-sm border-2 border-primary text-primary rounded-xl font-ui-button text-ui-button hover:bg-primary hover:text-white transition-all">
              View All Paths
            </button>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-3 gap-md max-w-2xl">
            {/* Arabic */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-md flex flex-col items-center group cursor-pointer hover:shadow-2xl transition-all border-b-4 border-b-success-green/80">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-md shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center bg-surface-container-high text-4xl">
                AR
              </div>
              <span className="font-headline-sm text-[18px] text-on-surface">العربية</span>
            </motion.div>

            {/* French */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-md flex flex-col items-center group cursor-pointer hover:shadow-2xl transition-all border-b-4 border-b-primary-container">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-md shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center bg-surface-container-high text-4xl">
                FR
              </div>
              <span className="font-headline-sm text-[18px] text-on-surface">Français</span>
            </motion.div>

            {/* English */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-md flex flex-col items-center group cursor-pointer hover:shadow-2xl transition-all border-b-4 border-b-primary">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-md shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center bg-surface-container-high text-4xl">
                EN
              </div>
              <span className="font-headline-sm text-[18px] text-on-surface">English</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="max-w-container-max mx-auto px-margin-mobile"
        >
          <div className="bg-primary rounded-[48px] p-lg md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display-lg text-headline-md md:text-display-lg text-white mb-md">Ready to start the adventure?</h2>
              <p className="font-body-lg text-body-lg text-white/80 mb-lg">Join thousands of families around the world and give your child the gift of language.</p>
              <div className="flex flex-col sm:flex-row gap-md justify-center">
                <button className="px-xl py-md bg-secondary-container text-on-secondary-container rounded-2xl font-ui-button text-ui-button shadow-xl active:scale-95 transition-all">
                  Get Started for Free
                </button>
                <button className="px-xl py-md bg-white/10 text-white border border-white/20 rounded-2xl font-ui-button text-ui-button hover:bg-white/20 transition-all">
                  Explore Pricing
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
