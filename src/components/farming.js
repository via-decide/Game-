import { Component } from '../../engine/core/component.js';
import { TILE_SIZE, TILE_TYPES, WorldRenderer } from '../entities/world.js';
import { Interconnection } from './interconnection.js';

export class FarmingInteractor extends Component {
  constructor(options = {}) {
    super(options);
    this.input = options.input;
    this.worldEntity = options.worldEntity;
    this._lastInteract = 0;
    
    this.stamina = 100;
    this.maxStamina = 100;
    this._staminaRegenTimer = 0;
    this._lastRegenTime = performance.now();
  }

  update(dt) {
    if (!this.input || !this.worldEntity) return;

    // Regenerate stamina slowly: +4 stamina per second
    const now = performance.now();
    const elapsed = (now - this._lastRegenTime) / 1000;
    this._lastRegenTime = now;
    
    if (this.stamina < this.maxStamina) {
      this.stamina = Math.min(this.maxStamina, this.stamina + 4 * elapsed);
      this.updateStaminaHUD();
    }
    
    // Simple interaction cooldown
    if (performance.now() - this._lastInteract < 250) return;

    if (this.input.isDown(' ')) {
      this._lastInteract = performance.now();
      this.interact();
    }
  }

  updateStaminaHUD() {
    const staminaEl = document.getElementById('stamina');
    if (staminaEl) {
      staminaEl.textContent = String(Math.floor(this.stamina));
    }
  }

  consumeStamina(amount) {
    if (this.stamina < amount) return false;
    this.stamina -= amount;
    this.updateStaminaHUD();
    return true;
  }

  interact() {
    const worldRenderer = this.worldEntity.getComponent(WorldRenderer);
    if (!worldRenderer) return;

    // Determine tile under player center
    const px = this.entity.x + this.entity.width/2;
    const py = this.entity.y + this.entity.height/2;
    
    const tileX = Math.floor(px / TILE_SIZE);
    const tileY = Math.floor(py / TILE_SIZE);

    const currentTile = worldRenderer.getTile(tileX, tileY);
    if (currentTile === -1) return;

    // Read selected seed from HUD dropdown
    const seedSelect = document.getElementById('seed-select');
    const selectedSeed = seedSelect ? seedSelect.value : 'wheat';

    // Read active weather from scene
    const weather = this.entity.scene.activeWeather || 'Sunny';

    if (currentTile === TILE_TYPES.GRASS || currentTile === TILE_TYPES.DIRT) {
      // TILL SOIL
      // Acid Rain doubles tilling stamina cost (10 instead of 5)
      const tillCost = (weather === 'Acid Rain') ? 10 : 5;
      
      if (this.consumeStamina(tillCost)) {
        worldRenderer.setTile(tileX, tileY, TILE_TYPES.TILLED);
        this.triggerVibration(100);
        if (weather === 'Acid Rain') {
          this.showFloatMessage('Tilled (Heavy Mud!)', px, py, '#ffa726');
        }
      } else {
        this.showFloatMessage('Exhausted!', px, py, '#ff1744');
      }
    } 
    else if (currentTile === TILE_TYPES.TILLED) {
      // PLANT SEED
      if (this.consumeStamina(3)) {
        let plantType, grownType, growthDuration, label;
        
        if (selectedSeed === 'corn') {
          plantType = TILE_TYPES.PLANTED_CORN;
          grownType = TILE_TYPES.GROWN_CORN;
          growthDuration = 5000;
          label = '⚡ Electric Corn';
        } else if (selectedSeed === 'berry') {
          plantType = TILE_TYPES.PLANTED_BERRY;
          grownType = TILE_TYPES.GROWN_BERRY;
          growthDuration = 8000;
          label = '🍓 Mineral Berry';
        } else {
          plantType = TILE_TYPES.PLANTED_WHEAT;
          grownType = TILE_TYPES.GROWN_WHEAT;
          growthDuration = 3000;
          label = '🌾 Wheat';
        }

        // Apply Weather growth modifier
        if (weather === 'Solar Flare') {
          growthDuration = growthDuration * 0.5; // grows 50% faster
        }

        // Apply Fertilizer modifier
        let appliedFertilizer = false;
        if (window.OrchardRuntime && window.OrchardRuntime.activeFertilizer) {
          growthDuration = growthDuration * 0.6; // 40% reduction
          window.OrchardRuntime.activeFertilizer = false;
          appliedFertilizer = true;
          
          // Hydrate use fertilizer button HUD label
          const useFertBtn = document.getElementById('use-fertilizer-btn');
          if (useFertBtn) {
            const count = window.OrchardRuntime.inventory.fertilizer;
            useFertBtn.textContent = `🧪 Use Fertilizer (${count})`;
            useFertBtn.disabled = count <= 0;
          }
        }

        worldRenderer.setTile(tileX, tileY, plantType);
        
        if (appliedFertilizer) {
          this.showFloatMessage(`Planted with Fertilizer!`, px, py - 20, '#00e5ff');
        } else {
          this.showFloatMessage(`Planted ${label}`, px, py - 20, '#f0f4fc');
        }

        // Schedule growth & subsequent decay timer
        setTimeout(() => {
          if (worldRenderer.getTile(tileX, tileY) === plantType) {
            worldRenderer.setTile(tileX, tileY, grownType);
            
            // Dynamic grow effect
            this.entity.scene.engine.effects.emitParticles({
              x: tileX * TILE_SIZE + TILE_SIZE/2,
              y: tileY * TILE_SIZE + TILE_SIZE/2,
              count: 6, color: '#ffffff', speed: 40, life: 0.3, size: 2
            });

            // Schedule decay timer
            // Solar Flare causes rapid crop decay (6s instead of 12s)
            const decayDuration = (weather === 'Solar Flare') ? 6000 : 12000;
            setTimeout(() => {
              const currentGrownTile = worldRenderer.getTile(tileX, tileY);
              if (currentGrownTile === grownType) {
                worldRenderer.setTile(tileX, tileY, TILE_TYPES.DIRT);
                
                const decayLabel = (weather === 'Solar Flare') ? 'Crop Burnt!' : 'Crop Decayed!';
                const decayColor = (weather === 'Solar Flare') ? '#ffa726' : '#777777';
                
                this.showFloatMessage(decayLabel, tileX * TILE_SIZE + TILE_SIZE/2, tileY * TILE_SIZE + TILE_SIZE/2, decayColor);
                
                // Ash particle pop
                this.entity.scene.engine.effects.emitParticles({
                  x: tileX * TILE_SIZE + TILE_SIZE/2,
                  y: tileY * TILE_SIZE + TILE_SIZE/2,
                  count: 10, color: '#4a3b32', speed: 30, life: 0.5, size: 2
                });
              }
            }, decayDuration);
          }
        }, growthDuration);
      } else {
        this.showFloatMessage('Exhausted!', px, py, '#ff1744');
      }
    } 
    else if (
      currentTile === TILE_TYPES.GROWN_WHEAT || 
      currentTile === TILE_TYPES.GROWN_CORN || 
      currentTile === TILE_TYPES.GROWN_BERRY
    ) {
      // HARVEST CROP
      if (this.consumeStamina(1)) {
        worldRenderer.setTile(tileX, tileY, TILE_TYPES.DIRT);
        
        let scoreReward = 0;
        let skillXp = 0;
        let skillType = 'logic';
        let popColor = '#ffffff';
        let label = '';

        if (currentTile === TILE_TYPES.GROWN_WHEAT) {
          scoreReward = 10;
          skillXp = 2;
          skillType = 'logic';
          popColor = '#ffb300';
          label = 'Wheat';
        } else if (currentTile === TILE_TYPES.GROWN_CORN) {
          scoreReward = 25;
          skillXp = 5;
          skillType = 'engineering';
          popColor = '#00e5ff';
          label = 'Electric Corn';
        } else if (currentTile === TILE_TYPES.GROWN_BERRY) {
          scoreReward = 50;
          skillXp = 12;
          skillType = 'strategy';
          popColor = '#ff1744';
          label = 'Mineral Berry';
        }

        if (this.entity.scene && this.entity.scene.onScore) {
          this.entity.scene.score += scoreReward;
          this.entity.scene.onScore(this.entity.scene.score);
          
          // Floating reward indicator
          this.showFloatMessage(`+${scoreReward} Credits`, px, py - 30, '#00e5ff');
          this.showFloatMessage(`+${skillXp} ${skillType.toUpperCase()}`, px, py - 10, popColor);
          
          // Emit score for SkillHex
          this.dispatchInterconnectionEvent(label, scoreReward, skillXp, skillType);

          // Pop effect
          this.entity.scene.engine.effects.emitParticles({
            x: tileX * TILE_SIZE + TILE_SIZE/2,
            y: tileY * TILE_SIZE + TILE_SIZE/2,
            count: 20, color: popColor, speed: 120, life: 0.6, size: 3.5
          });

          // Camera shake
          const camera = this.entity.scene.engine.renderer.camera;
          if (camera) {
            camera.shakeX = (Math.random() - 0.5) * 8;
            camera.shakeY = (Math.random() - 0.5) * 8;
            setTimeout(() => { camera.shakeX = 0; camera.shakeY = 0; }, 100);
          }
        }
      } else {
        this.showFloatMessage('Exhausted!', px, py, '#ff1744');
      }
    }
  }

  showFloatMessage(text, x, y, color) {
    if (this.entity.scene && typeof this.entity.scene.addFloatingText === 'function') {
      this.entity.scene.addFloatingText(text, x, y, color);
    }
  }

  triggerVibration(duration) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  }

  dispatchInterconnectionEvent(cropName, score, xp, skillType) {
    const uid = localStorage.getItem('ecosystem_uid') || 'guest';
    
    // Delegate to the shared interconnection manager
    Interconnection.syncToSkillHex(skillType, xp);
    
    const creditsKey = `via_user_${uid}_credits`;
    const currentCredits = Number(localStorage.getItem(creditsKey) || 0);
    const nextCredits = currentCredits + score;
    localStorage.setItem(creditsKey, String(nextCredits));

    const repKey = `via_user_${uid}_reputation`;
    const nextRep = Number(localStorage.getItem(repKey) || 0);

    // Dispatch events for cross-frame or general layout systems
    const detail = {
      uid,
      cropName,
      creditsEarned: score,
      xpEarned: xp,
      skillType,
      timestamp: Date.now(),
      newReputation: nextRep
    };
    
    window.dispatchEvent(new CustomEvent('skillhex-score', { detail }));
    window.dispatchEvent(new CustomEvent('orchard-harvest', { detail }));
  }
}
