"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function UserManagementPage() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [langFilter, setLangFilter] = useState("All Languages");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [subFilter, setSubFilter] = useState("All Subscriptions");

  // Inline editing state inside details panel
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLang, setEditLang] = useState("");
  const [editSub, setEditSub] = useState("");

  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Leo Thompson",
      email: "leo.t@edu.leoland.com",
      role: "Student",
      roleColor: "bg-blue-500/10 text-blue-500",
      language: "English / Spanish",
      status: "Active",
      statusColor: "bg-success/10 text-success",
      statusDot: "bg-success",
      progressWidth: "78%",
      progressColor: "bg-amber-500",
      level: "Lvl 24",
      sub: "Premium Plus",
      joined: "Sep 12, 2023",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMhwgq0_K4ahTMfMtzus1z6CbKHXy0MQ39ncjwOBj1FD0grMzF57T5CF6LvxejI0A4RAkfQAoHRToLffOfXmmW5xnF610zIbbXAsB8GSKqJEHcuQ2-Yr2OG1Zoa0ZrEbfAegjO0pg2pmD_H_qJ0UHzx-sEl7-NGpZEyHfwZ6GYAO6WE7q-BG3UWnj-eYh4gje6pVxhReEC-FapkbydLwnNgCbienMtodG0X_hRPvofJ_INCo0zAAevZO9gmw1ORoWHaxqRmAvi4wO6"
    },
    {
      id: 2,
      name: "Dr. Sarah Jenkins",
      email: "s.jenkins@academy.org",
      role: "Teacher",
      roleColor: "bg-amber-500/10 text-amber-500",
      language: "English",
      status: "Active",
      statusColor: "bg-success/10 text-success",
      statusDot: "bg-success",
      progressWidth: "92%",
      progressColor: "bg-amber-500",
      level: "Elite",
      sub: "Standard",
      joined: "Jul 28, 2022",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVph1RkTP7apPTw1tCK-p9LYE4FYbuJ4DGIwuTGXYgyPU4Ftgfzj8t8_962RJrKqNYYeqKpTk5nD896RJEJXueBuUoF2JRSfq3x7ksx_IX1IRwSQIlyRCEJk7h_lVOfNFJyWZqHxZ1rglC2lrqa-wJKYwzwE_ymsvKCIZrTJuW5hrByEoYaJ45fNQaeoIfNbbKmWR2blsY3zTzdyKoQniBrvLuqdRv6Qe-KPsSUlrt0mbcQ3xUG3O97_rXkA8GRdnLdzwIVeluE-X2"
    },
    {
      id: 3,
      name: "Marcus Vane",
      email: "mvane@provider.net",
      role: "Parent",
      roleColor: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
      language: "Mandarin / English",
      status: "Suspended",
      statusColor: "bg-red-500/10 text-red-500",
      statusDot: "bg-red-500",
      progressWidth: "0%",
      progressColor: "bg-transparent",
      level: "N/A",
      sub: "Premium Plus",
      joined: "Oct 01, 2023",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs5Q0XrcqlS1KQoOVg-kS-Wn-6kGIXp7QErV3Go7YWevytvI_HHtBBRu8gq7aXqXRQnefETD76em8fSB2xMMIrRlsdW7l0eCfLTjjqIzmLa6xCHFJEa6LfOkqLEqAsXTEPTxbhMf662xTwM2G_ONuCErZkTptEJBPQVm58HF8v5RP-ngj0pb_39kGq_ELMy7Hynhxq03QT1ktgWuK6pRgPIKaXgWeN6xTOdLWBOHsnbp213xI_bx8I5CXMAvf4eVq-WF0V-vDfmYXi"
    },
    {
      id: 4,
      name: "Sophie Dubois",
      email: "sophie.d@lycee.fr",
      role: "Student",
      roleColor: "bg-blue-500/10 text-blue-500",
      language: "French / English",
      status: "Pending",
      statusColor: "bg-amber-500/10 text-amber-500",
      statusDot: "bg-amber-500",
      progressWidth: "45%",
      progressColor: "bg-amber-500",
      level: "Lvl 12",
      sub: "Free Tier",
      joined: "Jan 15, 2024",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDd7wqtW92Dz18nmmSbz4N-T0b6aO86fsEoEO13lCB2NoTUh9PB23O0nJSl1ksrbWaHmPrwCwT9q8MCg2MfemctD2DZ7DpKsiOMkLl7StDXF9fFAphHIiXMCRYsyWJhdIRTYT8t3_ddkQ9IIJeZu0MGpEbibVtnKPURhD_XbivFF51PHsIXOn_hEwabEGyEQn28hOXPVhQufpFYuKxlGkyrxIP-lUOrsH0d1sUKaugdptnahqthwdnGksPNb_udNF_JYdSyAUCox_o"
    },
    {
      id: 5,
      name: "Kenji Tanaka",
      email: "k.tanaka@tokyo.edu",
      role: "Teacher",
      roleColor: "bg-amber-500/10 text-amber-500",
      language: "Japanese",
      status: "Active",
      statusColor: "bg-success/10 text-success",
      statusDot: "bg-success",
      progressWidth: "85%",
      progressColor: "bg-amber-500",
      level: "Elite",
      sub: "Premium Plus",
      joined: "Nov 09, 2022",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqQ2ikvD9FEWmeMJE9hzj0Z5baC5oMMz0aSo8F0ROf4KjqrChr2Ob94qeSg43hNnE8lRjs-p6bBQ53ph98LDwDIFrWPFBeTZMUrVIqxiltb_bTK5HPJadTjsptFfqWUcY70HM2MolahxeEPBg58ERx46JFjq1PRfhgK_pgUZGpx17ZwG8AvnJq4rivSY23z4gLUu6Y-lwILA-9-yygm3_G7bUjtcyFqgxTeA6FSD8LcKn7xdYgLcOwUzC64zMV2rsf1gfglrqBdIr7"
    }
  ]);

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditLang(user.language);
    setEditSub(user.sub);
    setIsEditing(false);
    setIsDetailOpen(true);
  };

  const handleStatusToggle = () => {
    if (!selectedUser) return;
    const isSuspended = selectedUser.status === "Suspended";
    const nextStatus = isSuspended ? "Active" : "Suspended";
    const nextColor = isSuspended ? "bg-success/10 text-success" : "bg-red-500/10 text-red-500";
    const nextDot = isSuspended ? "bg-success" : "bg-red-500";

    const updatedUser = {
      ...selectedUser,
      status: nextStatus,
      statusColor: nextColor,
      statusDot: nextDot
    };

    setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser);
    triggerToast(`User "${selectedUser.name}" ${isSuspended ? "activated" : "suspended"} successfully.`);
  };

  const handleSaveChanges = () => {
    if (!selectedUser) return;
    const updatedUser = {
      ...selectedUser,
      name: editName,
      email: editEmail,
      language: editLang,
      sub: editSub
    };

    setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser);
    setIsEditing(false);
    triggerToast("User profile updated successfully!");
  };

  // Filter Logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLang = 
      langFilter === "All Languages" || 
      user.language.toLowerCase().includes(langFilter.replace("Only", "").trim().toLowerCase());

    const matchesStatus = 
      statusFilter === "All Statuses" || 
      user.status.toLowerCase() === statusFilter.replace("Only", "").trim().toLowerCase();

    const matchesSub = 
      subFilter === "All Subscriptions" || 
      user.sub.toLowerCase() === subFilter.trim().toLowerCase();

    return matchesSearch && matchesLang && matchesStatus && matchesSub;
  });

  const activeCount = users.filter(u => u.status === "Active").length;

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
      <motion.nav variants={fadeInUp} className="flex items-center gap-2 text-xs font-semibold text-outline">
        <span className="font-label-caps text-[10px] uppercase">PLATFORM</span>
        <span className="text-outline-variant">/</span>
        <span className="font-label-caps text-[10px] uppercase">USER MANAGEMENT</span>
        <span className="text-outline-variant">/</span>
        <span className="font-label-caps text-primary dark:text-blue-400 font-bold text-[10px] uppercase">DIRECTORY</span>
      </motion.nav>

      <motion.div variants={fadeInUp} className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-text-main font-bold">User Directory</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Manage {users.length} mock members ({activeCount} active now) across LeoLand.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-xl border border-outline-variant flex items-center gap-3 shadow-sm select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-success"></span>
            <span className="font-body-sm text-xs text-on-surface-variant font-bold">{activeCount} Active Now</span>
          </div>
        </div>
      </motion.div>

      {/* Filters & Bento Header */}
      <motion.div variants={fadeInUp} className="grid grid-cols-12 gap-6">
        {/* Filter Card */}
        <div className="col-span-12 lg:col-span-9 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-outline-variant/80 dark:border-zinc-800/80 p-6 shadow-[0_4px_20px_rgba(30,41,59,0.05)]">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant mb-2">SEARCH NAME OR EMAIL</label>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/60 dark:border-zinc-850 text-xs rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-on-surface" 
                placeholder="e.g. Leo..." 
                type="text"
              />
            </div>
            
            <div className="w-40">
              <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant mb-2">LANGUAGE</label>
              <select 
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/60 dark:border-zinc-850 text-xs rounded-xl focus:ring-2 focus:ring-primary outline-none text-on-surface"
              >
                <option>All Languages</option>
                <option>English</option>
                <option>Spanish</option>
                <option>Mandarin</option>
                <option>French</option>
                <option>Japanese</option>
              </select>
            </div>

            <div className="w-40">
              <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant mb-2">STATUS</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/60 dark:border-zinc-850 text-xs rounded-xl focus:ring-2 focus:ring-primary outline-none text-on-surface"
              >
                <option>All Statuses</option>
                <option>Active Only</option>
                <option>Pending</option>
                <option>Suspended</option>
              </select>
            </div>

            <div className="w-40">
              <label className="block font-label-caps text-[10px] font-bold text-on-surface-variant mb-2">SUBSCRIPTION</label>
              <select 
                value={subFilter}
                onChange={(e) => setSubFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-surface-container-low dark:bg-zinc-800 border border-outline-variant/60 dark:border-zinc-850 text-xs rounded-xl focus:ring-2 focus:ring-primary outline-none text-on-surface"
              >
                <option>All Subscriptions</option>
                <option>Premium Plus</option>
                <option>Standard</option>
                <option>Free Tier</option>
              </select>
            </div>
            
            <div className="self-end pb-0.5">
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setLangFilter("All Languages");
                  setStatusFilter("All Statuses");
                  setSubFilter("All Subscriptions");
                  triggerToast("Filters Reset");
                }}
                className="p-3 bg-surface-container-highest dark:bg-zinc-850 text-on-surface rounded-xl hover:bg-surface-dim transition-colors text-xs font-semibold"
                title="Clear Filters"
              >
                <span className="material-symbols-outlined text-[18px]">filter_list_off</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="col-span-12 lg:col-span-3 bg-secondary-container dark:bg-amber-950/20 rounded-2xl p-6 text-on-secondary-container border border-amber-500/10 shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="font-label-caps text-[10px] font-bold opacity-80 mb-1">XP POOL TREND</p>
            <h3 className="font-headline-md text-headline-md font-bold text-secondary dark:text-amber-400">+14.2%</h3>
            <p className="text-xs opacity-90 mt-2">Platform activity is rising</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 dark:opacity-20 transform group-hover:scale-110 transition-transform duration-500 text-secondary dark:text-amber-400">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
          </div>
        </div>
      </motion.div>

      {/* Main Data Table Container */}
      <motion.div variants={fadeInUp} className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-outline-variant/80 dark:border-zinc-800/80 shadow-[0_4px_20px_rgba(30,41,59,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low dark:bg-zinc-800/50">
                <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-on-surface-variant border-b border-outline-variant/10">USER</th>
                <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-on-surface-variant border-b border-outline-variant/10">ROLE</th>
                <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-on-surface-variant border-b border-outline-variant/10">LANGUAGE</th>
                <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-on-surface-variant border-b border-outline-variant/10">STATUS</th>
                <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-on-surface-variant border-b border-outline-variant/10">PROGRESS</th>
                <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-on-surface-variant border-b border-outline-variant/10 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container dark:divide-zinc-800/50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant text-sm font-semibold">
                    No users match current search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-bright dark:hover:bg-zinc-800/20 transition-colors cursor-pointer group" onClick={() => handleRowClick(user)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img className="w-10 h-10 rounded-full object-cover border border-outline-variant/50" src={user.image} alt={user.name} />
                        <div>
                          <p className="font-bold text-text-main group-hover:text-primary dark:group-hover:text-blue-400 transition-colors text-sm">{user.name}</p>
                          <p className="text-[11px] text-on-surface-variant">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.roleColor}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-on-surface-variant">{user.language}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-bold ${user.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.statusDot}`}></span> {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.level !== "N/A" ? (
                          <>
                            <div className="w-24 h-1.5 bg-surface-container dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div className={`h-full ${user.progressColor}`} style={{ width: user.progressWidth }}></div>
                            </div>
                            <span className="text-[11px] font-bold font-data-mono text-on-surface-variant">{user.level}</span>
                          </>
                        ) : (
                          <span className="text-[11px] font-data-mono text-on-surface-variant">N/A</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleRowClick(user)}
                        className="p-1.5 text-on-surface-variant hover:text-primary dark:hover:text-blue-400 hover:bg-surface-container dark:hover:bg-zinc-800 rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-surface-container-low dark:bg-zinc-850/50 flex justify-between items-center border-t border-outline-variant/10 text-xs">
          <span className="font-semibold text-on-surface-variant">Showing {filteredUsers.length} of {users.length} mock entries</span>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-surface-container dark:hover:bg-zinc-800 rounded-lg"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
            <button className="px-3 py-1 bg-primary text-white rounded-lg font-bold">1</button>
            <button className="p-1.5 hover:bg-surface-container dark:hover:bg-zinc-800 rounded-lg"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
          </div>
        </div>
      </motion.div>

      {/* Detail Sidebar */}
      <AnimatePresence>
        {isDetailOpen && selectedUser && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsDetailOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white dark:bg-zinc-900 border-l border-outline-variant/80 dark:border-zinc-800 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-white/50 dark:bg-zinc-900/50">
                <h3 className="font-headline-sm text-headline-sm font-bold text-text-main">{selectedUser.role} Profile</h3>
                <button className="p-2 hover:bg-surface-container dark:hover:bg-zinc-800 rounded-full transition-colors text-on-surface-variant" onClick={() => setIsDetailOpen(false)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8" style={{ scrollbarWidth: 'thin' }}>
                {/* Profile Header */}
                <div className="flex items-start gap-5">
                  <img className="w-20 h-20 rounded-2xl border-2 border-surface-container dark:border-zinc-800 shadow-sm object-cover" src={selectedUser.image} alt={selectedUser.name} />
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full text-sm font-bold bg-surface-container-low dark:bg-zinc-800 border border-outline-variant rounded-md px-2 py-1 outline-none text-on-surface"
                        />
                        <input 
                          type="email" 
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full text-xs bg-surface-container-low dark:bg-zinc-800 border border-outline-variant rounded-md px-2 py-1 outline-none text-on-surface"
                        />
                      </div>
                    ) : (
                      <>
                        <h4 className="font-headline-md text-headline-sm font-bold text-text-main leading-tight">{selectedUser.name}</h4>
                        <p className="text-xs text-on-surface-variant mt-1">{selectedUser.email}</p>
                      </>
                    )}
                    
                    <p className="text-[11px] text-on-surface-variant font-semibold mt-2">Joined: {selectedUser.joined}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {isEditing ? (
                          <select 
                            value={editSub}
                            onChange={(e) => setEditSub(e.target.value)}
                            className="bg-transparent text-[10px] font-bold uppercase text-amber-500 outline-none cursor-pointer"
                          >
                            <option value="Premium Plus">Premium Plus</option>
                            <option value="Standard">Standard</option>
                            <option value="Free Tier">Free Tier</option>
                          </select>
                        ) : selectedUser.sub}
                      </span>
                      {selectedUser.level !== "N/A" && (
                        <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-500 rounded-full text-[10px] font-bold uppercase tracking-wider">{selectedUser.level}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edit Form Fields for language */}
                {isEditing && (
                  <div className="p-4 bg-surface-container-low dark:bg-zinc-800/35 rounded-xl border border-outline-variant/30 space-y-3">
                    <label className="block text-[10px] font-bold text-on-surface-variant uppercase">Language Spoken</label>
                    <input 
                      type="text" 
                      value={editLang}
                      onChange={(e) => setEditLang(e.target.value)}
                      className="w-full text-xs bg-white dark:bg-zinc-900 border border-outline-variant rounded-md px-3 py-2 outline-none text-on-surface"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                      <button onClick={() => setIsEditing(false)} className="px-3 py-1 border border-outline-variant text-[10px] font-bold rounded-lg text-on-surface">Cancel</button>
                      <button onClick={handleSaveChanges} className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg shadow-sm">Save Profile</button>
                    </div>
                  </div>
                )}

                {/* Progress Charts */}
                {selectedUser.level !== "N/A" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-label-caps text-[10px] font-bold text-on-surface-variant uppercase">LEARNING VELOCITY</h5>
                      <span className="text-[11px] font-bold text-success">+12% vs last month</span>
                    </div>
                    <div className="h-32 w-full bg-surface-container-low dark:bg-zinc-800/20 rounded-2xl border border-outline-variant/10 relative overflow-hidden flex items-end px-4 gap-2 pb-2">
                      <div className="flex-1 bg-primary/20 dark:bg-blue-500/20 h-12 rounded-t hover:bg-primary/45 transition-colors"></div>
                      <div className="flex-1 bg-primary/30 dark:bg-blue-500/30 h-16 rounded-t hover:bg-primary/45 transition-colors"></div>
                      <div className="flex-1 bg-primary/40 dark:bg-blue-500/40 h-24 rounded-t hover:bg-primary/45 transition-colors"></div>
                      <div className="flex-1 bg-primary/20 dark:bg-blue-500/20 h-18 rounded-t hover:bg-primary/45 transition-colors"></div>
                      <div className="flex-1 bg-primary/50 dark:bg-blue-500/50 h-28 rounded-t hover:bg-primary/45 transition-colors"></div>
                      <div className="flex-1 bg-primary dark:bg-blue-500 h-24 rounded-t hover:bg-primary/90 transition-colors"></div>
                      <div className="flex-1 bg-primary/60 dark:bg-blue-500/60 h-20 rounded-t hover:bg-primary/80 transition-colors"></div>
                    </div>
                  </div>
                )}

                {/* Activity Log */}
                <div className="space-y-4">
                  <h5 className="font-label-caps text-[10px] font-bold text-on-surface-variant uppercase">RECENT ACTIVITY LOG</h5>
                  <div className="space-y-3">
                    <div className="flex gap-4 p-4 rounded-2xl bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/80 dark:border-zinc-800 hover:translate-x-1 transition-transform cursor-pointer shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center text-primary dark:text-blue-400 flex-shrink-0">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-main">Completed "Advanced Geometry" Module</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">2 hours ago • +500 XP Earned</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-2xl bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/80 dark:border-zinc-800 hover:translate-x-1 transition-transform cursor-pointer shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 dark:bg-amber-500/10 flex items-center justify-center text-secondary dark:text-amber-400 flex-shrink-0">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-main">Spent 200 LeoCoins</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">Yesterday • Avatar Skin: "Neon Tiger"</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Linked Accounts */}
                {selectedUser.role === "Student" && (
                  <div className="space-y-4">
                    <h5 className="font-label-caps text-[10px] font-bold text-on-surface-variant uppercase">LINKED PARENT ACCOUNTS</h5>
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-outline-variant/60 dark:border-zinc-800 bg-surface-container-lowest dark:bg-zinc-900">
                      <img className="w-12 h-12 rounded-full object-cover border border-outline-variant/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzQSR1HzNqXG_K5DdzZulBwa6WxeBczzibWkRjwGMGzbVYzv9A1R_pvaZnIB6yzrWoIQdpwrq6wIIcAaflRUB6gX9ByDRzsFl8LKybbs7aJ6vPigATiqg3HUl_a8Z0rKJ4m-rhw-sYQX0ulCoXzuDhg0O_f7WtHnJf7TKF56PXXOAnuGgnAZ0fkgOrjWMQIp_iNT9VErAygmQY0JtpfJkxMio-KqYW6wPOdMklgMvnB5ExzTClkYIP6ssy-rlWKysgce35q_oxPE4_" alt="Parent" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-text-main">Robert Thompson</p>
                        <p className="text-[10px] text-on-surface-variant">Primary Billing Contact</p>
                      </div>
                      <button onClick={() => triggerToast("Navigating parent management panel...")} className="text-primary dark:text-blue-400 font-bold text-xs hover:underline">MANAGE</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-outline-variant/20 grid grid-cols-2 gap-4 bg-surface-container-low dark:bg-zinc-900/90 z-10">
                <button 
                  onClick={handleStatusToggle}
                  className="w-full py-3 bg-red-600 text-white font-bold rounded-xl text-xs hover:bg-red-500 shadow-md transition-all active:scale-98"
                >
                  {selectedUser.status === "Suspended" ? "ACTIVATE ACCOUNT" : "SUSPEND ACCOUNT"}
                </button>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 bg-primary dark:bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md hover:scale-[1.02] active:scale-98 transition-all"
                >
                  EDIT PROFILE
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
