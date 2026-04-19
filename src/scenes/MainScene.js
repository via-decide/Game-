import { Scene } from '../../engine/core/scene.js';
import { intersects } from '../../engine/physics/physics.js';
import { createPlayer } from '../entities/player.js';
import { createHazard } from '../entities/hazard.js';
import { createEnemy } from '../entities/enemy.js';

const HAZARD_SPAWN_MS = 900;
const ENEMY_SPAWN_MS = 2600;
const SCORE_PER_SECOND = 10;
const DIFFICULTY_RAMP = 2;
const MAX_FALL_SPEED = 500;

export default class MainScene extends Scene {
  constructor(options = {}) {
    super('main');
    this.onScore = options.onScore ?? null;
    this.onGameOver = options.onGameOver ?? null;
    this.score = 0;
    this.fallSpeed = 220;
    this._hazardTimer = 0;
    this._enemyTimer = 0;
    this._active = false;
    this.player = null;
  }

  init() {
    this.registerSpawner('player', createPlayer);
    this.registerSpawner('hazard', createHazard);
    this.registerSpawner('enemy', createEnemy);

    this.player = this.spawn('player');
    this.engine.physics?.setBounds({
      left: 0,
      top: 0,
      right: this.engine.canvas.width,
      bottom: this.engine.canvas.height,
    });
  }

  activate() {
    this._active = true;
    this.score = 0;
    this.fallSpeed = 220;
    this._hazardTimer = 0;
    this._enemyTimer = 0;
    this._clearSpawned();
    if (!this.player || !this.player.alive) {
      this.player = this.spawn('player');
    } else {
      const canvas = this.engine.canvas;
      this.player.x = (canvas.width - this.player.width) / 2;
      this.player.y = canvas.height - 60;
      this.player.velocityX = 0;
      this.player.velocityY = 0;
    }
  }

  deactivate() {
    this._active = false;
  }

  update(dt) {
    if (!this._active) return;

    this.score += dt * SCORE_PER_SECOND;
    this.fallSpeed = Math.min(this.fallSpeed + dt * DIFFICULTY_RAMP * 10, MAX_FALL_SPEED);
    this._hazardTimer += dt * 1000;
    this._enemyTimer += dt * 1000;

    if (this._hazardTimer >= HAZARD_SPAWN_MS) {
      this._hazardTimer = 0;
      this.spawn('hazard', { speed: this.fallSpeed });
    }
    if (this._enemyTimer >= ENEMY_SPAWN_MS) {
      this._enemyTimer = 0;
      this.spawn('enemy', { speed: this.fallSpeed * 0.7 });
    }

    this._cullOffscreen();
    this._checkCollisions();
    this.onScore?.(this.score);
  }

  _cullOffscreen() {
    const bottom = this.engine.canvas.height + 80;
    for (const entity of this.entities) {
      if ((entity.tag === 'hazard' || entity.tag === 'enemy') && entity.y > bottom) {
        entity.destroy();
      }
    }
  }

  _checkCollisions() {
    if (!this.player || !this.player.alive) return;
    for (const entity of this.entities) {
      if (entity === this.player) continue;
      if (entity.tag !== 'hazard' && entity.tag !== 'enemy') continue;
      if (intersects(this.player, entity)) {
        this._triggerGameOver(entity);
        return;
      }
    }
  }

  _triggerGameOver(hitEntity) {
    this._active = false;
    const cx = this.player.x + this.player.width / 2;
    const cy = this.player.y + this.player.height / 2;
    this.engine.effects.emitParticles({
      x: cx,
      y: cy,
      count: 28,
      color: '#ff7a9c',
      speed: 260,
      life: 0.8,
      size: 4,
    });
    this.engine.effects.screenShake(14, 0.4);
    this.engine.effects.light({ x: cx, y: cy, radius: 180, color: 'rgba(255, 95, 122, 0.45)', duration: 0.5 });
    this.engine.assets.play('hit');
    this.onGameOver?.(this.score, hitEntity);
  }

  _clearSpawned() {
    for (const entity of [...this.entities]) {
      if (entity.tag === 'hazard' || entity.tag === 'enemy') {
        entity.destroy();
      }
    }
  }
}
