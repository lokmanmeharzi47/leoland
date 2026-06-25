"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { completeGame } from "../actions";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RefreshCw, ArrowLeft, Star, ShieldCheck, HelpCircle } from "lucide-react";

type Game = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  difficulty: string;
  xp_reward: number;
};

// ----------------------------------------------------------------------
// Magic Words Mini-Game
// ----------------------------------------------------------------------

const LEVELS = [
  { word: "POMME", bubbles: ["P", "O", "M", "M", "E", "A", "T", "S", "L", "R"] },
  { word: "CHAT", bubbles: ["C", "H", "A", "T", "O", "U", "R", "S"] },
  { word: "SOLEIL", bubbles: ["S", "O", "L", "E", "I", "L", "M", "A", "R", "C"] }
];

function MagicWordsGame({ game, onWin, onProgress }: { game: Game, onWin: (score: number) => void, onProgress: (current: number, total: number) => void }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const targetWord = LEVELS[currentLevel].word;
  const bubbles = LEVELS[currentLevel].bubbles;
  
  const [selectedLetters, setSelectedLetters] = useState<(string | null)[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: string, char: string, used: boolean }[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showChest, setShowChest] = useState(false);

  useEffect(() => {
    // Reset for new level
    setSelectedLetters(Array(targetWord.length).fill(null));
    const shuffled = [...bubbles].sort(() => Math.random() - 0.5).map((char, i) => ({
      id: `bubble-${currentLevel}-${i}`,
      char,
      used: false
    }));
    setAvailableLetters(shuffled);
    onProgress(currentLevel + 1, LEVELS.length);
  }, [currentLevel, targetWord, bubbles, onProgress]);

  const handleSelectBubble = (bubbleId: string, char: string) => {
    if (feedback !== null) return;
    
    // Find first empty slot
    const emptyIndex = selectedLetters.findIndex(l => l === null);
    if (emptyIndex !== -1) {
      const newSelected = [...selectedLetters];
      newSelected[emptyIndex] = char;
      setSelectedLetters(newSelected);
      
      setAvailableLetters(prev => prev.map(b => b.id === bubbleId ? { ...b, used: true } : b));
    }
  };

  const handleRemoveLetter = (index: number) => {
    if (feedback !== null) return;
    
    const charToRemove = selectedLetters[index];
    if (charToRemove) {
      const newSelected = [...selectedLetters];
      newSelected[index] = null;
      setSelectedLetters(newSelected);
      
      // Mark as unused again in available letters
      setAvailableLetters(prev => {
        const targetIndex = prev.findIndex(b => b.char === charToRemove && b.used);
        if (targetIndex !== -1) {
          const newAvailable = [...prev];
          newAvailable[targetIndex].used = false;
          return newAvailable;
        }
        return prev;
      });
    }
  };

  const handleVerify = () => {
    const word = selectedLetters.join("");
    if (word === targetWord) {
      setFeedback("correct");
      if (currentLevel < LEVELS.length - 1) {
        // Proceed to next level
        setTimeout(() => {
          setFeedback(null);
          setCurrentLevel(prev => prev + 1);
        }, 2000);
      } else {
        // Game complete
        setShowChest(true);
        setTimeout(() => {
          onWin(100);
        }, 3000);
      }
    } else {
      setFeedback("incorrect");
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const handleRestartGame = () => {
    setCurrentLevel(0);
    setSelectedLetters(Array(LEVELS[0].word.length).fill(null));
    setFeedback(null);
    setShowChest(false);
  };

  const playSound = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(targetWord);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported");
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Game Area */}
      <div className="relative w-full max-w-4xl mx-auto min-h-[600px] bg-gradient-to-b from-indigo-900 via-purple-800 to-fuchsia-900 rounded-[40px] p-8 shadow-2xl border-4 border-purple-300 overflow-hidden text-center flex flex-col justify-between">
        
        {/* Background Decorations */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute top-8 right-16 text-yellow-300 opacity-60 text-5xl animate-pulse">✨</div>
        <div className="absolute bottom-32 left-16 text-pink-300 opacity-60 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>✨</div>

        <div className="relative z-10 flex flex-col items-center h-full">
          <div className="w-full flex justify-end mb-4 relative z-20">
            <button 
              onClick={handleRestartGame}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-md transition-colors shadow-lg"
              title="Restart"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
          </div>

          <button 
            onClick={playSound}
            className="group flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/50 px-6 py-3 rounded-full font-bold text-xl transition-all mb-8 shadow-lg"
          >
            <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Listen to the sound
          </button>

          {/* Word Slots */}
          <div className="flex gap-4 justify-center mb-12">
            {selectedLetters.map((char, i) => (
              <motion.div 
                key={`slot-${currentLevel}-${i}`}
                whileHover={{ scale: char && feedback === null ? 1.05 : 1 }}
                onClick={() => handleRemoveLetter(i)}
                className={`w-16 h-20 md:w-20 md:h-24 rounded-2xl flex items-center justify-center text-4xl md:text-5xl font-black transition-colors ${char ? 'bg-yellow-400 text-purple-900 shadow-[0_8px_0_#b45309] cursor-pointer' : 'bg-white/10 border-4 border-dashed border-white/30'}`}
              >
                {char}
              </motion.div>
            ))}
          </div>

          {/* Floating Letters */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-2xl mx-auto min-h-[160px]">
            <AnimatePresence>
              {availableLetters.map((bubble) => !bubble.used && (
                <motion.div
                  key={bubble.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSelectBubble(bubble.id, bubble.char)}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-300 to-emerald-500 shadow-[0_10px_20px_rgba(16,185,129,0.5)] border-4 border-white/50 flex items-center justify-center text-white text-3xl font-bold cursor-pointer"
                >
                  {bubble.char}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Chest & Leo */}
          <div className="flex items-end justify-between w-full max-w-lg mx-auto relative h-48 mt-auto">
            <div className="relative">
              <div className="text-8xl md:text-[120px] drop-shadow-2xl">🦁</div>
              <div className="absolute -top-4 -right-4 text-4xl transform rotate-12">🪄</div>
            </div>
            
            <div className="relative">
              {showChest ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="text-8xl md:text-[120px] drop-shadow-2xl"
                >
                  🎁
                </motion.div>
              ) : (
                <div className="text-8xl md:text-[120px] drop-shadow-2xl opacity-80 saturate-50">
                  🧰
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={handleVerify}
            disabled={selectedLetters.includes(null) || feedback !== null}
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 px-10 py-4 rounded-full font-bold text-2xl transition-all flex items-center gap-2 ${selectedLetters.includes(null) ? 'bg-slate-400 text-slate-200 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-400 hover:translate-y-1 shadow-[0_8px_0_#065f46] hover:shadow-[0_4px_0_#065f46] active:translate-y-2 active:shadow-none'}`}
          >
            <ShieldCheck className="w-8 h-8" />
            Verify
          </button>

          {/* Feedback Overlay */}
          <AnimatePresence>
            {feedback === "incorrect" && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-2xl z-20"
              >
                Oops! Try again.
              </motion.div>
            )}
            {feedback === "correct" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-purple-900 px-12 py-6 rounded-3xl font-black text-4xl shadow-[0_0_100px_rgba(250,204,21,0.6)] z-20 text-center"
              >
                MAGICAL! ✨
                {currentLevel < LEVELS.length - 1 && <div className="text-xl mt-2 font-bold opacity-80">Next word coming...</div>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* How to Play Section */}
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-zinc-800">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-purple-500" />
          How to Play
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/30">
            <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl shadow-sm mb-4">👂</div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">1. Listen</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Click to listen to the magic word.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
            <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl shadow-sm mb-4">🫧</div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">2. Collect</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Find the floating magic letters.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
            <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl shadow-sm mb-4">🧩</div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">3. Order</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Put the letters in the correct order.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-900/30">
            <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl shadow-sm mb-4">🎁</div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">4. Unlock</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Open the chest and earn stars!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Generic Fallback Game
// ----------------------------------------------------------------------
function GenericGame({ game, onWin, onProgress }: { game: Game, onWin: (score: number) => void, onProgress: (c: number, t: number) => void }) {
  useEffect(() => {
    onProgress(1, 1);
  }, [onProgress]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center shadow-xl border border-slate-200 dark:border-zinc-800">
      <div className="text-8xl mb-6">🎮</div>
      <h2 className="text-3xl font-bold mb-4">{game.title}</h2>
      <p className="text-slate-500 mb-8 text-lg">This is a simulated mini-game experience. Imagine you are having a lot of fun playing {game.title} right now!</p>
      <button 
        onClick={() => onWin(100)}
        className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-bold text-xl shadow-lg transition-transform active:scale-95"
      >
        Click here to win the game!
      </button>
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Player Component
// ----------------------------------------------------------------------
export default function GamePlayerClient({ game }: { game: Game }) {
  const router = useRouter();
  const [gameState, setGameState] = useState<"playing" | "won" | "saving">("playing");
  const [finalScore, setFinalScore] = useState(0);
  const [progress, setProgress] = useState({ current: 1, total: 1 });

  const handleProgress = useCallback((c: number, t: number) => {
    setProgress(prev => {
      if (prev.current === c && prev.total === t) return prev;
      return { current: c, total: t };
    });
  }, []);

  const isMagicWordsGame = game.title.toLowerCase().includes("magic words");

  const handleWin = async (score: number) => {
    setGameState("saving");
    setFinalScore(score);
    
    // Launch confetti!
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#a855f7']
    });

    try {
      await completeGame(game.id, game.xp_reward, game.title, score);
      setGameState("won");
    } catch (error) {
      console.error(error);
      setGameState("won"); // Let them see success anyway
    }
  };

  const percentComplete = (progress.current / progress.total) * 100;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto w-full px-4">
        <Link 
          href="/student/dashboard/games" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-zinc-900 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-zinc-800 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Back</span>
        </Link>
        
        {/* Dynamic Progress Bar */}
        {gameState === "playing" && (
          <div className="hidden md:flex items-center gap-2 bg-white dark:bg-zinc-900 px-6 py-2 rounded-full shadow-sm border border-slate-200 dark:border-zinc-800">
            <span className="text-xs font-bold text-slate-400 mr-2">Level {progress.current}/{progress.total}</span>
            <div className="w-32 h-3 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
            <div className="flex -space-x-1">
              {Array.from({ length: progress.total }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < progress.current ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 fill-slate-300'}`} 
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-amber-200 dark:border-amber-900/50">
          <Star className="w-5 h-5 fill-current" />
          {game.xp_reward} XP
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full pb-12 px-4">
        {gameState === "playing" && (
          isMagicWordsGame ? 
            <MagicWordsGame game={game} onWin={handleWin} onProgress={handleProgress} /> : 
            <GenericGame game={game} onWin={handleWin} onProgress={handleProgress} />
        )}

        {gameState === "saving" && (
          <div className="text-center animate-pulse">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">Saving your magical victory...</h2>
          </div>
        )}

        {gameState === "won" && (
          <div className="w-full max-w-md mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl p-10 text-center text-white shadow-2xl animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border-4 border-white/30">
              <span className="material-symbols-outlined text-[48px] text-white">emoji_events</span>
            </div>
            <h2 className="text-4xl font-black mb-2">Magical!</h2>
            <p className="text-emerald-100 text-lg mb-8 font-medium">
              You correctly built all the words and earned {game.xp_reward} XP!
            </p>
            <div className="flex flex-col gap-3">
              <Link 
                href="/student/dashboard/games"
                className="block w-full py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg shadow-black/10"
              >
                Play Another Game
              </Link>
              <button
                onClick={() => {
                  setGameState("playing");
                  setProgress({ current: 1, total: 1 });
                }}
                className="block w-full py-3 bg-emerald-700/50 text-white rounded-xl font-bold text-md hover:bg-emerald-700 transition-colors"
              >
                Replay Magic Words
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
