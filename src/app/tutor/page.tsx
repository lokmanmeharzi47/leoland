"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function TutorMarketingPage() {
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
      <header className="relative overflow-hidden pt-xl md:pt-24 pb-xl px-margin-mobile bg-primary/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-container-max mx-auto grid lg:grid-cols-2 gap-xl items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block bg-primary/10 text-primary px-md py-xs rounded-full font-label-caps text-label-caps mb-base border border-primary/20 shadow-sm">
              AI CONVERSATION PARTNER
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-md leading-tight">
              Meet <span className="text-primary">Leo</span>, Your Child's Personal Language Coach
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-[36rem]">
              Speaking a new language requires practice. With Leo the AI Tutor, your child can practice real conversations in a safe, judgment-free environment anytime they want.
            </p>
            <div className="flex flex-col sm:flex-row gap-base">
              <Link href="/register" className="px-xl py-md bg-primary text-white rounded-xl font-ui-button text-ui-button shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-xs hover:bg-primary/90">
                Chat With Leo
                <span className="material-symbols-outlined">smart_toy</span>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative flex justify-center">
             <div className="relative w-full max-w-md">
               {/* Decorative background */}
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl transform scale-110"></div>
               
               <img 
                 alt="Leo the Lion AI Mascot" 
                 className="relative z-10 w-full drop-shadow-2xl animate-[bounce_4s_ease-in-out_infinite]" 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmteVt2XdcVJNR1y_eNMwwA4mj3N2nabsSTHik9Rw5R8LO1dNwq3WjSfyi75dcHGWEMa-zAHaDHId6-w7wsrQgD7re7WOQhYugDun5L0FtoC8sBNcV2B7MszEU_Pk7Bk_6d_gOM1OmxoGbKxSwPNwnVdctqw3P4ZNhA4NxbE0aYMaJkZdwXxV-zJuUNjcUJBShVcrc-kZr0jE7CIY5x3ohv-gGjufViasjEfAdUyGBSCIDuvtD_3VIJR9UQaBtlsGjDp9pVS9LIbux"
               />
               
               {/* Chat bubble 1 */}
               <motion.div 
                 initial={{ opacity: 0, x: -20, y: 20 }} 
                 animate={{ opacity: 1, x: 0, y: 0 }} 
                 transition={{ delay: 0.5, duration: 0.5 }}
                 className="absolute top-10 -left-12 bg-white p-4 rounded-2xl rounded-tr-none shadow-xl border border-outline-variant/10 z-20 hidden md:block"
               >
                 <p className="font-body-sm text-on-surface">"Hola, amigo! Let's practice."</p>
               </motion.div>
               
               {/* Chat bubble 2 */}
               <motion.div 
                 initial={{ opacity: 0, x: 20, y: 20 }} 
                 animate={{ opacity: 1, x: 0, y: 0 }} 
                 transition={{ delay: 1, duration: 0.5 }}
                 className="absolute bottom-1/4 -right-12 bg-primary text-white p-4 rounded-2xl rounded-tl-none shadow-xl border border-primary/20 z-20 hidden md:block"
               >
                 <p className="font-body-sm">"Hola Leo! Me gusta jugar."</p>
               </motion.div>
             </div>
          </motion.div>
        </div>
      </header>

      {/* Features Showcase */}
      <section className="py-xl max-w-container-max mx-auto px-margin-mobile">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-xl">
          <h2 className="font-display-lg text-headline-md md:text-display-lg text-on-surface mb-base">Smart Conversations</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Powered by advanced generative AI, Leo adapts to your child's skill level, focusing on building conversational confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-xl items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-lg">
            <motion.div variants={fadeInUp} className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">record_voice_over</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[20px] text-on-surface mb-1">Voice Recognition</h3>
                <p className="text-body-md text-on-surface-variant">Leo listens carefully and provides gentle, real-time feedback on pronunciation and accent.</p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex gap-4">
              <div className="w-12 h-12 bg-secondary-container/30 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-2xl">translate</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[20px] text-on-surface mb-1">Bilingual Support</h3>
                <p className="text-body-md text-on-surface-variant">If a child gets stuck, Leo seamlessly provides hints in their native language to keep the conversation flowing.</p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex gap-4">
              <div className="w-12 h-12 bg-tertiary-container/30 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-tertiary text-2xl">security</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-[20px] text-on-surface mb-1">100% Kid-Safe AI</h3>
                <p className="text-body-md text-on-surface-variant">Our conversational models are strictly guarded and filtered to ensure a safe, age-appropriate experience at all times.</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="glass-card p-md rounded-[2rem] shadow-2xl border border-outline-variant/10 relative overflow-hidden bg-surface-container-lowest">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
            <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between bg-surface/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Chat with Leo</h4>
                  <p className="text-xs text-success flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success"></span> Online</p>
                </div>
              </div>
            </div>
            
            <div className="p-lg space-y-md bg-surface-container-low/30 h-80 flex flex-col justify-end">
               <div className="flex gap-3 max-w-[85%]">
                 <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                   <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                 </div>
                 <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-outline-variant/10">
                   <p className="text-sm">Great job! The word for apple is "manzana". Can you try saying it?</p>
                 </div>
               </div>
               
               <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
                 <div className="w-8 h-8 bg-secondary-container rounded-full flex items-center justify-center shrink-0 mt-1">
                   <span className="material-symbols-outlined text-on-secondary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                 </div>
                 <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
                   <p className="text-sm flex items-center gap-2">
                     <span className="material-symbols-outlined text-xs">mic</span>
                     "Man-za-na"
                   </p>
                 </div>
               </div>
               
               <div className="flex gap-3 max-w-[85%]">
                 <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                   <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                 </div>
                 <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-outline-variant/10">
                   <p className="text-sm text-success font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">stars</span> Perfect pronunciation!</p>
                 </div>
               </div>
            </div>
            
            <div className="p-4 border-t border-outline-variant/10 bg-surface/50">
              <div className="w-full bg-surface-container-high rounded-full h-12 flex items-center px-4 justify-between border border-outline-variant/20">
                <span className="text-on-surface-variant text-sm">Hold to speak...</span>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-sm">mic</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
