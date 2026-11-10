import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  QrCode,
  Sparkles,
  Trophy,
  History,
  Gift,
  Award,
  RefreshCw,
  LogOut,
  ExternalLink,
  Check,
  Copy,
} from 'lucide-react';

export const DashboardModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    user,
    activities,
    badges,
    vouchers,
    logout,
    t,
    syncStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pass' | 'history' | 'badges' | 'vouchers'>('pass');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (activeModal !== 'dashboard') return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const xpTarget = user.tier === 'Bronze' ? 500 : user.tier === 'Silver' ? 1500 : user.tier === 'Gold' ? 3000 : 5000;
  const xpPercent = Math.min(100, Math.round((user.xp / xpTarget) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Bar */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-rose-500 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase">
              {user.tier}
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {user.name}
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                {user.syncCode}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {user.email} · {user.streakDays}-Day Activity Streak
            </p>

            {/* Level XP Progress Bar */}
            <div className="mt-2.5 max-w-sm">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                <span>{user.tier} Tier ({user.xp} XP)</span>
                <span className="tabular-nums">Target: {xpTarget} XP</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModal('sync')}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
              title="Cloud Sync"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1.5"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto">
          {[
            { id: 'pass', label: 'VIP Pass Card', icon: QrCode },
            { id: 'history', label: 'Points History', count: activities.length, icon: History },
            { id: 'badges', label: 'Badges & Perks', count: badges.filter(b => b.unlocked).length, icon: Award },
            { id: 'vouchers', label: 'Active Vouchers', count: vouchers.filter(v => !v.redeemed).length, icon: Gift },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] tabular-nums ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: VIP DIGITAL MEMBER PASS */}
        {activeTab === 'pass' && (
          <div className="flex flex-col items-center">
            {/* Scannable Card */}
            <div className="w-full max-w-md rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <span className="font-display font-black tracking-tight text-lg">
                    Extreme<span className="text-rose-400">Fun</span> VIP
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  {user.tier} Member
                </span>
              </div>

              {/* Scannable QR Representation */}
              <div className="flex items-center gap-6 my-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center shrink-0 shadow-inner">
                  {/* Generated SVG QR Code Pattern */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                    <rect x="5" y="5" width="30" height="30" rx="4" />
                    <rect x="10" y="10" width="20" height="20" fill="white" />
                    <rect x="15" y="15" width="10" height="10" />

                    <rect x="65" y="5" width="30" height="30" rx="4" />
                    <rect x="70" y="10" width="20" height="20" fill="white" />
                    <rect x="75" y="15" width="10" height="10" />

                    <rect x="5" y="65" width="30" height="30" rx="4" />
                    <rect x="10" y="70" width="20" height="20" fill="white" />
                    <rect x="15" y="75" width="10" height="10" />

                    {/* QR data pixels */}
                    <rect x="42" y="10" width="6" height="6" />
                    <rect x="50" y="18" width="6" height="6" />
                    <rect x="42" y="30" width="6" height="6" />
                    <rect x="52" y="42" width="6" height="6" />
                    <rect x="65" y="45" width="6" height="6" />
                    <rect x="75" y="55" width="6" height="6" />
                    <rect x="45" y="65" width="6" height="6" />
                    <rect x="55" y="75" width="6" height="6" />
                    <rect x="70" y="70" width="6" height="6" />
                    <rect x="85" y="85" width="6" height="6" />
                  </svg>
                </div>

                <div className="text-left">
                  <span className="text-[10px] text-slate-300 uppercase block tracking-wider">
                    Member Pass ID
                  </span>
                  <span className="font-mono text-sm font-bold text-amber-300">
                    {user.qrCode}
                  </span>
                  <p className="text-[11px] text-slate-300 mt-2 leading-tight">
                    {t('scanAtCashier')}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
                <span>Points Balance: <strong className="text-amber-400 tabular-nums">{user.points} XP</strong></span>
                <span>Richmond, BC Facility</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POINTS & ACTIVITY HISTORY (REAL-TIME) */}
        {activeTab === 'history' && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {activities.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No activities recorded yet.</p>
            ) : (
              activities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                        act.pointsDelta > 0
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {act.pointsDelta > 0 ? '+' : '-'}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {act.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {act.description} · <span className="tabular-nums">{act.timestamp}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-sm font-black tabular-nums ${
                        act.pointsDelta > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {act.pointsDelta > 0 ? `+${act.pointsDelta}` : act.pointsDelta} XP
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: BADGES & ACHIEVEMENTS */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border flex flex-col items-center text-center transition-all ${
                  b.unlocked
                    ? 'bg-amber-50/60 dark:bg-slate-800 border-amber-300 dark:border-amber-800/80'
                    : 'bg-slate-100/60 dark:bg-slate-850 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-2 shadow-sm ${
                    b.unlocked
                      ? 'bg-gradient-to-tr from-amber-400 to-rose-500 text-white'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {b.unlocked ? '★' : '🔒'}
                </div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white mb-1">
                  {b.title}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {b.description}
                </p>
                {b.unlocked && b.unlockedAt && (
                  <span className="mt-2 text-[9px] font-bold text-amber-600 dark:text-amber-400">
                    Unlocked {b.unlockedAt}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: VOUCHERS & REDEEMED TICKETS */}
        {activeTab === 'vouchers' && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {vouchers.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No vouchers active. Redeem some from the Leaderboard store!</p>
            ) : (
              vouchers.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                      {v.category}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      {v.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Discount: {v.discount} · Valid until {v.expiresAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(v.code)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-mono text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      {copiedCode === v.code ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{v.code}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
