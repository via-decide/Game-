import { Scene } from '../../engine/core/scene.js';
import { createPlayer } from '../entities/player.js';
import { createWorld, TILE_SIZE } from '../entities/world.js';
import { FarmingInteractor } from '../components/farming.js';

export default class MainScene extends Scene {
  constructor(options = {}) {
    super('main');
    this.onScore = options.onScore ?? null;
    this.onGameOver = options.onGameOver ?? null;
    this.score = 0;
    this._active = false;
    this.player = null;
    this.world = null;
  }

  init() {
    this.registerSpawner('player', createPlayer);
    this.registerSpawner('world', createWorld);

    // Disable physics bounds globally for open world
    if (this.engine.physics) {
      this.engine.physics.bounds = null;
    }

    this.world = this.spawn('world', { width: 40, height: 40 });
    
    // Spawn player in center of world
    this.player = this.spawn('player', { 
      x: (40 * TILE_SIZE) / 2, 
      y: (40 * TILE_SIZE) / 2 
    });

    // Attach farming logic
    this.player.addComponent(new FarmingInteractor({
      input: this.engine.input,
      worldEntity: this.world
    }));

    // Attach camera to player
    this.engine.renderer.camera.target = this.player;
  }

  activate() {
    this._active = true;
    this.score = 0;
    this.onScore?.(this.score);
  }

  deactivate() {
    this._active = false;
  }

  update(dt) {
    if (!this._active) return;
    // Core game logic loop could handle day/night cycles here
  }
}
