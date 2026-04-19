let nextId = 1;

export class Entity {
  constructor(options = {}) {
    this.id = options.id ?? `e${nextId++}`;
    this.tag = options.tag ?? 'entity';
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.width = options.width ?? 0;
    this.height = options.height ?? 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.alive = true;
    this.scene = null;
    this._components = [];
    this._componentsByType = new Map();
  }

  addComponent(component) {
    component.attach(this);
    this._components.push(component);
    const type = component.constructor;
    if (!this._componentsByType.has(type)) {
      this._componentsByType.set(type, []);
    }
    this._componentsByType.get(type).push(component);
    return component;
  }

  getComponent(type) {
    const bucket = this._componentsByType.get(type);
    return bucket ? bucket[0] : null;
  }

  removeComponent(component) {
    const index = this._components.indexOf(component);
    if (index === -1) return;
    this._components.splice(index, 1);
    const bucket = this._componentsByType.get(component.constructor);
    if (bucket) {
      const i = bucket.indexOf(component);
      if (i !== -1) bucket.splice(i, 1);
    }
    component.detach();
  }

  updateComponents(dt) {
    for (const c of this._components) {
      if (c.enabled) c.update(dt);
    }
  }

  renderComponents(ctx, camera) {
    for (const c of this._components) {
      if (c.enabled) c.render(ctx, camera);
    }
  }

  distance(other) {
    const dx = (this.x + this.width / 2) - (other.x + other.width / 2);
    const dy = (this.y + this.height / 2) - (other.y + other.height / 2);
    return Math.hypot(dx, dy);
  }

  destroy() {
    this.alive = false;
    this.scene?.remove(this);
  }
}
