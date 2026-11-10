import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, User, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { activeModal, setActiveModal, loginSocial, loginEmail, t } = useApp();
  const [tab, setTab] = useState<'social' | 'email'>('social');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (activeModal !== 'login') return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubmitting(true);
    setTimeout(() => {
      loginEmail(emailInput);
      setIsSubmitting(false);
    }, 400);
  };

  const handleSocialClick = (provider: 'google' | 'apple' | 'facebook') => {
    setIsSubmitting(true);
    setTimeout(() => {
      loginSocial(provider);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon & Heading */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-rose-500/25">
          ⚡
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          {t('loginTitle')}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
          {t('loginSubtitle')}
        </p>

        {/* 1-Click Fast Social Sign In (§User Request) */}
        <div className="space-y-3 mb-6">
          {/* Google */}
          <button
            onClick={() => handleSocialClick('google')}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors flex items-center justify-center gap-3 shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t('continueWithGoogle')}</span>
          </button>

          {/* Apple */}
          <button
            onClick={() => handleSocialClick('apple')}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center justify-center gap-3 shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.73-7.93-12.11-14.56-6.19-9.35-11.13-20.08-14.82-32.18-3.69-12.1-5.54-23.47-5.54-34.1 0-14.34 3.63-26.17 10.89-35.48 7.26-9.31 16.48-14.07 27.67-14.28 4.79 0 10.15 1.25 16.08 3.75 5.93 2.5 9.77 3.86 11.52 4.1 1.96-.35 5.93-1.76 11.91-4.24 5.98-2.48 11.13-3.66 15.45-3.54 11.52.43 20.93 4.54 28.23 12.33-9.8 5.87-14.61 14.13-14.42 24.78.22 8.26 3.4 15.22 9.54 20.87 6.14 5.65 13.59 9.02 22.35 10.11-1.74 5.22-3.7 10.43-5.88 15.63zM119.22 31.84c0-7.39 2.66-14.45 7.98-21.19 5.32-6.74 12.01-10.65 20.08-11.74.22 1.3.33 2.39.33 3.26 0 7.39-2.77 14.45-8.31 21.19-5.54 6.74-12.28 10.54-20.21 11.41-.21-1.09-.32-2.09-.32-2.93z" />
            </svg>
            <span>{t('continueWithApple')}</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleSocialClick('facebook')}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition-colors flex items-center justify-center gap-3 shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>{t('continueWithFacebook')}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
            {t('orEmail')}
          </span>
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={t('emailPlaceholder')}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder={t('passwordPlaceholder')}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-rose-500/20 active:scale-95 transition-all"
          >
            {isSubmitting ? 'Signing in...' : t('signInSubmit')}
          </button>
        </form>

        {/* Reassurance */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-Bit SSL Encrypted & GDPR Compliant</span>
        </div>
      </div>
    </div>
  );
};
