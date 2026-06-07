"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LearningPathBuilderPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [activeNodeId, setActiveNodeId] = useState("NODE_VOC_001");
  const [isDrawingPath, setIsDrawingPath] = useState(false);

  // Stateful Nodes array
  const [nodes, setNodes] = useState<any[]>([
    { 
      id: "NODE_VOC_001", 
      name: "Vocabulary Forest", 
      icon: "park", 
      status: "Active", 
      lessons: "12/15 Lessons", 
      xp: 1250, 
      unlocks: ["Complete 'Basics'"], 
      badge: "Forest Master", 
      badgeImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJWl6JSlZwxzlDLM1cMyZKhb_X-3RRfQNBQkm7OooFb2oagdHG-xEWF624MMSSIw-eWhAChRLK6PoJIy9tfTFaBcvYrKwc8NzPGxzwUDhH2AkYyuJ0QagXJSj-I2C--hjQhdOYxyKNVFXfrrRlqjjU9W1mX9L0ziJPtqMMkfpkS5xO-arwNiv6Sj1-OiwUb44ldEoomtCvMTknC7YF_p8xrCUFXLN_9phUUOvvrEh7M2SBmNxSsZ5NgP4nbc6-UFc6bASaRhifFIUS",
      color: "text-success bg-success/10", 
      x: 320, 
      y: 180 
    },
    { 
      id: "NODE_GRM_002", 
      name: "Grammar Castle", 
      icon: "castle", 
      status: "Connected", 
      lessons: "8 Lessons Total", 
      xp: 2500, 
      unlocks: ["Complete 'Vocabulary Forest'"], 
      badge: "Grammar Shield", 
      badgeImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJWl6JSlZwxzlDLM1cMyZKhb_X-3RRfQNBQkm7OooFb2oagdHG-xEWF624MMSSIw-eWhAChRLK6PoJIy9tfTFaBcvYrKwc8NzPGxzwUDhH2AkYyuJ0QagXJSj-I2C--hjQhdOYxyKNVFXfrrRlqjjU9W1mX9L0ziJPtqMMkfpkS5xO-arwNiv6Sj1-OiwUb44ldEoomtCvMTknC7YF_p8xrCUFXLN_9phUUOvvrEh7M2SBmNxSsZ5NgP4nbc6-UFc6bASaRhifFIUS",
      color: "text-primary bg-primary/10", 
      x: 550, 
      y: 380 
    },
    { 
      id: "NODE_LIS_003", 
      name: "Listening Lake", 
      icon: "waves", 
      status: "Locked", 
      lessons: "10 Lessons Total", 
      xp: 3200, 
      unlocks: ["Complete 'Grammar Castle'"], 
      badge: "Ocean Ear", 
      badgeImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJWl6JSlZwxzlDLM1cMyZKhb_X-3RRfQNBQkm7OooFb2oagdHG-xEWF624MMSSIw-eWhAChRLK6PoJIy9tfTFaBcvYrKwc8NzPGxzwUDhH2AkYyuJ0QagXJSj-I2C--hjQhdOYxyKNVFXfrrRlqjjU9W1mX9L0ziJPtqMMkfpkS5xO-arwNiv6Sj1-OiwUb44ldEoomtCvMTknC7YF_p8xrCUFXLN_9phUUOvvrEh7M2SBmNxSsZ5NgP4nbc6-UFc6bASaRhifFIUS",
      color: "text-secondary dark:text-amber-400 bg-secondary/10", 
      x: 850, 
      y: 380 
    },
    { 
      id: "NODE_SPK_004", 
      name: "Speaking Summit", 
      icon: "landscape", 
      status: "Locked", 
      lessons: "5 Lessons Total", 
      xp: 5000, 
      unlocks: ["Complete 'Listening Lake'"], 
      badge: "Peak Talker", 
      badgeImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJWl6JSlZwxzlDLM1cMyZKhb_X-3RRfQNBQkm7OooFb2oagdHG-xEWF624MMSSIw-eWhAChRLK6PoJIy9tfTFaBcvYrKwc8NzPGxzwUDhH2AkYyuJ0QagXJSj-I2C--hjQhdOYxyKNVFXfrrRlqjjU9W1mX9L0ziJPtqMMkfpkS5xO-arwNiv6Sj1-OiwUb44ldEoomtCvMTknC7YF_p8xrCUFXLN_9phUUOvvrEh7M2SBmNxSsZ5NgP4nbc6-UFc6bASaRhifFIUS",
      color: "text-tertiary bg-tertiary/10", 
      x: 1050, 
      y: 130 
    }
  ]);

  const activeNode = nodes.find(n => n.id === activeNodeId);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const updateNode = (updated: any) => {
    setNodes(nodes.map(n => n.id === activeNodeId ? { ...n, ...updated } : n));
  };

  // alignment simulation
  const handleLayoutAI = () => {
    // Randomly shift coords slightly to simulate alignment
    const shifted = nodes.map(n => ({
      ...n,
      x: n.x + (Math.random() * 20 - 10),
      y: n.y + (Math.random() * 20 - 10),
    }));
    setNodes(shifted);
    triggerToast("AI Node Layout Optimized successfully!");
  };

  const handleAddNewWorld = () => {
    const name = prompt("Enter new world name:");
    if (!name) return;
    const nextId = `NODE_NEW_${Date.now()}`;
    const newNode = {
      id: nextId,
      name,
      icon: "explore",
      status: "Locked",
      lessons: "5 Lessons Total",
      xp: 1500,
      unlocks: [`Complete '${activeNode?.name || "previous world"}'`],
      badge: `${name} Badge`,
      badgeImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJWl6JSlZwxzlDLM1cMyZKhb_X-3RRfQNBQkm7OooFb2oagdHG-xEWF624MMSSIw-eWhAChRLK6PoJIy9tfTFaBcvYrKwc8NzPGxzwUDhH2AkYyuJ0QagXJSj-I2C--hjQhdOYxyKNVFXfrrRlqjjU9W1mX9L0ziJPtqMMkfpkS5xO-arwNiv6Sj1-OiwUb44ldEoomtCvMTknC7YF_p8xrCUFXLN_9phUUOvvrEh7M2SBmNxSsZ5NgP4nbc6-UFc6bASaRhifFIUS",
      color: "text-purple-500 bg-purple-500/10",
      x: Math.min(1100, (activeNode?.x || 500) + 150),
      y: Math.min(600, (activeNode?.y || 300) + 100)
    };

    setNodes([...nodes, newNode]);
    setActiveNodeId(nextId);
    triggerToast(`Added new World "${name}" to path map!`);
  };

  const deleteNode = () => {
    if (!activeNode) return;
    if (confirm(`Remove "${activeNode.name}" and all outgoing connectors?`)) {
      const remaining = nodes.filter(n => n.id !== activeNodeId);
      setNodes(remaining);
      if (remaining.length > 0) {
        setActiveNodeId(remaining[0].id);
      }
      triggerToast(`Removed node "${activeNode.name}"`);
    }
  };

  const addUnlockRule = () => {
    const rule = prompt("Enter unlock requirement rule:");
    if (rule && activeNode) {
      updateNode({ unlocks: [...activeNode.unlocks, rule] });
      triggerToast("Unlock requirement added");
    }
  };

  const removeUnlockRule = (index: number) => {
    if (activeNode) {
      const copy = [...activeNode.unlocks];
      copy.splice(index, 1);
      updateNode({ unlocks: copy });
      triggerToast("Requirement removed");
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
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-[#f7f9fb] dark:bg-zinc-950/40 -m-6 md:-m-10">
      
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

      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex-1 flex overflow-hidden relative w-full h-full">
        
        {/* Canvas Area */}
        <div className="flex-1 relative overflow-auto p-12 flex justify-center items-start bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[size:32px_32px]">
          
          {/* Connection SVG Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="pathGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 0.2 }}></stop>
                <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0.8 }}></stop>
              </linearGradient>
            </defs>
            {/* Draw lines between sequential nodes dynamically */}
            {nodes.map((node, i) => {
              if (i === 0) return null;
              const prev = nodes[i - 1];
              // Midpoint spline
              const startX = prev.x + 80;
              const startY = prev.y + 80;
              const endX = node.x + 80;
              const endY = node.y + 80;
              const cpy = startY + (endY - startY) / 2;
              
              const isFirstSegment = i === 1;
              return (
                <path 
                  key={node.id}
                  d={`M ${startX} ${startY} C ${startX} ${cpy}, ${endX} ${cpy}, ${endX} ${endY}`} 
                  fill="transparent" 
                  stroke={isFirstSegment ? "url(#pathGradient)" : "#CBD5E1"} 
                  className={isFirstSegment ? "stroke-primary dark:stroke-blue-500" : "stroke-outline-variant/60 dark:stroke-zinc-800"}
                  strokeDasharray={isFirstSegment ? "8,8" : "none"} 
                  strokeWidth="4"
                />
              );
            })}
          </svg>

          {/* Map Nodes */}
          <div className="relative w-[1300px] h-[850px] z-10">
            {nodes.map((node) => {
              const isActive = node.id === activeNodeId;
              const isLocked = node.status === "Locked";
              
              return (
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  style={{ top: `${node.y}px`, left: `${node.x}px` }}
                  className={`absolute group cursor-pointer z-10 transition-all ${isLocked ? "opacity-75 grayscale hover:grayscale-0 hover:opacity-100" : ""}`}
                >
                  <div className={`w-36 h-36 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-xl border flex flex-col items-center justify-center p-4 transition-all hover:-translate-y-1 hover:shadow-2xl ${
                    isActive 
                      ? "border-primary dark:border-blue-500 ring-4 ring-primary/10 dark:ring-blue-500/10 scale-102" 
                      : "border-outline-variant/50 dark:border-zinc-800"
                  }`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 shrink-0 ${node.color}`}>
                      <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>{node.icon}</span>
                    </div>
                    
                    {isLocked ? (
                      <span className="material-symbols-outlined text-outline text-lg">lock</span>
                    ) : (
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        node.status === "Active" ? "bg-success/10 text-success" : "bg-primary/10 text-primary dark:text-blue-400"
                      }`}>
                        {node.status}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 text-center max-w-[9rem]">
                    <h3 className="text-xs font-bold text-on-surface leading-tight">{node.name}</h3>
                    <p className="text-[10px] text-on-surface-variant font-semibold mt-0.5">{node.lessons || `${node.xp} XP Required`}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Properties Panel (Right Sidebar) */}
        <aside className="w-[340px] h-full bg-white/80 dark:bg-zinc-900/90 backdrop-blur-md border-l border-outline-variant/20 shadow-lg flex flex-col z-20 shrink-0">
          <div className="p-6 border-b border-outline-variant/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider">Node Properties</h2>
              {activeNode && (
                <button 
                  onClick={deleteNode}
                  className="text-on-surface-variant hover:text-red-500 transition-colors p-1 rounded hover:bg-red-500/10"
                  title="Delete Node"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              )}
            </div>
            
            {activeNode ? (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${activeNode.color}`}>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{activeNode.icon}</span>
                </div>
                <div>
                  <input 
                    type="text" 
                    value={activeNode.name}
                    onChange={(e) => updateNode({ name: e.target.value })}
                    className="font-bold text-sm bg-transparent border-b border-transparent focus:border-outline-variant/30 outline-none text-text-main"
                  />
                  <p className="text-[10px] text-outline font-data-mono uppercase mt-0.5">{activeNode.id}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant">No active node</p>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ scrollbarWidth: 'thin' }}>
            
            {activeNode && (
              <>
                {/* Unlock Rules */}
                <section className="space-y-3">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface-variant uppercase">Unlock Requirements</label>
                  <div className="space-y-2">
                    {activeNode.unlocks.map((rule: string, i: number) => (
                      <div key={i} className="p-2.5 bg-surface-container-low dark:bg-zinc-800/40 rounded-xl border border-outline-variant/30 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-on-surface">
                          <span className="material-symbols-outlined text-[16px] text-primary dark:text-blue-400">check_circle</span>
                          <span>{rule}</span>
                        </div>
                        <span 
                          onClick={() => removeUnlockRule(i)}
                          className="material-symbols-outlined text-[16px] text-outline hover:text-red-505 cursor-pointer hover:font-bold"
                          title="Remove"
                        >
                          close
                        </span>
                      </div>
                    ))}
                    <button 
                      onClick={addUnlockRule}
                      className="w-full py-2 border-2 border-dashed border-outline-variant/60 dark:border-zinc-800 rounded-xl text-[11px] font-bold text-on-surface hover:border-primary hover:text-primary dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-xs">add</span>
                      Add Requirement
                    </button>
                  </div>
                </section>

                {/* XP Requirements */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-label-caps text-[10px] font-bold text-on-surface-variant uppercase">XP Threshold</label>
                    <span className="font-data-mono text-secondary dark:text-amber-400 font-bold text-xs">{activeNode.xp.toLocaleString()} XP</span>
                  </div>
                  <input 
                    type="range"
                    min="500"
                    max="6000"
                    step="100"
                    value={activeNode.xp}
                    onChange={(e) => updateNode({ xp: Number(e.target.value) })}
                    className="w-full accent-secondary h-1 bg-surface-container-highest dark:bg-zinc-800 rounded-full appearance-none cursor-pointer" 
                  />
                  <div className="flex justify-between font-label-caps text-[8px] text-outline">
                    <span>500 XP</span>
                    <span>6,000 XP</span>
                  </div>
                </section>

                {/* Badge Rewards */}
                <section className="space-y-3">
                  <label className="font-label-caps text-[10px] font-bold text-on-surface-variant uppercase">Badge Completion Reward</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white dark:bg-zinc-900 border border-primary/20 dark:border-blue-500/10 shadow-sm flex flex-col items-center relative overflow-hidden rounded-xl text-center">
                      <div className="absolute top-0 right-0 p-1">
                        <span className="material-symbols-outlined text-primary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                      </div>
                      <img className="w-10 h-10 rounded-full mb-1 object-cover" src={activeNode.badgeImg} alt={activeNode.badge} />
                      <span className="text-[10px] font-bold truncate w-full uppercase">{activeNode.badge}</span>
                    </div>
                    <div 
                      onClick={() => triggerToast("Add new badge overlay opened")}
                      className="p-3 bg-surface-container-lowest dark:bg-zinc-800/40 rounded-xl border border-dashed border-outline-variant flex flex-col items-center justify-center text-outline hover:text-primary dark:hover:text-blue-400 hover:border-primary dark:hover:border-blue-500 transition-all cursor-pointer text-center"
                    >
                      <span className="material-symbols-outlined text-lg mb-1">add_moderator</span>
                      <span className="text-[9px] font-bold uppercase">Add Badge</span>
                    </div>
                  </div>
                </section>

                {/* Gamification Config */}
                <section className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-purple-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>generating_tokens</span>
                    <span className="text-[10px] font-bold text-purple-500 uppercase">Coin Multiplier</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-bold font-data-mono text-on-surface">
                      x1.5
                    </div>
                    <button 
                      onClick={() => triggerToast("Multipliers can be configured inside Settings page")}
                      className="bg-purple-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-purple-600 transition-colors shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                </section>
              </>
            )}

          </div>

          <div className="p-6 bg-surface-container-low dark:bg-zinc-900/90 border-t border-outline-variant/20">
            <div className="flex gap-3">
              <button 
                onClick={() => triggerToast("Modifications discarded")}
                className="flex-1 py-2.5 bg-white dark:bg-zinc-800 border border-outline-variant rounded-xl font-bold text-xs text-on-surface hover:bg-surface-container-high"
              >
                Discard
              </button>
              <button 
                onClick={() => triggerToast("Node properties saved to database!")}
                className="flex-1 py-2.5 bg-primary dark:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md hover:scale-[1.02] active:scale-98 transition-all"
              >
                Save Node
              </button>
            </div>
          </div>
        </aside>

        {/* Floating Tool Palette */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 px-6 py-3.5 rounded-3xl shadow-2xl border border-outline-variant/80 dark:border-zinc-800 flex items-center gap-6 z-20">
          <button onClick={handleAddNewWorld} className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary dark:text-blue-400 group-hover:bg-primary dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-[20px]">add_location_alt</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">New World</span>
          </button>
          
          <div className="w-px h-8 bg-outline-variant"></div>
          
          <button 
            onClick={() => {
              setIsDrawingPath(!isDrawingPath);
              triggerToast(isDrawingPath ? "Path drawing tool disabled." : "Draw Path Tool active! Select nodes to connect.");
            }} 
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isDrawingPath 
                ? "bg-primary text-white" 
                : "bg-surface-container-high dark:bg-zinc-800 text-on-surface-variant group-hover:bg-primary dark:group-hover:bg-blue-600 group-hover:text-white"
            }`}>
              <span className="material-symbols-outlined text-[20px]">polyline</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Path Tool</span>
          </button>

          <button onClick={handleLayoutAI} className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 bg-surface-container-high dark:bg-zinc-800 rounded-xl flex items-center justify-center text-on-surface-variant group-hover:bg-primary dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Layout AI</span>
          </button>
          
          <div className="w-px h-8 bg-outline-variant"></div>
          
          <button onClick={() => triggerToast("Opening Map Simulator...")} className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 bg-surface-container-high dark:bg-zinc-800 rounded-xl flex items-center justify-center text-on-surface-variant group-hover:bg-primary dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Preview</span>
          </button>
        </div>

        {/* MiniMap View */}
        <div className="absolute bottom-10 right-[26.5rem] w-32 h-32 bg-white/80 dark:bg-zinc-900/80 rounded-2xl border border-outline-variant/80 dark:border-zinc-800 p-2 shadow-lg backdrop-blur-md overflow-hidden z-20 hidden xl:block select-none">
          <div className="w-full h-full bg-surface-container dark:bg-zinc-950/40 rounded-lg relative opacity-50">
            {nodes.map(n => (
              <div 
                key={n.id} 
                className={`absolute w-3 h-3 rounded-full ${
                  n.id === activeNodeId 
                    ? "bg-primary dark:bg-blue-500 scale-125 border border-white dark:border-zinc-800" 
                    : n.status === "Locked" ? "bg-zinc-400" : "bg-success"
                }`}
                style={{ top: `${(n.y / 850) * 100}px`, left: `${(n.x / 1300) * 100}px` }}
              />
            ))}
            {/* Viewport Rectangle */}
            <div className="absolute inset-1 border-2 border-primary/40 dark:border-blue-500/40 rounded-md"></div>
          </div>
          <div className="absolute bottom-2 right-2 text-[7px] font-bold font-data-mono text-outline uppercase tracking-wider">Minimap</div>
        </div>

      </motion.div>
    </div>
  );
}
