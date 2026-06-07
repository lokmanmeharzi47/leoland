"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Explorer", href: "/" },
    { name: "Games", href: "/games" },
    { name: "Library", href: "/library" },
    { name: "Tutor", href: "/tutor" }
  ];

  return (
    <nav className="bg-surface/80 backdrop-blur-md dark:bg-surface-container-highest/80 w-full top-0 sticky z-50 shadow-[0_8px_30px_rgb(37,99,235,0.08)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-lg h-20 w-full max-w-container-max mx-auto">
        <Link href="/" className="font-display-lg text-headline-sm text-primary dark:text-inverse-primary tracking-tight">
          LeoLand
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-md items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname?.startsWith(link.href) && link.href !== '/');
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={
                  isActive
                    ? "text-primary dark:text-inverse-primary font-bold border-b-2 border-secondary-container font-body-md text-body-md"
                    : "text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary transition-colors duration-200"
                }
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-base">
          <Link href="/login" className="hidden md:flex px-md py-sm bg-primary-container text-on-primary-container rounded-xl font-ui-button text-ui-button hover:opacity-90 active:scale-95 transition-all">
            Login
          </Link>
          <div className="flex gap-xs md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-base text-on-surface-variant hover:text-primary transition-colors active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined">{isMobileMenuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-0 w-full bg-surface shadow-lg border-t border-outline-variant/20 p-margin-mobile flex flex-col gap-sm"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname?.startsWith(link.href) && link.href !== '/');
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-sm rounded-lg hover:bg-surface-container-high ${
                    isActive ? "text-primary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link 
              href="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-sm p-sm text-center bg-primary-container text-on-primary-container rounded-xl font-ui-button font-bold"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
