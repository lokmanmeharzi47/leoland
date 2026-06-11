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
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border-2 border-[#0F2A8A]/10 text-[#0F2A8A] font-black active:scale-95 transition-transform shadow-sm"
      >
        <span className="text-xl leading-none">{current.flag}</span>
        <span className="hidden sm:inline text-sm">{current.native}</span>
        <span className="material-symbols-outlined text-[#0F2A8A]/50 text-[20px]">
          expand_more
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 mt-2 w-44 bg-white rounded-2xl shadow-[0_10px_30px_rgba(15,42,138,0.15)] border-2 border-[#0F2A8A]/10 p-2 z-50"
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
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-start transition-colors font-bold ${
                l.code === lang
                  ? "bg-[#0F2A8A] text-white"
                  : "hover:bg-[#0F2A8A]/5 text-[#0F2A8A]"
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
