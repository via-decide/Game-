import { Entity } from '../../engine/core/entity.js';
import { Rigidbody } from '../../engine/physics/rigidbody.js';
import { SpriteRenderer } from '../../engine/render/sprite.js';

export function createHazard(scene, options = {}) {
  const canvas = scene.engine.canvas;
  const hazard = new Entity({
    tag: 'hazard',
    x: options.x ?? Math.random() * (canvas.width - 30),
    y: options.y ?? -40,
    width: 30,
    height: 30,
  });

  hazard.velocityY = options.speed ?? 220;

  hazard.addComponent(new Rigidbody({ mass: 1, gravity: false, isTrigger: true }));
  hazard.addComponent(new SpriteRenderer({
    image: scene.engine.assets.texture('hazard'),
    color: '#ff5f7a',
    shape: 'rect',
    glow: 'rgba(255, 95, 122, 0.5)',
  }));

  return hazard;
}
