import { Engine } from './engine/core/engine.js';
import MainScene from './src/scenes/MainScene.js';
import { initMenu } from './ui/menu.js';
import { initScoreboard, emitSkillHexScore } from './ui/score.js';
import { loadGame, saveGame } from './src/save/saveManager.js';

const canvas = document.getElementById('game-canvas');
if (!canvas) throw new Error('Canvas element missing');

const engine = new Engine({
  canvas,
  physics: true,
  renderer: '2d',
});

engine.renderer.setFeatures({
  lighting: true,
  particleSystem: true,
  shadows: true,
  postProcessing: true,
  bloom: true,
});

const saved = loadGame();
const runtime = {
  bestScore: saved.bestScore,
  lastScore: saved.lastScore,
  runs: saved.runs,
  currentScore: 0,
  running: false,
  paused: false,
};

const scoreboard = initScoreboard();
let menu;

const scene = new MainScene({
  onScore: (score) => {
    runtime.currentScore = score;
    renderScore();
  },
  onGameOver: (score) => {
    runtime.running = false;
    runtime.currentScore = score;
    runtime.lastScore = Math.floor(score);
    runtime.runs += 1;
    runtime.bestScore = Math.max(runtime.bestScore, Math.floor(score));
    saveGame(runtime);
    emitSkillHexScore(score);
    renderScore();
    menu?.showEnd();
    menu?.setPauseEnabled(false);
  },
});

function renderScore() {
  scoreboard.render({
    score: runtime.currentScore,
    bestScore: runtime.bestScore,
  });
}

async function bootAssets() {
  await engine.assets.load({
    textures: ['./assets/sprites/hazard.svg'],
    audio: [],
  });
  const hazardImg = engine.assets.textures.get('./assets/sprites/hazard.svg');
  if (hazardImg) engine.assets.textures.set('hazard', hazardImg);
}

async function startGame() {
  runtime.running = true;
  runtime.paused = false;
  runtime.currentScore = 0;
  scene.activate();
  renderScore();
  menu.hideStart();
  menu.hideEnd();
  menu.setPauseLabel(false);
  menu.setPauseEnabled(true);
  engine.resume();
}

async function restartGame() {
  if (!engine.scene) return;
  await startGame();
}

function togglePause() {
  if (!runtime.running) return;
  runtime.paused = !runtime.paused;
  if (runtime.paused) {
    engine.pause();
  } else {
    engine.resume();
  }
  menu.setPauseLabel(runtime.paused);
}

async function boot() {
  await bootAssets();
  await engine.loadScene(scene);
  menu = initMenu({
    onStart: startGame,
    onRestart: restartGame,
    onPauseToggle: togglePause,
  });
  menu.showStart();
  menu.setPauseEnabled(false);
  renderScore();
  engine.debug.enable();
  engine.start();
  engine.pause();
}

window.addEventListener('DOMContentLoaded', () => {
  boot().catch((err) => {
    console.error('Engine boot failed', err);
  });
});
