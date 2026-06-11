"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

// The three languages LeoLand supports — for BOTH the interface and the learning content.
export type Lang = "en" | "fr" | "ar";

export const LANGUAGES: { code: Lang; native: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", native: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "fr", native: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "ar", native: "العربية", flag: "🇸🇦", dir: "rtl" },
];

// UI strings. Add keys here as new screens are built.
const dict = {
  en: {
    "shell.tagline": "Let's learn!",
    "nav.home": "Home",
    "nav.library": "Library",
    "nav.rapport": "Progress",
    "nav.games": "Games",
    "nav.words": "Words",
    "nav.tutor": "Leo",
    "nav.rewards": "Rewards",
    "home.hello": "Hi, {name}!",
    "home.sub": "What do you want to do today?",
    "home.start": "Start Learning",
    "home.continue": "Keep Learning",
    "home.pickLanguage": "I want to learn…",
    "home.dailyGoal": "Today's Goal",
    "home.tasksDone": "{done} of {total} done",
    "home.keepGoing": "You're doing great! 🌟",
    "card.stories": "Read fun stories",
    "card.games": "Play & learn",
    "card.words": "Learn new words",
    "card.tutor": "Talk to Leo",
    "card.rewards": "See your stars",
    "words.title": "Word Cards",
    "words.tapToHear": "Tap the card to hear it",
    "words.next": "Next",
    "words.prev": "Back",
    "words.know": "I know it!",
    "words.again": "Practice again",
    "common.points": "Stars",
    "common.streak": "Day streak",
    "lang.switch": "Language",
  },
  fr: {
    "shell.tagline": "Apprenons !",
    "nav.home": "Accueil",
    "nav.library": "Bibliothèque",
    "nav.rapport": "Progrès",
    "nav.games": "Jeux",
    "nav.words": "Mots",
    "nav.tutor": "Leo",
    "nav.rewards": "Cadeaux",
    "home.hello": "Salut, {name} !",
    "home.sub": "Que veux-tu faire aujourd'hui ?",
    "home.start": "Commencer",
    "home.continue": "Continuer",
    "home.pickLanguage": "Je veux apprendre…",
    "home.dailyGoal": "Objectif du jour",
    "home.tasksDone": "{done} sur {total} faits",
    "home.keepGoing": "Tu es super ! 🌟",
    "card.stories": "Lis des histoires",
    "card.games": "Joue et apprends",
    "card.words": "Apprends des mots",
    "card.tutor": "Parle à Leo",
    "card.rewards": "Tes étoiles",
    "words.title": "Cartes de mots",
    "words.tapToHear": "Touche la carte pour écouter",
    "words.next": "Suivant",
    "words.prev": "Retour",
    "words.know": "Je le sais !",
    "words.again": "Réviser encore",
    "common.points": "Étoiles",
    "common.streak": "Jours de suite",
    "lang.switch": "Langue",
  },
  ar: {
    "shell.tagline": "هيا نتعلّم!",
    "nav.home": "الرئيسية",
    "nav.library": "المكتبة",
    "nav.rapport": "التقدم",
    "nav.games": "الألعاب",
    "nav.words": "الكلمات",
    "nav.tutor": "ليو",
    "nav.rewards": "المكافآت",
    "home.hello": "مرحباً يا {name}!",
    "home.sub": "ماذا تريد أن تفعل اليوم؟",
    "home.start": "ابدأ التعلّم",
    "home.continue": "أكمل التعلّم",
    "home.pickLanguage": "أريد أن أتعلّم…",
    "home.dailyGoal": "هدف اليوم",
    "home.tasksDone": "{done} من {total}",
    "home.keepGoing": "أحسنت! 🌟",
    "card.stories": "اقرأ قصصاً ممتعة",
    "card.games": "العب وتعلّم",
    "card.words": "تعلّم كلمات جديدة",
    "card.tutor": "تحدّث مع ليو",
    "card.rewards": "نجومك",
    "words.title": "بطاقات الكلمات",
    "words.tapToHear": "اضغط على البطاقة لتسمعها",
    "words.next": "التالي",
    "words.prev": "السابق",
    "words.know": "أعرفها!",
    "words.again": "تدرّب مرة أخرى",
    "common.points": "النجوم",
    "common.streak": "أيام متتالية",
    "lang.switch": "اللغة",
  },
} as const;

export type TKey = keyof (typeof dict)["en"];

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: TKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "leoland.lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore saved language on mount (client-only to avoid hydration mismatch).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && ["en", "fr", "ar"].includes(saved)) setLangState(saved);
  }, []);

  // Keep <html lang> and <html dir> in sync with the chosen language.
  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (key: TKey, vars?: Record<string, string | number>) => {
      let str: string = dict[lang][key] ?? dict.en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(`{${k}}`, String(v));
        }
      }
      return str;
    },
    [lang]
  );

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
