"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/app/actions/auth";

const sidebarLinks = [
  { name: "Dashboard", href: "/teacher/dashboard", icon: "dashboard" },
  { name: "Students", href: "/teacher/students", icon: "groups" },
  { name: "Assignments", href: "/teacher/assignments", icon: "assignment" },
  { name: "Learning Content", href: "/teacher/content", icon: "library_books" },
  { name: "Games", href: "/teacher/games", icon: "sports_esports" },
  { name: "Stories", href: "/teacher/stories", icon: "menu_book" },
  { name: "Analytics", href: "/teacher/analytics", icon: "analytics" },
];

export default function TeacherLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6FF] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#0F2A8A]/10 fixed h-full z-20">
        <div className="p-6">
          <Link href="/teacher/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
              L
            </div>
            <div>
              <h1 className="text-xl font-black text-[#0F2A8A] leading-tight">LeoLand</h1>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-wider">Teacher Center</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4 pb-8">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                  isActive
                    ? "bg-[#0F2A8A] text-white shadow-md shadow-[#0F2A8A]/20"
                    : "text-[#0F2A8A]/60 hover:bg-[#F4F6FF] hover:text-[#0F2A8A]"
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-[#0F2A8A]/5">
           <form action={signOut}>
             <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-colors">
                <span className="material-symbols-outlined">logout</span>
                Sign Out
             </button>
           </form>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#0F2A8A]/10 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-sm">L</div>
           <span className="font-black text-[#0F2A8A]">LeoLand</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#0F2A8A]">
           <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-white z-20 md:hidden overflow-y-auto pb-8"
          >
            <nav className="p-4 space-y-2">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-lg transition-all ${
                      isActive
                        ? "bg-[#0F2A8A] text-white shadow-md shadow-[#0F2A8A]/20"
                        : "text-[#0F2A8A]/60 hover:bg-[#F4F6FF] hover:text-[#0F2A8A]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{link.icon}</span>
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
