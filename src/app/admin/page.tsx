"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
  const [selectedDateRange, setSelectedDateRange] = useState("Oct 1 - Oct 31, 2023");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dateRanges = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "Oct 1 - Oct 31, 2023",
    "This Quarter",
  ];

  const handleDownload = () => {
    setToastMessage("Preparing report download...");
    setTimeout(() => {
      setToastMessage("Report PDF downloaded successfully!");
    }, 1000);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

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
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 right-8 z-50 flex items-center gap-3 bg-zinc-900 dark:bg-zinc-800 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-zinc-700/50"
          >
            <span className="material-symbols-outlined text-green-400">check_circle</span>
            <span className="text-body-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Executive Overview Header Section */}
      <motion.div variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <nav className="flex items-center gap-2 mb-2">
            <span className="font-label-caps text-on-surface-variant text-[11px]">CONSOLE</span>
            <span className="text-outline-variant text-sm">/</span>
            <span className="font-label-caps text-primary dark:text-blue-400 font-bold text-[11px]">OVERVIEW</span>
          </nav>
          <h2 className="font-headline-lg text-headline-lg text-text-main">Executive Overview</h2>
        </div>
        
        <div className="flex items-center gap-3 relative">
          <div 
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="bg-surface-container-lowest dark:bg-zinc-900 px-4 py-2 rounded-xl border border-outline-variant flex items-center gap-3 cursor-pointer hover:bg-surface-container-low dark:hover:bg-zinc-800 transition-colors shadow-sm select-none"
          >
            <span className="material-symbols-outlined text-primary dark:text-blue-400 text-[18px]">calendar_today</span>
            <span className="font-label-caps text-xs">{selectedDateRange}</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </div>

          <AnimatePresence>
            {isDatePickerOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsDatePickerOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-12 top-12 bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant rounded-xl shadow-xl z-20 py-2 w-48 overflow-hidden"
                >
                  {dateRanges.map((range) => (
                    <div
                      key={range}
                      onClick={() => {
                        setSelectedDateRange(range);
                        setIsDatePickerOpen(false);
                      }}
                      className={`px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-primary/5 dark:hover:bg-blue-500/10 hover:text-primary dark:hover:text-blue-400 transition-colors ${
                        selectedDateRange === range ? "text-primary dark:text-blue-400 bg-primary/5 dark:bg-blue-500/5 font-bold" : "text-on-surface-variant"
                      }`}
                    >
                      {range}
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <button 
            onClick={handleDownload}
            className="p-2.5 bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant rounded-xl hover:bg-surface-container-low dark:hover:bg-zinc-800 text-on-surface transition-colors shadow-sm"
            title="Download Report"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
          </button>
        </div>
      </motion.div>

      {/* Top Row Widgets */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Widget: Total Students */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary dark:text-blue-400">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="text-success font-bold flex items-center gap-1 text-body-sm">
              <span className="material-symbols-outlined text-sm">trending_up</span> 12%
            </span>
          </div>
          <h3 className="text-on-surface-variant font-label-caps mb-1 uppercase text-[10px]">Total Students</h3>
          <p className="font-headline-md text-headline-md font-bold text-text-main">124,500</p>
        </div>

        {/* Widget: Active Schools */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary dark:text-amber-500">
              <span className="material-symbols-outlined">school</span>
            </div>
            <span className="text-success font-bold text-body-sm">+5 new</span>
          </div>
          <h3 className="text-on-surface-variant font-label-caps mb-1 uppercase text-[10px]">Active Schools</h3>
          <p className="font-headline-md text-headline-md font-bold text-text-main">842</p>
        </div>

        {/* Widget: Monthly Revenue */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 col-span-1 shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center text-success">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div className="w-20 h-8">
              <svg className="w-full h-full" viewBox="0 0 100 40">
                <path d="M0 35 Q 20 10, 40 30 T 100 5" fill="none" stroke="#22C55E" strokeWidth="3"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-on-surface-variant font-label-caps mb-1 uppercase text-[10px]">Monthly Revenue</h3>
          <div className="flex items-baseline gap-2">
            <p className="font-headline-md text-headline-md font-bold text-text-main">$452k</p>
            <span className="text-on-surface-variant text-body-sm font-data-mono text-[10px]">Stripe verified</span>
          </div>
        </div>

        {/* Widget: Avg Learning Time */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-tertiary-fixed-dim/20 rounded-lg flex items-center justify-center text-tertiary dark:text-purple-400">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <div className="w-3 h-3 bg-tertiary dark:bg-purple-500 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-on-surface-variant font-label-caps mb-1 uppercase text-[10px]">Avg. Session</h3>
          <p className="font-headline-md text-headline-md font-bold text-text-main">28 min</p>
        </div>
      </motion.div>

      {/* Main Content Area: Bento Grid Layout */}
      <motion.div variants={fadeInUp} className="grid grid-cols-12 gap-6">
        {/* Center: Language Popularity */}
        <div className="col-span-12 lg:col-span-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden h-[500px] shadow-[0_4px_20px_rgba(30,41,59,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-headline-md text-headline-md text-text-main">Global Language Popularity</h3>
                <p className="text-on-surface-variant text-body-sm">Student distribution across top ecosystems</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3.5 py-1.5 bg-primary dark:bg-blue-600 text-white text-[12px] font-bold rounded-lg shadow-sm">World Map</button>
                <button className="px-3.5 py-1.5 text-on-surface-variant text-[12px] rounded-lg border border-outline-variant hover:bg-surface-container-low dark:hover:bg-zinc-800 transition-colors">By Growth</button>
              </div>
            </div>

            {/* Map Visualization Placeholder */}
            <div className="w-full h-[300px] bg-slate-50 dark:bg-zinc-950/40 rounded-xl relative overflow-hidden group border border-outline-variant/30">
              <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#004ac6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="flex items-center justify-center h-full">
                <div className="relative w-4/5 h-3/4">
                  <div className="absolute top-1/4 left-1/4 group-hover:scale-110 transition-transform duration-500 z-10">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-ping absolute -left-4 -top-4"></div>
                    <div className="w-4 h-4 bg-primary rounded-full relative shadow-lg"></div>
                    <div className="absolute top-6 left-0 bg-white dark:bg-zinc-850 shadow-xl p-2 rounded-lg border border-primary/20 w-32 backdrop-blur-md">
                      <p className="font-label-caps text-[9px] text-on-surface-variant">ENGLISH</p>
                      <p className="font-bold text-xs text-text-main">42.4k Students</p>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-2/3 group-hover:scale-110 transition-transform duration-500 z-10">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center animate-ping absolute -left-3 -top-3"></div>
                    <div className="w-4 h-4 bg-secondary rounded-full relative shadow-lg"></div>
                    <div className="absolute top-6 left-0 bg-white dark:bg-zinc-850 shadow-xl p-2 rounded-lg border border-secondary/20 w-32 backdrop-blur-md">
                      <p className="font-label-caps text-[9px] text-on-surface-variant">SPANISH</p>
                      <p className="font-bold text-xs text-text-main">28.1k Students</p>
                    </div>
                  </div>
                  <img alt="World Map Distribution" className="w-full h-full object-contain opacity-60 dark:opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjIwl5AR_CSJbmIDjb5OHiIy8D2yWg4ScOH6U9cwihdNWXOoQW1BV3VvdoM1lq4m5KOQ5gTx40AaTyBgiKvTDJKk0QGWkfKimZzvudK2E323kFkwBDajFJNa4ktb_8MiC_IH4EpdVeS8Y9Fai5IfyeopbKGjsiQXMAQ9mQnA5z_JwZxrOVdvi_xEE0v80ZFj_fHvTl7w8r_W3r6_V81PS73LeUorAxLe1fWzoZEWihzX7Vj37pmftucKeiD_Vto-DJhAbPnueiMaEx" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Summary */}
          <div className="flex gap-6 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
              <span className="text-xs font-semibold text-on-surface-variant">English (34%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-secondary rounded-full"></div>
              <span className="text-xs font-semibold text-on-surface-variant">Spanish (22%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-tertiary dark:bg-purple-500 rounded-full"></div>
              <span className="text-xs font-semibold text-on-surface-variant">French (18%)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Intelligence & System Health */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Recent Intelligence */}
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 flex-1 flex flex-col shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-md text-headline-md text-text-main flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary dark:text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                Intelligence
              </h3>
              <span className="bg-secondary/10 text-secondary dark:text-amber-400 px-2 py-0.5 rounded font-label-caps text-[9px] font-bold">LIVE FEED</span>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[260px] pr-2 flex-1" style={{ scrollbarWidth: 'thin' }}>
              <div className="p-3.5 bg-surface-container-low dark:bg-zinc-800/30 rounded-xl border-l-4 border-secondary hover:bg-surface-container dark:hover:bg-zinc-800 transition-colors cursor-default">
                <p className="text-body-sm font-semibold mb-1 text-text-main">Unusual Activity Spike</p>
                <p className="text-[12px] text-on-surface-variant">Spanish pronunciation modules seeing 4x traffic from Lisbon region. Recommending server scale-up.</p>
                <p className="text-[9px] text-outline mt-2 font-data-mono uppercase">2 mins ago</p>
              </div>
              <div className="p-3.5 bg-surface-container-low dark:bg-zinc-800/30 rounded-xl border-l-4 border-primary dark:border-blue-500 hover:bg-surface-container dark:hover:bg-zinc-800 transition-colors cursor-default">
                <p className="text-body-sm font-semibold mb-1 text-text-main">Curriculum Optimization</p>
                <p className="text-[12px] text-on-surface-variant">AI suggests adding 'Business Etiquette' sub-units to Level 4 French based on recent search trends.</p>
                <p className="text-[9px] text-outline mt-2 font-data-mono uppercase">1 hour ago</p>
              </div>
              <div className="p-3.5 bg-surface-container-low dark:bg-zinc-800/30 rounded-xl border-l-4 border-success hover:bg-surface-container dark:hover:bg-zinc-800 transition-colors cursor-default">
                <p className="text-body-sm font-semibold mb-1 text-text-main">New Milestone Reached</p>
                <p className="text-[12px] text-on-surface-variant">Total XP earned across the platform has surpassed 500M this morning. Community boost active.</p>
                <p className="text-[9px] text-outline mt-2 font-data-mono uppercase">3 hours ago</p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-primary dark:text-blue-400 font-bold text-body-sm hover:underline">View All Insights</button>
          </div>

          {/* System Health */}
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
            <h3 className="font-headline-md text-headline-md text-text-main mb-6">System Health</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-body-sm font-semibold text-text-main">Pronunciation Lab</span>
                  <span className="text-success font-bold text-body-sm">99.8%</span>
                </div>
                <div className="w-full h-2 bg-surface-container dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full w-[99.8%]"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-surface-container-low dark:bg-zinc-800/40 rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-body-sm font-semibold text-text-main">API Latency</span>
                </div>
                <span className="font-data-mono text-body-sm text-on-surface-variant">42ms</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom: Student Engagement Heatmap */}
      <motion.div variants={fadeInUp} className="col-span-12 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-6 mt-6 mb-8 shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 className="font-headline-md text-headline-md text-text-main">Student Engagement Heatmap</h3>
            <p className="text-on-surface-variant text-body-sm">Weekly activity peaks across all time zones</p>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-container/30 dark:bg-zinc-850 p-2 rounded-xl border border-outline-variant/20">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase mr-2 ml-1">Intensity</span>
            <div className="w-4 h-4 bg-primary/10 dark:bg-blue-500/10 rounded"></div>
            <div className="w-4 h-4 bg-primary/40 dark:bg-blue-500/30 rounded"></div>
            <div className="w-4 h-4 bg-primary/70 dark:bg-blue-500/60 rounded"></div>
            <div className="w-4 h-4 bg-primary dark:bg-blue-500 rounded"></div>
          </div>
        </div>
        <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
          <div className="min-w-[800px] grid grid-cols-24 gap-1.5">
            <div className="col-span-2 text-right pr-4 text-[11px] text-on-surface-variant font-bold self-center">MON</div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/20 dark:bg-blue-500/20 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/40 dark:bg-blue-500/40 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/60 dark:bg-blue-500/60 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/90 dark:bg-blue-500/80 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary dark:bg-blue-500 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/80 dark:bg-blue-500/70 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/60 dark:bg-blue-500/60 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/40 dark:bg-blue-500/40 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/20 dark:bg-blue-500/20 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/30 dark:bg-blue-500/30 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/40 dark:bg-blue-500/40 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/20 dark:bg-blue-500/20 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded hover:ring-2 ring-primary dark:ring-blue-400 cursor-help transition-all"></div>
          </div>
          <div className="min-w-[800px] grid grid-cols-24 gap-1.5 mt-1.5">
            <div className="col-span-2 text-right pr-4 text-[11px] text-on-surface-variant font-bold self-center">WED</div>
            <div className="col-span-1 h-8 bg-primary/30 dark:bg-blue-500/30 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/40 dark:bg-blue-500/40 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/60 dark:bg-blue-500/60 rounded"></div>
            <div className="col-span-1 h-8 bg-primary dark:bg-blue-500 rounded"></div>
            <div className="col-span-1 h-8 bg-primary dark:bg-blue-500 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/80 dark:bg-blue-500/75 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/40 dark:bg-blue-500/40 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/20 dark:bg-blue-500/20 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/30 dark:bg-blue-500/30 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/60 dark:bg-blue-500/60 rounded"></div>
            <div className="col-span-1 h-8 bg-primary dark:bg-blue-500 rounded"></div>
            <div className="col-span-1 h-8 bg-primary dark:bg-blue-500 rounded"></div>
            <div className="col-span-1 h-8 bg-primary dark:bg-blue-500 rounded"></div>
            <div className="col-span-1 h-8 bg-primary dark:bg-blue-500 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/80 dark:bg-blue-500/75 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/40 dark:bg-blue-500/40 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/20 dark:bg-blue-500/20 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded"></div>
            <div className="col-span-1 h-8 bg-primary/10 dark:bg-blue-500/10 rounded"></div>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-[10px] text-outline font-data-mono uppercase">
          <span className="ml-[8.33%]">12 AM</span>
          <span>06 AM</span>
          <span>12 PM</span>
          <span>06 PM</span>
          <span>11 PM</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
