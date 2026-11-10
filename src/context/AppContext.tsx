import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserProfile,
  ActivityItem,
  Badge,
  UserVoucher,
  RewardItem,
  CartBookingItem,
  PromoNotification,
  Attraction,
  LoyaltyTier,
} from '../types';
import { mockBadges, mockPromos } from '../data/mockData';
import { translations } from '../utils/translations';
import { playSound } from '../utils/sound';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;

  user: UserProfile;
  activities: ActivityItem[];
  badges: Badge[];
  vouchers: UserVoucher[];

  loginSocial: (provider: 'google' | 'apple' | 'facebook', customName?: string, customEmail?: string) => void;
  loginEmail: (email: string) => void;
  logout: () => void;

  addPoints: (amount: number, reason: string, type: ActivityItem['type']) => void;
  redeemReward: (reward: RewardItem) => boolean;
  unlockBadge: (badgeId: string) => void;
  exploredAttractions: string[];
  markAttractionExplored: (id: string) => void;

  canSpinWheel: boolean;
  executeSpin: () => { prize: string; points: number; voucher?: UserVoucher };

  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  selectedAttraction: Attraction | null;
  setSelectedAttraction: (attraction: Attraction | null) => void;

  cartBooking: CartBookingItem | null;
  openBooking: (item: CartBookingItem) => void;
  completeBooking: (paymentMethod: string) => { bookingCode: string; earnedPoints: number };

  promos: PromoNotification[];
  unreadPromoCount: number;
  markPromosAsRead: () => void;
  pushEnabled: boolean;
  requestPushPermission: () => Promise<boolean>;

  syncStatus: 'synced' | 'syncing';
  triggerSync: () => void;
  importSyncData: (syncCodeOrJson: string) => boolean;
  exportBackupJson: () => string;
}

const STORAGE_KEY = 'extremefun_app_data_v2';

const defaultUser: UserProfile = {
  id: 'guest-player-108',
  name: 'Alex Explorer',
  email: 'alex.explorer@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces',
  points: 850,
  xp: 850,
  tier: 'Silver',
  streakDays: 4,
  qrCode: 'EXT-VIP-850-ALEX',
  isLoggedIn: true,
  loginProvider: 'google',
  syncCode: 'EXT-8492-FUN',
  lastSyncedAt: new Date().toISOString(),
};

const defaultActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'bonus',
    title: 'Welcome VIP Bonus',
    description: 'Signed up and joined the Extreme Fun loyalty squad',
    pointsDelta: 200,
    timestamp: '2 days ago',
  },
  {
    id: 'act-2',
    type: 'arcade',
    title: 'Arcade Wonderland High Score',
    description: 'Played Speed Racer Simulator and won tickets',
    pointsDelta: 150,
    timestamp: 'Yesterday',
  },
  {
    id: 'act-3',
    type: 'spin',
    title: 'Daily Extreme Wheel Spin',
    description: 'Landed on Lucky 100 XP Wedge',
    pointsDelta: 100,
    timestamp: 'Today, 10:25 AM',
  },
];

const defaultVouchers: UserVoucher[] = [
  {
    id: 'vouch-1',
    title: '1 Free Extreme Café Special Coffee',
    code: 'CAFE-BREW-882',
    discount: '100% OFF Any Drink',
    expiresAt: '2026-12-31',
    category: 'Café',
    redeemed: false,
    qrValue: 'EXT-VOUCH-CAFE-882',
  },
  {
    id: 'vouch-2',
    title: '15% Off Any Day Pass Online',
    code: 'EXTREME15',
    discount: '15% OFF Pass',
    expiresAt: '2026-11-30',
    category: 'Passes',
    redeemed: false,
    qrValue: 'EXT-PROMO-15-ONLINE',
  },
];

function calculateTier(xp: number): LoyaltyTier {
  if (xp >= 3000) return 'Diamond';
  if (xp >= 1500) return 'Gold';
  if (xp >= 500) return 'Silver';
  return 'Bronze';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme & Language
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // User State
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [activities, setActivities] = useState<ActivityItem[]>(defaultActivities);
  const [badges, setBadges] = useState<Badge[]>(mockBadges);
  const [vouchers, setVouchers] = useState<UserVoucher[]>(defaultVouchers);
  const [exploredAttractions, setExploredAttractions] = useState<string[]>(['adventure-maze']);
  const [lastSpinDate, setLastSpinDate] = useState<string>('');

  // UI Modals & Booking Cart
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [cartBooking, setCartBooking] = useState<CartBookingItem | null>(null);

  // Promos & Notifications
  const [promos, setPromos] = useState<PromoNotification[]>(mockPromos);
  const [pushEnabled, setPushEnabled] = useState<boolean>(false);

  // Sync state
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing'>('synced');

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('extremefun_lang') as Language;
      if (savedLang && ['en', 'id', 'fr', 'zh'].includes(savedLang)) {
        setLanguageState(savedLang);
      }

      const savedTheme = localStorage.getItem('extremefun_theme') as 'light' | 'dark';
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeState(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      const savedSound = localStorage.getItem('extremefun_sound');
      if (savedSound !== null) {
        setSoundEnabled(savedSound === 'true');
      }

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.user) setUser(parsed.user);
        if (parsed.activities) setActivities(parsed.activities);
        if (parsed.badges) setBadges(parsed.badges);
        if (parsed.vouchers) setVouchers(parsed.vouchers);
        if (parsed.exploredAttractions) setExploredAttractions(parsed.exploredAttractions);
        if (parsed.lastSpinDate) setLastSpinDate(parsed.lastSpinDate);
        if (parsed.pushEnabled) setPushEnabled(parsed.pushEnabled);
      }
    } catch {
      // ignore parse error
    }
  }, []);

  // Sync data to localStorage helper
  const persistState = (override?: Record<string, unknown>) => {
    try {
      setSyncStatus('syncing');
      const payload = {
        user,
        activities,
        badges,
        vouchers,
        exploredAttractions,
        lastSpinDate,
        pushEnabled,
        ...override,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setTimeout(() => {
        setSyncStatus('synced');
      }, 400);
    } catch {
      setSyncStatus('synced');
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('extremefun_lang', lang);
    playSound('click', soundEnabled);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    localStorage.setItem('extremefun_theme', next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    playSound('click', soundEnabled);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('extremefun_sound', String(next));
    if (next) playSound('coin', true);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Points & Activities
  const addPoints = (amount: number, reason: string, type: ActivityItem['type']) => {
    const newPoints = Math.max(0, user.points + amount);
    const newXp = user.xp + (amount > 0 ? amount : 0);
    const newTier = calculateTier(newXp);

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type,
      title: reason,
      description: amount > 0 ? `Earned +${amount} Extreme points` : `Spent ${Math.abs(amount)} points`,
      pointsDelta: amount,
      timestamp: 'Just now',
    };

    const updatedUser = {
      ...user,
      points: newPoints,
      xp: newXp,
      tier: newTier,
      lastSyncedAt: new Date().toISOString(),
    };

    const updatedActivities = [newActivity, ...activities];
    setUser(updatedUser);
    setActivities(updatedActivities);
    persistState({ user: updatedUser, activities: updatedActivities });

    if (amount > 0) {
      playSound('coin', soundEnabled);
    }
  };

  // Unlock Badge
  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId && !b.unlocked) {
          playSound('badge', soundEnabled);
          return { ...b, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] };
        }
        return b;
      })
    );
  };

  // Mark attraction explored
  const markAttractionExplored = (id: string) => {
    if (!exploredAttractions.includes(id)) {
      const next = [...exploredAttractions, id];
      setExploredAttractions(next);
      addPoints(50, `Explored Attraction: ${id.replace('-', ' ').toUpperCase()}`, 'quest');

      // Check if all 4 explored
      if (next.length >= 4) {
        unlockBadge('badge-party-vip');
        unlockBadge('badge-laser-legend');
        unlockBadge('badge-arcade-ace');
        addPoints(200, 'Master Explorer Quest Complete!', 'quest');
      }
      persistState({ exploredAttractions: next });
    }
  };

  // Redeem Reward
  const redeemReward = (reward: RewardItem): boolean => {
    if (user.points < reward.pointsCost) {
      return false;
    }

    addPoints(-reward.pointsCost, `Redeemed: ${reward.title}`, 'reward');

    const newVoucher: UserVoucher = {
      id: `vouch-${Date.now()}`,
      title: reward.title,
      code: `EXT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      discount: reward.tag,
      expiresAt: '2026-12-31',
      category: reward.category.toUpperCase(),
      redeemed: false,
      qrValue: `VOUCH-${reward.id}-${Date.now()}`,
    };

    const nextVouchers = [newVoucher, ...vouchers];
    setVouchers(nextVouchers);
    persistState({ vouchers: nextVouchers });
    playSound('fanfare', soundEnabled);
    return true;
  };

  // Lucky Spin Wheel
  const todayStr = new Date().toISOString().split('T')[0];
  const canSpinWheel = lastSpinDate !== todayStr;

  const executeSpin = () => {
    const outcomes = [
      { prize: '100 Bonus XP & Points', points: 100 },
      { prize: '250 Mega Points Jackpot!', points: 250 },
      { prize: '1 Free Neon Laser Tag Match', points: 50, voucherTitle: 'Free Laser Tag Match Ticket' },
      { prize: 'Free Gourmet Drink at Extreme Café', points: 50, voucherTitle: 'Free Barista Coffee / Smoothie' },
      { prize: '150 Arcade XP Points', points: 150 },
      { prize: '20% Birthday Party Voucher', points: 75, voucherTitle: '20% Off Birthday Party Room' },
    ];

    const pick = outcomes[Math.floor(Math.random() * outcomes.length)];
    addPoints(pick.points, `Wheel Spin: ${pick.prize}`, 'spin');
    setLastSpinDate(todayStr);

    let voucher: UserVoucher | undefined = undefined;
    if (pick.voucherTitle) {
      voucher = {
        id: `vouch-${Date.now()}`,
        title: pick.voucherTitle,
        code: `SPIN-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        discount: 'Wheel Prize',
        expiresAt: '2026-12-31',
        category: 'Wheel',
        redeemed: false,
        qrValue: `WHEEL-PRIZE-${Date.now()}`,
      };
      setVouchers((prev) => [voucher!, ...prev]);
    }

    unlockBadge('badge-spin-lucky');
    persistState({ lastSpinDate: todayStr });
    playSound('fanfare', soundEnabled);

    return {
      prize: pick.prize,
      points: pick.points,
      voucher,
    };
  };

  // Auth
  const loginSocial = (provider: 'google' | 'apple' | 'facebook', customName?: string, customEmail?: string) => {
    const names = {
      google: customName || 'Taylor Morgan',
      apple: customName || 'Jordan Lee',
      facebook: customName || 'Sam Parker',
    };
    const avatars = {
      google: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
      apple: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
      facebook: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces',
    };

    const loggedUser: UserProfile = {
      ...user,
      id: `usr-${provider}-${Date.now().toString().slice(-4)}`,
      name: names[provider],
      email: customEmail || `${names[provider].toLowerCase().replace(' ', '.')}@gmail.com`,
      avatar: avatars[provider],
      isLoggedIn: true,
      loginProvider: provider,
      syncCode: `EXT-${Math.floor(1000 + Math.random() * 9000)}-FUN`,
      lastSyncedAt: new Date().toISOString(),
    };

    setUser(loggedUser);
    persistState({ user: loggedUser });
    playSound('success', soundEnabled);
    setActiveModal(null);
  };

  const loginEmail = (email: string) => {
    const loggedUser: UserProfile = {
      ...user,
      id: `usr-email-${Date.now().toString().slice(-4)}`,
      name: email.split('@')[0],
      email,
      isLoggedIn: true,
      loginProvider: 'email',
      lastSyncedAt: new Date().toISOString(),
    };
    setUser(loggedUser);
    persistState({ user: loggedUser });
    playSound('success', soundEnabled);
    setActiveModal(null);
  };

  const logout = () => {
    const guestUser: UserProfile = {
      ...defaultUser,
      id: `guest-${Date.now().toString().slice(-4)}`,
      name: 'Guest Explorer',
      email: 'guest@extremefun.ca',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces',
      isLoggedIn: false,
      loginProvider: 'guest',
    };
    setUser(guestUser);
    persistState({ user: guestUser });
    playSound('click', soundEnabled);
    setActiveModal(null);
  };

  // Booking & Checkout
  const openBooking = (item: CartBookingItem) => {
    setCartBooking(item);
    setActiveModal('checkout');
    playSound('click', soundEnabled);
  };

  const completeBooking = (paymentMethod: string) => {
    const bookingCode = `EF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const earnedPoints = Math.round((cartBooking?.price || 20) * 10);

    addPoints(earnedPoints, `Purchased Pass: ${cartBooking?.title || 'Adventure Pass'}`, 'booking');

    const bookingVoucher: UserVoucher = {
      id: `pass-${Date.now()}`,
      title: `${cartBooking?.title || 'Play Pass'} (${cartBooking?.quantity || 1}x)`,
      code: bookingCode,
      discount: `Paid via ${paymentMethod}`,
      expiresAt: '2026-12-31',
      category: 'Passes',
      redeemed: false,
      qrValue: `EXT-TICKET-${bookingCode}`,
    };

    setVouchers((prev) => [bookingVoucher, ...prev]);
    persistState({ vouchers: [bookingVoucher, ...vouchers] });
    playSound('fanfare', soundEnabled);

    return { bookingCode, earnedPoints };
  };

  // Push Notifications
  const requestPushPermission = async (): Promise<boolean> => {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setPushEnabled(true);
          persistState({ pushEnabled: true });
          playSound('success', soundEnabled);
          return true;
        }
      }
      // fallback in-app enabled
      setPushEnabled(true);
      persistState({ pushEnabled: true });
      playSound('success', soundEnabled);
      return true;
    } catch {
      setPushEnabled(true);
      return true;
    }
  };

  const unreadPromoCount = promos.filter((p) => !p.read).length;
  const markPromosAsRead = () => {
    setPromos((prev) => prev.map((p) => ({ ...p, read: true })));
  };

  // Device Sync
  const triggerSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setUser((prev) => ({ ...prev, lastSyncedAt: new Date().toISOString() }));
      setSyncStatus('synced');
      playSound('success', soundEnabled);
    }, 600);
  };

  const importSyncData = (syncCodeOrJson: string): boolean => {
    try {
      const trimmed = syncCodeOrJson.trim();
      if (trimmed.startsWith('{')) {
        const parsed = JSON.parse(trimmed);
        if (parsed.user) setUser(parsed.user);
        if (parsed.activities) setActivities(parsed.activities);
        if (parsed.badges) setBadges(parsed.badges);
        if (parsed.vouchers) setVouchers(parsed.vouchers);
        persistState(parsed);
        playSound('fanfare', soundEnabled);
        return true;
      } else if (trimmed.length >= 6) {
        // Simulated Cloud Sync Code pull
        const restoredUser: UserProfile = {
          ...user,
          syncCode: trimmed.toUpperCase(),
          points: user.points + 250,
          xp: user.xp + 250,
          tier: calculateTier(user.xp + 250),
          lastSyncedAt: new Date().toISOString(),
        };
        setUser(restoredUser);
        addPoints(50, `Cross-Device Synced (Code ${trimmed.toUpperCase()})`, 'bonus');
        persistState({ user: restoredUser });
        playSound('fanfare', soundEnabled);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const exportBackupJson = (): string => {
    return JSON.stringify(
      {
        user,
        activities,
        badges,
        vouchers,
        exploredAttractions,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        user,
        activities,
        badges,
        vouchers,
        loginSocial,
        loginEmail,
        logout,
        addPoints,
        redeemReward,
        unlockBadge,
        exploredAttractions,
        markAttractionExplored,
        canSpinWheel,
        executeSpin,
        activeModal,
        setActiveModal,
        selectedAttraction,
        setSelectedAttraction,
        cartBooking,
        openBooking,
        completeBooking,
        promos,
        unreadPromoCount,
        markPromosAsRead,
        pushEnabled,
        requestPushPermission,
        syncStatus,
        triggerSync,
        importSyncData,
        exportBackupJson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
