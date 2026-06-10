import { Engine } from './engine/core/engine.js';
import MainScene from './src/scenes/MainScene.js';
import { initMenu } from './ui/menu.js';
import { initScoreboard, emitSkillHexScore } from './ui/score.js';
import { loadGame, saveGame } from './src/save/saveManager.js';
import { viaAuth } from '../core/via-auth-sdk.js';
import { Interconnection } from './src/components/interconnection.js';
import { FarmingInteractor } from './src/components/farming.js';
import { Commons } from './src/components/commons.js';
import { Portfolio } from './src/components/portfolio.js';
import { AudioEngine } from './src/components/audio.js';

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
  inventory: { wheat: 1, corn: 0, berry: 0, fertilizer: 0 },
  activeFertilizer: false,
};
window.OrchardRuntime = runtime;

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
    
    // Add score to credits
    runtime.credits += Math.floor(score);
    
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
  runtime.activeFertilizer = false;
  updateFertilizerBtn();
  
  // Hydrate local user profile seed capabilities
  hydrateSeedSelect();
  
  scene.activate();
  renderScore();
  menu.hideStart();
  menu.hideEnd();
  menu.setPauseLabel(false);
  menu.setPauseEnabled(true);
  engine.resume();

  // Start space drone ambient music (Web Audio API)
  AudioEngine.toggleAmbient(true);
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

// Render the developer passport professional portfolio panel
function renderPortfolio() {
  const uid = viaAuth.getEcosystemUid() || 'guest';
  const logicLevel = Interconnection.getPlayerSkillLevel('logic');
  const strategyLevel = Interconnection.getPlayerSkillLevel('strategy');
  const executionLevel = Interconnection.getPlayerSkillLevel('execution');
  
  const totalSkillsSum = logicLevel + strategyLevel;
  const metrics = Portfolio.calculateMetrics(uid, totalSkillsSum);
  
  const scoreValEl = document.getElementById('port-readiness-val');
  if (scoreValEl) scoreValEl.textContent = `${metrics.readinessScore}%`;
  
  const streakEl = document.getElementById('port-streak');
  if (streakEl) streakEl.textContent = `${metrics.streak} Days`;
  
  const qualityEl = document.getElementById('port-quality');
  if (qualityEl) qualityEl.textContent = `${metrics.taskQuality}%`;
  
  const harvestsEl = document.getElementById('port-harvests');
  if (harvestsEl) harvestsEl.textContent = String(metrics.harvests);
  
  const decaysEl = document.getElementById('port-decays');
  if (decaysEl) decaysEl.textContent = String(metrics.decays);

  // Skill progression fills
  const skillLogicText = document.getElementById('port-skill-logic');
  const fillLogic = document.getElementById('port-fill-logic');
  if (skillLogicText && fillLogic) {
    skillLogicText.textContent = `Level ${logicLevel}`;
    fillLogic.style.width = `${Math.min(100, logicLevel * 10)}%`;
  }

  const skillStratText = document.getElementById('port-skill-strategy');
  const fillStrat = document.getElementById('port-fill-strategy');
  if (skillStratText && fillStrat) {
    skillStratText.textContent = `Level ${strategyLevel}`;
    fillStrat.style.width = `${Math.min(100, strategyLevel * 10)}%`;
  }

  const skillExecText = document.getElementById('port-skill-execution');
  const fillExec = document.getElementById('port-fill-execution');
  if (skillExecText && fillExec) {
    skillExecText.textContent = `Level ${executionLevel}`;
    fillExec.style.width = `${Math.min(100, executionLevel * 10)}%`;
  }
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
    runtime.inventory = saved.inventory || { wheat: 1, corn: 0, berry: 0, fertilizer: 0 };
    
    // Check global reputation wallet credits
    const ledgerCredits = Number(localStorage.getItem(`via_user_${uid}_credits`) || 0);
    if (ledgerCredits > runtime.credits) {
      runtime.credits = ledgerCredits;
    }
    
    // Get active circle
    const activeCircle = Commons.getCircle();
    const circleStatusEl = document.getElementById('circle-status');
    if (circleStatusEl) {
      circleStatusEl.textContent = activeCircle ? `Active: ${activeCircle}` : 'No circle joined';
    }
    
    // Check pending gifts
    const claimedGifts = Commons.checkPendingGifts();
    if (claimedGifts.length > 0) {
      alert(`🎁 Received ${claimedGifts.length} gift packets from peer users! Inventory updated.`);
      const updatedSave = loadGame();
      runtime.inventory = updatedSave.inventory;
      hydrateSeedSelect();
    }

    // Dynamic streak updates
    Portfolio.updateStreak(uid);
    renderPortfolio();
    
    updateInventoryHUD();
    return true;
  } else {
    passportCard.classList.remove('active');
    passportUid.textContent = 'Offline Mode';
    authScreen.classList.add('visible');
    startScreen.classList.remove('visible');
    return false;
  }
}

// Enable/Disable premium seeds based on SkillHex levels or purchased licenses
function hydrateSeedSelect() {
  const seedSelect = document.getElementById('seed-select');
  if (!seedSelect) return;

  const logicLevel = Interconnection.getPlayerSkillLevel('logic');
  const strategyLevel = Interconnection.getPlayerSkillLevel('strategy');

  // Corn option
  const cornOpt = seedSelect.querySelector('option[value="corn"]');
  if (cornOpt) {
    if (logicLevel >= 3 || runtime.inventory.corn > 0) {
      cornOpt.removeAttribute('disabled');
      cornOpt.textContent = '⚡ Electric Corn';
    } else {
      cornOpt.setAttribute('disabled', 'true');
      cornOpt.textContent = `⚡ Electric Corn (Req. Logic Lv 3 or Shop Pack)`;
    }
  }

  // Berry option
  const berryOpt = seedSelect.querySelector('option[value="berry"]');
  if (berryOpt) {
    if (strategyLevel >= 5 || runtime.inventory.berry > 0) {
      berryOpt.removeAttribute('disabled');
      berryOpt.textContent = '🍓 Mineral Berry';
    } else {
      berryOpt.setAttribute('disabled', 'true');
      berryOpt.textContent = `🍓 Mineral Berry (Req. Strategy Lv 5 or Shop Pack)`;
    }
  }
}

// Update Fertilizer usage button label
function updateFertilizerBtn() {
  const btn = document.getElementById('use-fertilizer-btn');
  if (!btn) return;
  const count = runtime.inventory.fertilizer || 0;
  btn.textContent = runtime.activeFertilizer ? '🧪 Fertilizer ACTIVE' : `🧪 Use Fertilizer (${count})`;
  btn.disabled = count <= 0 && !runtime.activeFertilizer;
}

// Update Shop & Inventory HUD elements
function updateInventoryHUD() {
  const creditsEl = document.getElementById('shop-credits');
  if (creditsEl) creditsEl.textContent = String(runtime.credits);
  
  const invFert = document.getElementById('inv-fertilizer');
  if (invFert) invFert.textContent = String(runtime.inventory.fertilizer || 0);
  
  updateFertilizerBtn();
}

// Hook up event listeners for portals, shop and login buttons
function setupUiListeners() {
  // Login triggers
  document.getElementById('auth-btn').addEventListener('click', () => {
    viaAuth.redirectToPassportLogin();
  });
  
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await viaAuth.logout();
    window.location.reload();
  });

  // Shop Toggles
  const shopScreen = document.getElementById('shop-screen');
  document.getElementById('shop-btn').addEventListener('click', () => {
    updateInventoryHUD();
    shopScreen.classList.add('visible');
  });
  document.getElementById('close-shop-btn').addEventListener('click', () => {
    shopScreen.classList.remove('visible');
  });

  // Item Purchases
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const item = e.target.getAttribute('data-item');
      const cost = Number(e.target.getAttribute('data-cost'));

      if (runtime.credits < cost) {
        alert('Insufficient credits!');
        return;
      }

      // Process purchase
      runtime.credits -= cost;
      const uid = viaAuth.getEcosystemUid() || 'guest';
      localStorage.setItem(`via_user_${uid}_credits`, String(runtime.credits));
      
      AudioEngine.playBuy(); // Web Audio buy effect

      if (item === 'fertilizer') {
        runtime.inventory.fertilizer = (runtime.inventory.fertilizer || 0) + 1;
      } else if (item === 'elixir') {
        // Instantly restore 50 stamina units
        if (scene.player) {
          const interactor = scene.player.getComponent(FarmingInteractor);
          if (interactor) {
            interactor.stamina = Math.min(interactor.maxStamina, interactor.stamina + 50);
            interactor.updateStaminaHUD();
            scene.addFloatingText('+50 Stamina', scene.player.x, scene.player.y, '#00e676');
          }
        }
      } else if (item === 'corn_seed') {
        runtime.inventory.corn = 1;
        hydrateSeedSelect();
      } else if (item === 'berry_seed') {
        runtime.inventory.berry = 1;
        hydrateSeedSelect();
      }

      saveGame(runtime);
      updateInventoryHUD();
    });
  });

  // Fertilizer Usage
  document.getElementById('use-fertilizer-btn').addEventListener('click', () => {
    if (runtime.activeFertilizer) return;
    if (runtime.inventory.fertilizer > 0) {
      runtime.inventory.fertilizer -= 1;
      runtime.activeFertilizer = true;
      updateInventoryHUD();
      saveGame(runtime);
      if (scene.player) {
        scene.addFloatingText('Soil Fertilized!', scene.player.x, scene.player.y, '#00e5ff');
      }
    }
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

  // Circle Join Listener
  document.getElementById('join-circle-btn').addEventListener('click', () => {
    const circleInput = document.getElementById('circle-input');
    const res = Commons.joinCircle(circleInput.value);
    if (res.success) {
      document.getElementById('circle-status').textContent = `Active: ${res.circleName}`;
      circleInput.value = '';
    } else {
      alert(res.error || 'Failed to join circle');
    }
  });

  // Seed Gifting Listener
  document.getElementById('gift-btn').addEventListener('click', () => {
    const recipientInput = document.getElementById('recipient-input');
    const giftType = document.getElementById('gift-type');
    const giftStatus = document.getElementById('gift-status');
    
    const res = Commons.giftSeeds(recipientInput.value, giftType.value);
    if (res.success) {
      giftStatus.textContent = `✅ Gifted ${giftType.value} seeds to ${recipientInput.value}!`;
      giftStatus.style.color = '#00e676';
      recipientInput.value = '';
      updateInventoryHUD();
    } else {
      giftStatus.textContent = `❌ ${res.error}`;
      giftStatus.style.color = '#ff1744';
    }
    setTimeout(() => { giftStatus.textContent = ''; }, 4000);
  });

  // Export Credential listener
  document.getElementById('export-credential-btn').addEventListener('click', () => {
    const uid = viaAuth.getEcosystemUid() || 'guest';
    const logicLevel = Interconnection.getPlayerSkillLevel('logic');
    const strategyLevel = Interconnection.getPlayerSkillLevel('strategy');
    const executionLevel = Interconnection.getPlayerSkillLevel('execution');
    
    const cred = Portfolio.exportCredential(uid, {
      logic: logicLevel,
      strategy: strategyLevel,
      execution: executionLevel
    });
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cred, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `aporaksha-merit-${uid}.json`);
    dlAnchor.click();
  });

  // Copy share link listener
  document.getElementById('copy-share-btn').addEventListener('click', () => {
    const uid = viaAuth.getEcosystemUid() || 'guest';
    const url = `${window.location.origin}${window.location.pathname}?portfolio=${uid}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Portfolio shareable link copied to clipboard!');
    }).catch(() => {
      alert(`Share Link: ${url}`);
    });
  });

  // Redirection / tabs listener to trigger rendering of portfolio
  window.addEventListener('app:tab_changed', (e) => {
    if (e.detail && e.detail.tab === 'passport') {
      renderPortfolio();
    }
  });

  // Telemetry updates listeners
  window.addEventListener('portfolio:updated', () => {
    renderPortfolio();
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
    renderPortfolio();
  }
  
  // Real-time nodes listeners hook
  Interconnection.initRealtimeListeners((nodeName, skillType) => {
    if (scene.player) {
      scene.addFloatingText(`Capability Unlocked: ${nodeName}!`, scene.player.x, scene.player.y, '#00e676');
    }
    hydrateSeedSelect();
    renderPortfolio();
  });

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
