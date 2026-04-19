import { Rigidbody } from './rigidbody.js';

export class Physics {
  constructor(options = {}) {
    this.gravity = options.gravity ?? 980;
    this.bounds = options.bounds ?? null;
    this.collisions = [];
  }

  setBounds(bounds) {
    this.bounds = bounds;
  }

  step(scene, dt) {
    this.collisions = [];
    const bodies = [];
    for (const entity of scene.entities) {
      const body = entity.getComponent(Rigidbody);
      if (body) bodies.push({ entity, body });
    }

    for (const { entity, body } of bodies) {
      if (body.gravity) entity.velocityY += this.gravity * body.gravityScale * dt;
      entity.x += entity.velocityX * dt;
      entity.y += entity.velocityY * dt;
      if (body.drag > 0) {
        const damp = Math.max(0, 1 - body.drag * dt);
        entity.velocityX *= damp;
        entity.velocityY *= damp;
      }
      if (this.bounds && body.clampToBounds) {
        this._clamp(entity);
      }
    }

    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i];
        const b = bodies[j];
        if (a.body.isTrigger && b.body.isTrigger) continue;
        if (intersects(a.entity, b.entity)) {
          this.collisions.push({ a: a.entity, b: b.entity });
          a.body.onCollision?.(b.entity);
          b.body.onCollision?.(a.entity);
        }
      }
    }
  }

  _clamp(entity) {
    const b = this.bounds;
    if (entity.x < b.left) entity.x = b.left;
    const maxX = b.right - entity.width;
    if (entity.x > maxX) entity.x = maxX;
    if (entity.y < b.top) entity.y = b.top;
    const maxY = b.bottom - entity.height;
    if (entity.y > maxY) entity.y = maxY;
  }
}

export function intersects(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export { Rigidbody } from './rigidbody.js';
