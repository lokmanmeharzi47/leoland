"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, type TKey } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const navItems: { href: string; icon: string; label: TKey }[] = [
  { href: "/dashboard", icon: "home", label: "nav.home" },
  { href: "/dashboard/stories", icon: "auto_stories", label: "nav.stories" },
  { href: "/dashboard/games", icon: "sports_esports", label: "nav.games" },
  { href: "/dashboard/words", icon: "style", label: "nav.words" },
  { href: "/dashboard/tutor", icon: "pets", label: "nav.tutor" },
  { href: "/dashboard/achievements", icon: "emoji_events", label: "nav.rewards" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="bg-background min-h-screen flex flex-col text-on-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-surface/85 backdrop-blur-md h-18 w-full border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto h-full flex items-center justify-between px-margin-mobile md:px-lg py-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              pets
            </span>
            <span className="font-display-lg text-headline-sm text-primary tracking-tight">LeoLand</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stars + streak — simple, big, friendly */}
            <div className="flex items-center gap-1 bg-secondary-container/40 text-on-secondary-container px-3 py-2 rounded-full font-bold">
              <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span>1,240</span>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-lg py-md pb-32">
        {children}
      </main>

      {/* Colorful Floating Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe">
        <div className="mx-auto max-w-3xl px-4 pb-4">
          <div className="flex justify-around items-center bg-white/90 backdrop-blur-xl rounded-full shadow-[0_10px_40px_rgba(15,42,138,0.15)] border-2 border-white p-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex flex-col items-center justify-center gap-1 rounded-full px-3 py-2 min-w-[64px] transition-all duration-300 active:scale-95 ${
                    active
                      ? "text-[#0F2A8A] -translate-y-2"
                      : "text-slate-400 hover:text-[#0F2A8A] hover:bg-slate-50"
                  }`}
                >
                  {active && (
                    <div className="absolute inset-0 bg-[#F5B21B] rounded-full shadow-[0_8px_20px_rgba(245,178,27,0.5)] -z-10"></div>
                  )}
                  <span
                    className="material-symbols-outlined text-[28px] drop-shadow-sm"
                    style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${active ? "text-[#0F2A8A]" : ""}`}>{t(item.label)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
