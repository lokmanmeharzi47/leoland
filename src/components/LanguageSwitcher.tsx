"use client";

import { useState, useRef, useEffect } from "react";
import { LANGUAGES, useLanguage } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  // Close when clicking outside.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("lang.switch")}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-surface-container-high text-on-surface font-bold active:scale-95 transition-transform"
      >
        <span className="text-xl leading-none">{current.flag}</span>
        <span className="hidden sm:inline text-body-md">{current.native}</span>
        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
          expand_more
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-2 w-44 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/20 p-2 z-50"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              role="menuitemradio"
              aria-checked={l.code === lang}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-start transition-colors ${
                l.code === lang
                  ? "bg-primary-container text-on-primary-container font-bold"
                  : "hover:bg-surface-container-high text-on-surface"
              }`}
            >
              <span className="text-2xl leading-none">{l.flag}</span>
              <span className="text-body-md">{l.native}</span>
              {l.code === lang && (
                <span className="material-symbols-outlined ms-auto text-[20px]">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
