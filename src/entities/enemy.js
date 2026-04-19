import { Entity } from '../../engine/core/entity.js';
import { Rigidbody } from '../../engine/physics/rigidbody.js';
import { SpriteRenderer } from '../../engine/render/sprite.js';
import { AIBehavior } from '../../engine/ai/aiSystem.js';
import { enemyBehavior } from '../ai/enemyAI.js';

export function createEnemy(scene, options = {}) {
  const canvas = scene.engine.canvas;
  const enemy = new Entity({
    tag: 'enemy',
    x: options.x ?? Math.random() * (canvas.width - 36),
    y: options.y ?? -60,
    width: 36,
    height: 36,
  });

  enemy.velocityY = options.speed ?? 160;

  enemy.addComponent(new Rigidbody({ mass: 1, gravity: false, isTrigger: true }));
  enemy.addComponent(new SpriteRenderer({
    color: '#ffb347',
    shape: 'circle',
    glow: 'rgba(255, 179, 71, 0.55)',
    shadow: true,
  }));
  enemy.addComponent(new AIBehavior({
    behavior: enemyBehavior,
    target: 'player',
  }));

  return enemy;
}
