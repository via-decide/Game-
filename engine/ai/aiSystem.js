import { Component } from '../core/component.js';

export class AIBehavior extends Component {
  constructor(options = {}) {
    super(options);
    this.behavior = options.behavior ?? (() => {});
    this.targetTag = options.target ?? null;
  }

  update(dt) {
    const scene = this.entity?.scene;
    if (!scene) return;
    const target = this.targetTag ? scene.first(this.targetTag) : null;
    this.behavior(this.entity, target, dt, scene);
  }
}

export class AISystem {
  constructor() {
    this.behaviors = new Map();
  }

  register(name, behavior) {
    this.behaviors.set(name, behavior);
  }

  get(name) {
    return this.behaviors.get(name) ?? null;
  }
}
