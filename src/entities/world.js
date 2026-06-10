import { Entity } from '../../engine/core/entity.js';
import { Component } from '../../engine/core/component.js';

export const TILE_SIZE = 64;

export const TILE_TYPES = {
  GRASS: 0,
  DIRT: 1,
  TILLED: 2,
  
  PLANTED_WHEAT: 3,
  GROWN_WHEAT: 4,
  
  PLANTED_CORN: 5,
  GROWN_CORN: 6,
  
  PLANTED_BERRY: 7,
  GROWN_BERRY: 8
};

export class WorldRenderer extends Component {
  constructor(options = {}) {
    super(options);
    this.width = options.width ?? 50;
    this.height = options.height ?? 50;
    this.tiles = new Int8Array(this.width * this.height);
    
    // Initialize world with noise/randomness
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i] = Math.random() > 0.8 ? TILE_TYPES.DIRT : TILE_TYPES.GRASS;
    }
  }

  getTile(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return -1;
    return this.tiles[y * this.width + x];
  }

  setTile(x, y, type) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    this.tiles[y * this.width + x] = type;
  }

  render(ctx, camera) {
    // Basic culling
    const startX = Math.max(0, Math.floor((camera.x - ctx.canvas.width/2) / TILE_SIZE));
    const startY = Math.max(0, Math.floor((camera.y - ctx.canvas.height/2) / TILE_SIZE));
    const endX = Math.min(this.width, Math.ceil((camera.x + ctx.canvas.width/2) / TILE_SIZE));
    const endY = Math.min(this.height, Math.ceil((camera.y + ctx.canvas.height/2) / TILE_SIZE));

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const tile = this.tiles[y * this.width + x];
        this._drawTile(ctx, x, y, tile);
      }
    }
  }

  _drawTile(ctx, x, y, type) {
    ctx.beginPath();
    ctx.rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    
    // Basic backgrounds
    switch(type) {
      case TILE_TYPES.GRASS:
        ctx.fillStyle = '#112211'; 
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.stroke();
        break;
      case TILE_TYPES.DIRT:
        ctx.fillStyle = '#221511'; 
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.stroke();
        break;
      default: // Tilled or crops tilled backgrounds
        ctx.fillStyle = '#160d0a'; 
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,229,255,0.05)';
        ctx.stroke();
        break;
    }
    
    // Render foreground crops
    const cx = x * TILE_SIZE + TILE_SIZE / 2;
    const cy = y * TILE_SIZE + TILE_SIZE / 2;
    
    ctx.beginPath();
    switch(type) {
      case TILE_TYPES.PLANTED_WHEAT:
        ctx.fillStyle = '#2e7d32';
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        break;
      case TILE_TYPES.GROWN_WHEAT:
        // Glowing gold wheat head
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 179, 0, 0.6)';
        ctx.fillStyle = '#ffb300';
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        break;
        
      case TILE_TYPES.PLANTED_CORN:
        ctx.fillStyle = '#0277bd';
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        break;
      case TILE_TYPES.GROWN_CORN:
        // Electric neon cyan corn
        ctx.shadowBlur = 14;
        ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
        ctx.fillStyle = '#00e5ff';
        ctx.arc(cx, cy, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw center node
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        break;
        
      case TILE_TYPES.PLANTED_BERRY:
        ctx.fillStyle = '#ad1457';
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        break;
      case TILE_TYPES.GROWN_BERRY:
        // Glowing gold/magenta mineral berry
        ctx.shadowBlur = 16;
        ctx.shadowColor = 'rgba(255, 23, 68, 0.7)';
        ctx.fillStyle = '#ff1744';
        ctx.arc(cx, cy, 16, 0, Math.PI * 2);
        ctx.fill();
        
        // Gold spots
        ctx.fillStyle = '#ffca28';
        ctx.beginPath();
        ctx.arc(cx - 5, cy - 4, 3, 0, Math.PI * 2);
        ctx.arc(cx + 5, cy + 3, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        break;
    }
  }
}

export function createWorld(scene, options = {}) {
  const world = new Entity({
    tag: 'world',
    x: 0, y: 0
  });
  world.addComponent(new WorldRenderer({ width: options.width ?? 50, height: options.height ?? 50 }));
  return world;
}
