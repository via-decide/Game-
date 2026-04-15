export function createInitialState() {
  return {
    running: false,
    paused: false,
    gameOver: false,
    score: 0,
    bestScore: Number(localStorage.getItem('skillhex-best-score') || 0),
    speed: 220,
    lastFrameTime: 0,
    spawnTimer: 0,
    spawnEveryMs: 900,
    player: {
      x: 380,
      y: 440,
      width: 40,
      height: 40,
      velocityX: 0,
      maxSpeed: 310,
    },
    hazards: [],
  };
}

export function resetState(state) {
  const reset = createInitialState();
  reset.bestScore = Math.max(state.bestScore, reset.bestScore);
  return reset;
}
