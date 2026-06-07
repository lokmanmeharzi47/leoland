"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function RewardEconomyPage() {
  const [toast, setToast] = useState<string | null>(null);
  
  // Modals / Dropdowns
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintRate, setMintRate] = useState("1.0x");
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  // Badge Creator States
  const [badgeName, setBadgeName] = useState("");
  const [badgeMultiplier, setBadgeMultiplier] = useState(1.5);
  const [badgeImage, setBadgeImage] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuBJWl6JSlZwxzlDLM1cMyZKhb_X-3RRfQNBQkm7OooFb2oagdHG-xEWF624MMSSIw-eWhAChRLK6PoJIy9tfTFaBcvYrKwc8NzPGxzwUDhH2AkYyuJ0QagXJSj-I2C--hjQhdOYxyKNVFXfrrRlqjjU9W1mX9L0ziJPtqMMkfpkS5xO-arwNiv6Sj1-OiwUb44ldEoomtCvMTknC7YF_p8xrCUFXLN_9phUUOvvrEh7M2SBmNxSsZ5NgP4nbc6-UFc6bASaRhifFIUS");

  // Filter Transaction logs
  const [txSearch, setTxSearch] = useState("");
  const [txStatusFilter, setTxStatusFilter] = useState("ALL");

  // New Item Form
  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemPremium, setNewItemPremium] = useState(false);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: "Neon Crown",
      type: "PREMIUM",
      description: "Rare accessory for level 20+ users.",
      price: "2,500",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsiW1R3l1ELv_oUyztmsV1AHzOvZUR1z9ppK-QEQZaAB4HOv-0opblA1bJg0KpmMCpzYGpccEEEG1-6bafBcZmUvsQwEKgio3n298OWLhsUYvqo-nYmBOaMBWwuxTc8yLx1OR48BE7U1992KzKnTXGlSHo6qpyLZyQC64K-RqnCIhofkqeGikpik-XSGZAeYDhMyV06Q1rMw1M2e7AE4_HAxqOxguwflE4Iaj0Uab1PnqVTVoDGqeC48p09Xy9fhHN3hDVc9S9JX12"
    },
    {
      id: 2,
      name: "Deep Space Theme",
      type: "",
      description: "Complete UI overhaul pack.",
      price: "8,000",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIf_n7C3I1P8uHtpc4TfUXK4IGkxMxkHwSO0BcGcZmArxAwgZRj1sbhj-yFj87zSqAXh_zcWBIankgky4d9uSJYnp6LmKrV7VaGSQ2kh_yLk_aWHG5fd75-TrQqQnx0EStgB7GjML9CgKwBaPF52fE3sBdhaBns66cVTw8iTpX0zYtKblwTcPR3u1QgP4HrAqySyO5ulDFuNjRUD0_7CxakyXwggRgriLzBBdZiaRWoVDEgo5lQDVwhSLqh9x11eY8Bx70bpRiimPP"
    },
    {
      id: 3,
      name: "Golden Wings",
      type: "",
      description: "Limited edition flight aesthetic.",
      price: "15,000",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7IJCqOKoDe0zOfWITDqw7VjIeKRAJFAHtgAcvwfX48ZnUi79XgstXqVZ0vs5FB0kUnMWD2U-e2c1TQdc_BgF4QOHC9cRpM29Afb8nwgJ247EYJhiNPyh0VwKcBE0e8vHvjT9pzgEA_Whg-yBjDpI9G7MtCQ3uOIvB8iMgEE4Hig5cbm7gyaEKmwWUkQTd6dYJzNMnRkAL9aKStdxbqvma_AYMKwhAs_fD9hYpC0IhHlYnweHBWxuFrJifCgRanAT-FsR0WfSIDFBo"
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: "#TX-94821",
      initials: "MK",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      user: "Max_Kingston",
      action: "Purchased Neon Crown",
      amount: "-2,500",
      amountColor: "text-error",
      status: "COMPLETED",
      statusColor: "bg-green-500/10 text-green-500 dark:text-green-400",
      progress: "100%"
    },
    {
      id: "#TX-94820",
      initials: "SL",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      user: "Sarah_Learns",
      action: "Achievement: Calculus Hero",
      amount: "+500",
      amountColor: "text-success",
      status: "COMPLETED",
      statusColor: "bg-green-500/10 text-green-500 dark:text-green-400",
      progress: "100%"
    },
    {
      id: "#TX-94819",
      initials: "AL",
      color: "bg-yellow-100 text-yellow-800 dark:bg-amber-900/30 dark:text-amber-400",
      user: "Alex_Admin",
      action: "Platform Correction",
      amount: "1,200",
      amountColor: "text-on-surface",
      status: "PENDING",
      statusColor: "bg-surface-container-highest dark:bg-zinc-800 text-on-surface-variant",
      progress: "45%"
    }
  ]);

  const handleCreateBadge = () => {
    if (!badgeName) return;
    triggerToast(`Badge template "${badgeName}" (${badgeMultiplier}x XP) created successfully!`);
    setBadgeName("");
    setBadgeMultiplier(1.5);
  };

  const handleEditPrice = (id: number, currentPrice: string) => {
    const newPrice = prompt("Enter new price in LeoCoins:", currentPrice.replace(/,/g, ""));
    if (newPrice !== null && !isNaN(Number(newPrice))) {
      const formatted = Number(newPrice).toLocaleString();
      setInventoryItems(inventoryItems.map(item => item.id === id ? { ...item, price: formatted } : item));
      triggerToast("Price updated successfully!");
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    const formattedPrice = Number(newItemPrice.replace(/,/g, "")).toLocaleString();
    const item = {
      id: Date.now(),
      name: newItemName,
      type: newItemPremium ? "PREMIUM" : "",
      description: newItemDesc || "Custom avatar accessory.",
      price: formattedPrice,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsiW1R3l1ELv_oUyztmsV1AHzOvZUR1z9ppK-QEQZaAB4HOv-0opblA1bJg0KpmMCpzYGpccEEEG1-6bafBcZmUvsQwEKgio3n298OWLhsUYvqo-nYmBOaMBWwuxTc8yLx1OR48BE7U1992KzKnTXGlSHo6qpyLZyQC64K-RqnCIhofkqeGikpik-XSGZAeYDhMyV06Q1rMw1M2e7AE4_HAxqOxguwflE4Iaj0Uab1PnqVTVoDGqeC48p09Xy9fhHN3hDVc9S9JX12"
    };

    setInventoryItems([...inventoryItems, item]);
    setNewItemName("");
    setNewItemDesc("");
    setNewItemPrice("");
    setNewItemPremium(false);
    setShowAddItemModal(false);
    triggerToast(`Item "${newItemName}" added to inventory store!`);
  };

  const handleAdjustMint = () => {
    setShowMintModal(false);
    triggerToast(`LeoCoin Mint Rate adjusted to ${mintRate}!`);
  };

  // Filter transaction logs
  const filteredTxs = transactions.filter((tx) => {
    const matchesSearch = 
      tx.user.toLowerCase().includes(txSearch.toLowerCase()) || 
      tx.action.toLowerCase().includes(txSearch.toLowerCase()) ||
      tx.id.toLowerCase().includes(txSearch.toLowerCase());

    const matchesStatus = 
      txStatusFilter === "ALL" || 
      tx.status === txStatusFilter;

    return matchesSearch && matchesStatus;
  });

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
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full space-y-8 relative">
      
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
      <motion.div variants={fadeInUp} className="flex items-center gap-2 font-label-caps text-label-caps text-xs text-on-surface-variant font-semibold">
        <span>ECONOMY</span>
        <span className="text-outline-variant">/</span>
        <span className="text-primary dark:text-blue-400 font-bold">REWARD STRATEGY</span>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-text-main font-bold">Economy Health</h2>
          <p className="text-on-surface-variant text-sm mt-1">Real-time oversight of LeoLand currency and reward liquidity.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => triggerToast("Transaction report exported to Excel")}
            className="px-6 py-2.5 border border-outline-variant rounded-xl font-bold text-xs bg-white dark:bg-zinc-900 hover:bg-surface-container-low dark:hover:bg-zinc-800 transition-all text-on-surface"
          >
            Export Report
          </button>
          <button 
            onClick={() => setShowMintModal(true)}
            className="px-6 py-2.5 bg-primary dark:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md hover:scale-[1.02] active:scale-98 transition-all"
          >
            Adjust Mint Rate
          </button>
        </div>
      </motion.div>

      {/* Bento Grid: Analytics */}
      <motion.div variants={fadeInUp} className="grid grid-cols-12 gap-6">
        
        {/* Main Stats Card */}
        <div className="col-span-12 lg:col-span-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/80 dark:border-zinc-800/80 shadow-[0px_4px_20px_rgba(30,41,59,0.05)] flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-primary/5 dark:bg-blue-500/5 border border-primary/10 dark:border-blue-500/10">
              <p className="text-[10px] font-bold text-primary dark:text-blue-400 mb-1 uppercase tracking-wider">Coins in Circulation</p>
              <h3 className="text-xl font-bold text-text-main">12,482,900</h3>
              <div className="flex items-center gap-1 mt-2 text-success">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                <span className="text-[10px] font-bold">+12.4% vs LW</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <p className="text-[10px] font-bold text-secondary dark:text-amber-500 mb-1 uppercase tracking-wider">Active XP Velocity</p>
              <h3 className="text-xl font-bold text-text-main">45.2K<span className="text-xs font-normal text-on-surface-variant">/hr</span></h3>
              <div className="flex items-center gap-1 mt-2 text-success">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                <span className="text-[10px] font-bold">+5.1%</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
              <p className="text-[10px] font-bold text-purple-500 mb-1 uppercase tracking-wider">Redemption Rate</p>
              <h3 className="text-xl font-bold text-text-main">68.4%</h3>
              <div className="flex items-center gap-1 mt-2 text-error">
                <span className="material-symbols-outlined text-xs">trending_down</span>
                <span className="text-[10px] font-bold">-2.3%</span>
              </div>
            </div>
          </div>
          
          <div className="h-[180px] mt-6 relative border border-outline-variant/20 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-zinc-950/20">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-lg flex items-end">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                <path d="M0 150 C 100 130, 200 180, 300 120 S 500 40, 600 80 S 700 20, 800 50 L 800 200 L 0 200 Z" fill="rgba(59, 130, 246, 0.08)"></path>
                <path d="M0 150 C 100 130, 200 180, 300 120 S 500 40, 600 80 S 700 20, 800 50" fill="none" stroke="#3b82f6" strokeWidth="3"></path>
              </svg>
            </div>
            <div className="absolute top-4 left-4">
              <p className="text-xs font-bold text-on-surface-variant font-data-mono">LeoCoin Supply (7-Day Trend)</p>
            </div>
          </div>
        </div>

        {/* Side Card: Badge Creator */}
        <div className="col-span-12 lg:col-span-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/80 dark:border-zinc-800/80 shadow-[0px_4px_20px_rgba(30,41,59,0.05)]">
          <h4 className="font-headline-md text-headline-sm mb-6 font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary dark:text-amber-500">stars</span>
            Badge Creator
          </h4>
          
          <div className="space-y-4">
            <div className="relative group/badge w-24 h-24 mx-auto bg-surface-container dark:bg-zinc-800 rounded-full flex items-center justify-center border-2 border-dashed border-outline-variant hover:border-primary transition-colors cursor-pointer overflow-hidden">
              {badgeName ? (
                <div className="flex flex-col items-center justify-center p-2 text-center text-text-main h-full">
                  <img src={badgeImage} alt="Preview" className="w-10 h-10 rounded-full object-cover mb-1" />
                  <span className="text-[8px] font-bold truncate w-20 leading-tight uppercase text-primary dark:text-blue-400">{badgeName}</span>
                </div>
              ) : (
                <span className="material-symbols-outlined text-2xl text-outline-variant group-hover/badge:text-primary">add_a_photo</span>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase">Badge Name</label>
              <input 
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
                className="w-full px-4 py-2 border border-outline-variant/70 bg-surface-container-lowest dark:bg-zinc-805 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-on-surface" 
                placeholder="e.g. Early Math Wizard" 
                type="text"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase">
                <span>XP Multiplier</span>
                <span className="text-secondary dark:text-amber-500">{badgeMultiplier.toFixed(1)}x</span>
              </div>
              <input 
                type="range"
                min="1.0"
                max="3.0"
                step="0.1"
                value={badgeMultiplier}
                onChange={(e) => setBadgeMultiplier(Number(e.target.value))}
                className="w-full accent-secondary h-1 bg-surface-container dark:bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
            
            <button 
              onClick={handleCreateBadge}
              disabled={!badgeName}
              className="w-full py-3 bg-secondary dark:bg-amber-500 text-white dark:text-zinc-950 rounded-xl font-bold text-xs shadow-md hover:bg-secondary/90 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 transition-all"
            >
              Create Template
            </button>
          </div>
        </div>
      </motion.div>

      {/* Section: Item Management */}
      <motion.div variants={fadeInUp}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h3 className="font-headline-md text-headline-sm font-bold text-text-main">Inventory Controls</h3>
          <div className="flex gap-2">
            <button className="px-3.5 py-1.5 text-xs font-bold text-primary dark:text-blue-400 bg-primary/5 dark:bg-blue-500/10 rounded-lg border border-primary/10 dark:border-blue-500/20">Avatar Accessories</button>
            <button onClick={() => triggerToast("Filtering themes...")} className="px-3.5 py-1.5 text-xs font-bold text-on-surface-variant hover:bg-surface-container dark:hover:bg-zinc-800 transition-colors rounded-lg">Theme Packs</button>
            <button onClick={() => triggerToast("Filtering boosters...")} className="px-3.5 py-1.5 text-xs font-bold text-on-surface-variant hover:bg-surface-container dark:hover:bg-zinc-800 transition-colors rounded-lg">Boosters</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {inventoryItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-zinc-900 border border-outline-variant/60 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="h-40 bg-surface-container dark:bg-zinc-800 relative">
                  <img alt={item.name} className="w-full h-full object-cover" src={item.image}/>
                  {item.type && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-purple-500 text-white text-[9px] font-bold rounded uppercase tracking-wider">{item.type}</span>
                  )}
                </div>
                <div className="p-4">
                  <h5 className="font-bold text-text-main text-sm mb-1 leading-snug">{item.name}</h5>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.description}</p>
                </div>
              </div>
              <div className="p-4 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                  <span>{item.price}</span>
                </div>
                <button 
                  onClick={() => handleEditPrice(item.id, item.price)}
                  className="text-primary dark:text-blue-400 font-bold text-xs hover:underline"
                >
                  Edit Price
                </button>
              </div>
            </div>
          ))}

          {/* Create New Placeholder */}
          <div 
            onClick={() => setShowAddItemModal(true)}
            className="border-2 border-dashed border-outline-variant/60 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3 p-6 h-64 group cursor-pointer hover:border-primary dark:hover:border-blue-500 transition-all hover:bg-primary/5 dark:hover:bg-blue-500/5"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container dark:bg-zinc-800 flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-blue-500 group-hover:text-white transition-all text-on-surface-variant">
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>
            <span className="font-bold text-on-surface-variant group-hover:text-primary dark:group-hover:text-blue-400 text-sm">Add New Item</span>
          </div>
        </div>
      </motion.div>

      {/* Section: Data Table */}
      <motion.div variants={fadeInUp} className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-outline-variant/80 dark:border-zinc-800/80 shadow-[0px_4px_20px_rgba(30,41,59,0.05)] overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-zinc-900/40">
          <h4 className="font-headline-md text-headline-sm font-bold text-text-main">Reward Transaction Logs</h4>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Search users/actions..." 
              value={txSearch}
              onChange={(e) => setTxSearch(e.target.value)}
              className="px-3 py-1.5 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/60 dark:border-zinc-850 rounded-xl text-xs outline-none focus:ring-1 focus:ring-primary text-on-surface max-w-xs w-full"
            />
            <select
              value={txStatusFilter}
              onChange={(e) => setTxStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/60 dark:border-zinc-850 rounded-xl text-xs outline-none text-on-surface shrink-0"
            >
              <option value="ALL">All Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low dark:bg-zinc-800/50 border-b border-outline-variant/10 font-label-caps text-[10px] font-bold text-on-surface-variant">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Item / Action</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs">
              {filteredTxs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant font-semibold">
                    No transactions match current filters.
                  </td>
                </tr>
              ) : (
                filteredTxs.map((tx) => (
                  <tr key={tx.id} className="hover:bg-surface-container-low dark:hover:bg-zinc-800/20 transition-colors group">
                    <td className="px-6 py-4 font-data-mono text-on-surface-variant">{tx.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${tx.color}`}>{tx.initials}</div>
                        <span className="font-semibold text-text-main">{tx.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{tx.action}</td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1 font-bold ${tx.amountColor}`}>
                        <span>{tx.amount}</span>
                        <span className="material-symbols-outlined text-xs">monetization_on</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase ${tx.statusColor}`}>{tx.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-1.5 bg-surface-container dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary dark:bg-blue-600" style={{ width: tx.progress }}></div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Mint Rate Modal */}
      <AnimatePresence>
        {showMintModal && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowMintModal(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 m-auto w-80 h-fit bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/60 rounded-2xl p-6 shadow-2xl z-50 text-center"
            >
              <h3 className="font-headline-sm text-text-main font-bold mb-4">Adjust Coin Mint Rate</h3>
              <p className="text-xs text-on-surface-variant mb-6">Modify platform-wide Coin earnings multiplier. Current baseline: 1.0x.</p>
              
              <div className="flex justify-center gap-3 mb-6">
                {["1.0x", "1.2x", "1.5x", "2.0x"].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMintRate(rate)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      mintRate === rate 
                        ? "bg-primary text-white shadow-sm" 
                        : "bg-surface-container dark:bg-zinc-800 hover:bg-surface-container-high dark:hover:bg-zinc-750 text-on-surface"
                    }`}
                  >
                    {rate}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setShowMintModal(false)} className="flex-1 py-2 border border-outline-variant rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container">Cancel</button>
                <button onClick={handleAdjustMint} className="flex-1 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md">Apply Rate</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddItemModal && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowAddItemModal(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed inset-0 m-auto w-96 h-fit bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/60 rounded-2xl p-6 shadow-2xl z-50"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-sm text-text-main font-bold">Add Inventory Item</h3>
                <button onClick={() => setShowAddItemModal(false)} className="material-symbols-outlined text-outline hover:text-on-surface">close</button>
              </div>

              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-2">Item Name</label>
                  <input 
                    type="text" 
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Royal Cape"
                    required
                    className="w-full px-3 py-2 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/60 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-2">Price (LeoCoins)</label>
                  <input 
                    type="number" 
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="e.g. 5000"
                    required
                    className="w-full px-3 py-2 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/60 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-2">Description</label>
                  <textarea 
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="A brief item detail..."
                    rows={2}
                    className="w-full px-3 py-2 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/60 rounded-xl text-xs focus:ring-1 focus:ring-primary outline-none text-on-surface resize-none"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer group py-1 select-none">
                  <input 
                    type="checkbox" 
                    checked={newItemPremium}
                    onChange={(e) => setNewItemPremium(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary" 
                  />
                  <span className="text-xs text-on-surface font-semibold">Flag as Premium Item</span>
                </label>

                <div className="flex gap-2 pt-4 border-t border-outline-variant/20">
                  <button type="button" onClick={() => setShowAddItemModal(false)} className="flex-1 py-2 border border-outline-variant rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container">Cancel</button>
                  <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md">Add Item</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
