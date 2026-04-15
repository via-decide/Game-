export function initScoreboard() {
  const scoreEl = document.getElementById('score');
  const bestEl = document.getElementById('best-score');
  const finalScoreEl = document.getElementById('final-score');

  return {
    render(state) {
      const score = Math.floor(state.score);
      scoreEl.textContent = String(score);
      bestEl.textContent = String(Math.floor(state.bestScore));
      finalScoreEl.textContent = String(score);
    },
  };
}

export function emitSkillHexScore(score) {
  const playerScore = {
    skill: 'logic',
    points: Math.floor(score),
    timestamp: Date.now(),
  };

  window.dispatchEvent(new CustomEvent('skillhex-score', { detail: playerScore }));
}
