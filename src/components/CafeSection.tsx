import React from 'react';
import { useApp } from '../context/AppContext';
import { mockCafeMenu } from '../data/mockData';
import { Coffee, Utensils, Wifi, Heart, Sparkles } from 'lucide-react';

export const CafeSection: React.FC = () => {
  const { setActiveModal } = useApp();

  return (
    <section id="cafe" className="py-16 lg:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Cafe Philosophy & Parents Lounge */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
              <span>05. Extreme Fun Café & Parent Lounge</span>
              <span aria-hidden="true">·</span>
              <span>Fresh & Nutritious</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              Delicious Fuel For Play. Relaxing Sanctuary For Parents.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              While the kids explore multi-level climbing towers and laser tag, relax in our spacious café lounge with clear 360° sightlines, high-speed fiber Wi-Fi, locally roasted organic espresso, and freshly baked healthy bites.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-200">
                <Coffee className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Barista handcrafted espresso, lattes, and matcha teas</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-200">
                <Utensils className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Nut-free kitchen certification with gluten-free & vegan options</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-200">
                <Wifi className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Complimentary ultra-fast Wi-Fi & laptop charging stations</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('dashboard')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Redeem Café Coupon with Points</span>
            </button>
          </div>

          {/* Right Column: Menu Cards Bento */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockCafeMenu.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      {item.category}
                    </span>
                    <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">
                      {item.price}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1.5">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
