import React from 'react';
import { Trophy, Star, Target, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  requirement: number;
  current: number;
  isUnlocked: boolean;
}

interface AchievementsProps {
  stats: {
    totalCredits: number;
    totalPlants: number;
    maxRarity: string;
    day: number;
  };
}

const Achievements: React.FC<AchievementsProps> = ({ stats }) => {
  const achievements: Achievement[] = [
    { id: '1', name: 'Novice Botanist', description: 'Harvest 10 plants.', icon: Sprout, requirement: 10, current: stats.totalPlants, isUnlocked: stats.totalPlants >= 10 },
    { id: '2', name: 'Master Trader', description: 'Earn 10,000 credits.', icon: TrendingUp, requirement: 10000, current: stats.totalCredits, isUnlocked: stats.totalCredits >= 10000 },
    { id: '3', name: 'Geneticist', description: 'Reach Day 50.', icon: Database, requirement: 50, current: stats.day, isUnlocked: stats.day >= 50 },
    { id: '4', name: 'Evolutionary Leap', description: 'Harvest a Legendary plant.', icon: Star, requirement: 1, current: stats.maxRarity === 'Legendary' ? 1 : 0, isUnlocked: stats.maxRarity === 'Legendary' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-mineral-gold" size={20} />
        <h2 className="font-serif text-xl italic uppercase tracking-wider">Genetic Milestones</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div key={ach.id} className={`hardware-panel p-4 glass-panel border-white/5 transition-all ${ach.isUnlocked ? 'border-mineral-gold/30 bg-mineral-gold/5' : 'opacity-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${ach.isUnlocked ? 'bg-mineral-gold text-soil-dark' : 'bg-white/5 text-text-secondary'}`}>
                <ach.icon size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold uppercase tracking-tight">{ach.name}</h4>
                <p className="text-[10px] text-text-secondary">{ach.description}</p>
              </div>
            </div>
            {ach.isUnlocked ? (
              <div className="mt-3 flex items-center gap-2 text-[9px] font-bold text-mineral-gold uppercase tracking-[0.2em]">
                <ShieldCheck size={12} /> COMPLETED
              </div>
            ) : (
              <div className="mt-3 space-y-1.5">
                <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-white/20" style={{ width: `${Math.min(100, (ach.current / ach.requirement) * 100)}%` }} />
                </div>
                <div className="flex justify-between text-[8px] font-mono text-text-secondary">
                  <span>PROGRESS</span>
                  <span>{ach.current} / {ach.requirement}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Types fix for the icons
import { Sprout, TrendingUp, Database, ShieldCheck } from 'lucide-react';

export default Achievements;
