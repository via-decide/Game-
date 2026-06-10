export function getStorageKey() {
  const uid = localStorage.getItem('ecosystem_uid') || 'guest';
  return `via_user_${uid}_save`;
}

export function saveGame(state) {
  try {
    const key = getStorageKey();
    const payload = JSON.stringify({
      version: 1,
      savedAt: Date.now(),
      bestScore: state.bestScore ?? 0,
      lastScore: state.lastScore ?? 0,
      runs: state.runs ?? 0,
      inventory: state.inventory ?? { wheat: 0, corn: 0, berry: 0 },
      credits: state.credits ?? 0,
    });
    localStorage.setItem(key, payload);
    
    // Also update legacy key for compatibility/readback
    localStorage.setItem('skillhex-best-score', String(state.bestScore ?? 0));
    return true;
  } catch {
    return false;
  }
}

export function loadGame() {
  try {
    const key = getStorageKey();
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        bestScore: Number(parsed.bestScore) || 0,
        lastScore: Number(parsed.lastScore) || 0,
        runs: Number(parsed.runs) || 0,
        inventory: parsed.inventory || { wheat: 0, corn: 0, berry: 0 },
        credits: Number(parsed.credits) || 0,
      };
    }
    
    // Fallback to legacy skillhex-save if guest has it
    const legacyRaw = localStorage.getItem('skillhex-save');
    if (legacyRaw) {
      const parsed = JSON.parse(legacyRaw);
      return {
        bestScore: Number(parsed.bestScore) || 0,
        lastScore: Number(parsed.lastScore) || 0,
        runs: Number(parsed.runs) || 0,
        inventory: { wheat: 0, corn: 0, berry: 0 },
        credits: 0,
      };
    }

    const legacyBest = Number(localStorage.getItem('skillhex-best-score') || 0);
    return { bestScore: legacyBest, lastScore: 0, runs: 0, inventory: { wheat: 0, corn: 0, berry: 0 }, credits: 0 };
  } catch {
    return { bestScore: 0, lastScore: 0, runs: 0, inventory: { wheat: 0, corn: 0, berry: 0 }, credits: 0 };
  }
}

export function clearSave() {
  const key = getStorageKey();
  localStorage.removeItem(key);
  localStorage.removeItem('skillhex-save');
  localStorage.removeItem('skillhex-best-score');
}
