import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Gift, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';

const SLICES = [
  { label: '100 XP', color: '#F59E0B', textColor: '#FFFFFF', sub: 'Bonus Points' },
  { label: 'FREE LASER TAG', color: '#EC4899', textColor: '#FFFFFF', sub: '1 Adrenaline Match' },
  { label: '150 ARCADE XP', color: '#6366F1', textColor: '#FFFFFF', sub: 'Play Points' },
  { label: '250 MEGA JACKPOT', color: '#10B981', textColor: '#FFFFFF', sub: 'Ultimate Prize' },
  { label: 'FREE CAFE DRINK', color: '#F97316', textColor: '#FFFFFF', sub: 'Barista Latte/Smoothie' },
  { label: '20% PARTY VOUCHER', color: '#8B5CF6', textColor: '#FFFFFF', sub: 'Birthday Discount' },
];

export const SpinWheelModal: React.FC = () => {
  const { activeModal, setActiveModal, executeSpin, canSpinWheel, soundEnabled, t } = useApp();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<{ prize: string; points: number } | null>(null);

  if (activeModal !== 'spin') return null;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Audio tick ticker
    let ticks = 0;
    const interval = setInterval(() => {
      ticks++;
      playSound('tick', soundEnabled);
      if (ticks > 25) clearInterval(interval);
    }, 120);

    // Random turns: 5 full turns (1800 deg) + random sector offset
    const randomExtra = Math.floor(Math.random() * 360) + 1800;
    const finalRotation = rotation + randomExtra;
    setRotation(finalRotation);

    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
      const res = executeSpin();
      setResult(res);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#EC4899', '#6366F1', '#10B981'],
        });
      } catch {
        // graceful fallback
      }
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Daily Extreme Wheel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t('spinBannerTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('spinBannerDesc')}
          </p>
        </div>

        {/* Wheel Display Container */}
        <div className="relative flex items-center justify-center my-6">
          {/* Top Pointer */}
          <div className="absolute -top-3 z-20 w-0 h-0 border-x-12 border-x-transparent border-t-20 border-t-rose-600 drop-shadow-md" />

          {/* Wheel Graphic */}
          <div
            className="w-64 h-64 sm:w-72 sm:h-72 rounded-full relative shadow-2xl border-8 border-slate-900 dark:border-slate-800 overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
            }}
          >
            {/* 6 Conic Gradient Slices */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-30">
              {SLICES.map((slice, i) => {
                const angle = 60;
                const startAngle = i * angle;
                const endAngle = (i + 1) * angle;
                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const textAngle = startAngle + angle / 2;
                const tx = 50 + 32 * Math.cos((Math.PI * textAngle) / 180);
                const ty = 50 + 32 * Math.sin((Math.PI * textAngle) / 180);

                return (
                  <g key={i}>
                    <path
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                      fill={slice.color}
                      stroke="#ffffff"
                      strokeWidth="1.2"
                    />
                    <text
                      x={tx}
                      y={ty}
                      fill="#ffffff"
                      fontSize="5"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                    >
                      {slice.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Center Hub */}
            <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center text-white text-xs font-black shadow-lg">
              ⚡ EF
            </div>
          </div>
        </div>

        {/* Win Result Dialog or Spin CTA */}
        {result ? (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 animate-scale-up">
            <div className="flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 font-black text-lg mb-1">
              <Trophy className="w-5 h-5" />
              <span>{t('spinResultWin')}</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
              {result.prize}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Saved directly to your Member Profile & Activity History!
            </p>
            <button
              onClick={() => {
                setActiveModal('dashboard');
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold hover:opacity-95 shadow-md"
            >
              <Gift className="w-4 h-4" />
              <span>View in My Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button
              onClick={handleSpin}
              disabled={spinning}
              className={`px-8 py-3.5 rounded-xl text-sm font-black text-white shadow-lg active:scale-95 transition-all flex items-center gap-2 ${
                spinning
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-rose-500/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{spinning ? 'Spinning...' : t('spinBtn')}</span>
            </button>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">
              1 Free spin granted every 24 hours for all visitors & members
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
