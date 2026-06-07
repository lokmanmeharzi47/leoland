"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LessonBuilderPage() {
  const [toast, setToast] = useState<string | null>(null);
  
  // Canvas Blocks List State
  const [blocks, setBlocks] = useState<any[]>([
    { 
      id: "b1", 
      type: "heading", 
      title: "Meet Leo", 
      subtitle: "Welcome to your first lesson in LeoLand! Let's get to know our friend Leo." 
    },
    { 
      id: "b2", 
      type: "image", 
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPqZJJQQfC6kNUOeBmYbksmKFtN42DWZB8E98RuuHQQt7vUmRzN6B1W1QAuL8xF8S33mAqYXAJ3hkKr3rq1ctZibixaFW9fZRJmfP_xhQIFXAV-wHq_P5s4JmYSYzY3_PH3xyu1WWjwgH7kzH1EDfd_yMno5iAlANEst-wUxru14MbMNzs5JvTN1y8XjMuTI-4Q9Xypfsi_O0xzcSH3b7JPpX_R2tUus7vLkcfr_SdP1G7Q-8waJe0TAPLrwUzMTfd1RsUbBz4Qa03", 
      caption: '"Hi, I\'m Leo! I\'ll be your guide through the English language."' 
    },
    { 
      id: "b3", 
      type: "quiz", 
      question: "What animal is Leo?", 
      options: [
        { text: "A Tiger", correct: false }, 
        { text: "A Lion", correct: true }, 
        { text: "A Bear", correct: false }
      ], 
      xp: 50, 
      shuffle: true, 
      attempts: false,
      feedback: "Well done! You found Leo."
    }
  ]);

  const [activeBlockId, setActiveBlockId] = useState<string>("b3");

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const activeBlock = blocks.find(b => b.id === activeBlockId);

  // Update specific values in active block
  const updateBlock = (updated: any) => {
    setBlocks(blocks.map(b => b.id === activeBlockId ? { ...b, ...updated } : b));
  };

  // Add block to canvas
  const addBlock = (type: string) => {
    let newBlockObj: any = { id: `b-${Date.now()}`, type };
    if (type === "heading") {
      newBlockObj.title = "New Title";
      newBlockObj.subtitle = "Insert subtitle text here.";
    } else if (type === "image") {
      newBlockObj.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuCPqZJJQQfC6kNUOeBmYbksmKFtN42DWZB8E98RuuHQQt7vUmRzN6B1W1QAuL8xF8S33mAqYXAJ3hkKr3rq1ctZibixaFW9fZRJmfP_xhQIFXAV-wHq_P5s4JmYSYzY3_PH3xyu1WWjwgH7kzH1EDfd_yMno5iAlANEst-wUxru14MbMNzs5JvTN1y8XjMuTI-4Q9Xypfsi_O0xzcSH3b7JPpX_R2tUus7vLkcfr_SdP1G7Q-8waJe0TAPLrwUzMTfd1RsUbBz4Qa03";
      newBlockObj.caption = "Double click to write description";
    } else if (type === "quiz") {
      newBlockObj.question = "Enter Question?";
      newBlockObj.options = [
        { text: "Choice A", correct: true },
        { text: "Choice B", correct: false }
      ];
      newBlockObj.xp = 40;
      newBlockObj.shuffle = false;
      newBlockObj.attempts = true;
      newBlockObj.feedback = "Good job!";
    } else if (type === "audio") {
      newBlockObj.audioUrl = "#";
      newBlockObj.caption = "Voice Prompt: Repeat after me";
    } else if (type === "speaking") {
      newBlockObj.phrase = "Good Morning";
      newBlockObj.difficulty = "Beginner";
    } else {
      newBlockObj.type = "text";
      newBlockObj.content = "New text section details.";
    }

    setBlocks([...blocks, newBlockObj]);
    setActiveBlockId(newBlockObj.id);
    triggerToast(`Added ${type.toUpperCase()} block to canvas!`);
  };

  // Remove block
  const deleteBlock = (id: string) => {
    if (confirm("Remove this block from canvas?")) {
      const remaining = blocks.filter(b => b.id !== id);
      setBlocks(remaining);
      if (activeBlockId === id && remaining.length > 0) {
        setActiveBlockId(remaining[remaining.length - 1].id);
      }
      triggerToast("Block removed");
    }
  };

  // Render properties panel dynamically
  const renderProperties = () => {
    if (!activeBlock) {
      return <p className="text-xs text-on-surface-variant font-semibold text-center mt-8">Select a canvas block to view configuration settings.</p>;
    }

    if (activeBlock.type === "heading") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase">Title Size</label>
            <select className="w-full px-3 py-2 bg-surface dark:bg-zinc-800 border border-outline-variant/40 rounded-xl text-xs text-on-surface outline-none">
              <option>Display Large (Default)</option>
              <option>Headline Large</option>
              <option>Headline Medium</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase">Inline Styling</label>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-surface dark:bg-zinc-800 hover:bg-surface-container border border-outline-variant/40 rounded-xl font-bold text-xs">Bold</button>
              <button className="flex-1 py-2 bg-surface dark:bg-zinc-800 hover:bg-surface-container border border-outline-variant/40 rounded-xl font-bold text-xs">Italic</button>
            </div>
          </div>
        </div>
      );
    }

    if (activeBlock.type === "image") {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase">Caption Text</label>
            <input 
              type="text" 
              value={activeBlock.caption} 
              onChange={(e) => updateBlock({ caption: e.target.value })}
              className="w-full px-3 py-2 bg-surface dark:bg-zinc-850 border border-outline-variant/40 rounded-xl text-xs text-on-surface outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase">Alt Description</label>
            <input 
              type="text" 
              placeholder="Mascot showing greetings"
              className="w-full px-3 py-2 bg-surface dark:bg-zinc-850 border border-outline-variant/40 rounded-xl text-xs text-on-surface outline-none"
            />
          </div>
        </div>
      );
    }

    if (activeBlock.type === "quiz") {
      return (
        <div className="space-y-6">
          {/* Score Settings */}
          <div className="space-y-4">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Points & XP</label>
            <div className="p-4 bg-surface dark:bg-zinc-800/20 border border-outline-variant/40 rounded-xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface font-semibold">Correct Answer XP</span>
                <span className="font-data-mono text-secondary dark:text-amber-400 font-bold">+{activeBlock.xp} XP</span>
              </div>
              <input 
                type="range"
                max="200" 
                min="0" 
                step="10"
                value={activeBlock.xp}
                onChange={(e) => updateBlock({ xp: Number(e.target.value) })}
                className="w-full h-1.5 bg-surface-container-high dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-secondary" 
              />
            </div>
          </div>

          {/* Interaction Logic */}
          <div className="space-y-4">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Behavior</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group select-none text-xs">
                <input 
                  type="checkbox" 
                  checked={activeBlock.shuffle}
                  onChange={(e) => updateBlock({ shuffle: e.target.checked })}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary" 
                />
                <span className="text-on-surface">Shuffle answer order</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group select-none text-xs">
                <input 
                  type="checkbox" 
                  checked={activeBlock.attempts}
                  onChange={(e) => updateBlock({ attempts: e.target.checked })}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary" 
                />
                <span className="text-on-surface">Allow multiple attempts</span>
              </label>
            </div>
          </div>

          {/* Multimedia Feedback */}
          <div className="space-y-4">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Success Feedback</label>
            <div className="space-y-2">
              <div className="relative">
                <textarea 
                  value={activeBlock.feedback}
                  onChange={(e) => updateBlock({ feedback: e.target.value })}
                  className="w-full p-3 bg-surface dark:bg-zinc-800/30 rounded-xl border border-outline-variant/40 text-xs focus:ring-2 focus:ring-primary outline-none resize-none text-on-surface" 
                  rows={2} 
                />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <button onClick={() => triggerToast("Inserted satisfied emoji")} className="p-1 text-outline-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span></button>
                  <button onClick={() => triggerToast("Added sound effect clip")} className="p-1 text-outline-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[16px]">graphic_eq</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <p className="text-xs text-on-surface-variant font-bold uppercase">Properties ({activeBlock.type})</p>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-on-surface-variant">Configure details</label>
          <input 
            type="text" 
            placeholder="Property value"
            className="w-full px-3 py-2 bg-surface dark:bg-zinc-850 border border-outline-variant/40 rounded-xl text-xs outline-none"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface font-body-md text-on-surface w-full h-[calc(100vh-140px)] flex flex-col rounded-2xl overflow-hidden border border-outline-variant/30 shadow-md relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-50 bg-zinc-900 text-white px-5 py-3 rounded-xl shadow-xl border border-zinc-700 text-xs font-bold flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-green-400 text-[18px]">check_circle</span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <header className="w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-outline-variant/20 flex justify-between items-center h-[64px] px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => triggerToast("Collapsing panel layout")} className="p-2 hover:bg-surface-container dark:hover:bg-zinc-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">menu</span>
          </button>
          <nav className="flex items-center space-x-2 text-xs font-semibold text-on-surface-variant">
            <span className="font-label-caps text-[10px]">English</span>
            <span className="text-outline-variant font-bold text-[10px]">/</span>
            <span className="font-label-caps text-[10px]">Level 1</span>
            <span className="text-outline-variant font-bold text-[10px]">/</span>
            <span className="font-label-caps text-[10px]">Unit 2</span>
            <span className="text-outline-variant font-bold text-[10px]">/</span>
            <span className="font-label-caps text-primary dark:text-blue-400 font-bold text-[10px]">New Lesson</span>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-success">
            <span className="material-symbols-outlined text-[18px]">cloud_done</span>
            <span className="font-label-caps text-[9px] uppercase font-bold">All changes saved</span>
          </div>
          <div className="h-6 w-px bg-outline-variant/40 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <button onClick={() => triggerToast("Simulating Student Interactive Canvas...")} className="px-4 py-2 border border-outline-variant/80 dark:border-zinc-800 rounded-xl font-label-caps text-[10px] text-on-surface font-bold hover:bg-surface-container-low dark:hover:bg-zinc-800 transition-all">Preview</button>
            <button onClick={() => triggerToast("Lesson successfully published!")} className="px-5 py-2 bg-gradient-to-b from-[#004ac6] to-[#003ea8] dark:from-blue-600 dark:to-blue-700 text-white rounded-xl font-label-caps text-[10px] font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Publish</button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden bg-surface dark:bg-zinc-950/20">
        
        {/* Left Toolset: Content Blocks */}
        <aside className="w-20 bg-white dark:bg-zinc-900 border-r border-outline-variant/20 flex flex-col items-center py-6 gap-6 z-30 shrink-0">
          <div className="flex flex-col gap-3">
            <button onClick={() => addBlock("heading")} className="group flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-primary/5 dark:hover:bg-blue-500/10 transition-all" title="Text Block">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container dark:bg-zinc-800 text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">title</span>
              </div>
              <span className="text-[9px] font-bold text-outline uppercase tracking-wider group-hover:text-primary dark:group-hover:text-blue-400">Text</span>
            </button>
            
            <button onClick={() => addBlock("image")} className="group flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-primary/5 dark:hover:bg-blue-500/10 transition-all" title="Image Block">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container dark:bg-zinc-800 text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">image</span>
              </div>
              <span className="text-[9px] font-bold text-outline uppercase tracking-wider group-hover:text-primary dark:group-hover:text-blue-400">Image</span>
            </button>

            <button onClick={() => addBlock("audio")} className="group flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-primary/5 dark:hover:bg-blue-500/10 transition-all" title="Audio Block">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container dark:bg-zinc-800 text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">mic</span>
              </div>
              <span className="text-[9px] font-bold text-outline uppercase tracking-wider group-hover:text-primary dark:group-hover:text-blue-400">Audio</span>
            </button>

            <button onClick={() => addBlock("quiz")} className="group flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-primary/5 dark:hover:bg-blue-500/10 transition-all" title="Quiz Block">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container dark:bg-zinc-800 text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">quiz</span>
              </div>
              <span className="text-[9px] font-bold text-outline uppercase tracking-wider group-hover:text-primary dark:group-hover:text-blue-400">Quiz</span>
            </button>

            <button onClick={() => addBlock("speaking")} className="group flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-primary/5 dark:hover:bg-blue-500/10 transition-all" title="Speaking Exercise">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container dark:bg-zinc-800 text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">record_voice_over</span>
              </div>
              <span className="text-[9px] font-bold text-outline uppercase tracking-wider group-hover:text-primary dark:group-hover:text-blue-400">Speak</span>
            </button>
          </div>

          <div className="mt-auto pb-2">
            <button onClick={() => triggerToast("More block templates coming soon!")} className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-dashed border-outline-variant text-outline-variant hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 overflow-y-auto bg-surface-container-low dark:bg-zinc-950/40 p-6 md:p-8 relative scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
          <div className="max-w-[700px] mx-auto min-h-full space-y-6 pb-24">
            
            {blocks.map((block) => {
              const isActive = block.id === activeBlockId;
              
              return (
                <div 
                  key={block.id}
                  onClick={() => setActiveBlockId(block.id)}
                  className={`group relative rounded-2xl p-6 md:p-8 transition-all cursor-pointer ${
                    isActive 
                      ? "bg-white dark:bg-zinc-900 border-2 border-primary dark:border-blue-500 ring-4 ring-primary/5 shadow-md"
                      : "bg-white dark:bg-zinc-900/40 border border-outline-variant/60 hover:border-primary/20 dark:hover:border-blue-500/20 shadow-[0_4px_20px_rgba(30,41,59,0.03)]"
                  }`}
                >
                  {/* Left Side Drag Handle */}
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-10">
                    <button className="p-1 text-outline-variant hover:text-primary" title="Drag"><span className="material-symbols-outlined text-[16px]">drag_indicator</span></button>
                  </div>

                  {/* Top-Right Badge indicator if Active */}
                  {isActive && (
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-primary dark:bg-blue-600 text-white rounded-full font-label-caps text-[9px] uppercase tracking-widest shadow-sm select-none">
                      Active: {block.type.toUpperCase()}
                    </div>
                  )}

                  {/* Render Heading Block */}
                  {block.type === "heading" && (
                    <div>
                      <input 
                        type="text" 
                        value={block.title}
                        onChange={(e) => updateBlock({ title: e.target.value })}
                        className="font-headline-lg text-headline-lg text-primary dark:text-blue-400 font-bold bg-transparent outline-none w-full border-b border-transparent focus:border-outline-variant/30 leading-snug"
                        placeholder="Meet Leo"
                      />
                      <input 
                        type="text" 
                        value={block.subtitle}
                        onChange={(e) => updateBlock({ subtitle: e.target.value })}
                        className="font-body-md text-on-surface-variant mt-2 bg-transparent outline-none w-full border-b border-transparent focus:border-outline-variant/30"
                        placeholder="Subtitle description"
                      />
                    </div>
                  )}

                  {/* Render Image Block */}
                  {block.type === "image" && (
                    <div className="flex flex-col items-center">
                      <div className="w-full h-56 rounded-xl overflow-hidden bg-surface-container-high dark:bg-zinc-800 relative">
                        <img alt="Canvas mascot" className="w-full h-full object-cover" src={block.src} />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button onClick={() => triggerToast("Change image placeholder clicked")} className="px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg font-label-caps text-[9px] font-bold flex items-center gap-1.5 text-primary dark:text-blue-400 shadow-lg border border-outline-variant/20">
                            <span className="material-symbols-outlined text-[16px]">cached</span> Replace Image
                          </button>
                        </div>
                      </div>
                      <input 
                        type="text" 
                        value={block.caption}
                        onChange={(e) => updateBlock({ caption: e.target.value })}
                        className="mt-4 text-center font-body-sm text-on-surface-variant italic bg-transparent outline-none w-full border-b border-transparent focus:border-outline-variant/30"
                        placeholder="Image Caption"
                      />
                    </div>
                  )}

                  {/* Render Quiz Block */}
                  {block.type === "quiz" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="font-label-caps text-[9px] font-bold text-primary dark:text-blue-400 uppercase tracking-wider">Question</span>
                        <input 
                          type="text" 
                          value={block.question}
                          onChange={(e) => updateBlock({ question: e.target.value })}
                          className="font-headline-md text-headline-sm text-on-surface bg-transparent outline-none w-full border-b border-transparent focus:border-outline-variant/30 font-bold"
                          placeholder="What animal is Leo?"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2.5">
                        {block.options.map((opt: any, index: number) => (
                          <div 
                            key={index}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-colors ${
                              opt.correct 
                                ? "border-success bg-success/5 dark:bg-green-500/5 text-success font-bold" 
                                : "border-outline-variant/70 dark:border-zinc-800 bg-surface-container-low/50 dark:bg-zinc-800/20 text-on-surface-variant"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                              opt.correct 
                                ? "bg-success border-success text-white" 
                                : "border-outline-variant"
                            }`}>
                              {opt.correct && <span className="material-symbols-outlined text-[14px]">check</span>}
                            </div>
                            <input 
                              type="text"
                              value={opt.text}
                              onChange={(e) => {
                                const newOpts = [...block.options];
                                newOpts[index].text = e.target.value;
                                updateBlock({ options: newOpts });
                              }}
                              className="flex-1 bg-transparent outline-none border-b border-transparent focus:border-outline-variant/30 text-xs"
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                const newOpts = block.options.map((o: any, i: number) => ({ ...o, correct: i === index }));
                                updateBlock({ options: newOpts });
                                triggerToast(`Choice "${opt.text}" marked as correct!`);
                              }}
                              className={`p-1 rounded-md transition-colors ${opt.correct ? "text-success" : "text-outline hover:text-primary"}`}
                              title="Set Correct Option"
                            >
                              <span className="material-symbols-outlined text-[16px]">stars</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Render fallback simple block */}
                  {block.type !== "heading" && block.type !== "image" && block.type !== "quiz" && (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-sm">construction</span>
                        </div>
                        <div>
                          <p className="font-bold uppercase tracking-wider">{block.type} Block</p>
                          <p className="text-on-surface-variant">{block.caption || block.phrase || "Content configured in properties panel."}</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}

            {/* Drag Area Trigger */}
            <div className="flex items-center justify-center py-6 group">
              <div className="w-px h-12 bg-outline-variant/30 transition-all group-hover:h-16 group-hover:bg-primary/40"></div>
              <button 
                onClick={() => addBlock("quiz")}
                className="mx-6 w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-outline-variant/50 shadow-sm flex items-center justify-center text-outline hover:scale-110 hover:border-primary dark:hover:border-blue-500 hover:text-primary dark:hover:text-blue-400 hover:shadow-lg transition-all"
                title="Insert Block Below"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <div className="w-px h-12 bg-outline-variant/30 transition-all group-hover:h-16 group-hover:bg-primary/40"></div>
            </div>
            
          </div>
        </main>

        {/* Right Sidebar: Properties Panel */}
        <aside className="w-[320px] bg-white dark:bg-zinc-900 border-l border-outline-variant/20 flex flex-col z-30 shrink-0">
          <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between">
            <h3 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider">
              {activeBlock ? `${activeBlock.type} properties` : "Properties"}
            </h3>
            {activeBlock && (
              <button 
                onClick={() => deleteBlock(activeBlock.id)}
                className="p-1 hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 rounded transition-colors"
                title="Delete Block"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'thin' }}>
            {renderProperties()}
          </div>

          <div className="p-4 bg-surface-container-low dark:bg-zinc-950/40 border-t border-outline-variant/20 mt-auto">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:text-blue-400 shrink-0">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary dark:text-blue-400 uppercase">Leo AI Suggestion</p>
                <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">We suggest adding an audio recording component to help verify voice nasal pronunciation.</p>
              </div>
            </div>
            <button 
              onClick={() => {
                addBlock("audio");
                triggerToast("AI Suggestion applied!");
              }} 
              className="w-full py-2 bg-white dark:bg-zinc-800 border border-primary/20 hover:bg-primary hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-primary dark:text-blue-400 font-label-caps text-[9px] font-bold rounded-lg transition-all"
            >
              Apply Suggestion
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
