import React from 'react';
import { useApp } from '../context/AppContext';
import { mockPasses } from '../data/mockData';
import { Ticket, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';

export const PassesPricingSection: React.FC = () => {
  const { t, openBooking } = useApp();

  return (
    <section id="passes" className="py-16 lg:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
            <span>03. Flexible Admission Passes</span>
            <span aria-hidden="true">·</span>
            <span>Instant Digital Mobile Check-In</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('passesTitle')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base">
            {t('passesSubtitle')}
          </p>
        </div>

        {/* Passes 4-grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockPasses.map((pass) => {
            const isPopular = pass.popular;

            return (
              <div
                key={pass.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-rose-50/50 dark:bg-slate-900 border-2 border-rose-500 shadow-lg'
                    : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      {pass.bestFor}
                    </span>
                    {isPopular && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase">
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                    {pass.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                      ${pass.price}
                    </span>
                    {pass.originalPrice && (
                      <span className="text-xs text-slate-400 line-through tabular-nums">
                        ${pass.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {pass.description}
                  </p>

                  {/* Clean unboxed duration separator */}
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                    <span>Duration: </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{pass.duration}</span>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-2 mb-6">
                    {pass.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    openBooking({
                      id: pass.id,
                      type: 'pass',
                      title: pass.title,
                      price: pass.price,
                      quantity: 1,
                      options: { gripSocks: false, arcadeCredit: 0 },
                    })
                  }
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 active:scale-95'
                      : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white active:scale-95'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>{t('buyPassBtn')}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Safety Grip Socks Policy Notice */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
          <Shield className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{t('socksNotice')}</span>
        </div>
      </div>
    </section>
  );
};
