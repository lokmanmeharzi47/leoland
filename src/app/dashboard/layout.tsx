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

      {/* Big, kid-friendly bottom navigation (all screen sizes) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe">
        <div className="mx-auto max-w-2xl px-3 pb-3">
          <div className="flex justify-around items-center bg-surface-container-lowest/95 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-outline-variant/15 p-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2 min-w-[52px] transition-all active:scale-90 ${
                    active
                      ? "bg-primary-container text-on-primary-container"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[26px]"
                    style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-bold leading-none">{t(item.label)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
