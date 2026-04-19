import { getElement } from './dom.js';

export function initMenu({ onStart, onRestart, onPauseToggle }) {
  const startScreen = getElement('start-screen');
  const endScreen = getElement('end-screen');
  const startBtn = getElement('start-btn');
  const restartBtn = getElement('restart-btn');
  const playAgainBtn = getElement('play-again-btn');
  const pauseBtn = getElement('pause-btn');

  pauseBtn.disabled = true;

  startBtn.addEventListener('click', onStart);
  restartBtn.addEventListener('click', () => onRestart());
  playAgainBtn.addEventListener('click', () => onRestart());
  pauseBtn.addEventListener('click', onPauseToggle);

  return {
    showStart() {
      startScreen.classList.add('visible');
      endScreen.classList.remove('visible');
    },
    hideStart() {
      startScreen.classList.remove('visible');
    },
    showEnd() {
      endScreen.classList.add('visible');
    },
    hideEnd() {
      endScreen.classList.remove('visible');
    },
    setPauseLabel(paused) {
      pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    },
    setPauseEnabled(running) {
      pauseBtn.disabled = !running;
    },
  };
}
