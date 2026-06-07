"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function LibraryMarketingPage() {
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
      <header className="relative overflow-hidden pt-xl md:pt-24 pb-xl px-margin-mobile bg-surface">
        <div className="absolute top-0 left-0 w-full h-[80%] bg-gradient-to-b from-tertiary-container/30 to-transparent -z-10"></div>
        <div className="max-w-container-max mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl mx-auto">
            <span className="inline-block bg-tertiary-container text-on-tertiary-container px-md py-xs rounded-full font-label-caps text-label-caps mb-base shadow-sm">
              STORY LIBRARY
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-md leading-tight">
              Step Into The <span className="text-tertiary">Story</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
              Immerse your child in bilingual tales. Our interactive storybooks help kids learn languages naturally through context, beautiful illustrations, and engaging narratives.
            </p>
            <div className="flex flex-col sm:flex-row gap-base justify-center">
              <Link href="/register" className="px-xl py-md bg-tertiary text-white rounded-xl font-ui-button text-ui-button shadow-lg shadow-tertiary/30 active:scale-95 transition-all flex items-center justify-center gap-xs hover:bg-tertiary/90">
                Explore Library
                <span className="material-symbols-outlined">auto_stories</span>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-xl max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-tertiary/10 blur-[100px] -z-10 rounded-full"></div>
            <img 
              alt="Story Library Experience" 
              className="w-full h-auto rounded-[2rem] shadow-2xl border border-outline-variant/20" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN43npM4Vix1fl_Y55h0C5dpEaYJ4Ss-PvrA0FgGRD-_HRHellvs8rnIktSlUTp_YIBYab_HVeugSFG5YoI00xQYsMp1K5yf13Znion7LzIscWKhmaupB3q-IjbnC-uW8LHqDEmkZKCIr4QX7vZdd4_5M5hfLLK1ndViR7IVZVXBOM4H-IIF93LH-XYhp7lPmcqDe8o8WhXH-x2r7G8rBULcdOKFxpdZdhZ1jokkG89HGq3FOxNNvK7v_SRQNCDe7saMbVTc5q4-9t"
            />
          </motion.div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-xl max-w-container-max mx-auto px-margin-mobile">
        <div className="grid md:grid-cols-2 gap-xl items-center mb-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
            </div>
            <h2 className="font-display-lg text-headline-md text-on-surface mb-base">Read-Along Audio</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">
              Every story features professional voice narration by native speakers. Kids can listen and read along, perfect for associating spoken sounds with written words.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-body-md"><span className="material-symbols-outlined text-tertiary">check</span> Highlighted text as it's read</li>
              <li className="flex items-center gap-3 text-body-md"><span className="material-symbols-outlined text-tertiary">check</span> Adjustable reading speeds</li>
              <li className="flex items-center gap-3 text-body-md"><span className="material-symbols-outlined text-tertiary">check</span> Authentic accents and pronunciations</li>
            </ul>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="glass-card p-md rounded-3xl shadow-lg border border-outline-variant/10">
            <div className="aspect-[4/3] bg-surface-container-low rounded-2xl overflow-hidden relative group cursor-pointer">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTNKSJWvjyJMIad-4jfxOaQUoxl56lkTbxyaOKA25Vz8a7_EyPV50KsSnpWEO7yaLVJCxjqGXENQ-fBKbuj815hn4phXwq9q2PGQ0v0ZIT_qgJQS1jC9dWCOp294hOMJgH3cPluAkXxxATPPyyg874EXKRmMwBQbWqO08hSBubjYK9QrWQwNmRgVQEKLzLjyM8loBZsJVytZ1zS10GCWk_WrnVaIPszWUdFbL4Qt9KUw3ceydzs0OvCJK0rQ6ZnEsptFGJYD2aYT7R" className="w-full h-full object-cover blur-[2px] group-hover:blur-0 transition-all duration-500" alt="Audio book preview" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl text-tertiary group-hover:scale-110 transition-transform">
                   <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-xl items-center flex-row-reverse">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="order-2 md:order-1 glass-card p-lg rounded-3xl shadow-lg border border-outline-variant/10">
            <div className="space-y-4">
              <div className="p-4 bg-surface rounded-xl border border-outline-variant/20 shadow-sm flex items-start gap-4">
                <span className="text-2xl mt-1">🐱</span>
                <div>
                  <p className="font-bold text-on-surface">El gato</p>
                  <p className="text-sm text-on-surface-variant">The cat</p>
                </div>
              </div>
              <div className="p-4 bg-surface rounded-xl border border-outline-variant/20 shadow-sm flex items-start gap-4 ml-8">
                <span className="text-2xl mt-1">🌳</span>
                <div>
                  <p className="font-bold text-on-surface">El árbol</p>
                  <p className="text-sm text-on-surface-variant">The tree</p>
                </div>
              </div>
              <div className="p-4 bg-surface rounded-xl border border-outline-variant/20 shadow-sm flex items-start gap-4">
                <span className="text-2xl mt-1">🏃‍♂️</span>
                <div>
                  <p className="font-bold text-on-surface">Corre</p>
                  <p className="text-sm text-on-surface-variant">Runs</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="order-1 md:order-2">
            <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>translate</span>
            </div>
            <h2 className="font-display-lg text-headline-md text-on-surface mb-base">Interactive Translation</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">
              Stuck on a word? Just tap it! Our interactive stories allow kids to tap any word to instantly see its translation, hear how it's pronounced, and add it to their personal vocabulary list.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
