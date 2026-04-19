import { Component } from '../core/component.js';

export class Rigidbody extends Component {
  constructor(options = {}) {
    super(options);
    this.mass = options.mass ?? 1;
    this.gravity = options.gravity ?? false;
    this.gravityScale = options.gravityScale ?? 1;
    this.drag = options.drag ?? 0;
    this.clampToBounds = options.clampToBounds ?? false;
    this.isTrigger = options.isTrigger ?? false;
    this.onCollision = options.onCollision ?? null;
  }

  applyForce(fx, fy) {
    if (!this.entity) return;
    this.entity.velocityX += (fx / this.mass);
    this.entity.velocityY += (fy / this.mass);
  }
}
