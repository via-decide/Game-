/**
 * Orchard Interconnection Layer
 * 
 * Manages data transfer and state synchronization between:
 * 1. Orchard Farming Simulator
 * 2. SkillHex Capability Graph (reputation vectors)
 * 3. Mars Colony Simulation (rations and bio-fuel provisions)
 */

export const Interconnection = {
  // Sync harvested crop XP to the global SkillHex capability graph
  syncToSkillHex(skillType, xp) {
    const uid = localStorage.getItem('ecosystem_uid') || 'guest';
    const repKey = `via_user_${uid}_reputation`;
    
    const currentRep = Number(localStorage.getItem(repKey) || 0);
    const nextRep = Math.min(10000, currentRep + xp);
    
    localStorage.setItem(repKey, String(nextRep));
    localStorage.setItem('via_skillhex_reputation', String(nextRep)); // global fallback
    
    // Also save skill-specific XP
    const skillXpKey = `via_user_${uid}_skill_${skillType}_xp`;
    const currentSkillXp = Number(localStorage.getItem(skillXpKey) || 0);
    localStorage.setItem(skillXpKey, String(currentSkillXp + xp));

    console.log(`[Interconnection] Synced to SkillHex: +${xp} ${skillType} XP. Current Reputation: ${nextRep}`);
  },

  // Export harvested crops as fuel/provisions to Mars Colony simulation
  exportToMars(credits) {
    const uid = localStorage.getItem('ecosystem_uid') || 'guest';
    
    // Convert credits into Mars rations and bio-fuel
    const rationsAdded = Math.floor(credits * 0.4);
    const fuelAdded = Math.floor(credits * 0.2);

    const rationsKey = `via_user_${uid}_mars_rations`;
    const fuelKey = `via_user_${uid}_mars_fuel`;

    const currentRations = Number(localStorage.getItem(rationsKey) || 0);
    const currentFuel = Number(localStorage.getItem(fuelKey) || 0);

    localStorage.setItem(rationsKey, String(currentRations + rationsAdded));
    localStorage.setItem(fuelKey, String(currentFuel + fuelAdded));

    console.log(`[Interconnection] Exported to Mars: +${rationsAdded} rations, +${fuelAdded} bio-fuel.`);
    
    return { rationsAdded, fuelAdded };
  },

  // Query player levels from SkillHex to check unlock requirements
  getPlayerSkillLevel(skillType) {
    const uid = localStorage.getItem('ecosystem_uid') || 'guest';
    
    if (skillType === 'logic') {
      const rep = Number(localStorage.getItem(`via_user_${uid}_reputation`) || 0);
      // level = 1 + floor(reputation / 20)
      return 1 + Math.floor(rep / 20);
    }
    
    // Other skills (strategy, engineering) map to specific XP vectors
    const skillXpKey = `via_user_${uid}_skill_${skillType}_xp`;
    const xp = Number(localStorage.getItem(skillXpKey) || 0);
    return 1 + Math.floor(xp / 30);
  }
};
