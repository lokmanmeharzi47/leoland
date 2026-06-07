"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CourseBuilderPage() {
  const [activeItem, setActiveItem] = useState("lesson-1.1");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newType, setNewType] = useState("STORY");
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [xpMultiplier, setXpMultiplier] = useState(1.5);
  const [coinReward, setCoinReward] = useState(250);
  const [toast, setToast] = useState<string | null>(null);

  const [activities, setActivities] = useState([
    { 
      id: 1, 
      type: "STORY", 
      level: "LEVEL 1", 
      xp: "", 
      title: "Morning Introduction", 
      desc: "An interactive story where Leo meets a new friend in the park.", 
      bg: "bg-amber-500/10 text-amber-500", 
      icon: "auto_stories" 
    },
    { 
      id: 2, 
      type: "GAME", 
      level: "", 
      xp: "15 XP", 
      title: "Greeting Match-up", 
      desc: "Drag and drop game to match greetings with their visual context.", 
      bg: "bg-purple-500/10 text-purple-500 dark:text-purple-400", 
      icon: "sports_esports" 
    },
    { 
      id: 3, 
      type: "QUIZ", 
      level: "", 
      xp: "", 
      title: "Checkpoint Quiz", 
      desc: "5 Multiple choice questions on formal vs informal goodbyes.", 
      bg: "bg-red-500/10 text-red-500", 
      icon: "quiz" 
    },
    { 
      id: 4, 
      type: "SPEAKING", 
      level: "AI ASSIST", 
      xp: "", 
      title: "Pronunciation Lab", 
      desc: "Voice recognition activity focused on 'Good morning' nasal sounds.", 
      bg: "bg-blue-500/10 text-blue-500 dark:text-blue-400", 
      icon: "mic" 
    }
  ]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    let bg = "bg-blue-500/10 text-blue-500";
    let icon = "article";
    let xp = "";
    let level = "";

    if (newType === "STORY") {
      bg = "bg-amber-500/10 text-amber-500";
      icon = "auto_stories";
      level = "LEVEL 1";
    } else if (newType === "GAME") {
      bg = "bg-purple-500/10 text-purple-500";
      icon = "sports_esports";
      xp = "20 XP";
    } else if (newType === "QUIZ") {
      bg = "bg-red-500/10 text-red-500";
      icon = "quiz";
    } else if (newType === "SPEAKING") {
      bg = "bg-blue-500/10 text-blue-500";
      icon = "mic";
      level = "AI ASSIST";
    }

    const newAct = {
      id: Date.now(),
      type: newType,
      level,
      xp,
      title: newTitle,
      desc: newDesc || "No description provided.",
      bg,
      icon
    };

    setActivities([...activities, newAct]);
    setNewTitle("");
    setNewDesc("");
    setShowAddModal(false);
    triggerToast(`Activity "${newTitle}" added successfully!`);
  };

  const startEdit = (act: any) => {
    setEditingId(act.id);
    setEditTitle(act.title);
    setEditDesc(act.desc);
  };

  const saveEdit = (id: number) => {
    setActivities(activities.map(act => act.id === id ? { ...act, title: editTitle, desc: editDesc } : act));
    setEditingId(null);
    triggerToast("Changes saved!");
  };

  const deleteActivity = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setActivities(activities.filter(act => act.id !== id));
      triggerToast(`Deleted "${title}"`);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-140px)] gap-6">
      
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

      {/* Left Pane: Curriculum Tree */}
      <motion.aside variants={fadeInUp} className="w-full lg:w-80 h-[450px] lg:h-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-outline-variant/30 rounded-2xl flex flex-col overflow-hidden shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
        <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/30 dark:bg-zinc-800/20">
          <div className="flex items-center justify-between mb-3">
            <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">CURRICULUM TREE</span>
            <button className="p-1 hover:bg-surface-container-highest rounded text-on-surface-variant material-symbols-outlined text-[18px]">more_vert</button>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => triggerToast("New Unit Creator opened!")}
              className="flex-1 py-1.5 px-3 bg-white dark:bg-zinc-800 border border-outline-variant text-[12px] font-bold rounded-lg flex items-center justify-center gap-1.5 hover:bg-surface-container dark:hover:bg-zinc-750 transition-all text-on-surface"
            >
              <span className="material-symbols-outlined text-[14px]">add</span> Unit
            </button>
            <button 
              onClick={() => triggerToast("New Lesson Creator opened!")}
              className="flex-1 py-1.5 px-3 bg-white dark:bg-zinc-800 border border-outline-variant text-[12px] font-bold rounded-lg flex items-center justify-center gap-1.5 hover:bg-surface-container dark:hover:bg-zinc-750 transition-all text-on-surface"
            >
              <span className="material-symbols-outlined text-[14px]">add</span> Lesson
            </button>
          </div>
        </div>

        {/* Tree Structure */}
        <div className="flex-1 overflow-y-auto p-2" style={{ scrollbarWidth: 'thin' }}>
          {/* Course Level */}
          <details className="group mb-1" open>
            <summary className="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors list-none">
              <span className="material-symbols-outlined text-primary dark:text-blue-400 group-open:rotate-90 transition-transform duration-200 text-[20px]">chevron_right</span>
              <span className="material-symbols-outlined text-secondary dark:text-amber-500 text-[20px]">language</span>
              <span className="font-body-md font-bold text-on-surface">English (US)</span>
            </summary>
            
            <div className="ml-5 space-y-1 mt-1 border-l-2 border-surface-container-highest dark:border-zinc-800 pl-2">
              {/* Level */}
              <details className="group/level" open>
                <summary className="flex items-center gap-2 p-2 hover:bg-surface-container dark:hover:bg-zinc-800 rounded-lg cursor-pointer list-none">
                  <span className="material-symbols-outlined text-on-surface-variant group-open/level:rotate-90 transition-transform text-[18px]">chevron_right</span>
                  <span className="font-body-sm font-bold text-on-surface">Level 1: Beginner</span>
                </summary>
                
                <div className="ml-3 space-y-1 mt-1">
                  {/* Unit */}
                  <details className="group/unit" open>
                    <summary className="flex items-center gap-2 p-2 bg-primary/5 dark:bg-blue-500/5 border border-primary/10 dark:border-blue-500/10 rounded-lg cursor-pointer list-none">
                      <span className="material-symbols-outlined text-primary dark:text-blue-400 group-open/unit:rotate-90 transition-transform text-[18px]">chevron_right</span>
                      <span className="material-symbols-outlined text-primary-container dark:text-blue-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                      <span className="font-body-sm font-bold text-primary dark:text-blue-400">Unit 1: Greetings</span>
                    </summary>
                    
                    <div className="ml-4 space-y-1 mt-1 pl-1">
                      <div 
                        onClick={() => setActiveItem("lesson-1.1")}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer group/lesson transition-all ${
                          activeItem === "lesson-1.1" 
                            ? "bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 font-bold" 
                            : "hover:bg-surface-container dark:hover:bg-zinc-800 text-on-surface-variant"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-on-surface-variant opacity-30 text-[16px]">drag_indicator</span>
                          <span className="material-symbols-outlined text-[18px]">article</span>
                          <span className="font-body-sm">Lesson 1.1: Hello...</span>
                        </div>
                        <span className="material-symbols-outlined text-[16px] text-success" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                      
                      <div 
                        onClick={() => setActiveItem("lesson-1.2")}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer group/lesson transition-all ${
                          activeItem === "lesson-1.2" 
                            ? "bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 font-bold" 
                            : "hover:bg-surface-container dark:hover:bg-zinc-800 text-on-surface-variant"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-on-surface-variant opacity-30 text-[16px]">drag_indicator</span>
                          <span className="material-symbols-outlined text-[18px]">article</span>
                          <span className="font-body-sm">Lesson 1.2: Names</span>
                        </div>
                        <span className="material-symbols-outlined text-[16px] text-outline opacity-40">circle</span>
                      </div>
                    </div>
                  </details>
                </div>
              </details>
            </div>
          </details>
        </div>

        {/* Version Info */}
        <div className="p-4 bg-surface-container-low dark:bg-zinc-800/30 border-t border-outline-variant/30 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-[9px] text-on-surface-variant uppercase">Current Build</span>
              <span className="font-data-mono text-[11px] font-bold text-secondary dark:text-amber-500">Version History (v2.4)</span>
            </div>
            <button 
              onClick={() => triggerToast("Reverted to version history snapshot")}
              className="p-2 hover:bg-surface-container-highest dark:hover:bg-zinc-750 rounded-full transition-colors text-on-surface-variant"
              title="Restore"
            >
              <span className="material-symbols-outlined text-[18px]">restore</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Right Pane: Main Editor Canvas */}
      <motion.section variants={fadeInUp} className="flex-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl flex flex-col overflow-hidden border border-outline-variant/30 shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
        {/* Canvas Toolbar */}
        <div className="h-16 px-6 border-b border-outline-variant/20 flex items-center justify-between bg-white/50 dark:bg-zinc-900/50 z-10">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-md text-headline-md text-text-main">
              {activeItem === "lesson-1.1" ? "Unit 1: Greetings" : "Unit 1: Intermediate Names"}
            </h2>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary dark:text-blue-400 dark:bg-blue-500/10 rounded text-[9px] font-bold uppercase tracking-wider">Draft</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => triggerToast("Opening Live Simulator Student Preview...")}
              className="px-4 py-2 bg-surface-container-low dark:bg-zinc-800 text-on-surface font-semibold rounded-xl flex items-center gap-2 hover:bg-surface-container-high dark:hover:bg-zinc-750 text-xs transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Preview as Student</span>
            </button>
            <div className="w-[1px] h-6 bg-outline-variant/40 mx-1"></div>
            <button 
              onClick={() => triggerToast("Changes Published to CDN!")}
              className="px-5 py-2 bg-primary dark:bg-blue-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Publish Changes
            </button>
          </div>
        </div>

        {/* Activity Grid/Editor */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8" style={{ scrollbarWidth: 'thin' }}>
          {/* Lesson Header */}
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
            <div>
              <h3 className="font-headline-md text-headline-sm text-text-main">
                {activeItem === "lesson-1.1" ? "Lesson 1.1: Hello & Goodbye" : "Lesson 1.2: Introducing Names"}
              </h3>
              <p className="text-on-surface-variant font-body-sm mt-1">
                {activeItem === "lesson-1.1" 
                  ? "Focus: Introduction, formal greetings, and farewell phrases."
                  : "Focus: Asking for names, responding politely, and basic sentence construction."
                }
              </p>
            </div>
            <button 
              onClick={() => triggerToast("Opening Lesson Rule Editor...")}
              className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant/80 rounded-lg hover:bg-surface-container dark:hover:bg-zinc-800 text-on-surface-variant text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span className="font-label-caps text-xs">Lesson Rules</span>
            </button>
          </div>

          {/* Bento Grid of Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {activities.map((act) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={act.id} 
                  className="bg-white dark:bg-zinc-900/50 border border-outline-variant/80 dark:border-zinc-800/80 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all relative flex flex-col h-64 overflow-hidden group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${act.bg}`}>
                      <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{act.icon}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => deleteActivity(act.id, act.title)}
                        className="material-symbols-outlined text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity text-[18px]"
                        title="Delete"
                      >
                        delete
                      </button>
                      <button className="material-symbols-outlined text-on-surface-variant opacity-40 hover:opacity-100 cursor-grab text-[18px]">drag_handle</button>
                    </div>
                  </div>

                  {editingId === act.id ? (
                    <div className="flex-1 flex flex-col gap-2 z-10">
                      <input 
                        type="text" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)} 
                        className="w-full text-sm font-bold bg-surface-container-low border border-outline-variant rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-primary text-on-surface"
                      />
                      <textarea 
                        value={editDesc} 
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full text-xs bg-surface-container-low border border-outline-variant rounded-md px-2 py-1 flex-1 resize-none outline-none focus:ring-1 focus:ring-primary text-on-surface"
                        rows={2}
                      />
                      <div className="flex justify-end gap-2 mt-1">
                        <button onClick={() => setEditingId(null)} className="px-2.5 py-1 border border-outline-variant rounded-md text-[10px] font-bold text-on-surface hover:bg-surface-container">Cancel</button>
                        <button onClick={() => saveEdit(act.id)} className="px-2.5 py-1 bg-primary text-white rounded-md text-[10px] font-bold shadow-sm">Save</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-headline-sm text-text-main mb-1 text-[18px] font-bold leading-snug">{act.title}</h4>
                      <p className="text-on-surface-variant text-xs leading-relaxed flex-1">{act.desc}</p>
                      
                      <div className="mt-4 flex items-center justify-between relative z-10">
                        <div className="flex gap-1.5">
                          <span className="px-2 py-0.5 bg-surface-container-high dark:bg-zinc-800 rounded text-[9px] font-bold text-on-surface-variant uppercase">{act.type}</span>
                          {act.level && (
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-[9px] font-bold">{act.level}</span>
                          )}
                          {act.xp && (
                            <span className="px-2 py-0.5 bg-purple-500/10 text-purple-500 rounded text-[9px] font-bold">{act.xp}</span>
                          )}
                        </div>
                        <span 
                          onClick={() => startEdit(act)}
                          className="text-primary dark:text-blue-400 font-bold text-xs cursor-pointer hover:underline"
                        >
                          Edit Activity
                        </span>
                      </div>
                    </>
                  )}

                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/2 rounded-full blur-2xl group-hover:bg-primary/5 transition-colors"></div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add New Placeholder */}
            <button 
              onClick={() => setShowAddModal(true)}
              className="border-2 border-dashed border-outline-variant/60 dark:border-zinc-800 rounded-2xl p-6 h-64 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 dark:hover:bg-blue-500/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-surface-container dark:bg-zinc-800 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary dark:group-hover:text-blue-400">add</span>
              </div>
              <span className="font-bold text-on-surface-variant group-hover:text-primary dark:group-hover:text-blue-400 text-sm">Add New Activity</span>
            </button>
          </div>

          {/* XP / Gamification Summary Card */}
          <div className="bg-surface-container-low dark:bg-zinc-900/30 border border-outline-variant/50 rounded-2xl p-8 flex flex-col xl:flex-row items-center justify-between gap-8">
            <div className="flex-1 w-full">
              <h4 className="font-headline-md text-headline-sm text-text-main mb-2">Lesson Gamification Settings</h4>
              <p className="text-on-surface-variant text-body-sm max-w-[32rem] mb-6">Adjust the reward balance for this lesson. High difficulty should yield more coins and XP to encourage student engagement.</p>
              
              <div className="flex flex-col sm:flex-row items-center gap-8 w-full">
                <div className="flex-1 w-full space-y-2">
                  <div className="flex justify-between font-label-caps text-[10px] font-bold">
                    <span className="text-on-surface-variant">XP MULTIPLIER</span>
                    <span className="text-secondary dark:text-amber-400">{xpMultiplier.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={xpMultiplier}
                    onChange={(e) => setXpMultiplier(Number(e.target.value))}
                    className="w-full accent-secondary h-1.5 bg-surface-container dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 font-label-caps text-[8px] text-outline">
                    <span>1.0x</span>
                    <span>3.0x</span>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="flex justify-between font-label-caps text-[10px] font-bold">
                    <span className="text-on-surface-variant">COIN REWARD</span>
                    <span className="text-purple-500">{coinReward}</span>
                  </div>
                  <input 
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={coinReward}
                    onChange={(e) => setCoinReward(Number(e.target.value))}
                    className="w-full accent-purple-500 h-1.5 bg-surface-container dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 font-label-caps text-[8px] text-outline">
                    <span>50 COINS</span>
                    <span>500 COINS</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-48 aspect-square bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-outline-variant/50 p-4 flex flex-col items-center justify-center text-center flex-shrink-0">
              <span className="material-symbols-outlined text-secondary dark:text-amber-500 text-[48px] mb-2">trending_up</span>
              <p className="font-label-caps text-[9px] text-on-surface-variant mb-1 font-bold">TOTAL UNIT XP</p>
              <p className="font-display-lg text-headline-lg text-text-main">1,450</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Add Activity Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed inset-0 m-auto w-[450px] h-fit max-h-[90vh] bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/50 rounded-2xl shadow-2xl p-6 z-50 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-sm text-text-main font-bold">Create Activity</h3>
                <button 
                  onClick={() => setShowAddModal(false)} 
                  className="material-symbols-outlined text-on-surface-variant hover:text-on-surface rounded-full p-1 hover:bg-surface-container"
                >
                  close
                </button>
              </div>

              <form onSubmit={handleAddActivity} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Activity Type</label>
                  <select 
                    value={newType} 
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant rounded-lg text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="STORY">Story</option>
                    <option value="GAME">Game</option>
                    <option value="QUIZ">Quiz</option>
                    <option value="SPEAKING">Speaking Exercise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Activity Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Greeting Match-up" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant rounded-lg text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Description</label>
                  <textarea 
                    placeholder="Describe the activity..." 
                    value={newDesc} 
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant rounded-lg text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-outline-variant rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-primary text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Add Activity
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
