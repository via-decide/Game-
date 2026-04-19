export class Scene {
  constructor(name = 'scene') {
    this.name = name;
    this.engine = null;
    this.entities = [];
    this.spawners = new Map();
    this.started = false;
  }

  registerSpawner(key, factory) {
    this.spawners.set(key, factory);
  }

  spawn(key, options = {}) {
    const factory = this.spawners.get(key);
    if (!factory) {
      throw new Error(`No spawner registered for "${key}"`);
    }
    const entity = factory(this, options);
    this.add(entity);
    return entity;
  }

  add(entity) {
    entity.scene = this;
    this.entities.push(entity);
    return entity;
  }

  remove(entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) this.entities.splice(index, 1);
    entity.scene = null;
  }

  query(tag) {
    return this.entities.filter((e) => e.tag === tag);
  }

  first(tag) {
    return this.entities.find((e) => e.tag === tag) ?? null;
  }

  attach(engine) {
    this.engine = engine;
  }

  init() {}
  update(_dt) {}
  render(_ctx) {}

  _tick(dt) {
    this.update(dt);
    for (const entity of this.entities) {
      entity.updateComponents(dt);
    }
    this.entities = this.entities.filter((e) => e.alive);
  }

  _render(ctx, camera) {
    for (const entity of this.entities) {
      entity.renderComponents(ctx, camera);
    }
    this.render(ctx);
  }
}
