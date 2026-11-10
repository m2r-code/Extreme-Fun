import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Users,
  ShieldCheck,
  CheckCircle2,
  Ticket,
  Sparkles,
} from 'lucide-react';

export const AttractionDetailModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    selectedAttraction,
    openBooking,
    t,
  } = useApp();

  if (activeModal !== 'attractionDetail' || !selectedAttraction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Container with Scrim */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
          <img
            src={selectedAttraction.image}
            alt={selectedAttraction.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

          <div className="absolute bottom-5 left-6 right-6">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-rose-500 text-white mb-2 inline-block">
              {selectedAttraction.ageRange}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {selectedAttraction.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">
              {selectedAttraction.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {/* Metadata Specs strip */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
              <Users className="w-4 h-4 text-rose-500" />
              Capacity: {selectedAttraction.capacity}
            </span>
            <span aria-hidden="true">·</span>
            <span>{selectedAttraction.priceNote}</span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            {selectedAttraction.description}
          </p>

          {/* Highlights & Features 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-rose-500 mb-2.5">
                Key Highlights
              </h4>
              <div className="space-y-2">
                {selectedAttraction.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-500 mb-2.5">
                Safety & Sanitization Specs
              </h4>
              <div className="space-y-2">
                {selectedAttraction.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Earn +50 XP checking in here</span>
            </div>

            <button
              onClick={() => {
                setActiveModal('checkout');
                openBooking({
                  id: `spec-${selectedAttraction.id}`,
                  type: 'pass',
                  title: selectedAttraction.name,
                  price: selectedAttraction.id === 'laser-tag' ? 8.5 : 21.99,
                  quantity: 1,
                });
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-rose-500/25 flex items-center gap-2"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>{t('bookThisZone')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
