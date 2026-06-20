"use client";

import { useState } from "react";

export default function TalkWithLeoPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "leo" | "me" }[]>([
    { id: 1, text: "Bonjour, my friend! I missed you! What should we learn today?", sender: "leo" }
  ]);
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
      setEarnedXP(xp => xp + 20);
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
    <div className="w-full max-w-5xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            Talk with Leo <span className="text-4xl">🤖</span>
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Practice languages with your AI tutor.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg font-bold border border-emerald-100 dark:border-emerald-500/20">
          <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
          {earnedXP} XP Earned
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col flex-1 overflow-hidden relative">
        
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-zinc-900/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.sender === "leo" ? "justify-start" : "justify-end"}`}>
              <div className="flex gap-4 max-w-[80%] md:max-w-[70%]">
                {msg.sender === "leo" && (
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl shrink-0 border border-blue-200 dark:border-blue-800">
                    🦁
                  </div>
                )}
                
                <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.sender === "leo" 
                    ? "bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-slate-200 rounded-tl-sm" 
                    : "bg-blue-600 text-white rounded-tr-sm"
                }`}>
                  {msg.text}
                  {msg.sender === "leo" && (
                    <button className="mt-3 w-8 h-8 bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-zinc-600 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    </button>
                  )}
                </div>

                {msg.sender === "me" && (
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold shrink-0">
                    ME
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 shrink-0">
          
          {/* Quick Questions */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="shrink-0 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-full transition-colors text-sm border border-slate-200 dark:border-zinc-700"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors border border-slate-200 dark:border-zinc-700 shrink-0">
              <span className="material-symbols-outlined">keyboard</span>
            </button>
            
            <button 
              onClick={toggleRecording}
              className={`flex-1 h-16 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all border ${
                isRecording 
                  ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30 animate-pulse" 
                  : "bg-blue-600 hover:bg-blue-700 text-white border-transparent"
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {isRecording ? 'stop_circle' : 'mic'}
              </span>
              {isRecording ? "Listening..." : "Tap to Speak"}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
