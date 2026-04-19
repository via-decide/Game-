import { Component } from '../core/component.js';

export class SpriteRenderer extends Component {
  constructor(options = {}) {
    super(options);
    this.color = options.color ?? '#ffffff';
    this.image = options.image ?? null;
    this.shape = options.shape ?? 'rect';
    this.glow = options.glow ?? null;
    this.shadow = options.shadow ?? false;
  }

  render(ctx, camera) {
    const e = this.entity;
    if (!e) return;

    if (this.shadow) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.ellipse(
        e.x + e.width / 2,
        e.y + e.height + 4,
        e.width * 0.45,
        4,
        0, 0, Math.PI * 2
      );
      ctx.fill();
    }

    if (this.glow) {
      ctx.save();
      ctx.shadowColor = this.glow;
      ctx.shadowBlur = 18;
    }

    if (this.image && this.image.complete && this.image.naturalWidth > 0) {
      ctx.drawImage(this.image, e.x, e.y, e.width, e.height);
    } else if (this.shape === 'circle') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(
        e.x + e.width / 2,
        e.y + e.height / 2,
        Math.min(e.width, e.height) / 2,
        0, Math.PI * 2
      );
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(e.x, e.y, e.width, e.height);
    }

    if (this.glow) ctx.restore();
  }
}
