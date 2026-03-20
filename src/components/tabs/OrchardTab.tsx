import React from 'react';
import { Database } from 'lucide-react';
import { motion } from 'motion';
import PlantCard from '../PlantCard';
import { Orchard, Plant } from '../../types';

interface OrchardTabProps {
  orchards: Orchard[];
  activeOrchardId: string;
  selectedPlantIndex: number | null;
  onPlantClick: (index: number, plant: Plant | null) => void;
  onOrchardChange: (id: string) => void;
  onUnlockOrchard: (id: string) => void;
}

const OrchardTab: React.FC<OrchardTabProps> = ({ 
  orchards, 
  activeOrchardId, 
  selectedPlantIndex, 
  onPlantClick, 
  onOrchardChange,
  onUnlockOrchard
}) => {
  const activeOrchard = orchards.find(o => o.id === activeOrchardId)!;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-leaf-green" />
            <h2 className="font-serif text-xl italic">{activeOrchard.name}</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {orchards.map(o => (
              <button
                key={o.id}
                onClick={() => o.isUnlocked ? onOrchardChange(o.id) : onUnlockOrchard(o.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeOrchardId === o.id 
                    ? 'bg-leaf-green text-soil-dark shadow-lg shadow-leaf-green/20 border border-leaf-green/30' 
                    : o.isUnlocked 
                      ? 'bg-white/5 text-text-secondary hover:text-white border border-white/5'
                      : 'bg-burn-red/10 text-burn-red border border-burn-red/30'
                }`}
              >
                {o.isUnlocked ? o.name : `Unlock ${o.name} (${o.unlockCost}🪙)`}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {activeOrchard.plants.map((plant, i) => (
          <PlantCard 
            key={i} 
            plant={plant} 
            index={i} 
            isSelected={selectedPlantIndex === i}
            onClick={() => onPlantClick(i, plant)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default OrchardTab;
