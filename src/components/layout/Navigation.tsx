import React from 'react';
import { Sprout, FlaskConical, Store, Wrench, Trophy, Medal } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'orchard', icon: Sprout, color: 'text-leaf-green', bg: 'bg-leaf-green/10' },
    { id: 'lab', icon: FlaskConical, color: 'text-water-blue', bg: 'bg-water-blue/10' },
    { id: 'market', icon: Store, color: 'text-mineral-gold', bg: 'bg-mineral-gold/10' },
    { id: 'tools', icon: Wrench, color: 'text-burn-red', bg: 'bg-burn-red/10' },
    { id: 'achievements', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { id: 'leaderboard', icon: Medal, color: 'text-sky-400', bg: 'bg-sky-400/10' },
  ];

  return (
    <div className="lg:col-span-1 flex flex-row lg:flex-col gap-3 md:gap-4 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 lg:flex-none p-4 rounded-2xl flex items-center justify-center transition-all relative group
            ${activeTab === tab.id 
              ? `${tab.bg} ${tab.color} border border-${tab.id === 'orchard' ? 'leaf-green' : tab.id === 'lab' ? 'water-blue' : tab.id === 'market' ? 'mineral-gold' : 'burn-red'}/30 shadow-lg` 
              : 'bg-card-bg text-text-secondary hover:text-white border border-transparent'}`}
        >
          <tab.icon size={24} />
          {activeTab === tab.id && (
            <motion.div 
              layoutId="nav-indicator"
              className={`absolute -bottom-1 lg:bottom-auto lg:-right-1 w-1 h-1 lg:w-1 lg:h-1 rounded-full ${tab.id === 'orchard' ? 'bg-leaf-green' : tab.id === 'lab' ? 'bg-water-blue' : tab.id === 'market' ? 'bg-mineral-gold' : 'bg-burn-red'}`}
            />
          )}
          <div className="absolute left-full ml-4 px-2 py-1 bg-soil-dark border border-white/10 rounded hidden lg:group-hover:block transition-all z-50 text-[10px] uppercase font-bold tracking-widest">
            {tab.id}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Navigation;
