import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout,
  FlaskConical,
  Store,
  Droplets,
  Zap,
  Bug,
  TrendingUp,
  RefreshCw,
  Database,
  ShieldCheck,
  AlertCircle,
  LogIn,
  Trophy,
  Medal,
  ExternalLink
} from 'lucide-react';

import { useAuth } from './hooks/useAuth';
import { useGameState } from './hooks/useGameState';
import { PLANT_STAGES, BASE_PLANT_TYPES } from './constants';
import PlantVisualizer from './components/PlantVisualizer';

// Layout Components
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Terminal from './components/layout/Terminal';

// Tab Components
import OrchardTab from './components/tabs/OrchardTab';
import LabTab from './components/tabs/LabTab';
import MarketTab from './components/tabs/MarketTab';
import ToolsTab from './components/tabs/ToolsTab';
import Achievements from './components/Achievements';
import Leaderboard from './components/Leaderboard';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-soil-dark flex items-center justify-center p-6">
          <div className="hardware-panel max-w-lg w-full p-8 space-y-6 border-burn-red/50">
            <div className="flex items-center gap-3 text-burn-red">
              <AlertCircle size={32} />
              <h2 className="text-xl font-bold uppercase tracking-tight">System Critical Error</h2>
            </div>
            <div className="bg-black/40 p-4 rounded-lg font-mono text-xs space-y-2 overflow-auto max-h-64">
              <p className="text-burn-red font-bold">Error: {this.state.error?.message || 'Unknown'}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl border border-white/10 transition-all font-mono text-xs"
            >
              REBOOT_SYSTEM
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  const [logs, setLogs] = useState<{ msg: string; type: string }[]>([]);
  const addLog = useCallback((msg: string, type: string = 'info') => {
    setLogs(prev => [{ msg, type }, ...prev].slice(0, 30));
  }, []);

  const { user, isAuthReady, isLoginLoading, handleLogin, handleLogout } = useAuth(addLog);
  const {
    state,
    setState,
    transferTarget,
    setTransferTarget,
    transferAmount,
    setTransferAmount,
    isTransferring,
    breedingParents,
    setBreedingParents,
    handlePlantAction,
    nextDay,
    buyPlot,
    buyTool,
    buyItem,
    buyUpgrade,
    useActiveTool,
    handleTransferCredits,
    handleCrossPollinate,
    unlockOrchard
  } = useGameState(user, addLog);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showNoCredits, setShowNoCredits] = useState(false);
  const [creditsCTADismissed, setCreditsCTADismissed] = useState(false);

  useEffect(() => {
    if (user && !localStorage.getItem(`onboarded_${user.uid}`)) {
      setShowOnboarding(true);
    }
  }, [user]);

  useEffect(() => {
    if (user && state.credits < 50 && !creditsCTADismissed) {
      setShowNoCredits(true);
    } else {
      setShowNoCredits(false);
    }
  }, [state.credits, user, creditsCTADismissed]);

  const handleOnboardingComplete = () => {
    if (user) {
      localStorage.setItem(`onboarded_${user.uid}`, 'true');
    }
    setShowOnboarding(false);
  };

  const activeOrchard = state.orchards.find(o => o.id === state.activeOrchardId)!;
  const selectedPlant = state.selectedPlantIndex !== null ? activeOrchard.plants[state.selectedPlantIndex] : null;

  return (
    <div className="min-h-screen p-3 sm:p-6 flex flex-col items-center gap-4 sm:gap-6 max-w-7xl mx-auto relative overflow-x-hidden">
      <AnimatePresence>
        {showOnboarding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <div className="hardware-panel max-w-lg w-full p-8 space-y-6 text-center border-mineral-gold/30 ring-1 ring-mineral-gold/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
              <div className="flex justify-center">
                <div className="p-4 rounded-3xl bg-mineral-gold/10 text-mineral-gold border border-mineral-gold/20">
                  <Sprout size={48} />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-4xl italic uppercase tracking-widest premium-gradient-text">Welcome, Pathfinder</h2>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-mineral-gold/50 to-transparent mx-auto" />
              </div>
              <p className="text-text-secondary text-sm leading-relaxed font-medium">
                You've been assigned to the **Data Orchard** sector. Your mission is to cultivate rare genetic strains, trade credits, and climb the global ranks. 
                <br/><br/>
                Use the navigation rail to access the Lab for cross-pollination and the Market for high-stakes trading.
              </p>
              <div className="pt-4">
                <button 
                  onClick={handleOnboardingComplete}
                  className="hardware-button w-full py-4 text-xs font-bold uppercase tracking-[0.4em] bg-mineral-gold text-soil-dark hover:bg-white transition-all shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Initialize Terminal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Credits CTA Modal */}
      <AnimatePresence>
        {showNoCredits && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="hardware-panel max-w-sm w-full p-6 space-y-5 border-mineral-gold/30 ring-1 ring-mineral-gold/20"
            >
              <div className="flex items-center gap-3 text-mineral-gold">
                <AlertCircle size={28} />
                <h2 className="text-lg font-bold uppercase tracking-widest">Credits Depleted</h2>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                You've run out of credits! Earn more by completing missions in our partner games and bring your rewards back here.
              </p>
              <div className="space-y-3">
                <a
                  href="https://github.com/via-decide/skillhex-mission-control"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-leaf-green/10 border border-leaf-green/30 rounded-xl text-leaf-green text-xs font-bold uppercase tracking-widest hover:bg-leaf-green/20 transition-all group"
                >
                  <span>Skillhex Mission Control</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="https://github.com/via-decide/Mars-Terminal-Rover-Simulator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-burn-red/10 border border-burn-red/30 rounded-xl text-burn-red text-xs font-bold uppercase tracking-widest hover:bg-burn-red/20 transition-all group"
                >
                  <span>Mars Terminal Rover</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
              <button
                onClick={() => { setCreditsCTADismissed(true); setShowNoCredits(false); }}
                className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-white transition-all border border-white/10 rounded-lg"
              >
                Dismiss
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header state={state} nextDay={nextDay} logout={handleLogout} />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation Rail */}
        <Navigation 
          activeTab={state.activeTab} 
          setActiveTab={(tab) => setState(p => ({ ...p, activeTab: tab }))} 
        />

        {/* Main Content Area */}
        <div className="lg:col-span-11 space-y-4 sm:space-y-6">
          {/* Low-credits banner (shown after modal dismissed) */}
          <AnimatePresence>
            {user && state.credits < 50 && creditsCTADismissed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 rounded-xl bg-mineral-gold/10 border border-mineral-gold/30 text-mineral-gold text-[10px] font-bold uppercase tracking-widest"
              >
                <span className="flex items-center gap-2"><AlertCircle size={14} /> Credits low — earn more from partner games</span>
                <div className="flex gap-2">
                  <a href="https://github.com/via-decide/skillhex-mission-control" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded bg-leaf-green/20 text-leaf-green hover:bg-leaf-green/30 transition-all">
                    Skillhex <ExternalLink size={10} />
                  </a>
                  <a href="https://github.com/via-decide/Mars-Terminal-Rover-Simulator" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded bg-burn-red/20 text-burn-red hover:bg-burn-red/30 transition-all">
                    Mars Rover <ExternalLink size={10} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Hero Section: Selected Specimen */}
          <AnimatePresence mode="wait">
            {selectedPlant ? (
              <motion.div 
                key={selectedPlant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-8 hardware-panel"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-white/5 text-text-secondary">
                        {selectedPlant.type}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded bg-black/40 border border-white/5
                        ${(selectedPlant.rarity ?? 'Common') === 'Legendary' ? 'text-mineral-gold border-mineral-gold/20' :
                          (selectedPlant.rarity ?? 'Common') === 'Epic' ? 'text-violet-400 border-violet-400/20' :
                          (selectedPlant.rarity ?? 'Common') === 'Rare' ? 'text-water-blue border-water-blue/20' :
                          (selectedPlant.rarity ?? 'Common') === 'Uncommon' ? 'text-leaf-green border-leaf-green/20' : 'text-text-secondary border-white/5'}`}
                      >
                        {(selectedPlant.rarity ?? 'Common').toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-serif italic text-white premium-gradient-text tracking-tight">
                      {PLANT_STAGES[selectedPlant.stageIndex].name}
                    </h3>
                    <p className="text-[10px] font-mono text-text-secondary opacity-50">NODE_IDENTITY: {selectedPlant.id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 rounded-full bg-leaf-green/5 border border-leaf-green/20 text-leaf-green text-[10px] font-bold uppercase tracking-widest animate-pulse-soft">
                      Bio-Synthesis Active
                    </div>
                    <button 
                      onClick={() => setState(p => ({ ...p, selectedPlantIndex: null }))}
                      className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-white transition-all border border-white/5"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="h-[260px] sm:h-[360px] md:h-[500px] bg-black/40 rounded-3xl dashed-border relative overflow-hidden group">
                    {(() => {
                      const currentThreshold = PLANT_STAGES[selectedPlant.stageIndex].threshold;
                      const nextThreshold = PLANT_STAGES[selectedPlant.stageIndex + 1]?.threshold || (currentThreshold * 2);
                      const progress = Math.min(1, Math.max(0, (selectedPlant.rootStrength - currentThreshold) / (nextThreshold - currentThreshold)));
                      
                      return (
                        <PlantVisualizer 
                          stageIndex={selectedPlant.stageIndex} 
                          progress={progress}
                          type={selectedPlant.type}
                          color={selectedPlant.color}
                          hasPests={selectedPlant.pests > 0}
                          isBurning={selectedPlant.stress > 90}
                          stress={selectedPlant.stress}
                          weather={state.weather.type}
                          toolEffect={state.lastToolEffect}
                        />
                      );
                    })()}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Active Tools Mini Overlay */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {state.tools.filter(t => t.type === 'active' && t.level > 0).map(tool => (
                        <button
                          key={tool.id}
                          onClick={() => useActiveTool(tool.id)}
                          disabled={(tool.currentCooldown || 0) > 0}
                          className={`p-3 rounded-xl backdrop-blur-md transition-all group relative border
                            ${(tool.currentCooldown || 0) > 0 
                              ? 'bg-black/40 border-white/5 text-text-secondary opacity-30' 
                              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                        >
                          {tool.id === 'pest-repellent-pulse' ? <Bug size={20} /> : <Database size={20} />}
                          
                          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 glass-panel border border-white/10 text-[9px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
                            {tool.name} 
                            {(tool.currentCooldown || 0) > 0 && ` (${tool.currentCooldown}c)`}
                          </div>

                          {(tool.currentCooldown || 0) > 0 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
                              <span className="text-[10px] font-bold text-white font-mono">{tool.currentCooldown}</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between py-2">
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        {[
                          { label: 'Hydration', val: selectedPlant.water, max: PLANT_STAGES[selectedPlant.stageIndex].maxWater, color: 'bg-water-blue', text: 'text-water-blue' },
                          { label: 'Nutrients', val: Math.round(selectedPlant.nutrients), max: 100, color: 'bg-mineral-gold', text: 'text-mineral-gold' },
                          { label: 'Stress', val: selectedPlant.stress, max: 100, color: 'bg-burn-red', text: 'text-burn-red' },
                          { label: 'Root XP', val: selectedPlant.rootStrength, max: PLANT_STAGES[selectedPlant.stageIndex + 1]?.threshold || 1000, color: 'bg-leaf-green', text: 'text-leaf-green' }
                        ].map(stat => (
                          <div key={stat.label} className="space-y-3">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary opacity-60">
                              <span>{stat.label}</span>
                              <span className={stat.text}>{stat.val} / {stat.max}</span>
                            </div>
                            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(stat.val / stat.max) * 100}%` }}
                                className={`h-full ${stat.color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-50">Botanical Analysis</span>
                        <p className="text-xs text-text-primary/80 italic leading-relaxed">
                          {BASE_PLANT_TYPES.find(t => t.name === selectedPlant.type)?.description || 'A unique genetic hybrid exhibiting complex phenotype variations and accelerated neural growth patterns.'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full mt-8">
                      {selectedPlant.isHarvestable ? (
                        <button 
                          onClick={() => handlePlantAction('harvest')}
                          className="col-span-2 flex items-center justify-center gap-3 bg-mineral-gold text-soil-dark font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-mineral-gold/10 uppercase tracking-widest"
                        >
                          <TrendingUp size={20} />
                          EXTRACT GENETIC SPECIMEN
                        </button>
                      ) : (
                        <>
                          <button 
                            onClick={() => handlePlantAction('research')}
                            disabled={selectedPlant.water < 5}
                            className="flex items-center justify-center gap-3 bg-leaf-green text-soil-dark font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 shadow-xl shadow-leaf-green/10 uppercase tracking-[0.1em] text-xs"
                          >
                            <Zap size={18} />
                            RESEARCH
                          </button>
                          <button 
                            onClick={() => handlePlantAction('water')}
                            className="flex items-center justify-center gap-3 bg-water-blue text-soil-dark font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-water-blue/10 uppercase tracking-[0.1em] text-xs"
                          >
                            <Droplets size={18} />
                            HYDRATE
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel p-16 flex flex-col items-center justify-center text-center gap-6 text-text-secondary border-dashed border-white/10 hardware-panel"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center animate-pulse-soft border border-white/5">
                  <Sprout size={40} className="light-glow text-leaf-green/50" />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-xl font-bold text-white tracking-tight">Systems Standby</h3>
                  <p className="text-xs leading-relaxed opacity-60">Initialize neural link by selecting a specimen from the bio-grid below to access growth telemetry and synthesis options.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secondary Content & Terminal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AnimatePresence mode="wait">
                {state.activeTab === 'orchard' && (
                  <OrchardTab 
                    orchards={state.orchards}
                    activeOrchardId={state.activeOrchardId}
                    selectedPlantIndex={state.selectedPlantIndex}
                    onPlantClick={(i, p) => p ? setState(prev => ({ ...prev, selectedPlantIndex: i })) : buyPlot(i)}
                    onOrchardChange={(id) => setState(prev => ({ ...prev, activeOrchardId: id, selectedPlantIndex: null }))}
                    onUnlockOrchard={unlockOrchard}
                  />
                )}
                {state.activeTab === 'lab' && (
                  <LabTab 
                    upgrades={state.upgrades}
                    dataSeeds={state.dataSeeds}
                    credits={state.credits}
                    breedingParents={breedingParents}
                    plants={activeOrchard.plants}
                    onBuyUpgrade={buyUpgrade}
                    onBreedingSelect={(i) => breedingParents.length < 2 && setBreedingParents(p => [...p, i])}
                    onRemoveBreedingParent={(idx) => setBreedingParents(p => p.filter((_, i) => i !== idx))}
                    onCrossPollinate={handleCrossPollinate}
                  />
                )}
                {state.activeTab === 'market' && (
                  <MarketTab 
                    credits={state.credits}
                    userUid={user?.uid}
                    transferTarget={transferTarget}
                    transferAmount={transferAmount}
                    isTransferring={isTransferring}
                    onTargetChange={setTransferTarget}
                    onAmountChange={setTransferAmount}
                    onTransfer={handleTransferCredits}
                    onBuyItem={buyItem}
                  />
                )}
                {state.activeTab === 'tools' && (
                  <ToolsTab 
                    tools={state.tools}
                    credits={state.credits}
                    onBuyTool={buyTool}
                  />
                )}
                {state.activeTab === 'achievements' && (
                  <Achievements
                    stats={{
                      totalCredits: state.credits,
                      totalPlants: state.orchards.reduce((acc, o) => acc + o.plants.filter(p => p !== null).length, 0),
                      maxRarity: (() => {
                        const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
                        let best = 0;
                        state.orchards.forEach(o => o.plants.forEach(p => {
                          if (p) { const idx = rarityOrder.indexOf(p.rarity); if (idx > best) best = idx; }
                        }));
                        return rarityOrder[best];
                      })(),
                      day: state.day
                    }}
                  />
                )}
                {state.activeTab === 'leaderboard' && (
                  <Leaderboard />
                )}
              </AnimatePresence>
            </div>

            <Terminal logs={logs} />
          </div>
        </div>
      </div>

      {/* Auth Overlay */}
      <AnimatePresence>
        {(!user && isAuthReady) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-panel max-w-md w-full p-10 text-center space-y-10 border-white/10"
            >
              <div className="space-y-6">
                <div className="w-20 h-20 bg-leaf-green/10 rounded-3xl flex items-center justify-center mx-auto text-leaf-green border border-leaf-green/20 rotate-3 animate-pulse-soft">
                  <Database size={40} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-serif italic text-white premium-gradient-text tracking-tight">Orchard Mainframe</h1>
                  <p className="text-[10px] text-text-secondary uppercase tracking-[0.4em]">Genetic Nexus Protocol</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-xs text-text-secondary leading-relaxed max-w-[280px] mx-auto opacity-70">
                  Secure an encrypted uplink to the bio-genetic database to persist your telemetry data and enable node synchronization.
                </p>
                
                <button 
                  onClick={handleLogin}
                  disabled={isLoginLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl disabled:opacity-50 font-mono text-xs tracking-widest"
                >
                  {isLoginLoading ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    <LogIn size={18} />
                  )}
                  {isLoginLoading ? 'ESTABLISHING_LINK...' : 'CONNECT_GOOGLE_AUTH'}
                </button>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-center gap-3 text-[9px] text-text-secondary uppercase tracking-[0.3em] opacity-40">
                <ShieldCheck size={12} />
                Nexus Protocol v4.2.0
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAuthReady && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <RefreshCw className="text-leaf-green/50" size={40} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
