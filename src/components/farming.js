import { Component } from '../../engine/core/component.js';
import { TILE_SIZE, TILE_TYPES, WorldRenderer } from '../entities/world.js';

export class FarmingInteractor extends Component {
  constructor(options = {}) {
    super(options);
    this.input = options.input;
    this.worldEntity = options.worldEntity;
    this._lastInteract = 0;
  }

  update(dt) {
    if (!this.input || !this.worldEntity) return;
    
    // Simple cooldown
    if (performance.now() - this._lastInteract < 300) return;

    if (this.input.isDown(' ')) {
      this._lastInteract = performance.now();
      this.interact();
    }
  }

  interact() {
    const worldRenderer = this.worldEntity.getComponent(WorldRenderer);
    if (!worldRenderer) return;

    // Determine tile in front of player (or under center)
    const px = this.entity.x + this.entity.width/2;
    const py = this.entity.y + this.entity.height/2;
    
    const tileX = Math.floor(px / TILE_SIZE);
    const tileY = Math.floor(py / TILE_SIZE);

    const currentTile = worldRenderer.getTile(tileX, tileY);
    if (currentTile === -1) return;

    if (currentTile === TILE_TYPES.GRASS) {
      worldRenderer.setTile(tileX, tileY, TILE_TYPES.TILLED);
    } else if (currentTile === TILE_TYPES.DIRT) {
      worldRenderer.setTile(tileX, tileY, TILE_TYPES.TILLED);
    } else if (currentTile === TILE_TYPES.TILLED) {
      worldRenderer.setTile(tileX, tileY, TILE_TYPES.PLANTED);
      
      // Schedule growth
      setTimeout(() => {
        if (worldRenderer.getTile(tileX, tileY) === TILE_TYPES.PLANTED) {
          worldRenderer.setTile(tileX, tileY, TILE_TYPES.GROWN);
        }
      }, 3000); // 3 seconds to grow
      
    } else if (currentTile === TILE_TYPES.GROWN) {
      worldRenderer.setTile(tileX, tileY, TILE_TYPES.DIRT);
      // Emit score/harvest event
      if (this.entity.scene && this.entity.scene.onScore) {
        this.entity.scene.score += 10;
        this.entity.scene.onScore(this.entity.scene.score);
        
        // Pop effect
        this.entity.scene.engine.effects.emitParticles({
          x: tileX * TILE_SIZE + TILE_SIZE/2,
          y: tileY * TILE_SIZE + TILE_SIZE/2,
          count: 15, color: '#ffb020', speed: 100, life: 0.5, size: 3
        });
      }
    }
  }
}
