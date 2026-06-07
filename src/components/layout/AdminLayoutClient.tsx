"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTimeout(() => {
        setTheme(savedTheme);
      }, 0);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTimeout(() => {
        setTheme("dark");
      }, 0);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: "dashboard" },
    { href: "/admin/courses", label: "Course Builder", icon: "menu_book" },
    { href: "/admin/learning-paths", label: "Learning Paths", icon: "route" },
    { href: "/admin/users", label: "Users", icon: "group" },
    { href: "/admin/ai", label: "AI Content", icon: "psychology" },
    { href: "/admin/rewards", label: "Rewards", icon: "monetization_on" },
    { href: "/admin/lesson-builder", label: "Lesson Builder", icon: "edit_note" },
  ];

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex transition-colors duration-200">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-[260px] bg-surface-container/80 dark:bg-zinc-950/80 backdrop-blur-xl border-r border-outline-variant/30 z-50 flex flex-col py-6 transition-transform duration-300 ease-in-out shrink-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="px-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-blue-500">LeoLand Admin</h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mt-1">Enterprise Console</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 hover:bg-surface-container-highest rounded-lg text-on-surface-variant"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:translate-x-1 ${
                  isActive
                    ? "text-primary dark:text-blue-400 font-bold border-l-4 border-primary dark:border-blue-400 bg-primary/5 dark:bg-blue-500/10"
                    : "text-on-surface-variant font-medium hover:bg-surface-container-highest hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-body-md">{item.label}</span>
              </Link>
            );
          })}
          
          <div className="h-px bg-outline-variant/20 my-4" />
          
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant font-medium hover:bg-surface-container-highest hover:text-on-surface transition-all duration-200 hover:translate-x-1"
          >
            <span className="material-symbols-outlined">exit_to_app</span>
            <span className="font-body-md">Back to App</span>
          </Link>
        </nav>

        <div className="px-6 mt-auto">
          <button className="w-full py-3 bg-secondary text-white dark:text-zinc-950 font-bold rounded-xl flex items-center justify-center gap-2 mb-6 hover:scale-102 hover:shadow-lg hover:shadow-secondary/20 transition-all shadow-md active:scale-98">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>upgrade</span>
            Level Up System
          </button>
          
          <div className="space-y-1 border-t border-outline-variant/30 pt-4">
            <a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant font-medium hover:text-primary dark:hover:text-blue-400 transition-colors" href="#">
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="font-label-caps text-xs">Support</span>
            </a>
            <Link className="flex items-center gap-3 px-4 py-2 text-on-surface-variant font-medium hover:text-error transition-colors" href="/login">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="font-label-caps text-xs">Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area Container */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top AppBar */}
        <header className="sticky top-0 z-30 w-full flex justify-between items-center h-[64px] px-6 md:px-8 bg-surface-container-lowest/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-outline-variant/20 shadow-sm transition-colors duration-200">
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-surface-container-low dark:hover:bg-zinc-800 rounded-lg text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            
            <div className="relative group max-w-xs w-full hidden sm:block">
              <span className="absolute inset-y-0 left-3 flex items-center text-outline">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </span>
              <input
                className="pl-10 pr-4 py-1.5 bg-surface-container-low dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-primary w-full text-body-sm transition-all outline-none text-on-surface"
                placeholder="Search analytics..."
                type="text"
              />
            </div>
            
            <nav className="hidden md:flex gap-6 ml-4">
              <Link
                className={`py-5 text-body-sm font-semibold border-b-2 transition-colors ${
                  pathname === "/admin"
                    ? "text-primary dark:text-blue-400 border-primary dark:border-blue-400"
                    : "text-on-surface-variant border-transparent hover:text-primary dark:hover:text-blue-400"
                }`}
                href="/admin"
              >
                Dashboard
              </Link>
              <Link
                className={`py-5 text-body-sm font-semibold border-b-2 transition-colors ${
                  pathname.startsWith("/admin/courses")
                    ? "text-primary dark:text-blue-400 border-primary dark:border-blue-400"
                    : "text-on-surface-variant border-transparent hover:text-primary dark:hover:text-blue-400"
                }`}
                href="/admin/courses"
              >
                Analytics
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <span className="font-label-caps text-on-surface-variant text-[11px] hidden lg:inline bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant/30">
              Role: Admin
            </span>
            
            <div className="flex items-center gap-0.5 mr-1 md:mr-2">
              <button className="p-2 hover:bg-surface-container-low dark:hover:bg-zinc-800 rounded-full transition-colors relative text-on-surface-variant">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-surface-container-low dark:hover:bg-zinc-800 rounded-full transition-colors text-on-surface-variant"
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                <span className="material-symbols-outlined">
                  {theme === "light" ? "dark_mode" : "light_mode"}
                </span>
              </button>
            </div>
            
            <button className="bg-primary hover:bg-primary-container dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-body-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0">
              Create New
            </button>
            
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/50 cursor-pointer shrink-0">
              <img
                alt="User Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqQ2ikvD9FEWmeMJE9hzj0Z5baC5oMMz0aSo8F0ROf4KjqrChr2Ob94qeSg43hNnE8lRjs-p6bBQ53ph98LDwDIFrWPFBeTZMUrVIqxiltb_bTK5HPJadTjsptFfqWUcY70HM2MolahxeEPBg58ERx46JFjq1PRfhgK_pgUZGpx17ZwG8AvnJq4rivSY23z4gLUu6Y-lwILA-9-yygm3_G7bUjtcyFqgxTeA6FSD8LcKn7xdYgLcOwUzC64zMV2rsf1gfglrqBdIr7"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
