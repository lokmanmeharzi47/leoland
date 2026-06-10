"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AIContentGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [difficulty, setDifficulty] = useState(3);
  const [topic, setTopic] = useState("The Solar System");
  const [language, setLanguage] = useState("English");
  const [ageGroup, setAgeGroup] = useState("9-12 Years");

  const [activeTab, setActiveTab] = useState<"lesson" | "quiz" | "story">("lesson");
  const [toast, setToast] = useState<string | null>(null);

  // Current states applied to generated content
  const [appliedTopic, setAppliedTopic] = useState("The Solar System");
  const [appliedLanguage, setAppliedLanguage] = useState("English");
  const [appliedDifficulty, setAppliedDifficulty] = useState(3);
  const [appliedAgeGroup, setAppliedAgeGroup] = useState("9-12 Years");

  const difficulties = ['Novice', 'Apprentice', 'Practitioner', 'Scholar', 'Architect'];
  const currentDiff = difficulties[difficulty - 1];
  const diffColor = difficulty > 3 ? "text-error" : "text-secondary dark:text-amber-400";

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAppliedTopic(topic || "The Universe");
      setAppliedLanguage(language);
      setAppliedDifficulty(difficulty);
      setAppliedAgeGroup(ageGroup);
      triggerToast("AI successfully generated new content!");
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

  // Content render helpers
  const renderLesson = () => (
    <div className="space-y-8">
      <section>
        <h4 className="font-headline-md text-headline-md text-main mb-4">Introduction</h4>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Welcome to an extraordinary voyage beyond our normal limits. Today, we'll explore the diverse features of <span className="text-primary dark:text-blue-400 font-bold">{appliedTopic}</span>. Designed specifically for the <span className="font-bold">{appliedAgeGroup}</span> age bracket, this lesson balances fundamental principles with engaging scientific facts using {appliedLanguage} vocabulary.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low dark:bg-zinc-800/40 p-6 rounded-2xl border-l-4 border-primary">
          <h5 className="font-bold text-primary dark:text-blue-400 mb-2">Key Learning Objective</h5>
          <p className="text-body-sm text-on-surface-variant">Understand the relative positioning, structure, and physical characteristics associated with {appliedTopic}.</p>
        </div>
        <div className="bg-surface-container-low dark:bg-zinc-800/40 p-6 rounded-2xl border-l-4 border-secondary dark:border-amber-500">
          <h5 className="font-bold text-secondary dark:text-amber-500 mb-2">Engagement Tip (Difficulty: {difficulties[appliedDifficulty - 1]})</h5>
          <p className="text-body-sm text-on-surface-variant">Ask students to describe what it would feel like to survive on a planet that orbits the center of {appliedTopic}.</p>
        </div>
      </section>

      <section>
        <h4 className="font-headline-md text-headline-md text-main mb-4">Core Concepts</h4>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center text-primary dark:text-blue-400 shrink-0">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <div>
              <p className="font-bold text-main">The Gravitational Anchor</p>
              <p className="text-body-md text-on-surface-variant">Every system within {appliedTopic} depends on a central force that holds orbits and trajectories together.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center text-primary dark:text-blue-400 shrink-0">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
            </div>
            <div>
              <p className="font-bold text-main">Composition & Structure</p>
              <p className="text-body-md text-on-surface-variant">Differentiate between rocky silicate structures and gaseous atmospheres that populate the outer rim of this ecosystem.</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );

  const renderQuiz = () => (
    <div className="space-y-8">
      <h4 className="font-headline-md text-headline-md text-main">Active Quiz: {appliedTopic} Checkpoint</h4>
      <p className="text-on-surface-variant text-body-md">5 questions designed to test knowledge of {appliedTopic} for {appliedAgeGroup} ({appliedLanguage}).</p>

      <div className="space-y-6">
        <div className="p-6 bg-surface-container-low dark:bg-zinc-800/20 border border-outline-variant/30 rounded-2xl">
          <p className="font-bold text-main mb-3">Q1: Which of the following best describes the core anchor of {appliedTopic}?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-zinc-900 border border-success/30 rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-success">check_circle</span>
              <span className="text-xs text-on-surface">The primary celestial body</span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 border border-outline-variant/30 rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-outline opacity-40">circle</span>
              <span className="text-xs text-on-surface-variant">The outer gas giants</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-surface-container-low dark:bg-zinc-800/20 border border-outline-variant/30 rounded-2xl">
          <p className="font-bold text-main mb-3">Q2: In {appliedLanguage}, how do you formulate the word "Atmosphere"?</p>
          <div className="p-3 bg-white dark:bg-zinc-900 border border-outline-variant/30 rounded-xl flex items-center gap-3 w-fit">
            <span className="material-symbols-outlined text-primary dark:text-blue-400">translate</span>
            <span className="text-xs font-semibold text-text-main font-data-mono">
              {appliedLanguage === "عربية" ? "la atmósfera" : appliedLanguage === "French" ? "l'atmosphère" : appliedLanguage === "German" ? "die Atmosphäre" : "the atmosphere"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStory = () => (
    <div className="space-y-8 leading-relaxed">
      <h4 className="font-headline-md text-headline-md text-main">Leo's Journey through {appliedTopic}</h4>
      <div className="space-y-4 text-body-lg text-on-surface-variant">
        <p>
          Leo the Lion strapped into his shiny golden rocket. "Today," he roared excitedly, "we are flying straight into <span className="font-bold text-primary dark:text-blue-400">{appliedTopic}</span>!"
        </p>
        <p>
          With a deafening WHOOSH, the ship rocketed past the clouds. As they traveled, Leo practiced his {appliedLanguage} direction terms: <strong>{appliedLanguage === "عربية" ? "¡Izquierda!" : appliedLanguage === "French" ? "Gauche!" : "Left!"}</strong> and <strong>{appliedLanguage === "عربية" ? "¡Derecha!" : appliedLanguage === "French" ? "Droite!" : "Right!"}</strong>.
        </p>
        <p>
          Suddenly, a friendly cosmic creature appeared. "Welcome!" it chimed. Leo smiled, knowing that learning about {appliedTopic} was going to be his greatest adventure yet.
        </p>
      </div>
    </div>
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full space-y-8 max-w-6xl mx-auto pb-8 relative">

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

      {/* Breadcrumbs */}
      <motion.nav variants={fadeInUp} className="flex items-center gap-2 text-xs font-semibold text-outline">
        <span className="font-label-caps text-[10px] uppercase">Console</span>
        <span>/</span>
        <span className="font-label-caps text-[10px] uppercase">Intelligence</span>
        <span>/</span>
        <span className="font-label-caps text-primary dark:text-blue-400 font-bold text-[10px] uppercase">AI Content Generator</span>
      </motion.nav>

      {/* Hero Section */}
      <motion.div variants={fadeInUp} className="relative overflow-hidden rounded-3xl bg-primary dark:bg-blue-600 text-on-primary p-10 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg mb-4 text-white leading-tight">
            Crafting the future of learning, <br /><span className="text-primary-fixed dark:text-blue-200">one prompt at a time.</span>
          </h2>
          <p className="font-body-lg text-body-lg text-white/80">
            Generate pedagogically-sound lessons, interactive quizzes, and enchanting stories for any age group in seconds.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 dark:opacity-20 pointer-events-none">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqHFJmzrXnOnZxgntxbw05BRBttm6qpySQrfD1PAzwsiKbfFwlKbo6FQbO5EJHyWkgaOCsAONpccbal1rNSynIjDsRl2Ri24Rcw-f3h28oaBZzPkcNsQT9w1IJL6Ze6S5bKxISmUmQvNG0cTUMRiW5Xf3TblDtOhs7dxuVewgfatmc6kCWkml6YI73jRPd0RbwEckodsxuI78jA6GtYH0qL3rWCbODTRxdb4Otu9OsEK5o0dIX2Z5ErMyNqCr06rQ-UXR3GtqA6VbB"
            alt="AI Magic"
          />
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Control Panel (Input Fields) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-outline-variant/80 dark:border-zinc-800/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
            <h3 className="font-headline-md text-headline-sm mb-6 flex items-center gap-2 text-text-main">
              <span className="material-symbols-outlined text-secondary dark:text-amber-500">tune</span>
              Parameters
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 text-[10px]">TOPIC / SUBJECT</label>
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest dark:bg-zinc-800 text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body-sm transition-all text-xs"
                  placeholder="e.g. The solar system"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 text-[10px]">LANGUAGE</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest dark:bg-zinc-800 text-on-surface focus:ring-2 focus:ring-primary outline-none font-body-sm cursor-pointer transition-all text-xs"
                  >
                    <option>English</option>
                    <option>عربية</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 text-[10px]">AGE GROUP</label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest dark:bg-zinc-800 text-on-surface focus:ring-2 focus:ring-primary outline-none font-body-sm cursor-pointer transition-all text-xs"
                  >
                    <option>6-8 Years</option>
                    <option>9-12 Years</option>
                    <option>13-15 Years</option>
                    <option>16+ Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 flex justify-between text-[10px]">
                  DIFFICULTY LEVEL
                  <span className={`font-bold transition-colors ${diffColor}`} id="diff-label">{currentDiff}</span>
                </label>
                <input
                  className="w-full h-1.5 bg-surface-container-highest dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-secondary"
                  id="diff-slider"
                  max="5"
                  min="1"
                  type="range"
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                />
                <div className="flex justify-between mt-2 font-label-caps text-[8px] text-outline">
                  <span>EASY</span>
                  <span>HARD</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-b from-primary to-[#003ea8] dark:from-blue-600 dark:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xs"
                  disabled={isGenerating}
                >
                  <span className={`material-symbols-outlined ${isGenerating ? "animate-spin" : ""}`}>
                    {isGenerating ? "progress_activity" : "auto_awesome"}
                  </span>
                  {isGenerating ? "Thinking..." : "Generate Content"}
                </button>
                <button
                  onClick={() => {
                    setTopic("The Solar System");
                    setLanguage("English");
                    setAgeGroup("9-12 Years");
                    setDifficulty(3);
                    triggerToast("Parameters reset");
                  }}
                  className="w-full bg-surface-container-low dark:bg-zinc-800 text-on-surface-variant font-bold py-4 rounded-xl border border-outline-variant/30 hover:bg-surface-container-highest dark:hover:bg-zinc-750 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-xs"
                >
                  <span className="material-symbols-outlined">refresh</span>
                  Reset Parameters
                </button>
              </div>
            </div>
          </div>

          {/* Intelligence Level Badge */}
          <div className="bg-secondary/5 border border-secondary/20 dark:border-amber-500/20 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary-container dark:bg-amber-500/20 flex items-center justify-center text-on-secondary dark:text-amber-400 shadow-lg shrink-0">
              <span className="material-symbols-outlined text-3xl">workspace_premium</span>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-secondary dark:text-amber-500 text-[10px]">INTELLIGENCE LEVEL</p>
              <h4 className="font-headline-sm text-headline-sm text-secondary dark:text-amber-400 font-bold">Scholar VIII</h4>
              <div className="w-32 h-1.5 bg-secondary/10 dark:bg-amber-500/10 rounded-full mt-2 overflow-hidden">
                <div className="w-[75%] h-full bg-secondary dark:bg-amber-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tabs for Content Type */}
          <div className="flex gap-2 p-1.5 bg-surface-container-low dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/50">
            <button
              onClick={() => setActiveTab("lesson")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${activeTab === "lesson"
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-primary dark:text-blue-400 font-bold"
                  : "text-on-surface-variant hover:bg-white/30 dark:hover:bg-zinc-800/30"
                }`}
            >
              <span className="material-symbols-outlined">description</span>
              Lesson Plan
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${activeTab === "quiz"
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-primary dark:text-blue-400 font-bold"
                  : "text-on-surface-variant hover:bg-white/30 dark:hover:bg-zinc-800/30"
                }`}
            >
              <span className="material-symbols-outlined">quiz</span>
              Quiz Set
            </button>
            <button
              onClick={() => setActiveTab("story")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${activeTab === "story"
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-primary dark:text-blue-400 font-bold"
                  : "text-on-surface-variant hover:bg-white/30 dark:hover:bg-zinc-800/30"
                }`}
            >
              <span className="material-symbols-outlined">auto_stories</span>
              Story
            </button>
          </div>

          {/* Generated Content Canvas */}
          <motion.div
            animate={{
              scale: isGenerating ? 0.98 : 1,
              borderColor: isGenerating ? "#3b82f6" : "#c3c6d7",
              opacity: isGenerating ? 0.6 : 1
            }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-zinc-900 border border-outline-variant/80 dark:border-zinc-800 rounded-3xl shadow-[0_4px_20px_rgba(30,41,59,0.05)] min-h-[600px] flex flex-col justify-between overflow-hidden"
          >
            {/* Content Header */}
            <div className="p-8 border-b border-outline-variant/20 flex justify-between items-center bg-white/40 dark:bg-zinc-900/40">
              <div>
                <h3 className="font-headline-lg text-headline-md text-text-main font-bold">
                  {activeTab === "lesson" && `Journey Through ${appliedTopic}`}
                  {activeTab === "quiz" && `${appliedTopic} Quiz Set`}
                  {activeTab === "story" && `Leo's ${appliedTopic} Adventure`}
                </h3>
                <p className="text-xs text-outline flex items-center gap-2 mt-1">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  Generated just now
                  <span className="mx-1">•</span>
                  <span className="material-symbols-outlined text-xs">translate</span>
                  {appliedLanguage} ({appliedAgeGroup})
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => triggerToast("Edit mode loaded")}
                  className="p-2.5 rounded-xl border border-outline-variant/85 hover:bg-surface-container dark:hover:bg-zinc-800 text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  onClick={() => triggerToast("Content downloaded as JSON")}
                  className="p-2.5 rounded-xl border border-outline-variant/85 hover:bg-surface-container dark:hover:bg-zinc-800 text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8 md:p-10 flex-1">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl animate-spin text-primary dark:text-blue-400">progress_activity</span>
                  <p className="text-sm font-semibold animate-pulse">Consulting Leo AI curriculum model...</p>
                </div>
              ) : (
                <>
                  {activeTab === "lesson" && renderLesson()}
                  {activeTab === "quiz" && renderQuiz()}
                  {activeTab === "story" && renderStory()}
                </>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-8 bg-surface-container-low dark:bg-zinc-900/80 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="flex -space-x-2">
                  <img alt="Collaborator" className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjFcs-HNNCcjIw5xrDIjJPZ-Ipb0GUMvo0effEC2iVajlovU7rlimjE_7Pw8VzGUntgXik-z0JFlZy1vYATrUfbp0kLIjClzuYpz7W_Rt233QEs4_IN9ktGG4-vDYW2QJ1fcDUQ05kQ_zcOoDP3DWu78FaR9DZfJXv-a93_RKRASLRDELv_aMy-vAV4I9E7Pk6wMbEyxy7Ak0siT5BUqx1DpreydLK3T1eXQt1BEL8wBRzxR3AZ0VY7y9rmTbJziQ3uBmXANvRLzoe" />
                  <img alt="Collaborator" className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDd7wqtW92Dz18nmmSbz4N-T0b6aO86fsEoEO13lCB2NoTUh9PB23O0nJSl1ksrbWaHmPrwCwT9q8MCg2MfemctD2DZ7DpKsiOMkLl7StDXF9fFAphHIiXMCRYsyWJhdIRTYT8t3_ddkQ9IIJeZu0MGpEbibVtnKPURhD_XbivFF51PHsIXOn_hEwabEGyEQn28hOXPVhQufpFYuKxlGkyrxIP-lUOrsH0d1sUKaugdptnahqthwdnGksPNb_udNF_JYdSyAUCox_o" />
                </span>
                <p className="text-xs font-semibold text-on-surface-variant">Shared with 2 curriculum experts</p>
              </div>
              <button
                onClick={() => triggerToast(`Applied "${appliedTopic}" content directly to Level 1 Course!`)}
                className="bg-primary dark:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2 text-xs shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                Apply to Course
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
