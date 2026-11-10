import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, RefreshCw, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { user, syncStatus, triggerSync, setActiveModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-black tracking-tight text-white mb-3"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white text-base">
                ⚡
              </span>
              <span className="font-display">
                Extreme<span className="text-rose-500">Fun</span>
              </span>
            </a>
            <p className="text-slate-400 leading-relaxed mb-4 max-w-sm">
              Vancouver & Richmond&apos;s premier 30,000 sq ft indoor family adventure kingdom. Giant multi-level maze, cyber neon laser tag, VR simulators, and award-winning birthday party packages.
            </p>
            <div className="flex items-center gap-2 text-slate-300">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Certified Child Safety Standards & Daily Sanitization</span>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Facility Location & Hours
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>12088 Bridgeport Rd, Richmond, BC V6V 1J3, Canada</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p>Mon – Thu: 9:30 AM – 7:30 PM</p>
                  <p>Fri – Sun: 9:00 AM – 8:30 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>(604) 273-0000</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#attractions" className="hover:text-white transition-colors">
                  Play Arenas
                </a>
              </li>
              <li>
                <a href="#parties" className="hover:text-white transition-colors">
                  Birthday Parties
                </a>
              </li>
              <li>
                <a href="#passes" className="hover:text-white transition-colors">
                  Passes & Tickets
                </a>
              </li>
              <li>
                <a href="#rewards" className="hover:text-white transition-colors">
                  VIP Leaderboard
                </a>
              </li>
              <li>
                <a href="#cafe" className="hover:text-white transition-colors">
                  Extreme Café
                </a>
              </li>
            </ul>
          </div>

          {/* Real-time Cloud Sync & Member Station */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Device Cloud Sync Station
            </h4>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-300">Auto-Sync Status:</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Sync Key: <span className="font-mono text-amber-300 font-bold">{user.syncCode}</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={triggerSync}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`w-3 h-3 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                  <span>Sync Now</span>
                </button>
                <button
                  onClick={() => setActiveModal('sync')}
                  className="py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-colors"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Extreme Fun Inc. All rights reserved. Richmond, British Columbia.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Safety Waiver Form</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
