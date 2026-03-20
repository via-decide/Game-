import React from 'react';
import { Wrench, ShieldCheck, ArrowUpCircle, Cpu } from 'lucide-react';
import { motion } from 'motion';
import { Tool } from '../../types';

interface ToolsTabProps {
  tools: Tool[];
  credits: number;
  onBuyTool: (id: string) => void;
}

const ToolsTab: React.FC<ToolsTabProps> = ({ tools, credits, onBuyTool }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <Wrench size={24} className="text-burn-red" />
        <h2 className="font-serif text-2xl italic">Tool Management</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map(tool => {
          const cost = Math.round(tool.baseCost * Math.pow(tool.costMultiplier, tool.level));
          const isMax = tool.level >= tool.maxLevel;
          
          return (
            <div key={tool.id} className="hardware-panel p-5 flex flex-col gap-4 relative overflow-hidden group glass-panel">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-text-primary tracking-tight">{tool.name}</h3>
                  <p className="text-[10px] text-text-secondary leading-relaxed opacity-80">{tool.description}</p>
                </div>
                <div className="bg-black/60 px-3 py-1 rounded-full border border-white/5">
                  <span className="text-[10px] font-bold text-leaf-green">LVL {tool.level}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-secondary opacity-50">
                  <span>Efficiency Upgrade</span>
                  <span>{tool.level} / {tool.maxLevel}</span>
                </div>
                <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(tool.level / tool.maxLevel) * 100}%` }}
                    className="h-full bg-burn-red/80" 
                  />
                </div>
              </div>

              <button
                onClick={() => onBuyTool(tool.id)}
                disabled={isMax || credits < cost}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 relative z-10 ${
                  isMax 
                    ? 'bg-white/5 text-text-secondary cursor-not-allowed opacity-30 shadow-none' 
                    : credits >= cost
                      ? 'bg-burn-red text-soil-dark hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-burn-red/10'
                      : 'bg-burn-red/10 text-burn-red/50 border border-burn-red/20 cursor-not-allowed'
                }`}
              >
                {isMax ? (
                  <>
                    <ShieldCheck size={16} />
                    MAX LEVEL
                  </>
                ) : (
                  <>
                    <ArrowUpCircle size={16} />
                    UPGRADE ({cost}🪙)
                  </>
                )}
              </button>
              
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <Cpu size={120} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ToolsTab;
