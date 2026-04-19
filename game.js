import { createInitialState, resetState } from './logic/state.js';
import { updateGameState, renderGame } from './logic/engine.js';
import { initControls } from './ui/controls.js';
import { initMenu } from './ui/menu.js';
import { initScoreboard, emitSkillHexScore } from './ui/score.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas?.getContext('2d');
if (!ctx) {
  throw new Error('Canvas 2D context not available');
}

const dimensions = { width: canvas.width, height: canvas.height };

let state = createInitialState();
let spriteImage = null;
let controls;
let scoreboard;
let menu;

function validateEnvironment() {
  if (!canvas) throw new Error('Canvas element missing');
  if (!ctx) throw new Error('Canvas context unavailable');
}

function lazyLoadAssets() {
  if (spriteImage) return Promise.resolve(spriteImage);

  spriteImage = new Image();
  spriteImage.loading = 'lazy';

  return new Promise((resolve) => {
    spriteImage.src = './assets/sprites/hazard.svg';
    spriteImage.onload = () => resolve(spriteImage);
    spriteImage.onerror = () => resolve(null);
  });
}

async function startGame() {
  await lazyLoadAssets();
  state.running = true;
  state.paused = false;
  state.gameOver = false;
  menu.hideStart();
  menu.hideEnd();
  menu.setPauseLabel(false);
  menu.setPauseEnabled(state.running);
}

async function restartGame() {
  const priorBest = state.bestScore;
  state = resetState(state);
  state.bestScore = Math.max(priorBest, state.bestScore);
  scoreboard.render(state);
  menu.hideEnd();
  await startGame();
}

function togglePause() {
  if (!state.running) return;

  state.paused = !state.paused;
  state.running = !state.paused && !state.gameOver;
  menu.setPauseLabel(state.paused);
  menu.setPauseEnabled(state.running);
}

function handleGameOver() {
  state.bestScore = Math.max(state.bestScore, Math.floor(state.score));
  localStorage.setItem('skillhex-best-score', String(state.bestScore));
  emitSkillHexScore(state.score);
  scoreboard.render(state);
  menu.showEnd();
}

function gameLoop(timestamp = 0) {
  const elapsed = Math.min((timestamp - state.lastFrameTime) / 1000 || 0, 0.05);
  state.lastFrameTime = timestamp;

  updateGameState(state, controls, elapsed, dimensions);
  renderGame(ctx, state, dimensions, spriteImage);
  scoreboard.render(state);

  if (state.gameOver) {
    handleGameOver();
    state.hazards = [];
    state.paused = true;
    menu.setPauseEnabled(state.running);
  }

  requestAnimationFrame(gameLoop);
}

function initGame() {
  validateEnvironment();

  controls = initControls();
  scoreboard = initScoreboard();
  menu = initMenu({
    onStart: startGame,
    onRestart: restartGame,
    onPauseToggle: togglePause,
  });

  menu.showStart();
  menu.setPauseEnabled(state.running);
  scoreboard.render(state);
  requestAnimationFrame(gameLoop);
}

window.addEventListener('DOMContentLoaded', () => {
  initGame();
});
