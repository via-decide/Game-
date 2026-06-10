import { Engine } from './engine/core/engine.js';
import MainScene from './src/scenes/MainScene.js';
import { initMenu } from './ui/menu.js';
import { initScoreboard, emitSkillHexScore } from './ui/score.js';
import { loadGame, saveGame } from './src/save/saveManager.js';
import { viaAuth } from '../core/via-auth-sdk.js';
import { Interconnection } from './src/components/interconnection.js';

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

let runtime = {
  bestScore: 0,
  lastScore: 0,
  runs: 0,
  currentScore: 0,
  running: false,
  paused: false,
  credits: 0,
};

const scoreboard = initScoreboard();
let menu = null;

const scene = new MainScene({
  onScore: (score) => {
    runtime.currentScore = score;
    renderScore();
  },
  onGameOver: async (score) => {
    runtime.running = false;
    runtime.currentScore = score;
    runtime.lastScore = Math.floor(score);
    runtime.runs += 1;
    runtime.bestScore = Math.max(runtime.bestScore, Math.floor(score));
    
    // Save state under ecosystem_uid
    saveGame(runtime);
    
    // Trigger real-time SkillHex integration
    emitSkillHexScore(score);
    renderScore();
    
    // Show completed overlay
    const syncStatusEl = document.getElementById('sso-sync-status');
    if (syncStatusEl) {
      syncStatusEl.textContent = '✅ Ledger synchronized with Aporaksha!';
    }
    
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
  const authed = await checkAuth();
  if (!authed) return;
  
  runtime.running = true;
  runtime.paused = false;
  runtime.currentScore = 0;
  
  // Hydrate local user profile seed capabilities
  hydrateSeedSelect();
  
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

// Check SSO login state and update layout
async function checkAuth() {
  const authScreen = document.getElementById('auth-screen');
  const startScreen = document.getElementById('start-screen');
  const passportCard = document.getElementById('passport-card');
  const passportUid = document.getElementById('passport-uid');
  
  const uid = viaAuth.getEcosystemUid();
  const token = viaAuth.getAccessToken();

  if (uid && token) {
    passportCard.classList.add('active');
    passportUid.textContent = uid.includes('@') ? uid.split('@')[0] : uid.slice(0, 10);
    authScreen.classList.remove('visible');
    
    // Hydrate save profile
    const saved = loadGame();
    runtime.bestScore = saved.bestScore;
    runtime.lastScore = saved.lastScore;
    runtime.runs = saved.runs;
    runtime.credits = saved.credits;
    
    return true;
  } else {
    passportCard.classList.remove('active');
    passportUid.textContent = 'Offline Mode';
    authScreen.classList.add('visible');
    startScreen.classList.remove('visible');
    return false;
  }
}

// Enable/Disable premium seeds based on SkillHex levels
function hydrateSeedSelect() {
  const seedSelect = document.getElementById('seed-select');
  if (!seedSelect) return;

  const logicLevel = Interconnection.getPlayerSkillLevel('logic');
  const strategyLevel = Interconnection.getPlayerSkillLevel('strategy');

  // Corn option
  const cornOpt = seedSelect.querySelector('option[value="corn"]');
  if (cornOpt) {
    if (logicLevel >= 3) {
      cornOpt.removeAttribute('disabled');
      cornOpt.textContent = '⚡ Electric Corn';
    } else {
      cornOpt.setAttribute('disabled', 'true');
      cornOpt.textContent = `⚡ Electric Corn (Req. Logic Lv 3 — Current: Lv ${logicLevel})`;
    }
  }

  // Berry option
  const berryOpt = seedSelect.querySelector('option[value="berry"]');
  if (berryOpt) {
    if (strategyLevel >= 5) {
      berryOpt.removeAttribute('disabled');
      berryOpt.textContent = '🍓 Mineral Berry';
    } else {
      berryOpt.setAttribute('disabled', 'true');
      berryOpt.textContent = `🍓 Mineral Berry (Req. Strategy Lv 5 — Current: Lv ${strategyLevel})`;
    }
  }
}

// Hook up event listeners for portals and login buttons
function setupUiListeners() {
  // Login triggers
  document.getElementById('auth-btn').addEventListener('click', () => {
    viaAuth.redirectToPassportLogin();
  });
  
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await viaAuth.logout();
    window.location.reload();
  });

  // Cross-app navigation triggers
  document.getElementById('portal-skillhex').addEventListener('click', () => {
    viaAuth.redirectToApp('../decide.engine-tools/games/skillhex/index.html', 'view_graph');
  });

  document.getElementById('portal-mars').addEventListener('click', () => {
    // Export provisions credits directly to Mars colony provisions ledger before redirect
    Interconnection.exportToMars(runtime.bestScore);
    viaAuth.redirectToApp('../decide.engine-tools/games/mars/index.html', 'load_provisions');
  });

  document.getElementById('portal-orchade').addEventListener('click', () => {
    viaAuth.redirectToApp('../decide.engine-tools/games/orchade/index.html', 'view_strategy');
  });
}

async function boot() {
  setupUiListeners();
  await bootAssets();
  await engine.loadScene(scene);
  
  menu = initMenu({
    onStart: startGame,
    onRestart: restartGame,
    onPauseToggle: togglePause,
  });

  const authed = await checkAuth();
  if (authed) {
    menu.showStart();
    hydrateSeedSelect();
  }
  
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
