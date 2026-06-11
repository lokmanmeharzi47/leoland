"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Floaty, ChunkyButton } from "@/components/leo/ui";

export default function TalkWithLeoPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "leo" | "me" }[]>([
    { id: 1, text: "Bonjour, my friend! I missed you! What should we learn today?", sender: "leo" }
  ]);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const quickQuestions = [
    "How do I say 'Apple' in French?",
    "Tell me a joke!",
    "Let's practice counting to 10.",
  ];

  const handleSend = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender: "me" }]);
    
    // Simulate Leo's response
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "That is a great question! 'Apple' is 'Pomme'. Try saying it!", sender: "leo" }]);
      setShowEncouragement(true);
      setEarnedXP(xp => xp + 20);
      
      setTimeout(() => setShowEncouragement(false), 3000);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        handleSend("I am practicing my pronunciation!");
      }, 3000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F2A8A] leading-tight mb-2">Talk with Leo</h1>
        <p className="text-lg md:text-xl font-bold text-[#0F2A8A]/60">Practice languages with your best friend</p>
      </div>

      {/* Main Interaction Area */}
      <div className="bg-gradient-to-b from-[#E2F4FB] to-[#EAE6FF] rounded-[48px] border-4 border-white shadow-[0_20px_50px_rgba(15,42,138,0.15)] overflow-hidden relative min-h-[600px] flex flex-col">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
        <Floaty className="absolute top-10 left-10 text-5xl opacity-80 pointer-events-none" duration={6}>☁️</Floaty>
        <Floaty className="absolute top-20 right-16 text-4xl opacity-80 pointer-events-none" duration={5} delay={1}>☁️</Floaty>
        <Floaty className="absolute bottom-40 left-20 text-3xl opacity-80 pointer-events-none text-[#F5B21B]" duration={4} delay={2}>✨</Floaty>

        {/* Leo Avatar Area */}
        <div className="flex-1 flex flex-col items-center justify-end pb-8 relative z-10 pt-12">
          {/* Encouragement Popup */}
          <AnimatePresence>
            {showEncouragement && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="absolute top-8 bg-[#F5B21B] text-[#0F2A8A] px-6 py-3 rounded-full font-black text-lg shadow-[0_8px_0_#d97706] z-20 flex items-center gap-2"
              >
                <span className="text-2xl">🌟</span> Brilliant! +20 XP
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="w-full max-w-2xl px-6 flex flex-col gap-6 mb-8">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === "leo" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`p-5 rounded-[32px] max-w-[80%] shadow-lg text-lg font-bold leading-relaxed border-2 border-white ${
                    msg.sender === "leo" 
                      ? "bg-white text-[#0F2A8A] rounded-bl-sm" 
                      : "bg-[#0F2A8A] text-white rounded-br-sm"
                  }`}>
                    {msg.text}
                    {msg.sender === "leo" && (
                      <button className="mt-3 w-10 h-10 bg-blue-50 text-[#0F2A8A] rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors shadow-sm">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Big Leo Avatar */}
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 2, -2, 0]
            }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-[160px] md:text-[200px] leading-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.2)] select-none z-10"
          >
            🦁
          </motion.div>
          
          {/* Ground shadow for Leo */}
          <div className="w-48 h-8 bg-black/10 rounded-[100%] blur-md mt-[-20px] absolute bottom-12"></div>
        </div>

        {/* Interaction Bar */}
        <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-t-[48px] border-t-4 border-white shadow-[0_-10px_40px_rgba(15,42,138,0.1)] relative z-20 flex flex-col items-center">
          
          {/* Quick Questions */}
          <div className="flex gap-3 overflow-x-auto w-full pb-4 scrollbar-hide snap-x max-w-3xl">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="shrink-0 bg-blue-50 hover:bg-blue-100 text-[#0F2A8A] font-bold px-5 py-3 rounded-full border-2 border-blue-100 shadow-sm transition-all active:scale-95 text-sm md:text-base snap-center"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="w-full max-w-3xl flex items-center gap-4 mt-2">
            <button className="w-14 h-14 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all border-2 border-gray-200 shadow-sm shrink-0">
              <span className="material-symbols-outlined text-[28px]">keyboard</span>
            </button>
            
            <button 
              onClick={toggleRecording}
              className={`flex-1 h-20 sm:h-24 rounded-[36px] flex items-center justify-center gap-4 font-black text-xl sm:text-2xl transition-all shadow-[0_8px_0_rgba(0,0,0,0.1)] border-4 border-white active:translate-y-2 active:shadow-none ${
                isRecording 
                  ? "bg-red-500 text-white shadow-[0_8px_0_#b91c1c] animate-pulse" 
                  : "bg-[#F5B21B] text-[#0F2A8A] shadow-[0_8px_0_#d97706]"
              }`}
            >
              <span className="material-symbols-outlined text-[36px] sm:text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isRecording ? 'stop' : 'mic'}
              </span>
              {isRecording ? "Listening..." : "Tap to Speak"}
            </button>
            
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex flex-col items-center justify-center border-2 border-emerald-200 shadow-sm shrink-0">
               <span className="font-black text-sm">{earnedXP}</span>
               <span className="text-[10px] font-bold">XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
