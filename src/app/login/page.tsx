"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChunkyButton, Floaty } from "@/components/leo/ui";
import { signIn } from "@/app/actions/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      
      const res = await signIn(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#87CEEB] via-[#bfe6f5] to-[#FAF8FF] flex flex-col lg:flex-row relative">
      {/* Background magical elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Floaty className="absolute top-16 left-[8%] text-6xl opacity-80" duration={7}>☁️</Floaty>
        <Floaty className="absolute top-32 right-[20%] text-5xl opacity-90" duration={6} delay={1}>🎈</Floaty>
        <Floaty className="absolute bottom-24 left-[14%] text-4xl opacity-70" duration={5} delay={0.5}>⭐</Floaty>
        <div className="absolute top-1/4 right-[10%] w-[300px] h-[300px] bg-white/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-[20%] w-[400px] h-[400px] bg-[#87CEEB]/30 rounded-full blur-3xl" />
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-30">
        <Link href="/" className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full font-bold text-[#0F2A8A] text-sm shadow-md border-2 border-white/50 hover:bg-white hover:-translate-y-0.5 active:translate-y-0 transition-all">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Home
        </Link>
      </div>

      {/* Left: Leo welcome scene */}
      <div className="relative lg:w-1/2 flex flex-col items-center justify-center px-6 pt-32 pb-12 lg:py-12 z-10 min-h-[50vh] lg:min-h-screen">
        <div className="relative">
          <div className="absolute inset-0 bg-[#F5B21B] rounded-full blur-3xl opacity-20 transform scale-150"></div>
          <Floaty distance={12}>
            <div className="text-[120px] md:text-[160px] leading-none drop-shadow-2xl relative z-10">🦁</div>
          </Floaty>
          <motion.div
            initial={{ scale: 0, rotate: -15, y: 20 }}
            animate={{ scale: 1, rotate: -6, y: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3, damping: 15 }}
            className="absolute -bottom-8 -right-12 lg:-right-20 bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-2xl border-4 border-[#F5B21B] z-20 whitespace-nowrap"
          >
            <p className="font-extrabold text-[#0F2A8A] text-lg md:text-xl flex items-center gap-2">
              Welcome back, explorer! <span className="animate-bounce">👋</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right: Form Card Area */}
      <div className="relative lg:w-1/2 flex items-center justify-center px-6 pb-20 lg:py-12 z-20 w-full overflow-y-auto custom-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          className="w-full md:w-[480px] min-w-[320px] bg-white/95 backdrop-blur-xl rounded-[40px] p-8 md:p-10 border-4 border-white shadow-[0_30px_60px_rgba(15,42,138,0.15)] relative"
        >
          {/* Top Decorative Sparkle */}
          <div className="absolute -top-6 -right-6 text-4xl animate-pulse delay-700">✨</div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-[#0F2A8A] leading-tight tracking-tight">Welcome to <span className="text-[#F5B21B]">LeoLand</span></h1>
            <p className="text-[#0F2A8A]/60 font-medium mt-2 text-lg">Ready for another adventure?</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Field 
              icon="mail" 
              label="Email Address" 
              type="email" 
              placeholder="student@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field 
              icon="lock" 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              extra={<Link href="#" className="text-sm font-bold text-[#F5B21B] hover:text-orange-500 hover:underline transition-colors">Forgot?</Link>} 
            />
            
            {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

            <div className="mt-4">
              <button type="submit" disabled={isPending} className="w-full py-4 bg-gradient-to-r from-[#0F2A8A] to-[#1e3fb8] text-white rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(15,42,138,0.3)] hover:shadow-[0_10px_25px_rgba(15,42,138,0.4)] hover:-translate-y-1 active:translate-y-0 active:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:-translate-y-0 disabled:cursor-not-allowed">
                {isPending ? "Signing In..." : "Sign In"}
                {!isPending && <span className="material-symbols-outlined font-bold">arrow_forward</span>}
              </button>
            </div>
          </form>

          <div className="my-8 flex items-center gap-4 text-xs font-black text-[#0F2A8A]/30 uppercase tracking-widest">
            <span className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#0F2A8A]/10 rounded-full" />
            or continue with
            <span className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#0F2A8A]/10 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton label="Google">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6 drop-shadow-sm" alt="Google" />
            </SocialButton>
            <SocialButton label="Apple">
              <svg viewBox="0 0 384 512" className="w-6 h-6 text-gray-800" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            </SocialButton>
          </div>

          <div className="mt-8 text-center bg-[#F4F6FF] rounded-2xl p-4 border border-[#0F2A8A]/5">
            <p className="font-semibold text-[#0F2A8A]/70">
              New here? <Link href="/register" className="text-[#0F2A8A] font-extrabold hover:text-[#F5B21B] transition-colors">Join the adventure 🚀</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ icon, label, type, placeholder, value, onChange, extra }: { icon: string; label: string; type: string; placeholder: string; value: string; onChange: (e: any) => void; extra?: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2 px-1">
        <label className="font-extrabold text-xs uppercase tracking-widest text-[#0F2A8A]/70">{label}</label>
        {extra}
      </div>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-[#0F2A8A]/40 text-[24px] group-focus-within:text-[#0F2A8A] transition-colors">{icon}</span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-4 bg-[#F8FAFF] border-2 border-[#E8EEFF] rounded-2xl font-bold text-[#0F2A8A] placeholder-[#0F2A8A]/30 focus:outline-none focus:border-[#0F2A8A] focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,42,138,0.1)] transition-all"
        />
      </div>
    </div>
  );
}

function SocialButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button type="button" className="py-3.5 bg-white border-2 border-[#E8EEFF] rounded-2xl flex items-center justify-center gap-3 font-bold text-[#0F2A8A] hover:border-[#0F2A8A]/20 hover:bg-[#F8FAFF] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all shadow-sm">
      {children}
      {label}
    </button>
  );
}
