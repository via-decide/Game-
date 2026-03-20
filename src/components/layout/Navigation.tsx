import React from 'react';
import { Sprout, FlaskConical, Store, Wrench, Trophy, Medal } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

// Static active styles per tab — avoids dynamic class name purging by Tailwind
const TAB_ACTIVE: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  orchard:     { bg: 'bg-leaf-green/10',    text: 'text-leaf-green',    border: 'border-leaf-green/30',    dot: 'bg-leaf-green' },
  lab:         { bg: 'bg-water-blue/10',    text: 'text-water-blue',    border: 'border-water-blue/30',    dot: 'bg-water-blue' },
  market:      { bg: 'bg-mineral-gold/10',  text: 'text-mineral-gold',  border: 'border-mineral-gold/30',  dot: 'bg-mineral-gold' },
  tools:       { bg: 'bg-burn-red/10',      text: 'text-burn-red',      border: 'border-burn-red/30',      dot: 'bg-burn-red' },
  achievements:{ bg: 'bg-amber-400/10',     text: 'text-amber-400',     border: 'border-amber-400/30',     dot: 'bg-amber-400' },
  leaderboard: { bg: 'bg-sky-400/10',       text: 'text-sky-400',       border: 'border-sky-400/30',       dot: 'bg-sky-400' },
};

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'orchard',      icon: Sprout },
    { id: 'lab',          icon: FlaskConical },
    { id: 'market',       icon: Store },
    { id: 'tools',        icon: Wrench },
    { id: 'achievements', icon: Trophy },
    { id: 'leaderboard',  icon: Medal },
  ];

  return (
    <div className="lg:col-span-1 flex flex-row lg:flex-col gap-3 md:gap-4 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        const s = TAB_ACTIVE[tab.id];
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 lg:flex-none p-4 rounded-2xl flex items-center justify-center transition-all relative group border
              ${active
                ? `${s.bg} ${s.text} ${s.border} shadow-lg`
                : 'bg-card-bg text-text-secondary hover:text-white border-transparent'}`}
          >
            <tab.icon size={24} />
            {active && (
              <motion.div
                layoutId="nav-indicator"
                className={`absolute -bottom-1 lg:bottom-auto lg:-right-1 w-1 h-1 rounded-full ${s.dot}`}
              />
            )}
            <div className="absolute left-full ml-4 px-2 py-1 bg-soil-dark border border-white/10 rounded hidden lg:group-hover:block transition-all z-50 text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">
              {tab.id}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
