/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AttractionsSection } from './components/AttractionsSection';
import { PartyPackagesSection } from './components/PartyPackagesSection';
import { PassesPricingSection } from './components/PassesPricingSection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { CafeSection } from './components/CafeSection';
import { Footer } from './components/Footer';

import { SpinWheelModal } from './components/SpinWheelModal';
import { ArcadeReflexMiniGame } from './components/ArcadeReflexMiniGame';
import { DashboardModal } from './components/DashboardModal';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SyncModal } from './components/SyncModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { AttractionDetailModal } from './components/AttractionDetailModal';

function MainApp() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <AttractionsSection />
        <PartyPackagesSection />
        <PassesPricingSection />
        <LeaderboardSection />
        <CafeSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <SpinWheelModal />
      <ArcadeReflexMiniGame />
      <DashboardModal />
      <AuthModal />
      <CheckoutModal />
      <SyncModal />
      <NotificationDrawer />
      <AttractionDetailModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
