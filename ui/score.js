import { getElement } from './dom.js';

export function initScoreboard() {
  const scoreEl = getElement('score');
  const bestEl = getElement('best-score');
  const finalScoreEl = getElement('final-score');

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
