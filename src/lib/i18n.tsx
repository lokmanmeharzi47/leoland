"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Lang = "en" | "fr" | "ar";

export const LANGUAGES: { code: Lang; native: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", native: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "fr", native: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "ar", native: "العربية", flag: "🇸🇦", dir: "rtl" },
];

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
    "words.categories": "Categories",
    "words.all": "All",
    "words.empty": "You haven't learned any words yet. Start a lesson to unlock words!",
    
    "achievements.title": "Treasure Kingdom",
    "achievements.sub": "Track your progress and unlock rewards.",
    "achievements.currentLevel": "Level {level}",
    "achievements.nextReward": "Next Reward in {xp} XP",
    "achievements.badges": "Your Badges",
    "achievements.locked": "Locked",
    "achievements.unlocked": "Unlocked",
    "achievements.empty": "Complete lessons and games to earn badges!",

    "games.title": "Game Center",
    "games.sub": "Play and earn XP",
    "games.libraryTitle": "Game Library",
    "games.play": "Play Now",
    "games.xpEarned": "XP",
    "games.empty": "No games available right now. Check back later!",
    "games.recent": "Recently Played",
    
    "stories.title": "Story Library",
    "stories.sub": "Discover magical adventures",
    "stories.read": "Read Now",
    "stories.featured": "Featured Stories",
    "stories.continue": "Continue Reading",
    "stories.empty": "No stories available right now. Check back later!",
    "stories.storyOfDay": "Story of the Day",

    "lessons.title": "My Learning Path",
    "lessons.sub": "Continue your curriculum and unlock new worlds.",
    "lessons.kingdoms": "Language Kingdoms",
    "lessons.enterCourse": "Enter Course",
    "lessons.upcoming": "Upcoming Live Sessions",
    "lessons.badges": "Recent Badges",
    "lessons.empty": "No curriculum assigned yet. Hang tight!",

    "rapport.title": "Progress Report",
    "rapport.sub": "Review your learning journey.",
    "rapport.time": "Learning Time",
    "rapport.words": "Words Learned",
    "rapport.stories": "Stories Read",
    "rapport.games": "Games Played",
    "rapport.badges": "Badges Earned",
    "rapport.streak": "Day Streak",
    "rapport.weekly": "Weekly Activity",
    "rapport.skills": "Skill Levels",
    "rapport.insight": "Leo's Insight",
    "rapport.milestones": "Next Milestones",
    "rapport.empty": "No activity yet. Start learning to see your progress!",

    "tutor.title": "Talk with Leo",
    "tutor.sub": "Practice languages with your AI tutor.",
    "tutor.xpEarned": "{xp} XP Earned",
    "tutor.typeMessage": "Type your message...",
    "tutor.send": "Send",
    "tutor.thinking": "Leo is thinking...",
    "tutor.empty": "Say hello to Leo to start practicing!",

    "common.points": "Stars",
    "common.streak": "Day streak",
    "lang.switch": "Language",
    "search.placeholder": "Search...",
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
    "words.categories": "Catégories",
    "words.all": "Tout",
    "words.empty": "Tu n'as pas encore appris de mots. Commence une leçon !",

    "achievements.title": "Royaume aux Trésors",
    "achievements.sub": "Suis tes progrès et débloque des récompenses.",
    "achievements.currentLevel": "Niveau {level}",
    "achievements.nextReward": "Prochaine récompense dans {xp} XP",
    "achievements.badges": "Tes Badges",
    "achievements.locked": "Verrouillé",
    "achievements.unlocked": "Débloqué",
    "achievements.empty": "Complète des leçons pour gagner des badges !",

    "games.title": "Centre de Jeux",
    "games.sub": "Joue et gagne de l'XP",
    "games.libraryTitle": "Bibliothèque de Jeux",
    "games.play": "Jouer",
    "games.xpEarned": "XP",
    "games.empty": "Aucun jeu disponible pour le moment.",
    "games.recent": "Récemment joués",

    "stories.title": "Bibliothèque d'Histoires",
    "stories.sub": "Découvre des aventures magiques",
    "stories.read": "Lire",
    "stories.featured": "Histoires à la une",
    "stories.continue": "Continuer la lecture",
    "stories.empty": "Aucune histoire disponible pour le moment.",
    "stories.storyOfDay": "L'Histoire du jour",

    "lessons.title": "Mon Parcours",
    "lessons.sub": "Continue ton programme et débloque de nouveaux mondes.",
    "lessons.kingdoms": "Royaumes des langues",
    "lessons.enterCourse": "Entrer dans le cours",
    "lessons.upcoming": "Sessions en direct à venir",
    "lessons.badges": "Badges récents",
    "lessons.empty": "Aucun programme assigné pour le moment.",

    "rapport.title": "Rapport de Progrès",
    "rapport.sub": "Revois ton parcours d'apprentissage.",
    "rapport.time": "Temps d'apprentissage",
    "rapport.words": "Mots appris",
    "rapport.stories": "Histoires lues",
    "rapport.games": "Jeux joués",
    "rapport.badges": "Badges gagnés",
    "rapport.streak": "Série de jours",
    "rapport.weekly": "Activité de la semaine",
    "rapport.skills": "Niveaux de compétence",
    "rapport.insight": "L'avis de Leo",
    "rapport.milestones": "Prochaines étapes",
    "rapport.empty": "Aucune activité pour le moment.",

    "tutor.title": "Parle avec Leo",
    "tutor.sub": "Pratique les langues avec ton tuteur IA.",
    "tutor.xpEarned": "{xp} XP Gagnés",
    "tutor.typeMessage": "Tape ton message...",
    "tutor.send": "Envoyer",
    "tutor.thinking": "Leo réfléchit...",
    "tutor.empty": "Dis bonjour à Leo pour commencer !",

    "common.points": "Étoiles",
    "common.streak": "Jours de suite",
    "lang.switch": "Langue",
    "search.placeholder": "Rechercher...",
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
    "words.categories": "الفئات",
    "words.all": "الكل",
    "words.empty": "لم تتعلم أي كلمات بعد. ابدأ درساً لتفتح الكلمات!",

    "achievements.title": "مملكة الكنوز",
    "achievements.sub": "تتبع تقدمك وافتح المكافآت.",
    "achievements.currentLevel": "المستوى {level}",
    "achievements.nextReward": "المكافأة التالية في {xp} نقطة",
    "achievements.badges": "شاراتك",
    "achievements.locked": "مغلق",
    "achievements.unlocked": "مفتوح",
    "achievements.empty": "أكمل الدروس لتربح الشارات!",

    "games.title": "مركز الألعاب",
    "games.sub": "العب واربح النقاط",
    "games.libraryTitle": "مكتبة الألعاب",
    "games.play": "العب الآن",
    "games.xpEarned": "نقطة",
    "games.empty": "لا توجد ألعاب متاحة الآن.",
    "games.recent": "لعبت مؤخراً",

    "stories.title": "مكتبة القصص",
    "stories.sub": "اكتشف مغامرات سحرية",
    "stories.read": "اقرأ الآن",
    "stories.featured": "قصص مميزة",
    "stories.continue": "أكمل القراءة",
    "stories.empty": "لا توجد قصص متاحة الآن.",
    "stories.storyOfDay": "قصة اليوم",

    "lessons.title": "مسار التعلم",
    "lessons.sub": "أكمل منهجك وافتح عوالم جديدة.",
    "lessons.kingdoms": "ممالك اللغات",
    "lessons.enterCourse": "دخول الدورة",
    "lessons.upcoming": "الجلسات المباشرة القادمة",
    "lessons.badges": "أحدث الشارات",
    "lessons.empty": "لا يوجد منهج مخصص لك حتى الآن.",

    "rapport.title": "تقرير التقدم",
    "rapport.sub": "راجع رحلة تعلمك.",
    "rapport.time": "وقت التعلم",
    "rapport.words": "الكلمات المتعلمة",
    "rapport.stories": "القصص المقروءة",
    "rapport.games": "الألعاب الملعوبة",
    "rapport.badges": "الشارات المكتسبة",
    "rapport.streak": "أيام متتالية",
    "rapport.weekly": "النشاط الأسبوعي",
    "rapport.skills": "مستويات المهارة",
    "rapport.insight": "نصيحة ليو",
    "rapport.milestones": "المحطات القادمة",
    "rapport.empty": "لا يوجد نشاط بعد. ابدأ التعلم لترى تقدمك!",

    "tutor.title": "تحدث مع ليو",
    "tutor.sub": "مارس اللغات مع معلمك الذكي.",
    "tutor.xpEarned": "{xp} نقطة",
    "tutor.typeMessage": "اكتب رسالتك...",
    "tutor.send": "إرسال",
    "tutor.thinking": "ليو يفكر...",
    "tutor.empty": "قل مرحباً لليو لتبدأ التدريب!",

    "common.points": "النجوم",
    "common.streak": "أيام متتالية",
    "lang.switch": "اللغة",
    "search.placeholder": "بحث...",
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
