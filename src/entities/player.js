import { Entity } from '../../engine/core/entity.js';
import { Component } from '../../engine/core/component.js';
import { Rigidbody } from '../../engine/physics/rigidbody.js';
import { SpriteRenderer } from '../../engine/render/sprite.js';

export class PlayerController extends Component {
  constructor(options = {}) {
    super(options);
    this.maxSpeed = options.maxSpeed ?? 310;
    this.input = options.input;
  }

  update() {
    if (!this.entity || !this.input) return;
    this.entity.velocityX = this.input.axes.x * this.maxSpeed;
  }
}

export function createPlayer(scene, options = {}) {
  const canvas = scene.engine.canvas;
  const player = new Entity({
    tag: 'player',
    x: options.x ?? (canvas.width - 40) / 2,
    y: options.y ?? canvas.height - 60,
    width: 40,
    height: 40,
  });

  player.addComponent(new Rigidbody({ mass: 1, gravity: false, clampToBounds: true }));
  player.addComponent(new SpriteRenderer({
    color: '#6ec6ff',
    shape: 'rect',
    glow: 'rgba(89, 212, 255, 0.65)',
    shadow: true,
  }));
  player.addComponent(new PlayerController({
    maxSpeed: 310,
    input: scene.engine.input,
  }));

  return player;
}
