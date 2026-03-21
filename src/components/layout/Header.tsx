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
  const weatherIcon = {
    clear:    <Sun size={14} />,
    rain:     <CloudRain size={14} />,
    storm:    <CloudLightning size={14} />,
    heatwave: <Thermometer size={14} />,
    fog:      <Cloud size={14} />,
  }[state.weather.type] ?? <Sun size={14} />;

  const weatherColor = {
    clear:    'text-mineral-gold',
    rain:     'text-water-blue',
    storm:    'text-violet-400',
    heatwave: 'text-burn-red',
    fog:      'text-text-secondary',
  }[state.weather.type] ?? 'text-text-secondary';

  return (
    <div className="w-full glass-panel hardware-panel">
      {/* Mobile: single compact row */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 md:hidden">
        {/* Stats */}
        <div className="flex items-center gap-3 text-xs font-mono font-bold">
          <span className="text-text-secondary">D<span className="text-leaf-green">{state.day}</span></span>
          <span className="text-mineral-gold">{state.credits}🪙</span>
          <span className="text-water-blue">{state.dataSeeds}🧬</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={state.weather.type}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`flex items-center gap-1 ${weatherColor}`}
            >
              {weatherIcon}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {state.user && (
            <button
              onClick={logout}
              className="p-1.5 rounded-lg bg-burn-red/10 border border-burn-red/30 text-burn-red"
            >
              <LogOut size={13} />
            </button>
          )}
          <button
            onClick={nextDay}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-leaf-green/10 border border-leaf-green/30 text-leaf-green text-[10px] font-bold uppercase tracking-widest"
          >
            <RefreshCw size={12} />
            Next
          </button>
        </div>
      </div>

      {/* Desktop: original layout */}
      <div className="hidden md:flex justify-between items-center px-8 py-3 gap-4">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Temporal Cycle</span>
            <span className="text-xl font-mono font-bold text-leaf-green">DAY {state.day}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Liquid Capital</span>
            <span className="text-xl font-mono font-bold text-mineral-gold">{state.credits} 🪙</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Genetic Data</span>
            <span className="text-xl font-mono font-bold text-water-blue">{state.dataSeeds} 🧬</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
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
        <div className="flex items-center gap-2">
          {state.user && (
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 bg-burn-red/10 hover:bg-burn-red/20 px-4 py-2 rounded-lg border border-burn-red/30 transition-all text-[10px] font-bold text-burn-red uppercase tracking-widest"
            >
              <LogOut size={14} />
              LOGOUT
            </button>
          )}
          <button
            onClick={nextDay}
            className="flex items-center justify-center gap-2 bg-leaf-green/10 hover:bg-leaf-green/20 px-6 py-2 rounded-lg border border-leaf-green/30 transition-all text-sm font-bold text-leaf-green"
          >
            <RefreshCw size={16} />
            END CYCLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
