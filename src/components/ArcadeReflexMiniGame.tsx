import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Gamepad2, Trophy, Sparkles, RotateCcw } from 'lucide-react';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';

export const ArcadeReflexMiniGame: React.FC = () => {
  const { activeModal, setActiveModal, addPoints, soundEnabled } = useApp();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [activePad, setActivePad] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const targetTimerRef = useRef<NodeJS.Timeout | null>(null);

  if (activeModal !== 'arcadeMini') return null;

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(10);
    spawnTarget();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const spawnTarget = () => {
    const next = Math.floor(Math.random() * 9);
    setActivePad(next);
  };

  const handlePadClick = (index: number) => {
    if (gameState !== 'playing') return;
    if (index === activePad) {
      setScore((s) => s + 10);
      playSound('coin', soundEnabled);
      spawnTarget();
    } else {
      playSound('click', soundEnabled);
    }
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (targetTimerRef.current) clearInterval(targetTimerRef.current);
    setGameState('gameover');
    setActivePad(null);

    playSound('fanfare', soundEnabled);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {
      // fallback
    }
  };

  const claimPoints = () => {
    const earnedPoints = Math.max(30, score);
    addPoints(earnedPoints, `Arcade Reflex Challenge (${score} pts)`, 'arcade');
    setActiveModal('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-center text-white shadow-2xl overflow-hidden">
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Gamepad2 className="w-4 h-4" />
          <span>Arcade Reflex Quick Challenge</span>
        </div>

        <h2 className="text-2xl font-black mb-1">Neon Speed Tapper</h2>
        <p className="text-xs text-slate-400 mb-6">
          Tap the glowing neon buttons as fast as you can in 10 seconds!
        </p>

        {gameState === 'idle' && (
          <div className="py-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/30">
              ⚡
            </div>
            <p className="text-sm text-slate-300 mb-6">
              Win instant XP & redemption points added to your live VIP status.
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 font-bold text-sm hover:opacity-95 shadow-lg shadow-rose-500/25 active:scale-95 transition-all"
            >
              Start Challenge (10s)
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            <div className="flex items-center justify-between px-2 mb-4 text-xs font-bold">
              <span className="text-slate-400">Time Left: <span className="text-amber-400 text-sm tabular-nums">{timeLeft}s</span></span>
              <span className="text-slate-400">Score: <span className="text-rose-400 text-sm tabular-nums">{score}</span></span>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
                const isActive = activePad === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handlePadClick(idx)}
                    className={`aspect-square rounded-2xl border transition-all duration-100 flex items-center justify-center text-xl font-black ${
                      isActive
                        ? 'bg-rose-500 border-rose-300 shadow-lg shadow-rose-500/60 scale-105 animate-pulse text-white'
                        : 'bg-slate-800/80 border-slate-700/60 text-slate-600 hover:border-slate-600'
                    }`}
                  >
                    {isActive ? '⚡' : ''}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="py-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black mb-1">Time&apos;s Up!</h3>
            <p className="text-3xl font-black text-rose-400 tabular-nums mb-1">
              {score} PTS
            </p>
            <p className="text-xs text-slate-400 mb-6">
              You earned +{Math.max(30, score)} Extreme Points!
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={startGame}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
              <button
                onClick={claimPoints}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-xs font-bold text-white hover:opacity-95 shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Claim Points</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
