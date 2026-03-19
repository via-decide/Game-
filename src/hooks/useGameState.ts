import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Plant, GlobalUpgrades, Orchard, Tool, Weather } from '../types';
import { PLANT_STAGES, INITIAL_UPGRADES, SHOP_ITEMS, INITIAL_TOOLS, getRandomWeather, BASE_PLANT_TYPES } from '../constants';
import { 
  db, 
  handleFirestoreError, 
  OperationType 
} from '../firebase';
import { 
  doc, 
  setDoc, 
  onSnapshot, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  increment,
  writeBatch
} from 'firebase/firestore';

export const useGameState = (user: { uid: string; displayName: string | null; email: string | null } | null, addLog: (msg: string, type?: string) => void) => {
  const [state, setState] = useState<GameState>({
    day: 1,
    credits: 100,
    dataSeeds: 0,
    orchards: [
      { id: 'orchard-1', name: 'Primary Orchard', plants: Array(9).fill(null), isUnlocked: true, unlockCost: 0 },
      { id: 'orchard-2', name: 'Highland Ridge', plants: Array(9).fill(null), isUnlocked: false, unlockCost: 250 },
      { id: 'orchard-3', name: 'Deep Valley', plants: Array(9).fill(null), isUnlocked: false, unlockCost: 750 }
    ],
    activeOrchardId: 'orchard-1',
    selectedPlantIndex: null,
    upgrades: INITIAL_UPGRADES,
    tools: INITIAL_TOOLS,
    activeTab: 'orchard',
    weather: getRandomWeather(),
    user: user,
    isAuthReady: true,
    lastToolEffect: null,
  });

  const [transferTarget, setTransferTarget] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [breedingParents, setBreedingParents] = useState<number[]>([]);

  const lastActivityRef = useRef(Date.now());
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  const saveState = useCallback(async (updates: Partial<GameState>) => {
    if (!user?.uid) return;
    updateActivity();
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, updates);
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.uid}`);
    }
  }, [user?.uid, updateActivity]);

  // Sync with Firestore
  useEffect(() => {
    if (!user?.uid) return;

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setState(prev => ({
          ...prev,
          day: data.day ?? prev.day,
          credits: data.credits ?? prev.credits,
          dataSeeds: data.dataSeeds ?? prev.dataSeeds,
          orchards: data.orchards ?? prev.orchards,
          upgrades: data.upgrades ?? prev.upgrades,
          tools: data.tools ?? prev.tools,
          weather: data.weather ?? prev.weather,
          user: user
        }));
      } else {
        const initialState = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          credits: 100,
          dataSeeds: 0,
          day: 1,
          upgrades: INITIAL_UPGRADES,
          tools: INITIAL_TOOLS,
          orchards: state.orchards,
          weather: state.weather,
          createdAt: serverTimestamp()
        };
        setDoc(userDocRef, initialState).catch(e => handleFirestoreError(e, OperationType.WRITE, `users/${user.uid}`));
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, `users/${user.uid}`));

    return () => unsubscribe();
  }, [user?.uid]);

  // Auto-save timer (2 minutes of inactivity)
  useEffect(() => {
    if (!user?.uid) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivityRef.current >= 120000) {
        saveState({
          day: state.day,
          credits: state.credits,
          dataSeeds: state.dataSeeds,
          orchards: state.orchards,
          upgrades: state.upgrades,
          tools: state.tools,
          weather: state.weather,
        });
        updateActivity();
        addLog('Game auto-saved.', 'system');
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [user?.uid, state, saveState, updateActivity, addLog]);

  const getToolBonus = useCallback((toolId: string) => {
    const tool = state.tools.find(t => t.id === toolId);
    if (!tool || tool.level === 0) return 0;
    return tool.level * tool.bonusValue;
  }, [state.tools]);

  const handlePlantAction = useCallback((action: 'research' | 'water' | 'fertilize' | 'pesticide' | 'harvest') => {
    const activeOrchard = state.orchards.find(o => o.id === state.activeOrchardId);
    if (state.selectedPlantIndex === null || !activeOrchard) return;
    const selectedPlant = activeOrchard.plants[state.selectedPlantIndex];
    if (!selectedPlant) return;

    setState(prev => {
      const newOrchards = [...prev.orchards];
      const orchardIndex = newOrchards.findIndex(o => o.id === prev.activeOrchardId);
      const orchard = { ...newOrchards[orchardIndex] };
      const newPlants = [...orchard.plants];
      const plant = { ...newPlants[prev.selectedPlantIndex!]! };
      let credits = prev.credits;
      let dataSeeds = prev.dataSeeds;

      const stressReduction = getToolBonus('stress-monitor');
      const creditBonus = getToolBonus('data-extractor');

      if (action === 'harvest') {
        if (!plant.isHarvestable) return prev;
        const reward = Math.round((500 + (plant.rootStrength * 2)) * (plant.yieldMultiplier || 1));
        credits += reward;
        dataSeeds += 20;
        addLog(`Harvested ${plant.type}! Gained ${reward} credits and 20 genetic data.`, 'success');
        newPlants[prev.selectedPlantIndex!] = null;
        orchard.plants = newPlants;
        newOrchards[orchardIndex] = orchard;
        const nextState = { ...prev, orchards: newOrchards, credits, dataSeeds, selectedPlantIndex: null };
        saveState({ orchards: newOrchards, credits, dataSeeds });
        return nextState;
      }

      if (action === 'research') {
        if (plant.water < 5) {
          addLog('Insufficient water for research.', 'warn');
          return prev;
        }
        const baseG = Math.floor(Math.random() * 8) + 5;
        const finalG = Math.max(1, Math.round(baseG * (plant.nutrients / 100) * (plant.growthSpeedMultiplier || 1)));
        plant.rootStrength += finalG;
        plant.water -= 5;
        plant.nutrients -= 10;
        plant.stress += Math.max(0, 5 - stressReduction);
        credits += (10 + creditBonus);
        
        let nextStage = 0;
        for (let i = 0; i < PLANT_STAGES.length; i++) {
          if (plant.rootStrength >= PLANT_STAGES[i].threshold) nextStage = i;
        }
        if (nextStage > plant.stageIndex) {
          plant.stageIndex = nextStage;
          addLog(`Evolution! ${plant.type} reached stage: ${PLANT_STAGES[nextStage].name}`, 'success');
          dataSeeds += 5;
          if (nextStage === PLANT_STAGES.length - 1) plant.isHarvestable = true;
        }

        const pestDefenseBonus = getToolBonus('pest-control');
        const finalPestChance = 0.15 * (1 - pestDefenseBonus);
        if (plant.pestImmunity === 0 && Math.random() < finalPestChance) {
          plant.pests = Math.min(5, plant.pests + 1);
          addLog('Warning: Pest infestation detected!', 'danger');
        }
        addLog(`Research complete: +${finalG} roots, +${10 + creditBonus} credits.`, 'success');
      }

      if (action === 'water') {
        const stage = PLANT_STAGES[plant.stageIndex];
        const waterBonus = getToolBonus('watering-can');
        const waterGain = Math.round(20 * (1 + waterBonus));
        plant.water = Math.min(stage.maxWater, plant.water + waterGain);
        plant.stress = Math.max(0, plant.stress - 5);
        addLog(`Hydration levels increased by ${waterGain}.`, 'info');
        const nextState = { ...prev, orchards: newOrchards, lastToolEffect: 'water' };
        saveState({ orchards: newOrchards });
        setTimeout(() => setState(p => ({ ...p, lastToolEffect: null })), 1000);
        return nextState;
      }

      newPlants[prev.selectedPlantIndex!] = plant;
      orchard.plants = newPlants;
      newOrchards[orchardIndex] = orchard;
      const nextState = { ...prev, orchards: newOrchards, credits, dataSeeds };
      saveState({ orchards: newOrchards, credits, dataSeeds });
      return nextState;
    });
  }, [state, saveState, addLog, getToolBonus]);

  const nextDay = useCallback(() => {
    setState(prev => {
      const nutrientBonus = getToolBonus('soil-tester');
      const newWeather = getRandomWeather();
      const newTools = prev.tools.map(t => ({
        ...t,
        currentCooldown: Math.max(0, (t.currentCooldown || 0) - 1)
      }));

      const newOrchards = prev.orchards.map(o => {
        if (!o.isUnlocked) return o;
        const newPlants = o.plants.map(p => {
          if (!p) return null;
          const plant = { ...p };
          const weather = prev.weather;
          if (weather.type === 'rain') {
            plant.water = Math.min(PLANT_STAGES[plant.stageIndex].maxWater, plant.water + (15 * weather.intensity));
            plant.stress = Math.max(0, plant.stress - 10);
          } else if (weather.type === 'storm') {
            plant.water = Math.min(PLANT_STAGES[plant.stageIndex].maxWater, plant.water + (30 * weather.intensity));
            plant.stress += (15 * weather.intensity);
          } else if (weather.type === 'heatwave') {
            plant.nutrients = Math.max(0, plant.nutrients - (20 * weather.intensity));
            plant.stress += (25 * weather.intensity);
            plant.water = Math.max(0, plant.water - (20 * weather.intensity));
          } else if (weather.type === 'fog') {
            plant.water = Math.min(PLANT_STAGES[plant.stageIndex].maxWater, plant.water + 5);
            plant.stress = Math.max(0, plant.stress - 5);
          } else if (weather.type === 'clear') {
            plant.nutrients = Math.min(PLANT_STAGES[plant.stageIndex].maxNutrients, plant.nutrients + 5);
            plant.stress = Math.max(0, plant.stress - 15);
          }

          if (plant.pests > 0) {
            const pestDrain = (plant.pests * 10) * (1 - nutrientBonus);
            plant.nutrients = Math.max(0, plant.nutrients - pestDrain);
            plant.stress += (plant.pests * 5);
          } else {
            plant.stress = Math.max(0, plant.stress - 20);
          }

          if (plant.pestImmunity > 0) plant.pestImmunity--;
          
          if (plant.stress >= 100) {
            addLog(`CRITICAL: ${plant.type} in ${o.name} suffered crop burn!`, 'danger');
            plant.rootStrength = Math.max(0, plant.rootStrength - 50);
            plant.stress = 0;
            let nextStage = 0;
            for (let i = 0; i < PLANT_STAGES.length; i++) {
              if (plant.rootStrength >= PLANT_STAGES[i].threshold) nextStage = i;
            }
            plant.stageIndex = nextStage;
          }
          return plant;
        });
        return { ...o, plants: newPlants };
      });

      addLog(`Day ${prev.day + 1} started. Weather: ${newWeather.name}.`, 'system');
      const nextState = { ...prev, day: prev.day + 1, orchards: newOrchards, weather: newWeather, tools: newTools };
      saveState({ day: prev.day + 1, orchards: newOrchards, weather: newWeather, tools: newTools });
      return nextState;
    });
  }, [saveState, addLog, getToolBonus]);

  const buyPlot = useCallback((index: number) => {
    if (state.credits < 50) {
      addLog('Insufficient credits to clear plot.', 'danger');
      return;
    }
    setState(prev => {
      const newOrchards = [...prev.orchards];
      const orchardIndex = newOrchards.findIndex(o => o.id === prev.activeOrchardId);
      const orchard = { ...newOrchards[orchardIndex] };
      const newPlants = [...orchard.plants];
      const randomType = BASE_PLANT_TYPES[Math.floor(Math.random() * BASE_PLANT_TYPES.length)];
      
      const scannerActive = prev.tools.find(t => t.id === 'genetic-scanner' && (t.currentCooldown || 0) === t.activeCooldown);
      let rarity: Plant['rarity'] = 'Common';
      const roll = Math.random();
      const bonus = scannerActive ? 0.3 : 0;

      if (roll < 0.02 + bonus/10) rarity = 'Legendary';
      else if (roll < 0.08 + bonus/5) rarity = 'Epic';
      else if (roll < 0.2 + bonus/2) rarity = 'Rare';
      else if (roll < 0.4 + bonus) rarity = 'Uncommon';

      newPlants[index] = {
        id: Math.random().toString(36).substr(2, 9),
        type: randomType.name,
        rootStrength: 0,
        water: 30,
        nutrients: 100,
        stress: 0,
        pests: 0,
        pestImmunity: 0,
        stageIndex: 0,
        isHarvestable: false,
        rarity,
        growthSpeedMultiplier: randomType.baseGrowthSpeed,
        yieldMultiplier: randomType.baseYield,
        color: randomType.color,
      };
      orchard.plants = newPlants;
      newOrchards[orchardIndex] = orchard;
      const nextState = { ...prev, orchards: newOrchards, credits: prev.credits - 50, selectedPlantIndex: index };
      saveState({ orchards: newOrchards, credits: prev.credits - 50 });
      return nextState;
    });
    addLog('New plot cleared and seeded.', 'success');
  }, [state.credits, state.activeOrchardId, saveState, addLog]);

  const buyTool = useCallback((id: string) => {
    const toolIndex = state.tools.findIndex(t => t.id === id);
    if (toolIndex === -1) return;
    const tool = state.tools[toolIndex];
    if (tool.level >= tool.maxLevel && tool.maxLevel > 0) return;

    const cost = Math.round(tool.baseCost * Math.pow(tool.costMultiplier, tool.level));
    if (state.credits < cost) {
      addLog(`Insufficient credits for ${tool.name}.`, 'danger');
      return;
    }

    setState(prev => {
      const newTools = [...prev.tools];
      newTools[toolIndex] = { ...tool, level: tool.level + 1 };
      const nextState = { ...prev, credits: prev.credits - cost, tools: newTools };
      saveState({ credits: prev.credits - cost, tools: newTools });
      return nextState;
    });
    addLog(`${tool.name} upgraded!`, 'success');
  }, [state, saveState, addLog]);

  const useActiveTool = useCallback((id: string) => {
    const toolIndex = state.tools.findIndex(t => t.id === id);
    if (toolIndex === -1) return;
    const tool = state.tools[toolIndex];

    if (tool.level === 0 || (tool.currentCooldown || 0) > 0) return;

    setState(prev => {
      const newTools = [...prev.tools];
      newTools[toolIndex] = { ...tool, currentCooldown: tool.activeCooldown };
      let newOrchards = [...prev.orchards];

      if (id === 'pest-repellent-pulse') {
        const orchardIndex = newOrchards.findIndex(o => o.id === prev.activeOrchardId);
        const orchard = { ...newOrchards[orchardIndex] };
        orchard.plants = orchard.plants.map(p => p ? { ...p, pests: 0, pestImmunity: 3 } : null);
        newOrchards[orchardIndex] = orchard;
        addLog('Pest Repellent Pulse activated!', 'success');
      }

      const nextState = { ...prev, tools: newTools, orchards: newOrchards, lastToolEffect: id };
      saveState({ tools: newTools, orchards: newOrchards });
      setTimeout(() => setState(p => ({ ...p, lastToolEffect: null })), 2000);
      return nextState;
    });
  }, [state, saveState, addLog]);

  const handleTransferCredits = async () => {
    if (!user?.uid || !transferTarget || !transferAmount) return;
    const amount = parseInt(transferAmount);
    if (isNaN(amount) || amount <= 0 || amount > state.credits || transferTarget === user.uid) {
      addLog('Invalid transfer parameters.', 'danger');
      return;
    }

    setIsTransferring(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', '==', transferTarget));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        addLog('Target User ID not found.', 'danger');
        return;
      }

      const targetDoc = querySnapshot.docs[0];
      const batch = writeBatch(db);
      batch.update(doc(db, 'users', user.uid), { credits: increment(-amount) });
      batch.update(targetDoc.ref, { credits: increment(amount) });
      batch.set(doc(collection(db, 'transfers')), {
        from: user.uid,
        to: transferTarget,
        amount,
        timestamp: serverTimestamp()
      });
      await batch.commit();
      addLog(`Transferred ${amount} credits.`, 'success');
      setTransferAmount('');
      setTransferTarget('');
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'transfers');
    } finally {
      setIsTransferring(false);
    }
  };

  const buyItem = useCallback((item: typeof SHOP_ITEMS[0]) => {
    if (state.credits < item.cost) {
      addLog(`Insufficient credits for ${item.name}.`, 'danger');
      return;
    }
    if (state.selectedPlantIndex === null) {
      addLog('Select a plant to apply items.', 'warn');
      return;
    }

    setState(prev => {
      const newOrchards = [...prev.orchards];
      const orchardIndex = newOrchards.findIndex(o => o.id === prev.activeOrchardId);
      const orchard = { ...newOrchards[orchardIndex] };
      const newPlants = [...orchard.plants];
      const plant = { ...newPlants[prev.selectedPlantIndex!]! };
      
      if (item.type === 'fertilizer') {
        plant.nutrients = Math.min(PLANT_STAGES[plant.stageIndex].maxNutrients, plant.nutrients + (item.nut || 0));
        plant.stress += (item.stress || 0);
      } else if (item.type === 'pesticide') {
        plant.pests = Math.max(0, plant.pests - (item.kills || 0));
        plant.stress += (item.stress || 0);
      }

      newPlants[prev.selectedPlantIndex!] = plant;
      orchard.plants = newPlants;
      newOrchards[orchardIndex] = orchard;
      const nextState = { ...prev, orchards: newOrchards, credits: prev.credits - item.cost };
      saveState({ orchards: newOrchards, credits: prev.credits - item.cost });
      return nextState;
    });
    addLog(`Applied ${item.name}.`, 'success');
  }, [state, saveState, addLog]);

  const buyUpgrade = useCallback((id: keyof GlobalUpgrades) => {
    const cost = 10;
    if (state.dataSeeds < cost) {
      addLog('Insufficient genetic data for upgrade.', 'danger');
      return;
    }
    setState(prev => {
      const nextUpgrades = {
        ...prev.upgrades,
        [id]: id === 'stressResistance' 
          ? (prev.upgrades[id] as number) + 5 
          : (prev.upgrades[id] as number) * 0.9
      };
      const nextState = {
        ...prev,
        dataSeeds: prev.dataSeeds - cost,
        upgrades: nextUpgrades
      };
      saveState({ dataSeeds: prev.dataSeeds - cost, upgrades: nextUpgrades });
      return nextState;
    });
    addLog(`Upgrade acquired: ${id} enhanced.`, 'success');
  }, [state.dataSeeds, saveState, addLog]);

  const handleCrossPollinate = useCallback(() => {
    if (breedingParents.length !== 2) return;
    if (state.credits < 100) {
      addLog('Insufficient credits for cross-pollination. Need 100🪙.', 'danger');
      return;
    }

    const activeOrchard = state.orchards.find(o => o.id === state.activeOrchardId)!;
    const p1 = activeOrchard.plants[breedingParents[0]]!;
    const p2 = activeOrchard.plants[breedingParents[1]]!;

    if (p1.stageIndex < 4 || p2.stageIndex < 4) {
      addLog('Only mature plants can be cross-pollinated.', 'warn');
      return;
    }

    setState(prev => {
      const newOrchards = [...prev.orchards];
      const orchardIndex = newOrchards.findIndex(o => o.id === prev.activeOrchardId);
      const orchard = { ...newOrchards[orchardIndex] };
      const newPlants = [...orchard.plants];
      
      const emptySlot = newPlants.findIndex(p => p === null);
      if (emptySlot === -1) {
        addLog('No empty plots available for the hybrid offspring.', 'danger');
        return prev;
      }

      const rarities: Plant['rarity'][] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
      const p1RarityIdx = rarities.indexOf(p1.rarity);
      const p2RarityIdx = rarities.indexOf(p2.rarity);
      
      let newRarityIdx = Math.floor((p1RarityIdx + p2RarityIdx) / 2);
      if (Math.random() < 0.2) newRarityIdx = Math.min(rarities.length - 1, newRarityIdx + 1);
      
      const blendColors = (c1: string, c2: string) => {
        try {
          const r1 = parseInt(c1.slice(1, 3), 16);
          const g1 = parseInt(c1.slice(3, 5), 16);
          const b1 = parseInt(c1.slice(5, 7), 16);
          const r2 = parseInt(c2.slice(1, 3), 16);
          const g2 = parseInt(c2.slice(3, 5), 16);
          const b2 = parseInt(c2.slice(5, 7), 16);
          const r = Math.floor((r1 + r2) / 2).toString(16).padStart(2, '0');
          const g = Math.floor((g1 + g2) / 2).toString(16).padStart(2, '0');
          const b = Math.floor((b1 + b2) / 2).toString(16).padStart(2, '0');
          return `#${r}${g}${b}`;
        } catch (e) {
          return '#4CAF50';
        }
      };

      const p1Name = p1.type.includes('Hybrid') ? p1.type.split(' ')[1] : p1.type;
      const p2Name = p2.type.includes('Hybrid') ? p2.type.split(' ')[1] : p2.type;
      const hybridName = `Hybrid ${p1Name.split('-')[0]}-${p2Name.split('-')[0]}`;

      const newPlant: Plant = {
        id: Math.random().toString(36).substr(2, 9),
        type: hybridName,
        rootStrength: 0,
        water: 50,
        nutrients: 100,
        stress: 0,
        pests: 0,
        pestImmunity: 0,
        stageIndex: 0,
        isHarvestable: false,
        rarity: rarities[newRarityIdx],
        growthSpeedMultiplier: (p1.growthSpeedMultiplier + p2.growthSpeedMultiplier) / 2 * (1 + (Math.random() * 0.3 - 0.15)),
        yieldMultiplier: (p1.yieldMultiplier + p2.yieldMultiplier) / 2 * (1 + (Math.random() * 0.3 - 0.15)),
        color: blendColors(p1.color || '#4CAF50', p2.color || '#4CAF50'),
      };

      newPlants[emptySlot] = newPlant;
      orchard.plants = newPlants;
      newOrchards[orchardIndex] = orchard;

      const nextState = {
        ...prev,
        credits: prev.credits - 100,
        orchards: newOrchards,
        breedingParents: []
      };
      saveState({ credits: prev.credits - 100, orchards: newOrchards });
      setBreedingParents([]);
      addLog(`Success! A new ${newPlant.rarity} hybrid created.`, 'success');
      return nextState;
    });
  }, [state, breedingParents, saveState, addLog]);

  return {
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
    saveState
  };
};
