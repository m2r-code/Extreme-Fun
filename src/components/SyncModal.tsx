import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  RefreshCw,
  Copy,
  Check,
  QrCode,
  Smartphone,
  Download,
  Upload,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const SyncModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    user,
    syncStatus,
    triggerSync,
    importSyncData,
    exportBackupJson,
    t,
  } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  if (activeModal !== 'sync') return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(user.syncCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const ok = importSyncData(inputCode);
    if (ok) {
      setSyncFeedback('Data successfully restored and synchronized from cloud vault!');
      setInputCode('');
      setTimeout(() => setSyncFeedback(null), 3000);
    } else {
      setSyncFeedback('Invalid sync code or format. Please verify and try again.');
    }
  };

  const handleDownloadBackup = () => {
    const json = exportBackupJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extremefun-backup-${user.syncCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm">
            <RefreshCw className={`w-6 h-6 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t('syncTitle')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('syncSubtitle')}
          </p>
        </div>

        {/* Sync Status Pill & Manual Sync Button */}
        <div className="mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {syncStatus === 'syncing' ? 'Syncing with Cloud Vault...' : t('syncStatusActive')}
            </span>
          </div>
          <button
            onClick={triggerSync}
            className="px-3 py-1 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Sync Now</span>
          </button>
        </div>

        {/* This Device's Unique Sync Code */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-slate-800 dark:to-slate-800/80 border border-indigo-200 dark:border-slate-700 text-center">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            {t('yourSyncCode')}
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-wider">
              {user.syncCode}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-indigo-600 shadow-sm"
              title="Copy Code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
            Enter this code on your mobile phone or tablet to access your points and passes.
          </p>
        </div>

        {/* Feedback message */}
        {syncFeedback && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}

        {/* Form: Enter Sync Code from another device */}
        <form onSubmit={handleImport} className="space-y-3 mb-6">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 text-left">
            {t('syncEnterCode')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="e.g. EXT-8492-FUN"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs uppercase text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors whitespace-nowrap active:scale-95"
            >
              {t('syncRestoreBtn')}
            </button>
          </div>
        </form>

        {/* JSON Backup Export Link */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center">
          <button
            onClick={handleDownloadBackup}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('exportData')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
