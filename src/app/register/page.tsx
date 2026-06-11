"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChunkyButton, Floaty } from "@/components/leo/ui";

const ages = ["5–6", "7–8", "9–10", "11–12"];
const languages = [
  { name: "Arabic", flag: "🇸🇦" },
  { name: "French", flag: "🇫🇷" },
  { name: "English", flag: "🇬🇧" },
];
const themes = [
  { name: "Space", emoji: "🚀" },
  { name: "Ocean", emoji: "🌊" },
  { name: "Animals", emoji: "🦁" },
  { name: "Fairy Tales", emoji: "🏰" },
  { name: "Sports", emoji: "⚽" },
  { name: "Music", emoji: "🎵" },
];
const levels = [
  { name: "Beginner", emoji: "🌱", desc: "Just starting out" },
  { name: "Explorer", emoji: "🧭", desc: "Knows some words" },
  { name: "Pro", emoji: "⭐", desc: "Ready for a challenge" },
];

const steps = ["Your Explorer", "Languages", "Favorite Worlds", "Skill Level", "Parent Account"];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState<string | null>(null);
  const [langs, setLangs] = useState<string[]>([]);
  const [picks, setPicks] = useState<string[]>([]);
  const [level, setLevel] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const canNext = [name.trim() && age, langs.length > 0, picks.length > 0, level, true][step];

  const next = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 }, colors: ["#F5B21B", "#0F2A8A", "#ffffff", "#4CAF50", "#38BDF8"] });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#cfe9f6] to-[#FAF8FF] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      <Floaty className="absolute top-16 left-[10%] text-6xl" duration={7}>☁️</Floaty>
      <Floaty className="absolute top-28 right-[12%] text-5xl" duration={6} delay={1}>🎈</Floaty>

      <Link href="/" className="absolute top-5 left-5 z-20 flex items-center gap-1.5 bg-white/80 backdrop-blur px-4 py-2 rounded-full font-black text-[#0F2A8A] text-sm shadow active:scale-95 transition-transform">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Home
      </Link>

      <div className="w-full md:w-[600px] min-w-[300px] max-w-[600px] relative z-10">
        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] p-10 text-center border-4 border-white shadow-[0_20px_50px_rgba(15,42,138,0.2)]"
          >
            <Floaty distance={14}><div className="text-8xl mb-4">🎉</div></Floaty>
            <h1 className="text-3xl md:text-4xl font-black text-[#0F2A8A] mb-2">{name || "Explorer"}&apos;s journey is ready!</h1>
            <p className="text-[#0F2A8A]/60 font-semibold mb-8">
              Leo packed a personalized adventure with {langs.join(", ")} and your favorite worlds. Let&apos;s go!
            </p>
            <ChunkyButton href="/dashboard" variant="gold" rightIcon="rocket_launch">Enter LeoLand</ChunkyButton>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] p-6 md:p-8 border-4 border-white shadow-[0_20px_50px_rgba(15,42,138,0.2)]"
          >
            {/* Leo + progress */}
            <div className="flex items-center gap-3 mb-5">
              <Floaty distance={8}><span className="text-5xl">🦁</span></Floaty>
              <div className="flex-grow">
                <p className="font-black text-[#0F2A8A]">Step {step + 1} of {steps.length}</p>
                <p className="text-sm font-bold text-[#0F2A8A]/50">{steps[step]}</p>
              </div>
            </div>
            <div className="flex gap-1.5 mb-7">
              {steps.map((_, i) => (
                <div key={i} className={`h-2.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-[#F5B21B]" : "bg-[#0F2A8A]/10"}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="min-h-[260px]"
              >
                {step === 0 && (
                  <div>
                    <h2 className="text-2xl font-black text-[#0F2A8A] mb-1">Who&apos;s the explorer?</h2>
                    <p className="text-[#0F2A8A]/60 font-semibold mb-5">Tell Leo your child&apos;s name and age.</p>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Child's first name"
                      className="w-full mb-5 px-5 py-4 bg-[#F4F6FF] border-2 border-transparent rounded-2xl font-bold text-[#0F2A8A] placeholder-[#0F2A8A]/30 focus:outline-none focus:border-[#F5B21B] focus:bg-white transition-all"
                    />
                    <p className="font-black text-xs uppercase tracking-wider text-[#0F2A8A]/60 mb-2">Age</p>
                    <div className="grid grid-cols-4 gap-2">
                      {ages.map((a) => (
                        <Choice key={a} active={age === a} onClick={() => setAge(a)}>
                          <span className="text-lg font-black">{a}</span>
                        </Choice>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-black text-[#0F2A8A] mb-1">What should we learn?</h2>
                    <p className="text-[#0F2A8A]/60 font-semibold mb-5">Pick one or more languages.</p>
                    <div className="grid grid-cols-3 gap-3">
                      {languages.map((l) => (
                        <Choice key={l.name} active={langs.includes(l.name)} onClick={() => toggle(langs, setLangs, l.name)} column>
                          <span className="text-4xl">{l.flag}</span>
                          <span className="font-black text-[#0F2A8A]">{l.name}</span>
                        </Choice>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-black text-[#0F2A8A] mb-1">Favorite worlds?</h2>
                    <p className="text-[#0F2A8A]/60 font-semibold mb-5">Choose the themes that sound fun.</p>
                    <div className="grid grid-cols-3 gap-3">
                      {themes.map((th) => (
                        <Choice key={th.name} active={picks.includes(th.name)} onClick={() => toggle(picks, setPicks, th.name)} column>
                          <span className="text-4xl">{th.emoji}</span>
                          <span className="font-black text-sm text-[#0F2A8A]">{th.name}</span>
                        </Choice>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-black text-[#0F2A8A] mb-1">How much do you know?</h2>
                    <p className="text-[#0F2A8A]/60 font-semibold mb-5">Leo will set the perfect difficulty.</p>
                    <div className="space-y-3">
                      {levels.map((lv) => (
                        <Choice key={lv.name} active={level === lv.name} onClick={() => setLevel(lv.name)} row>
                          <span className="text-3xl">{lv.emoji}</span>
                          <div className="text-left">
                            <p className="font-black text-[#0F2A8A]">{lv.name}</p>
                            <p className="text-sm font-semibold text-[#0F2A8A]/50">{lv.desc}</p>
                          </div>
                        </Choice>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-black text-[#0F2A8A] mb-1">Almost there!</h2>
                    <p className="text-[#0F2A8A]/60 font-semibold mb-5">Create a parent account to save the journey.</p>
                    <div className="space-y-3">
                      <input placeholder="Parent's full name" className="w-full px-5 py-3.5 bg-[#F4F6FF] border-2 border-transparent rounded-2xl font-bold text-[#0F2A8A] placeholder-[#0F2A8A]/30 focus:outline-none focus:border-[#F5B21B] focus:bg-white transition-all" />
                      <input type="email" placeholder="Email address" className="w-full px-5 py-3.5 bg-[#F4F6FF] border-2 border-transparent rounded-2xl font-bold text-[#0F2A8A] placeholder-[#0F2A8A]/30 focus:outline-none focus:border-[#F5B21B] focus:bg-white transition-all" />
                      <input type="password" placeholder="Create a password" className="w-full px-5 py-3.5 bg-[#F4F6FF] border-2 border-transparent rounded-2xl font-bold text-[#0F2A8A] placeholder-[#0F2A8A]/30 focus:outline-none focus:border-[#F5B21B] focus:bg-white transition-all" />
                    </div>
                    <p className="text-[11px] text-[#0F2A8A]/50 font-semibold mt-3">
                      By joining you agree to our <Link href="#" className="underline">Terms</Link> & <Link href="#" className="underline">Privacy Policy</Link>.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex items-center justify-between gap-3 mt-7">
              {step > 0 ? (
                <button onClick={() => setStep((s) => s - 1)} className="px-5 py-3 rounded-full font-black text-[#0F2A8A]/60 hover:bg-[#0F2A8A]/5 transition-colors">
                  ← Back
                </button>
              ) : (
                <Link href="/login" className="px-5 py-3 rounded-full font-black text-[#0F2A8A]/60 hover:bg-[#0F2A8A]/5 transition-colors">
                  Have an account?
                </Link>
              )}
              <ChunkyButton variant={canNext ? "gold" : "white"} onClick={canNext ? next : undefined} rightIcon={step === steps.length - 1 ? "celebration" : "arrow_forward"}>
                {step === steps.length - 1 ? "Create Journey" : "Next"}
              </ChunkyButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Choice({ children, active, onClick, column, row }: { children: React.ReactNode; active: boolean; onClick: () => void; column?: boolean; row?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-2xl border-4 p-3 transition-all active:scale-95 ${column ? "flex-col" : row ? "w-full justify-start gap-4 px-5 py-4" : ""} ${
        active ? "border-[#F5B21B] bg-[#FFF6E2] shadow-[0_5px_0_#F5B21B]" : "border-[#0F2A8A]/10 bg-white hover:border-[#0F2A8A]/25"
      }`}
    >
      {children}
    </button>
  );
}
