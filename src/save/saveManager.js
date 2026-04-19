const STORAGE_KEY = 'skillhex-save';
const LEGACY_BEST_KEY = 'skillhex-best-score';

export function saveGame(state) {
  try {
    const payload = JSON.stringify({
      version: 1,
      savedAt: Date.now(),
      bestScore: state.bestScore ?? 0,
      lastScore: state.lastScore ?? 0,
      runs: state.runs ?? 0,
    });
    localStorage.setItem(STORAGE_KEY, payload);
    localStorage.setItem(LEGACY_BEST_KEY, String(state.bestScore ?? 0));
    return true;
  } catch {
    return false;
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        bestScore: Number(parsed.bestScore) || 0,
        lastScore: Number(parsed.lastScore) || 0,
        runs: Number(parsed.runs) || 0,
      };
    }
    const legacy = Number(localStorage.getItem(LEGACY_BEST_KEY) || 0);
    return { bestScore: legacy, lastScore: 0, runs: 0 };
  } catch {
    return { bestScore: 0, lastScore: 0, runs: 0 };
  }
}

export function clearSave() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_BEST_KEY);
}
