"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", emoji: "🏠", href: "/" },
  { name: "Games", emoji: "🎮", href: "/games" },
  { name: "Library", emoji: "📚", href: "/library" },
  { name: "Leo", emoji: "🦁", href: "/tutor" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6 pt-3">
        <div className="flex items-center justify-between gap-2 rounded-full bg-white/85 backdrop-blur-xl border-4 border-white px-3 md:px-5 h-16 shadow-[0_10px_30px_rgba(15,42,138,0.12)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <motion.span
              animate={{ rotate: [0, -10, 0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="text-3xl leading-none"
            >
              🦁
            </motion.span>
            <span className="text-2xl font-black text-[#0F2A8A] tracking-tight">
              Leo<span className="text-[#F5B21B]">Land</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center gap-1.5 px-3 py-2 rounded-full font-black text-sm transition-all ${
                    active ? "bg-[#0F2A8A] text-white shadow-[0_4px_0_#0a1d61]" : "text-[#0F2A8A]/70 hover:bg-[#0F2A8A]/5 hover:text-[#0F2A8A]"
                  }`}
                >
                  <span className="text-lg leading-none transition-transform group-hover:scale-125 group-hover:-rotate-6">{link.emoji}</span>
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#F5B21B] text-[#0F2A8A] px-5 py-2.5 font-black text-sm shadow-[0_5px_0_#d97706] hover:translate-y-0.5 hover:shadow-[0_3px_0_#d97706] active:translate-y-1 active:shadow-none transition-all"
            >
              Start Adventure
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-[#0F2A8A] text-white active:scale-95 transition-transform"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-auto max-w-7xl px-4 mt-2"
          >
            <div className="rounded-[28px] bg-white border-4 border-white shadow-[0_10px_30px_rgba(15,42,138,0.15)] p-3 grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black ${
                      active ? "bg-[#0F2A8A] text-white" : "text-[#0F2A8A]/80 bg-[#0F2A8A]/5"
                    }`}
                  >
                    <span className="text-xl">{link.emoji}</span>
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="col-span-2 flex items-center justify-center gap-1.5 rounded-2xl bg-[#F5B21B] text-[#0F2A8A] px-5 py-3 font-black shadow-[0_5px_0_#d97706]"
              >
                Start Adventure 🚀
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
