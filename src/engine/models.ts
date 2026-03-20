/**
 * @license
 * Standardized Engine Models translated from decide.engine-tools
 */

export interface EngineMetrics {
  base: number;
  consistency: number;
  quality: number;
  depth: number;
  peer: number;
  modifier: number;
  secondary: number;
}

export const calculateBaseMetrics = (
  rootStrength: number, 
  water: number, 
  nutrients: number, 
  modifier: number = 1
): EngineMetrics => {
  return {
    base: rootStrength,
    consistency: water,
    quality: nutrients,
    depth: rootStrength, // Depth is often tied to roots
    peer: 50, // Default peer value for single player
    modifier,
    secondary: 0
  };
};

export const EngineUtils = {
  clamp: (num: number, min: number, max: number) => Math.max(min, Math.min(max, num)),
  weightedScore: (parts: { [key: string]: { value: number; weight: number } }) => {
    return Object.values(parts).reduce((sum, item) => sum + (item.value * item.weight), 0);
  }
};

export const engineModels = {
  player_signup: (m: EngineMetrics) => ({
    engine: 'player-signup',
    archetype: 'steady-grower',
    starterOrchard: 'orchard-alpha'
  }),

  root_strength_calculator: (m: EngineMetrics) => {
    return Math.round((m.base * 0.6 + m.consistency * 0.4) * m.modifier);
  },
  
  fruit_yield_engine: (m: EngineMetrics, stageIndex: number) => {
    const artifactCount = stageIndex + 1;
    return Math.round((artifactCount * m.quality) / 20);
  },
  
  weekly_harvest_engine: (m: EngineMetrics) => {
    return Math.round((m.consistency * 0.35 + m.quality * 0.35 + m.depth * 0.3) * m.modifier);
  },
  
  fair_ranking_engine: (m: EngineMetrics, improvement: number = 50) => {
    return Math.round(m.consistency * 0.28 + m.quality * 0.30 + m.depth * 0.2 + m.peer * 0.12 + (improvement * 0.10));
  },
  
  trust_score_engine: (m: EngineMetrics) => {
    return Math.round(m.peer * 0.4 + m.consistency * 0.35 + m.quality * 0.25);
  }
};
