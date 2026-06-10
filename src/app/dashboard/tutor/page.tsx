"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type Message = {
  id: number;
  sender: "leo" | "student";
  text: string;
};

export default function MagicalTutorPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "leo",
      text: "Roar! Bonjour, explorer! How do we say Hello in French?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [xp, setXp] = useState(1240);
  const [streak, setStreak] = useState(12);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate recording stop after 3s
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage(undefined, "Bonjour!");
      }, 3000);
    }
  };

  const handleSendMessage = (e?: React.FormEvent, simulatedText?: string) => {
    e?.preventDefault();
    const textToSend = simulatedText || inputValue;
    if (!textToSend.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      sender: "student",
      text: textToSend,
    }]);
    setInputValue("");
    
    // Simulate Leo's response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: "leo",
        text: "Bonjour! Great job! Let's say it together!",
      }]);
      setXp(x => x + 50);
    }, 1500);
  };

  const triggerConfetti = () => {
    if (isUnlocked) return;
    setIsUnlocked(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F5B21B', '#0F2A8A', '#ffffff', '#4ade80', '#38bdf8']
    });
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
  };
  
  const floatAnimationStudent = {
    y: [0, -8, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }
  };

  const lastLeoMsg = [...messages].reverse().find(m => m.sender === "leo");
  const lastStudentMsg = [...messages].reverse().find(m => m.sender === "student");

  return (
    <div className="w-full flex-grow flex flex-col gap-8 pb-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F2A8A] tracking-tight drop-shadow-sm">
          Learn & Talk with Leo
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 w-full max-w-7xl mx-auto">
        
        {/* Left Side: Magical Scene (8 columns) */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="xl:col-span-8 flex flex-col relative">
          
          <div className="relative rounded-[48px] h-[650px] flex flex-col shadow-2xl overflow-hidden border-8 border-white bg-gradient-to-b from-sky-400 to-sky-200">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
              <img src="/worlds_bg.png" alt="Magical Kingdom" className="w-full h-full object-cover" />
            </div>

            {/* Clouds & Balloons */}
            <motion.img animate={{ x: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const }} src="https://cdn-icons-png.flaticon.com/512/414/414927.png" className="absolute top-10 left-10 w-32 opacity-90 drop-shadow-lg z-0 pointer-events-none" alt="Cloud" />
            <motion.img animate={{ x: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" as const }} src="https://cdn-icons-png.flaticon.com/512/414/414927.png" className="absolute top-24 right-10 w-40 opacity-80 drop-shadow-lg z-0 pointer-events-none" alt="Cloud" />
            <motion.img animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }} src="https://cdn-icons-png.flaticon.com/512/2854/2854341.png" className="absolute top-16 right-32 w-20 opacity-90 z-0 pointer-events-none drop-shadow-xl" alt="Balloon" />

            {/* Ground */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-b-[40px] z-0 border-t-8 border-emerald-300"></div>

            {/* Stage Area */}
            <div className="flex-grow flex flex-col relative z-10 px-4 sm:px-12 pb-24 pt-6 overflow-hidden">
              
              {/* Chat History (Messenger Style) */}
              <div className="flex-grow overflow-y-auto w-full flex flex-col gap-4 mb-4 pr-2 custom-scrollbar relative z-30 mask-image-bottom">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: msg.sender === "leo" ? "bottom left" : "bottom right" }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`flex w-full ${msg.sender === "leo" ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`p-4 sm:p-5 rounded-[28px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] min-w-[150px] max-w-[80%] sm:max-w-[70%] border-2 border-white/50 ${
                        msg.sender === "leo" 
                          ? "bg-white text-[#0F2A8A] rounded-bl-none" 
                          : "bg-[#F5B21B] text-[#0F2A8A] rounded-br-none"
                      }`}>
                        <p className="font-extrabold text-base sm:text-lg leading-snug">{msg.text}</p>
                        {msg.sender === "leo" && (
                          <div className="mt-2 flex gap-2">
                            <button className="flex items-center gap-1 text-[#F5B21B] font-bold text-xs uppercase hover:brightness-110 active:scale-95 transition-all">
                              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                              Listen
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {/* Auto-scroll anchor */}
                <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
              </div>

             

            </div>

            {/* Voice Learning Mode & Input */}
            <form onSubmit={handleSendMessage} className="absolute bottom-0 w-full p-4 sm:p-8 bg-white/40 backdrop-blur-3xl border-t-4 border-white/60 flex items-center gap-3 sm:gap-6 z-40">
              <div className="relative flex-grow">
                <input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full h-16 sm:h-20 bg-white/95 border-4 border-white rounded-full px-8 text-[#0F2A8A] placeholder-[#0F2A8A]/40 focus:ring-4 focus:ring-[#F5B21B]/50 focus:border-[#F5B21B] outline-none transition-all font-extrabold text-lg sm:text-xl shadow-inner" 
                  placeholder="Type a magical message..." 
                  type="text"
                />
              </div>
              <button 
                type="submit"
                className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-[#0F2A8A] hover:bg-[#0F2A8A] hover:text-white transition-all shadow-xl active:scale-95 border-4 border-transparent hover:border-white/20"
              >
                <span className="material-symbols-outlined text-[32px] sm:text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
              
              <button 
                type="button"
                onClick={toggleRecording}
                className={`relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center rounded-full shadow-[0_12px_0_rgba(0,0,0,0.15)] active:shadow-none active:translate-y-3 transition-all border-4 border-white z-50 ${
                  isRecording 
                    ? 'bg-red-500 text-white shadow-[0_12px_0_rgba(185,28,28,1)]' 
                    : 'bg-[#F5B21B] text-[#0F2A8A] shadow-[0_12px_0_#d97706]'
                }`}
              >
                {/* Pulse waves when recording */}
                {isRecording && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-50"></span>
                    <span className="absolute -inset-4 rounded-full border-4 border-red-500 animate-ping opacity-30" style={{ animationDelay: '0.3s' }}></span>
                  </>
                )}
                <span className="material-symbols-outlined text-[36px] sm:text-[48px] relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isRecording ? 'stop' : 'mic'}
                </span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right Side: Adventure Panels (4 columns) */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Today's Adventure Panel */}
          <div className="bg-white p-6 rounded-[40px] shadow-2xl border-4 border-white/50">
            <h3 className="text-2xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5B21B] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
              Today's Adventure
            </h3>
            <div className="space-y-4">
              {[
                { title: "Learn 5 new words", xp: 50, progress: 100, icon: "local_florist", color: "text-emerald-500" },
                { title: "Practice Speaking", xp: 120, progress: 60, icon: "record_voice_over", color: "text-sky-500" },
                { title: "Grammar Castle", xp: 200, progress: 0, icon: "castle", color: "text-[#0F2A8A]" },
              ].map((mission, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 flex items-center gap-4 hover:border-[#F5B21B] transition-colors cursor-pointer group">
                  <div className={`w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform ${mission.color}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{mission.progress === 100 ? 'check_circle' : mission.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[#0F2A8A] text-sm leading-tight">{mission.title}</span>
                      <span className="text-xs font-black text-[#F5B21B] bg-[#F5B21B]/10 px-2 py-0.5 rounded-full">+{mission.xp} XP</span>
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${mission.progress === 100 ? 'bg-emerald-400' : 'bg-sky-400'}`} style={{ width: `${mission.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leo Adventure Progress */}
          <div className="bg-[#0F2A8A] text-white p-6 rounded-[40px] shadow-2xl border-4 border-[#0F2A8A] relative overflow-hidden">
            {/* Background pattern */}
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-white/5 font-light pointer-events-none">monitoring</span>
            
            <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5B21B] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>bar_chart</span>
              Adventure Progress
            </h3>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-all cursor-default">
                <span className="material-symbols-outlined text-[#F5B21B] text-[32px] mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-3xl font-black">{xp}</span>
                <span className="text-xs font-bold text-blue-200 uppercase tracking-widest mt-1">XP Points</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-all cursor-default">
                <span className="material-symbols-outlined text-orange-400 text-[32px] mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <span className="text-3xl font-black">{streak}</span>
                <span className="text-xs font-bold text-blue-200 uppercase tracking-widest mt-1">Daily Streak</span>
              </div>
            </div>
          </div>

          {/* Leo's Treasure Chest */}
          <div className="bg-gradient-to-br from-[#F5B21B] to-orange-400 p-6 rounded-[40px] shadow-[0_10px_30px_rgba(245,178,27,0.4)] border-4 border-white relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform" onClick={triggerConfetti}>
            {isUnlocked && (
              <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none"></div>
            )}
            <h3 className="text-2xl font-black text-[#0F2A8A] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{isUnlocked ? 'lock_open' : 'lock'}</span>
              Leo's Treasure Chest
            </h3>
            
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center text-4xl shadow-sm border-2 border-white">
                  👑
                </div>
                <div>
                  <h4 className="font-bold text-[#0F2A8A] leading-tight">Golden Crown</h4>
                  <p className="text-xs font-bold text-[#F5B21B]">Avatar Accessory</p>
                </div>
              </div>
              {isUnlocked ? (
                <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-black">Unlocked!</span>
              ) : (
                <button className="bg-[#0F2A8A] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-[0_4px_0_#061342] active:translate-y-1 active:shadow-none transition-all">
                  Claim
                </button>
              )}
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
