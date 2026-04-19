export class Renderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.mode = options.mode ?? '2d';
    this.clearColor = options.clearColor ?? '#0b1220';
    this.ctx = this._initContext();
    this.features = {
      lighting: false,
      particleSystem: false,
      shadows: false,
      postProcessing: false,
      bloom: false,
    };
    this.camera = { x: 0, y: 0, zoom: 1, shakeX: 0, shakeY: 0 };
  }

  _initContext() {
    if (this.mode === 'webgl') {
      const gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
      if (gl) {
        this._glContext = gl;
      } else {
        this.mode = '2d';
      }
    }
    return this.canvas.getContext('2d');
  }

  setFeatures(features = {}) {
    Object.assign(this.features, features);
  }

  get width() { return this.canvas.width; }
  get height() { return this.canvas.height; }

  beginFrame() {
    const { ctx } = this;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = this.clearColor;
    ctx.fillRect(0, 0, this.width, this.height);
    if (this.features.lighting) {
      const gradient = ctx.createRadialGradient(
        this.width / 2, this.height / 2, this.width * 0.1,
        this.width / 2, this.height / 2, this.width * 0.7
      );
      gradient.addColorStop(0, 'rgba(255,255,255,0.08)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.height);
    }
    ctx.translate(this.camera.shakeX, this.camera.shakeY);
  }

  endFrame() {
    const { ctx } = this;
    if (this.features.bloom) {
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgba(89, 212, 255, 0.04)';
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.globalCompositeOperation = 'source-over';
    }
    if (this.features.postProcessing) {
      ctx.fillStyle = 'rgba(5, 12, 28, 0.12)';
      ctx.fillRect(0, 0, this.width, this.height);
    }
    ctx.restore();
  }
}
