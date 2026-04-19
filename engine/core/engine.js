import { Renderer } from '../render/renderer.js';
import { Physics } from '../physics/physics.js';
import { AssetLoader } from '../assets/assetLoader.js';
import { Effects } from '../effects/effects.js';
import { AISystem } from '../ai/aiSystem.js';
import { Debug } from '../debug/debug.js';
import { Input } from './input.js';
import { EventBus } from './events.js';

export class Engine {
  constructor(options = {}) {
    if (!options.canvas) {
      throw new Error('Engine requires a canvas element');
    }
    this.canvas = options.canvas;
    this.renderer = new Renderer(this.canvas, { mode: options.renderer ?? '2d' });
    this.physics = options.physics ? new Physics({ bounds: this._defaultBounds() }) : null;
    this.assets = new AssetLoader(options.assets ?? {});
    this.ai = new AISystem();
    this.effects = new Effects(this.renderer);
    this.debug = new Debug(this);
    this.input = new Input(options.inputTarget ?? window);
    this.events = new EventBus();

    this.scene = null;
    this.running = false;
    this.paused = false;
    this._rafId = null;
    this._lastTime = 0;
    this._maxStep = options.maxStep ?? 1 / 30;
    this._loop = this._loop.bind(this);
  }

  _defaultBounds() {
    return {
      left: 0,
      top: 0,
      right: this.canvas.width,
      bottom: this.canvas.height,
    };
  }

  async loadScene(scene) {
    if (this.scene) {
      this.scene.engine = null;
    }
    scene.attach(this);
    this.scene = scene;
    await scene.init();
    scene.started = true;
    this.events.emit('scene:loaded', scene);
    return scene;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.paused = false;
    this._lastTime = performance.now();
    this._rafId = requestAnimationFrame(this._loop);
    this.events.emit('engine:start');
  }

  stop() {
    this.running = false;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this.events.emit('engine:stop');
  }

  pause() {
    this.paused = true;
    this.events.emit('engine:pause');
  }

  resume() {
    if (!this.running) return;
    this.paused = false;
    this._lastTime = performance.now();
    this.events.emit('engine:resume');
  }

  _loop(now) {
    if (!this.running) return;
    const dt = Math.min((now - this._lastTime) / 1000, this._maxStep);
    this._lastTime = now;

    if (!this.paused && this.scene) {
      this.scene._tick(dt);
      if (this.physics) this.physics.step(this.scene, dt);
      this.effects.update(dt);
      this.debug.tick(dt);
    }

    this.renderer.beginFrame();
    if (this.scene) {
      this.scene._render(this.renderer.ctx, this.renderer.camera);
      this.effects.render(this.renderer.ctx);
      this.debug.render(this.renderer.ctx, this.scene);
    }
    this.renderer.endFrame();

    this._rafId = requestAnimationFrame(this._loop);
  }
}
