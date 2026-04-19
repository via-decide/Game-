export class Effects {
  constructor(renderer) {
    this.renderer = renderer;
    this.particles = [];
    this._shake = { intensity: 0, duration: 0, elapsed: 0 };
    this._lights = [];
  }

  screenShake(intensity = 8, duration = 0.3) {
    this._shake.intensity = intensity;
    this._shake.duration = duration;
    this._shake.elapsed = 0;
  }

  emitParticles({ x, y, count = 12, color = '#ffffff', speed = 180, life = 0.6, size = 3 }) {
    if (!this.renderer.features.particleSystem) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.4 + Math.random() * 0.6);
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * magnitude,
        vy: Math.sin(angle) * magnitude,
        life,
        age: 0,
        color,
        size,
      });
    }
  }

  light({ x, y, radius = 120, color = 'rgba(89, 212, 255, 0.3)', duration = Infinity }) {
    this._lights.push({ x, y, radius, color, duration, age: 0 });
  }

  update(dt) {
    if (this._shake.elapsed < this._shake.duration) {
      this._shake.elapsed += dt;
      const remaining = 1 - this._shake.elapsed / this._shake.duration;
      const magnitude = this._shake.intensity * remaining;
      this.renderer.camera.shakeX = (Math.random() - 0.5) * 2 * magnitude;
      this.renderer.camera.shakeY = (Math.random() - 0.5) * 2 * magnitude;
    } else {
      this.renderer.camera.shakeX = 0;
      this.renderer.camera.shakeY = 0;
    }

    for (const p of this.particles) {
      p.age += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 200 * dt;
    }
    this.particles = this.particles.filter((p) => p.age < p.life);

    for (const l of this._lights) {
      l.age += dt;
    }
    this._lights = this._lights.filter((l) => l.age < l.duration);
  }

  render(ctx) {
    if (this.renderer.features.lighting) {
      for (const l of this._lights) {
        const grad = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.radius);
        grad.addColorStop(0, l.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (const p of this.particles) {
      const alpha = Math.max(0, 1 - p.age / p.life);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }
}
