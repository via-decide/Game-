export function initMenu({ onStart, onRestart, onPauseToggle }) {
  const startScreen = document.getElementById('start-screen');
  const endScreen = document.getElementById('end-screen');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const playAgainBtn = document.getElementById('play-again-btn');
  const pauseBtn = document.getElementById('pause-btn');

  startBtn.addEventListener('click', onStart);
  restartBtn.addEventListener('click', onRestart);
  playAgainBtn.addEventListener('click', onRestart);
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
  };
}
