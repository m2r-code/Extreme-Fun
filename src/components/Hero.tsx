import React from 'react';
import { useApp } from '../context/AppContext';
import { Ticket, Sparkles, Trophy, ShieldCheck, Gamepad2, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, openBooking, setActiveModal, canSpinWheel } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid Hero: Text on left, 16:9 High-Impact Generated Visual on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Clean unboxed kicker with dot separator (§1.A anti-slop) */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-4">
              <span>{t('heroBadge')}</span>
              <span aria-hidden="true">·</span>
              <span>Open Daily 9:30 AM – 8:00 PM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 text-balance">
              {t('heroTitle')}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl">
              {t('heroDesc')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 rounded-xl hover:from-rose-600 hover:to-amber-600 shadow-lg shadow-rose-500/25 active:scale-95 transition-all whitespace-nowrap"
              >
                <Ticket className="w-4 h-4" />
                <span>{t('heroCtaPrimary')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveModal('spin')}
                className="relative inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 shadow-sm active:scale-95 transition-all whitespace-nowrap group"
              >
                <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                <span>{t('heroCtaSecondary')}</span>
                {canSpinWheel && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                )}
              </button>
            </div>

            {/* Quick trust reassurance */}
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Instant mobile digital pass · Contactless check-in · Free rescheduling</span>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Asset */}
          <div className="lg:col-span-6 relative flex items-center">
            <div className="relative w-full aspect-[16/9] lg:h-full rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl group">
              <img
                src="/src/assets/images/hero_indoor_playground_1794285571049.jpg"
                alt="Extreme Fun Indoor Multi-Tier Playground and Family Center in Richmond"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />

              {/* Scrim overlay for crisp readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Richmond&apos;s #1 Indoor Family Arena</span>
                </div>
                <p className="text-white text-sm sm:text-base font-bold">
                  4-tier adventure maze, slides, laser tag & birthday suites
                </p>
              </div>

              {/* Live Interactive Arcade Tag */}
              <button
                onClick={() => setActiveModal('arcadeMini')}
                className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold hover:bg-slate-900 active:scale-95 transition-all shadow-lg"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Play Quick Reflex Game (+50 XP)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI / Trust Strip below Hero Split (§5.13) */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                {t('heroStat1Value')}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                {t('heroStat1Label')}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 tabular-nums tracking-tight">
                {t('heroStat2Value')}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                {t('heroStat2Label')}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums tracking-tight">
                {t('heroStat3Value')}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                {t('heroStat3Label')}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-amber-500 dark:text-amber-400 tabular-nums tracking-tight">
                {t('heroStat4Value')}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                {t('heroStat4Label')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
