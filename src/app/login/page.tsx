"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center px-margin-mobile relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-3xl rounded-full -mt-40 -mr-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-container/10 blur-3xl rounded-full -mb-20 -ml-20 pointer-events-none"></div>
      
      <Link href="/" className="absolute top-md left-md md:top-lg md:left-lg flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-label-caps font-bold">
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        BACK TO HOME
      </Link>

      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full max-w-[28rem]">
        <div className="text-center mb-lg">
          <Link href="/" className="inline-block font-display-lg text-headline-md text-primary mb-sm">LeoLand</Link>
          <h1 className="font-display-lg text-[32px] font-bold text-on-surface leading-tight">Welcome Back</h1>
          <p className="text-body-md text-on-surface-variant mt-2">Ready for another adventure?</p>
        </div>

        <div className="glass-card p-lg rounded-3xl shadow-xl border border-outline-variant/10">
          <form className="flex flex-col gap-md">
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">EMAIL ADDRESS</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant">mail</span>
                <input 
                  type="email" 
                  placeholder="parent@example.com" 
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">PASSWORD</label>
                <Link href="#" className="font-label-caps text-[10px] text-primary hover:underline">FORGOT?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant">lock</span>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <button type="button" className="w-full py-4 mt-2 bg-primary-container text-on-primary-container rounded-xl font-ui-button text-ui-button font-bold shadow-md hover:translate-y-[-2px] hover:shadow-lg active:scale-95 transition-all">
              Sign In
            </button>
          </form>

          <div className="mt-lg flex items-center justify-between before:h-px before:flex-grow before:bg-outline-variant/20 after:h-px after:flex-grow after:bg-outline-variant/20">
            <span className="px-4 text-label-caps text-on-surface-variant">OR CONTINUE WITH</span>
          </div>

          <div className="mt-md flex gap-sm">
            <button className="flex-1 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors font-bold text-on-surface">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button className="flex-1 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors font-bold text-on-surface">
              <svg viewBox="0 0 384 512" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              Apple
            </button>
          </div>
        </div>

        <p className="text-center mt-md text-body-md text-on-surface-variant">
          New to LeoLand? <Link href="/register" className="text-primary font-bold hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
