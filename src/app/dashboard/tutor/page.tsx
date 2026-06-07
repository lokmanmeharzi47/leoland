"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  sender: string;
  text: string;
  highlight?: string;
  feedback?: string;
};

export default function AITutorPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "leo",
      text: 'Roar! Hello there, explorer! Ready to practice some new words today? Try saying: "The adventurous lion loves exploring the safari."',
      highlight: '"The adventurous lion loves exploring the safari."',
    },
    {
      id: 2,
      sender: "student",
      text: "The adventurous lion loves exploring the safari.",
      feedback: "Great job!",
    },
    {
      id: 3,
      sender: "leo",
      text: 'Excellent! You\'re getting better every day. Your pronunciation of "adventurous" was perfect. Let\'s try one more!',
      highlight: '"adventurous"',
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      sender: "student",
      text: inputValue,
      feedback: "Processing...",
    }]);
    setInputValue("");
    
    // Simulate Leo's response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: "leo",
        text: "That was a good try! Let's practice that again.",
      }]);
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={staggerContainer}
      className="max-w-container-max mx-auto px-margin-mobile md:px-lg py-md lg:py-xl flex-grow w-full"
    >
      {/* Page Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between mb-lg">
        <div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Chat with Leo</h1>
          <p className="text-on-surface-variant font-body-lg">Practice your English pronunciation with Leo!</p>
        </div>
        <div className="hidden lg:block relative">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-container/20 rounded-full blur-2xl"></div>
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            alt="Leo the Lion mascot" 
            className="w-24 h-24 object-contain relative z-10 drop-shadow-xl" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmteVt2XdcVJNR1y_eNMwwA4mj3N2nabsSTHik9Rw5R8LO1dNwq3WjSfyi75dcHGWEMa-zAHaDHId6-w7wsrQgD7re7WOQhYugDun5L0FtoC8sBNcV2B7MszEU_Pk7Bk_6d_gOM1OmxoGbKxSwPNwnVdctqw3P4ZNhA4NxbE0aYMaJkZdwXxV-zJuUNjcUJBShVcrc-kZr0jE7CIY5x3ohv-gGjufViasjEfAdUyGBSCIDuvtD_3VIJR9UQaBtlsGjDp9pVS9LIbux"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Chat Interface (8 columns) */}
        <motion.div variants={fadeInUp} className="lg:col-span-8 flex flex-col gap-md">
          <div className="glass-card rounded-[2rem] h-[600px] flex flex-col shadow-[0_8px_32px_rgba(37,99,235,0.06)] overflow-hidden border border-outline-variant/10">
            {/* Chat Messages Area */}
            <div className="flex-grow p-md overflow-y-auto flex flex-col gap-md">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex gap-sm items-end max-w-[85%] ${msg.sender === 'student' ? 'self-end justify-end' : ''}`}
                  >
                    {msg.sender === 'leo' && (
                      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                      </div>
                    )}

                    <div className={`p-md rounded-2xl shadow-sm ${
                      msg.sender === 'leo' 
                        ? 'bg-white/80 rounded-bl-none border border-outline-variant/10' 
                        : 'bg-primary-container text-on-primary-container rounded-br-none'
                    }`}>
                      <p className={`font-body-md ${msg.sender === 'leo' ? 'text-on-surface' : ''}`}>
                        {msg.text}
                      </p>
                      
                      {msg.sender === 'leo' && (
                        <button className="mt-sm flex items-center gap-xs text-primary font-bold text-label-caps uppercase tracking-wider hover:opacity-80 transition-opacity active:scale-95">
                          <span className="material-symbols-outlined text-[18px]">volume_up</span>
                          Listen to Leo
                        </button>
                      )}

                      {msg.sender === 'student' && msg.feedback && (
                        <div className="mt-xs flex items-center gap-xs opacity-80 text-xs">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          {msg.feedback}
                        </div>
                      )}
                    </div>

                    {msg.sender === 'student' && (
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                        <img alt="Student avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASgkA_eeG185xLST_eRhTbwzLOCYFivLR6M4r-lf1wRJ88nGGuflqwg4ws5Bvw3MQ_Izs-ahyetG-HXSsmyDdFGOivWbWGeq9NZCu0roYvPA2NNBsZc8btY45UvPmYn1k6k_MrsibOdyUrl07Wi_KZotPMPDUJrkv9Q5I8DsxzvRZymo7toFdzpnBavtPQL2ChjUDVrxqOrazSTO-EulaeqMqMuazp9jDMjxYXwPPChQ8TlwCWOEvHgxv6903F5tLay0Xury0FKB67"/>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input Interaction Bar */}
            <form onSubmit={handleSendMessage} className="p-md bg-white/60 border-t border-outline-variant/10 flex items-center gap-md">
              <button type="button" className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-white transition-all active:scale-95">
                <span className="material-symbols-outlined">add</span>
              </button>
              <div className="relative flex-grow">
                <input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full h-12 bg-white border border-outline-variant/30 rounded-full px-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body-md" 
                  placeholder="Type a message..." 
                  type="text"
                />
              </div>
              <button 
                type="button"
                onClick={toggleRecording}
                className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all ${
                  isRecording 
                    ? 'bg-error text-white animate-pulse' 
                    : 'bg-secondary-container text-on-secondary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isRecording ? 'stop' : 'mic'}
                </span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Insights Panel (4 columns) */}
        <motion.aside variants={fadeInUp} className="lg:col-span-4 flex flex-col gap-gutter">
          {/* Score Card */}
          <div className="glass-card p-md rounded-[2rem] shadow-sm border border-outline-variant/10 hover:-translate-y-1 transition-transform">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-md">Pronunciation Score</h3>
            <div className="flex flex-col items-center justify-center py-md">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle className="text-surface-container-high stroke-current" cx="50" cy="50" fill="transparent" r="40" strokeWidth="8"></circle>
                  <motion.circle 
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (0.75 * 251.2) }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="text-primary stroke-current" 
                    cx="50" cy="50" fill="transparent" r="40" 
                    strokeDasharray="251.2" strokeLinecap="round" strokeWidth="8"
                  ></motion.circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-display-lg font-display-lg text-primary">75%</span>
                  <span className="text-label-caps font-label-caps text-on-surface-variant uppercase">Daily Goal</span>
                </div>
              </div>
              <p className="mt-md text-center text-on-surface-variant font-body-md">You're doing amazing! 5% more than yesterday.</p>
            </div>
          </div>

          {/* Words to Practice Card */}
          <div className="glass-card p-md rounded-[2rem] shadow-sm border border-outline-variant/10 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Words to Practice</h3>
              <span className="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-label-caps font-bold">Focus Area</span>
            </div>
            <div className="flex flex-wrap gap-sm">
              {['Safari', 'Exploring', 'Language', 'Thoroughly'].map((word) => (
                <div key={word} className="group flex items-center gap-xs bg-white/50 border border-outline-variant/10 px-md py-sm rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer">
                  <span className="font-ui-button text-ui-button">{word}</span>
                  <span className="material-symbols-outlined text-[18px] opacity-50 group-hover:opacity-100" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                </div>
              ))}
            </div>
            <button className="mt-lg w-full py-sm rounded-xl border-2 border-dashed border-outline-variant text-on-surface-variant font-ui-button hover:bg-surface-container-low transition-colors active:scale-95">
              Add Custom Word
            </button>
          </div>

          {/* Tips & Tricks */}
          <div className="bg-tertiary-container text-on-tertiary-container p-md rounded-[2rem] shadow-sm hover:-translate-y-1 transition-transform relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-sm mb-sm">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                <h4 className="font-bold">Leo's Pro Tip</h4>
              </div>
              <p className="font-body-md opacity-90">To say "Thoroughly" like a pro, focus on the soft 'th' sound at the start. Try resting your tongue against your front teeth!</p>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-10 rotate-12">
              <span className="material-symbols-outlined text-[100px]">auto_awesome</span>
            </div>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
}
