import { Scene } from '../../engine/core/scene.js';
import { createPlayer } from '../entities/player.js';
import { createWorld, TILE_SIZE } from '../entities/world.js';
import { FarmingInteractor } from '../components/farming.js';

export default class MainScene extends Scene {
  constructor(options = {}) {
    super('main');
    this.onScore = options.onScore ?? null;
    this.onGameOver = options.onGameOver ?? null;
    
    this.score = 0;
    this._active = false;
    this.player = null;
    this.world = null;
    
    this.floatingTexts = [];
    this.timeLeft = 90; // 90 seconds day timer
  }

  init() {
    this.registerSpawner('player', createPlayer);
    this.registerSpawner('world', createWorld);

    // Disable physics bounds globally for open world
    if (this.engine.physics) {
      this.engine.physics.bounds = null;
    }

    this.world = this.spawn('world', { width: 40, height: 40 });
    
    // Spawn player in center of world
    this.player = this.spawn('player', { 
      x: (40 * TILE_SIZE) / 2, 
      y: (40 * TILE_SIZE) / 2 
    });

    // Attach farming logic
    this.player.addComponent(new FarmingInteractor({
      input: this.engine.input,
      worldEntity: this.world
    }));

    // Attach camera to player
    this.engine.renderer.camera.target = this.player;
  }

  activate() {
    this._active = true;
    this.score = 0;
    this.timeLeft = 90;
    this.floatingTexts = [];
    
    // Reset stamina in interactor
    const interactor = this.player.getComponent(FarmingInteractor);
    if (interactor) {
      interactor.stamina = 100;
      interactor.updateStaminaHUD();
    }
    
    // Choose dynamic weather
    const weathers = ['Sunny', 'Acid Rain', 'Solar Flare'];
    this.activeWeather = weathers[Math.floor(Math.random() * weathers.length)];
    const weatherEl = document.getElementById('weather-val');
    if (weatherEl) {
      weatherEl.textContent = this.activeWeather;
      if (this.activeWeather === 'Acid Rain') {
        weatherEl.style.color = '#ffa726';
      } else if (this.activeWeather === 'Solar Flare') {
        weatherEl.style.color = '#ff1744';
      } else {
        weatherEl.style.color = '#00e676';
      }
    }

    this.onScore?.(this.score);
    this.updateTimerHUD();
  }

  deactivate() {
    this._active = false;
  }

  addFloatingText(text, x, y, color) {
    this.floatingTexts.push({
      text,
      x,
      y,
      color: color || '#ffffff',
      alpha: 1,
      life: 0.8, // 0.8 seconds lifetime
      velocityY: -45 // rise speed
    });
  }

  updateTimerHUD() {
    const timerEl = document.getElementById('timer-val');
    if (timerEl) {
      timerEl.textContent = String(Math.ceil(this.timeLeft));
    }
  }

  update(dt) {
    if (!this._active) return;
    
    // Day loop countdown
    this.timeLeft -= dt;
    this.updateTimerHUD();

    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.updateTimerHUD();
      this.onGameOver?.(this.score);
      return;
    }

    // Update floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.velocityY * dt;
      ft.life -= dt;
      ft.alpha = Math.max(0, ft.life / 0.8);
      if (ft.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  render(ctx) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const cx = this.engine.renderer.camera.x;
    const cy = this.engine.renderer.camera.y;

    // Draw dynamic weather overlays
    if (this.activeWeather === 'Acid Rain') {
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.18)';
      ctx.lineWidth = 1;
      // Draw falling streaks centered around camera target coordinates
      for (let i = 0; i < 30; i++) {
        const rx = cx - canvasWidth/2 + (Math.random() * canvasWidth);
        const ry = cy - canvasHeight/2 + (Math.random() * canvasHeight);
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 4, ry + 12);
        ctx.stroke();
      }
      ctx.restore();
    } 
    else if (this.activeWeather === 'Solar Flare') {
      ctx.save();
      // Pulsing thermal glow filter
      const pulse = 0.05 + Math.sin(performance.now() / 400) * 0.02;
      ctx.fillStyle = `rgba(255, 23, 68, ${pulse})`;
      ctx.fillRect(cx - canvasWidth/2, cy - canvasHeight/2, canvasWidth, canvasHeight);
      ctx.restore();
    }

    // Draw all floating text on top in world coordinates
    ctx.save();
    ctx.font = "bold 13px 'Orbitron', monospace";
    ctx.textAlign = 'center';
    
    for (const ft of this.floatingTexts) {
      ctx.fillStyle = ft.color;
      ctx.globalAlpha = ft.alpha;
      ctx.fillText(ft.text, ft.x, ft.y);
    }
    
    ctx.restore();
  }
}
