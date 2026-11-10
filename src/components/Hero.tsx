import React from 'react';
import { useApp } from '../context/AppContext';
import { Ticket, Sparkles, Trophy, ShieldCheck, Gamepad2, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, openBooking, setActiveModal, canSpinWheel } = useApp();

  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-slate-800">
      {/* Full-bleed Background Image with subtle Ken Burns zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/images/hero_indoor_playground_1794285571049.jpg"
          alt="Extreme Fun Indoor Multi-Tier Playground and Family Entertainment Center"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center hero-bg-anim"
        />
        {/* Measured Triple Contrast Scrim for Absolute Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-600/15 via-transparent to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-24 pb-8 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Clean unboxed kicker with dot separator (§1.A anti-slop) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-4">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Trophy className="w-3.5 h-3.5" />
              <span>{t('heroBadge')}</span>
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-300">Open Daily 9:30 AM – 8:00 PM</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-emerald-400 font-bold">Bridgeport Rd, Richmond BC</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-black text-white tracking-tight leading-[1.05] mb-6 text-balance drop-shadow-md">
            {t('heroTitle')}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl text-slate-200 leading-relaxed mb-8 max-w-2xl font-medium drop-shadow-sm">
            {t('heroDesc')}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() =>
                openBooking({
                  id: 'hero-allday',
                  type: 'pass',
                  title: 'All-Day Adventure Pass',
                  price: 21.99,
                  quantity: 1,
                })
              }
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-bold text-white bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 rounded-2xl hover:from-rose-600 hover:to-amber-600 shadow-xl shadow-rose-500/30 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>{t('heroCtaPrimary')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveModal('spin')}
              className="relative inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl active:scale-95 transition-all whitespace-nowrap group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>{t('heroCtaSecondary')}</span>
              {canSpinWheel && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveModal('arcadeMini')}
              className="inline-flex items-center gap-2 px-5 py-4 text-sm font-bold text-slate-200 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md border border-slate-700/80 rounded-2xl active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4 text-rose-400" />
              <span>Quick Reflex Game (+50 XP)</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant mobile digital pass</span>
            </div>
            <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
            <span>Contactless check-in</span>
            <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
            <span>Free cancellation & rescheduling</span>
          </div>
        </div>
      </div>

      {/* Full-width Glassmorphic 4-Column KPI / Trust Strip at Bottom */}
      <div className="relative z-10 w-full bg-slate-950/70 backdrop-blur-lg border-t border-white/10 py-6 sm:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                {t('heroStat1Value')}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                {t('heroStat1Label')}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-rose-400 tabular-nums tracking-tight">
                {t('heroStat2Value')}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                {t('heroStat2Label')}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums tracking-tight">
                {t('heroStat3Value')}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                {t('heroStat3Label')}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums tracking-tight">
                {t('heroStat4Value')}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                {t('heroStat4Label')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
