import { BattlePassState, BattlePassTier } from '../types/battlepass';

export const BATTLE_PASS_PREMIUM_COST = 1200;

export const BATTLE_PASS_TIERS: BattlePassTier[] = [
  { level: 1, xpRequired: 0, freeReward: { type: 'credits', id: 'free-credits-1', name: 'Starter Grant', amount: 100 }, premiumReward: { type: 'credits', id: 'premium-credits-1', name: 'Premium Grant', amount: 200 } },
  { level: 2, xpRequired: 120, freeReward: { type: 'seeds', id: 'free-seeds-2', name: 'Research Cache', amount: 15 }, premiumReward: { type: 'tool', id: 'watering-can', name: 'Watering Can Boost', amount: 1 } },
  { level: 3, xpRequired: 280, freeReward: { type: 'credits', id: 'free-credits-3', name: 'Market Voucher', amount: 180 }, premiumReward: { type: 'species', id: 'Solar-Bloom', name: 'Solar-Bloom Intel', rarity: 'Rare' } },
  { level: 4, xpRequired: 480, freeReward: { type: 'seeds', id: 'free-seeds-4', name: 'Genetic Parcel', amount: 20 }, premiumReward: { type: 'credits', id: 'premium-credits-4', name: 'Operations Fund', amount: 300 } },
  { level: 5, xpRequired: 720, freeReward: { type: 'tool', id: 'soil-tester', name: 'Soil Tester Boost', amount: 1 }, premiumReward: { type: 'title', id: 'cultivator', name: 'Title: Data Cultivator' } },
  { level: 6, xpRequired: 1020, freeReward: { type: 'credits', id: 'free-credits-6', name: 'Mid-Season Bonus', amount: 250 }, premiumReward: { type: 'seeds', id: 'premium-seeds-6', name: 'Deep Genetic Cache', amount: 35 } },
  { level: 7, xpRequired: 1360, freeReward: { type: 'species', id: 'Cryo-Lily', name: 'Cryo-Lily Intel', rarity: 'Epic' }, premiumReward: { type: 'tool', id: 'data-extractor', name: 'Data Extractor Boost', amount: 1 } },
  { level: 8, xpRequired: 1760, freeReward: { type: 'skin', id: 'verdant-grid', name: 'Skin: Verdant Grid' }, premiumReward: { type: 'credits', id: 'premium-credits-8', name: 'Executive Credit Drop', amount: 450 } },
  { level: 9, xpRequired: 2200, freeReward: { type: 'seeds', id: 'free-seeds-9', name: 'Lab Reserve', amount: 40 }, premiumReward: { type: 'species', id: 'Gravity-Root', name: 'Gravity-Root Intel', rarity: 'Legendary' } },
  { level: 10, xpRequired: 2700, freeReward: { type: 'title', id: 'orchard-architect', name: 'Title: Orchard Architect' }, premiumReward: { type: 'credits', id: 'premium-credits-10', name: 'Season Finale Fund', amount: 800 } },
];

export const INITIAL_BATTLE_PASS_STATE: BattlePassState = {
  seasonId: 'season-aurora-01',
  seasonName: 'Aurora Growth Protocol',
  currentXP: 0,
  currentLevel: 1,
  isPremium: false,
  claimedFree: [],
  claimedPremium: [],
  startDate: '2026-04-01',
  endDate: '2026-06-30',
};
