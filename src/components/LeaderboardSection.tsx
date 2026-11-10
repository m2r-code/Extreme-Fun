import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockLeaderboard, mockRewards } from '../data/mockData';
import {
  Trophy,
  Flame,
  Sparkles,
  Gift,
  CheckCircle2,
  Crown,
  Medal,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { RewardItem } from '../types';

export const LeaderboardSection: React.FC = () => {
  const { t, user, redeemReward, setActiveModal } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'alltime' | 'store'>('weekly');
  const [redeemedToast, setRedeemedToast] = useState<string | null>(null);

  const handleRedeem = (item: RewardItem) => {
    const success = redeemReward(item);
    if (success) {
      setRedeemedToast(`Successfully redeemed "${item.title}"! Voucher added to your dashboard.`);
      setTimeout(() => setRedeemedToast(null), 4000);
    }
  };

  // Sort leaderboard list to reflect current user's live points
  const dynamicLeaderboard = mockLeaderboard.map((player) => {
    if (player.isCurrentUser) {
      return {
        ...player,
        points: user.points,
        tier: user.tier,
      };
    }
    return player;
  }).sort((a, b) => b.points - a.points);

  return (
    <section id="rewards" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
            <span>04. VIP Club & Loyalty Rewards</span>
            <span aria-hidden="true">·</span>
            <span>Earn XP with Every Visit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('leaderboardTitle')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm sm:text-base">
            {t('leaderboardSubtitle')}
          </p>
        </div>

        {/* Member Status Banner Strip */}
        <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-indigo-900/40">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                {user.tier}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black">{user.name}</h3>
                <span className="flex items-center gap-1 text-xs text-amber-300 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  {user.streakDays}-Day Streak
                </span>
              </div>
              <p className="text-xs text-slate-300">
                VIP Digital Pass ID: <span className="font-mono text-amber-200">{user.qrCode}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-center sm:text-right">
            <div>
              <span className="text-xs text-slate-400 block">{t('ptsAvailable')}</span>
              <span className="text-3xl font-black text-amber-400 tabular-nums">
                {user.points} <span className="text-xs uppercase text-slate-300">XP</span>
              </span>
            </div>

            <button
              onClick={() => setActiveModal('dashboard')}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Open Dashboard
            </button>
          </div>
        </div>

        {/* Toast Notification on Redeem */}
        {redeemedToast && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{redeemedToast}</span>
            </div>
            <button
              onClick={() => setActiveModal('dashboard')}
              className="underline text-emerald-600 dark:text-emerald-400 font-bold ml-4"
            >
              View Vouchers
            </button>
          </div>
        )}

        {/* Tab Switcher Controls (functional buttons per §1.A) */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800 flex gap-1">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'weekly'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t('tabWeekly')}
            </button>
            <button
              onClick={() => setActiveTab('alltime')}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'alltime'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t('tabAllTime')}
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'store'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{t('tabRedeem')}</span>
            </button>
          </div>
        </div>

        {/* Tab 1 & 2: Leaderboard Table */}
        {(activeTab === 'weekly' || activeTab === 'alltime') && (
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3.5 px-6">Rank</th>
                    <th className="py-3.5 px-6">Player / Family</th>
                    <th className="py-3.5 px-6">Tier Level</th>
                    <th className="py-3.5 px-6">Streak</th>
                    <th className="py-3.5 px-6 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {dynamicLeaderboard.map((item, index) => {
                    const rankNum = index + 1;
                    const isTop1 = rankNum === 1;
                    const isTop2 = rankNum === 2;
                    const isTop3 = rankNum === 3;

                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors ${
                          item.isCurrentUser
                            ? 'bg-amber-50/70 dark:bg-amber-950/30 font-bold'
                            : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-3.5 px-6 whitespace-nowrap">
                          {isTop1 ? (
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-sm">
                              👑 1
                            </span>
                          ) : isTop2 ? (
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black text-xs shadow-sm">
                              2
                            </span>
                          ) : isTop3 ? (
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs shadow-sm">
                              3
                            </span>
                          ) : (
                            <span className="font-mono text-slate-500 tabular-nums pl-2">
                              #{rankNum}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                            <div>
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {item.name}
                              </span>
                              {item.isCurrentUser && (
                                <span className="ml-2 text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase">
                                  (You)
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-6 whitespace-nowrap">
                          <span
                            className={`text-xs font-semibold ${
                              item.tier === 'Diamond'
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : item.tier === 'Gold'
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {item.tier} Adventurer
                          </span>
                        </td>

                        <td className="py-3.5 px-6 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                            <span className="tabular-nums">{item.streak} days</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-6 text-right whitespace-nowrap">
                          <span className="font-black text-slate-900 dark:text-white tabular-nums text-sm">
                            {item.points.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-slate-400 ml-1">XP</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Points Reward Store */}
        {activeTab === 'store' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRewards.map((rew) => {
              const canAfford = user.points >= rew.pointsCost;

              return (
                <div
                  key={rew.id}
                  className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        {rew.tag}
                      </span>
                      <span className="text-xs text-slate-400">
                        In stock: {rew.stock}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">
                      {rew.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                      {rew.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
                        {rew.pointsCost}
                      </span>
                      <span className="text-xs font-bold text-slate-400 ml-1">XP</span>
                    </div>

                    <button
                      onClick={() => handleRedeem(rew)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-500/20 active:scale-95'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{canAfford ? t('redeemBtn') : t('insufficientPts')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
