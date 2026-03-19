import React from 'react';
import { FlaskConical, Droplets, TrendingUp, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { GlobalUpgrades, Plant } from '../../types';

interface LabTabProps {
  upgrades: GlobalUpgrades;
  dataSeeds: number;
  credits: number;
  breedingParents: number[];
  plants: (Plant | null)[];
  onBuyUpgrade: (id: keyof GlobalUpgrades) => void;
  onBreedingSelect: (index: number) => void;
  onRemoveBreedingParent: (index: number) => void;
  onCrossPollinate: () => void;
}

const LabTab: React.FC<LabTabProps> = ({
  upgrades,
  dataSeeds,
  credits,
  breedingParents,
  plants,
  onBuyUpgrade,
  onBreedingSelect,
  onRemoveBreedingParent,
  onCrossPollinate
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-xl italic">Bio-Genetic Lab</h2>
        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Global Enhancements</span>
      </div>

      <div className="hardware-panel p-6 space-y-6 border-leaf-green/20 glass-panel">
        <div className="flex items-center gap-2 text-leaf-green">
          <FlaskConical size={18} />
          <h4 className="text-xs font-bold uppercase tracking-widest">Hybridization Chamber</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map(idx => (
            <div key={idx} className="h-32 rounded-xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-2 bg-black/40">
              {breedingParents[idx] !== undefined ? (
                <div className="text-center">
                  <p className="text-[10px] font-bold text-leaf-green uppercase tracking-tighter">{plants[breedingParents[idx]]?.rarity}</p>
                  <p className="text-xs font-bold">{plants[breedingParents[idx]]?.type}</p>
                  <button 
                    onClick={() => onRemoveBreedingParent(idx)}
                    className="mt-2 text-[10px] text-burn-red hover:underline uppercase font-bold"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <p className="text-[10px] text-text-secondary uppercase font-bold opacity-30">Select Mature Plant</p>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-[10px] text-text-secondary leading-relaxed italic opacity-80">
            Select two mature specimens from your current orchard to attempt cross-pollination. 
            Hybridization costs <span className="text-mineral-gold font-bold">100🪙</span> and requires an empty plot.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {plants.map((p, i) => (
              p && p.stageIndex >= 4 && !breedingParents.includes(i) && (
                <button
                  key={i}
                  onClick={() => onBreedingSelect(i)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-leaf-green/50 transition-all text-[10px] font-bold whitespace-nowrap"
                >
                  {p.type} ({p.rarity[0]})
                </button>
              )
            ))}
          </div>

          <button 
            onClick={onCrossPollinate}
            disabled={breedingParents.length !== 2 || credits < 100}
            className="w-full bg-leaf-green text-soil-dark font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-leaf-green/10"
          >
            INITIATE CROSS-POLLINATION
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {[
          { id: 'waterEfficiency', name: 'Deep Roots', desc: 'Reduces water consumption by 10%', icon: Droplets },
          { id: 'nutrientRetention', name: 'Efficient Metabolism', desc: 'Reduces nutrient drain by 10%', icon: TrendingUp },
          { id: 'stressResistance', name: 'Hardened Bark', desc: 'Reduces stress gain by 5 points', icon: Flame },
        ].map(u => (
          <button 
            key={u.id}
            onClick={() => onBuyUpgrade(u.id as keyof GlobalUpgrades)}
            className="hardware-panel p-4 flex items-center gap-4 hover:border-water-blue/40 transition-all group glass-panel"
          >
            <div className="w-12 h-12 rounded-lg bg-water-blue/10 flex items-center justify-center text-water-blue group-hover:scale-110 transition-transform">
              <u.icon size={24} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-sm tracking-tight">{u.name}</h4>
              <p className="text-[10px] text-text-secondary opacity-80">{u.desc}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-water-blue">10 🧬</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default LabTab;
