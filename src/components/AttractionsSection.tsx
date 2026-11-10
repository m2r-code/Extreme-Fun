import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockAttractions } from '../data/mockData';
import {
  Compass,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { Attraction } from '../types';

export const AttractionsSection: React.FC = () => {
  const {
    t,
    exploredAttractions,
    markAttractionExplored,
    setSelectedAttraction,
    setActiveModal,
    openBooking,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'maze' | 'laser' | 'arcade' | 'party'>('all');

  const filteredAttractions = mockAttractions.filter((att) => {
    if (activeFilter === 'maze') return att.id === 'adventure-maze';
    if (activeFilter === 'laser') return att.id === 'laser-tag';
    if (activeFilter === 'arcade') return att.id === 'arcade-vr';
    if (activeFilter === 'party') return att.id === 'party-rooms';
    return true;
  });

  const questProgress = Math.min(100, Math.round((exploredAttractions.length / mockAttractions.length) * 100));

  const handleCardClick = (att: Attraction) => {
    markAttractionExplored(att.id);
    setSelectedAttraction(att);
    setActiveModal('attractionDetail');
  };

  return (
    <section id="attractions" className="py-16 lg:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Editorial Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
              <span>01. Interactive Play Arenas</span>
              <span aria-hidden="true">·</span>
              <span>All Weather Indoor Comfort</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('attractionsTitle')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base max-w-xl">
              {t('attractionsSubtitle')}
            </p>
          </div>

          {/* Gamified Quest Tracker Bar (§Gamification requirement) */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 max-w-md w-full">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200">
                <Compass className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span>Attraction Explorer Quest</span>
              </span>
              <span className="text-amber-700 dark:text-amber-400 tabular-nums">
                {exploredAttractions.length}/{mockAttractions.length} Explored (+50 XP/ea)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-amber-200/50 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-500"
                style={{ width: `${questProgress}%` }}
              />
            </div>
            {questProgress === 100 ? (
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Master Explorer Badge & 200 Bonus XP Unlocked!
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Tap each zone card to inspect details and earn instant XP!
              </p>
            )}
          </div>
        </div>

        {/* Interactive Filter Tabs (functional segmented controls per §1.A) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: t('zoneAll') },
            { id: 'maze', label: t('zonePlayground') },
            { id: 'laser', label: t('zoneLaserTag') },
            { id: 'arcade', label: t('zoneArcade') },
            { id: 'party', label: 'Party Suites' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Grid Showcase (§2.C dynamic column spans) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {filteredAttractions.map((att, idx) => {
            const isExplored = exploredAttractions.includes(att.id);
            const isWide = idx === 0 || idx === 3;

            return (
              <div
                key={att.id}
                onClick={() => handleCardClick(att)}
                className={`group cursor-pointer rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400/80 dark:hover:border-rose-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between ${
                  isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                }`}
              >
                {/* Visual Asset Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={att.image}
                    alt={att.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Tags */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {att.ageRange}
                    </span>

                    {isExplored ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/90 text-white shadow-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        Quest Explored
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-500/90 text-slate-950 shadow-sm animate-pulse">
                        <Sparkles className="w-3 h-3" />
                        Tap for +50 XP
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-sm">
                      {att.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-1 mt-0.5">
                      {att.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Unboxed metadata line (§1.A anti-slop) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {att.capacity}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{att.priceNote}</span>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {att.description}
                    </p>

                    {/* Highlights bullet strip */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {att.highlights.slice(0, 4).map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(att);
                      }}
                      className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1"
                    >
                      <span>{t('viewDetails')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openBooking({
                          id: `book-${att.id}`,
                          type: 'pass',
                          title: att.name,
                          price: att.id === 'laser-tag' ? 8.5 : 21.99,
                          quantity: 1,
                        });
                      }}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 dark:bg-slate-700 hover:bg-rose-600 dark:hover:bg-rose-600 rounded-lg transition-colors whitespace-nowrap"
                    >
                      {t('bookThisZone')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
