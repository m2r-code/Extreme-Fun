import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  Sparkles,
  Zap,
  Tag,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    promos,
    pushEnabled,
    requestPushPermission,
    markPromosAsRead,
    openBooking,
    t,
  } = useApp();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (activeModal !== 'notif') return null;

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => {
            markPromosAsRead();
            setActiveModal(null);
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center shadow-sm">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {t('notifTitle')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exclusive VIP discounts, flash sales & park updates
            </p>
          </div>
        </div>

        {/* Browser Push Permission Banner */}
        <div className="mb-5 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              {pushEnabled ? t('pushActive') : t('enablePush')}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Receive instant alerts when 50% flash discounts drop.
            </span>
          </div>

          <button
            onClick={() => requestPushPermission()}
            disabled={pushEnabled}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              pushEnabled
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-500/20 active:scale-95'
            }`}
          >
            {pushEnabled ? '✓ Subscribed' : 'Enable Alerts'}
          </button>
        </div>

        {/* Promo Feed */}
        <div className="space-y-4 overflow-y-auto pr-1 flex-1">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-rose-300 dark:hover:border-rose-500 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-rose-500" />
                  <span>{promo.title}</span>
                </span>
                <span className="text-[10px] text-slate-400 tabular-nums shrink-0">
                  {promo.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                {promo.message}
              </p>

              {promo.code && (
                <div className="pt-2.5 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Code:</span>
                    <button
                      onClick={() => handleCopy(promo.code!)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 hover:bg-slate-50"
                    >
                      {copiedCode === promo.code ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{promo.code}</span>
                    </button>
                    {promo.discount && (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {promo.discount}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setActiveModal('checkout');
                      openBooking({
                        id: 'promo-deal',
                        type: 'pass',
                        title: 'Promo Flash Adventure Pass',
                        price: 18.99,
                        quantity: 1,
                      });
                    }}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Claim Deal →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
