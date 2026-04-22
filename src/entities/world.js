import { Entity } from '../../engine/core/entity.js';
import { Component } from '../../engine/core/component.js';

export const TILE_SIZE = 64;

export const TILE_TYPES = {
  GRASS: 0,
  DIRT: 1,
  TILLED: 2,
  PLANTED: 3,
  GROWN: 4
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
    
    switch(type) {
      case TILE_TYPES.GRASS: ctx.fillStyle = '#2d4c1e'; break;
      case TILE_TYPES.DIRT: ctx.fillStyle = '#4a3622'; break;
      case TILE_TYPES.TILLED: ctx.fillStyle = '#312213'; break;
      case TILE_TYPES.PLANTED: 
        ctx.fillStyle = '#312213'; 
        ctx.fill();
        ctx.fillStyle = '#5c9438';
        ctx.beginPath();
        ctx.arc(x * TILE_SIZE + TILE_SIZE/2, y * TILE_SIZE + TILE_SIZE/2, 8, 0, Math.PI*2);
        break;
      case TILE_TYPES.GROWN:
        ctx.fillStyle = '#312213'; 
        ctx.fill();
        ctx.fillStyle = '#ffb020'; // Wheat/crop
        ctx.beginPath();
        ctx.arc(x * TILE_SIZE + TILE_SIZE/2, y * TILE_SIZE + TILE_SIZE/2, 16, 0, Math.PI*2);
        break;
    }
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.stroke();
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
