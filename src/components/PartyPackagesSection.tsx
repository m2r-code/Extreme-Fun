import React from 'react';
import { useApp } from '../context/AppContext';
import { mockPartyPackages } from '../data/mockData';
import { Check, Sparkles, Cake, Calendar, Gift, Users } from 'lucide-react';

export const PartyPackagesSection: React.FC = () => {
  const { t, openBooking } = useApp();

  return (
    <section id="parties" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
            <span>02. Stress-Free Celebrations</span>
            <span aria-hidden="true">·</span>
            <span>Private VIP Themed Suites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('partiesTitle')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base">
            {t('partiesSubtitle')}
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {mockPartyPackages.map((pkg) => {
            const isPopular = pkg.popular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-white dark:bg-slate-900 border-2 border-rose-500 shadow-xl lg:-translate-y-2'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Marker */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                    ★ {t('partyPopular')}
                  </div>
                )}

                <div>
                  {/* Title & Price */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {pkg.name}
                    </h3>
                    <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                      <Cake className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tabular-nums">
                      ${pkg.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                      / up to {pkg.guestsIncluded} kids
                    </span>
                  </div>

                  {/* Clean unboxed metadata (§1.A) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Users className="w-3.5 h-3.5 text-rose-500" />
                      {pkg.guestsIncluded} Kids + Parents
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{pkg.duration}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('partyIncludes')}
                    </p>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bonus Points & Booking Button */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 rounded-xl px-3 py-2 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Member Bonus:</span>
                    </span>
                    <span className="tabular-nums">+{pkg.bonusPoints} XP Points</span>
                  </div>

                  <button
                    onClick={() =>
                      openBooking({
                        id: pkg.id,
                        type: 'party',
                        title: `${pkg.name} Package`,
                        price: pkg.price,
                        quantity: 1,
                        options: { extraGuests: 0 },
                      })
                    }
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/25 active:scale-95'
                        : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white active:scale-95'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t('partyBookBtn')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
