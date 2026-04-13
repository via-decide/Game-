export type BattlePassTier = {
  level: number;
  xpRequired: number;
  freeReward: BPReward;
  premiumReward: BPReward;
};

export type BPReward = {
  type: 'credits' | 'seeds' | 'species' | 'skin' | 'title' | 'tool';
  id: string;
  name: string;
  amount?: number;
  rarity?: string;
};

export type BattlePassState = {
  seasonId: string;
  seasonName: string;
  currentXP: number;
  currentLevel: number;
  isPremium: boolean;
  claimedFree: number[];
  claimedPremium: number[];
  startDate: string;
  endDate: string;
};
