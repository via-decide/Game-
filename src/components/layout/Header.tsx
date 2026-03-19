import React from 'react';
import { Sun, CloudRain, CloudLightning, Thermometer, Cloud, LogOut, RefreshCw, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GameState } from '../../types';

interface HeaderProps {
  state: GameState;
  nextDay: () => void;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ state, nextDay, logout }) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center glass-panel p-4 px-6 md:px-8 gap-4 mb-6">
      <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Temporal Cycle</span>
          <span className="text-lg md:text-xl font-mono font-bold text-leaf-green">DAY {state.day}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Liquid Capital</span>
          <span className="text-lg md:text-xl font-mono font-bold text-mineral-gold">{state.credits} 🪙</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Genetic Data</span>
          <span className="text-lg md:text-xl font-mono font-bold text-water-blue">{state.dataSeeds} 🧬</span>
        </div>
        
        {/* Weather Indicator */}
        <div className="flex items-center gap-3 px-4 py-1 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={state.weather.type}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <div className={`p-2 rounded-lg ${
                state.weather.type === 'clear' ? 'text-mineral-gold bg-mineral-gold/10' :
                state.weather.type === 'rain' ? 'text-water-blue bg-water-blue/10' :
                state.weather.type === 'storm' ? 'text-violet-400 bg-violet-400/10' :
                state.weather.type === 'heatwave' ? 'text-burn-red bg-burn-red/10' :
                'text-text-secondary bg-text-secondary/10'
              }`}>
                {state.weather.type === 'clear' && <Sun size={20} />}
                {state.weather.type === 'rain' && <CloudRain size={20} />}
                {state.weather.type === 'storm' && <CloudLightning size={20} />}
                {state.weather.type === 'heatwave' && <Thermometer size={20} />}
                {state.weather.type === 'fog' && <Cloud size={20} />}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Atmosphere</span>
                <span className="text-xs font-bold uppercase">{state.weather.name}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        {state.user && (
          <button 
            onClick={logout}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-burn-red/10 hover:bg-burn-red/20 px-4 py-2 rounded-lg border border-burn-red/30 transition-all text-[10px] font-bold text-burn-red uppercase tracking-widest"
          >
            <LogOut size={14} />
            LOGOUT
          </button>
        )}
        <button 
          onClick={nextDay}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-leaf-green/10 hover:bg-leaf-green/20 px-6 py-2 rounded-lg border border-leaf-green/30 transition-all text-sm font-bold text-leaf-green"
        >
          <RefreshCw size={16} />
          END CYCLE
        </button>
      </div>
    </div>
  );
};

export default Header;
