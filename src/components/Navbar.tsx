import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Bell,
  RefreshCw,
  User,
  Globe,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    user,
    unreadPromoCount,
    setActiveModal,
    openBooking,
    syncStatus,
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇨🇦' },
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'zh', label: '中文 (Richmond)', flag: '🇨🇳' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="/"
          className="group flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </span>
          <span className="font-display">
            Extreme<span className="text-rose-500">Fun</span>
          </span>
        </a>

        {/* Zone 2: 4–5 Clean Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a
            href="#attractions"
            className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t('navAttractions')}
          </a>
          <a
            href="#parties"
            className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t('navParties')}
          </a>
          <a
            href="#passes"
            className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t('navPasses')}
          </a>
          <a
            href="#rewards"
            className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t('navRewards')}
          </a>
          <a
            href="#cafe"
            className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t('navCafe')}
          </a>
        </nav>

        {/* Zone 3: Primary Action & Interactive System Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Points Pill */}
          <button
            onClick={() => setActiveModal('dashboard')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold whitespace-nowrap hover:bg-amber-100 transition-colors"
            title="Your Points & VIP Status"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="tabular-nums">{user.points}</span>
            <span className="text-[10px] uppercase tracking-wider text-amber-600/80 dark:text-amber-400/80">
              {user.tier}
            </span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={soundEnabled ? 'Mute Game Sounds' : 'Unmute Game Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Dark/Light Mode */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Push Notifications & Promos Bell */}
          <button
            onClick={() => setActiveModal('notif')}
            aria-label="Promotions and Notifications"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Promo Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadPromoCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </button>

          {/* Cloud Sync Icon */}
          <button
            onClick={() => setActiveModal('sync')}
            aria-label="Device Cloud Sync"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Sync Data Across Devices"
          >
            <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin text-indigo-500' : ''}`} />
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="uppercase">{language}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                      language === l.code
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span>{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Member Profile Button */}
          <button
            onClick={() => setActiveModal(user.isLoggedIn ? 'dashboard' : 'login')}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-rose-400 transition-all shrink-0"
            title={user.isLoggedIn ? `${user.name} - View Dashboard` : 'Sign In'}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <User className="w-4 h-4" />
              </div>
            )}
          </button>

          {/* Primary CTA: Book Play Pass */}
          <button
            onClick={() =>
              openBooking({
                id: 'quick-pass',
                type: 'pass',
                title: 'All-Day Adventure Pass',
                price: 21.99,
                quantity: 1,
              })
            }
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl hover:from-rose-600 hover:to-rose-700 shadow-sm shadow-rose-500/25 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Ticket className="w-3.5 h-3.5" />
            {t('navBookNow')}
          </button>
        </div>
      </div>
    </header>
  );
};
