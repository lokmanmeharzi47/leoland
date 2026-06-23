"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { completeGame } from "../actions";
import confetti from "canvas-confetti";

type Game = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  difficulty: string;
  xp_reward: number;
};

// ----------------------------------------------------------------------
// Math Engine Mini-Game
// ----------------------------------------------------------------------
function MathGame({ game, onWin }: { game: Game, onWin: (score: number) => void }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [options, setOptions] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const TOTAL_QUESTIONS = 5;

  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const generateQuestion = () => {
    const isSub = Math.random() > 0.5 && game.difficulty !== "Easy";
    const op = isSub ? "-" : "+";
    
    // Adjust numbers based on difficulty
    let max = 10;
    if (game.difficulty === "Medium") max = 20;
    if (game.difficulty === "Hard") max = 50;

    let n1 = Math.floor(Math.random() * max) + 1;
    let n2 = Math.floor(Math.random() * max) + 1;

    // Ensure positive results for subtraction
    if (isSub && n2 > n1) {
      const temp = n1;
      n1 = n2;
      n2 = temp;
    }

    const answer = isSub ? n1 - n2 : n1 + n2;

    // Generate options
    const newOptions = [answer];
    while (newOptions.length < 4) {
      const wrong = answer + Math.floor(Math.random() * 10) - 5;
      if (wrong !== answer && !newOptions.includes(wrong) && wrong >= 0) {
        newOptions.push(wrong);
      }
    }

    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setCorrectAnswer(answer);
    setOptions(newOptions.sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (selected: number) => {
    if (feedback !== null) return; // Prevent multiple clicks

    const isCorrect = selected === correctAnswer;
    setFeedback(isCorrect ? "correct" : "incorrect");
    
    if (isCorrect) {
      setScore(s => s + 20);
    }

    setTimeout(() => {
      const nextQ = questionsAnswered + 1;
      setQuestionsAnswered(nextQ);
      
      if (nextQ >= TOTAL_QUESTIONS) {
        onWin(score + (isCorrect ? 20 : 0));
      } else {
        generateQuestion();
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl border border-blue-100 dark:border-blue-900/50 text-center">
      <div className="flex justify-between items-center mb-8">
        <div className="text-slate-500 font-bold uppercase text-sm tracking-wider">
          Question {Math.min(questionsAnswered + 1, TOTAL_QUESTIONS)} of {TOTAL_QUESTIONS}
        </div>
        <div className="text-blue-500 font-bold bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full">
          Score: {score}
        </div>
      </div>

      <div className="text-7xl md:text-9xl font-black text-slate-800 dark:text-white mb-12 tabular-nums">
        {num1} {operator} {num2} = ?
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, i) => {
          let btnClass = "bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-blue-900 border-2 border-transparent";
          if (feedback !== null) {
            if (opt === correctAnswer) {
              btnClass = "bg-emerald-500 text-white border-emerald-600 scale-105";
            } else if (feedback === "incorrect") {
              btnClass = "opacity-50 grayscale";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={feedback !== null}
              className={`p-6 text-4xl font-bold rounded-2xl transition-all ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className={`mt-8 text-2xl font-bold ${feedback === "correct" ? "text-emerald-500" : "text-rose-500"}`}>
          {feedback === "correct" ? "✨ Excellent!" : "Oops, let's try the next one!"}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// Generic Fallback Game
// ----------------------------------------------------------------------
function GenericGame({ game, onWin }: { game: Game, onWin: (score: number) => void }) {
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

  const isMathGame = game.title.toLowerCase().includes("math");

  const handleWin = async (score: number) => {
    setGameState("saving");
    setFinalScore(score);
    
    // Launch confetti!
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
    });

    try {
      await completeGame(game.id, game.xp_reward, game.title, score);
      setGameState("won");
    } catch (error) {
      console.error(error);
      setGameState("won"); // Let them see success anyway
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto w-full">
        <Link 
          href="/student/dashboard/games" 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-zinc-900 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-zinc-800"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span className="font-bold text-sm">Back to Games</span>
        </Link>
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 font-bold px-4 py-2 rounded-full flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">stars</span>
          Reward: {game.xp_reward} XP
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {gameState === "playing" && (
          isMathGame ? <MathGame game={game} onWin={handleWin} /> : <GenericGame game={game} onWin={handleWin} />
        )}

        {gameState === "saving" && (
          <div className="text-center animate-pulse">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">Saving your glorious victory...</h2>
          </div>
        )}

        {gameState === "won" && (
          <div className="w-full max-w-md mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl p-10 text-center text-white shadow-2xl animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[48px] text-white">emoji_events</span>
            </div>
            <h2 className="text-4xl font-black mb-2">You Won!</h2>
            <p className="text-emerald-100 text-lg mb-8 font-medium">
              You scored {finalScore} points and earned {game.xp_reward} XP!
            </p>
            <Link 
              href="/student/dashboard/games"
              className="block w-full py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg shadow-black/10"
            >
              Play Another Game
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
