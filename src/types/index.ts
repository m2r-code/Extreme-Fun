export type Language = 'en' | 'id' | 'fr' | 'zh';

export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Diamond';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  xp: number;
  tier: LoyaltyTier;
  streakDays: number;
  qrCode: string;
  isLoggedIn: boolean;
  loginProvider?: 'google' | 'apple' | 'facebook' | 'email' | 'guest';
  syncCode: string;
  lastSyncedAt: string;
}

export interface ActivityItem {
  id: string;
  type: 'spin' | 'quest' | 'arcade' | 'booking' | 'reward' | 'bonus';
  title: string;
  description: string;
  pointsDelta: number;
  timestamp: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'explorer' | 'arcade' | 'party' | 'loyalty';
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'tickets' | 'cafe' | 'arcade' | 'merch' | 'vip';
  tag: string;
  stock: number;
}

export interface UserVoucher {
  id: string;
  title: string;
  code: string;
  discount: string;
  expiresAt: string;
  category: string;
  redeemed: boolean;
  qrValue: string;
}

export interface Attraction {
  id: string;
  name: string;
  tagline: string;
  description: string;
  ageRange: string;
  capacity: string;
  image: string;
  highlights: string[];
  features: string[];
  questBadgeId: string;
  priceNote: string;
}

export interface PartyPackage {
  id: string;
  name: string;
  tier: 'silver' | 'gold' | 'platinum';
  popular?: boolean;
  price: number;
  duration: string;
  guestsIncluded: number;
  extraGuestPrice: number;
  features: string[];
  bonusPoints: number;
}

export interface PassItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  bestFor: string;
  includes: string[];
  popular?: boolean;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  tier: LoyaltyTier;
  streak: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}

export interface PromoNotification {
  id: string;
  title: string;
  message: string;
  code?: string;
  discount?: string;
  timestamp: string;
  read: boolean;
  type: 'flash' | 'event' | 'reward' | 'system';
}

export interface CartBookingItem {
  id: string;
  type: 'pass' | 'party' | 'arcade_card';
  title: string;
  price: number;
  quantity: number;
  date?: string;
  timeSlot?: string;
  options?: {
    gripSocks?: boolean;
    arcadeCredit?: number;
    extraGuests?: number;
  };
}
