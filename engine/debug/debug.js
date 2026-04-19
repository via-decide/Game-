import { Rigidbody } from '../physics/rigidbody.js';

export class Debug {
  constructor(engine) {
    this.engine = engine;
    this.active = false;
    this.fps = 0;
    this._frames = 0;
    this._elapsed = 0;
  }

  enable() {
    this.active = true;
  }

  disable() {
    this.active = false;
  }

  tick(dt) {
    if (!this.active) return;
    this._elapsed += dt;
    this._frames += 1;
    if (this._elapsed >= 0.5) {
      this.fps = Math.round(this._frames / this._elapsed);
      this._frames = 0;
      this._elapsed = 0;
    }
  }

  render(ctx, scene) {
    if (!this.active) return;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 255, 160, 0.7)';
    for (const entity of scene.entities) {
      const hasBody = entity.getComponent(Rigidbody);
      if (hasBody) {
        ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);
      }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'rgba(12, 20, 34, 0.8)';
    ctx.fillRect(8, 8, 150, 66);
    ctx.fillStyle = '#7fffd4';
    ctx.font = '12px monospace';
    ctx.fillText(`FPS: ${this.fps}`, 16, 26);
    ctx.fillText(`Entities: ${scene.entities.length}`, 16, 42);
    ctx.fillText(`Scene: ${scene.name}`, 16, 58);
    ctx.restore();
  }
}
