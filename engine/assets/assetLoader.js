export class AssetLoader {
  constructor(options = {}) {
    this.baseTextures = options.textures ?? './assets/textures/';
    this.baseAudio = options.audio ?? './assets/audio/';
    this.textures = new Map();
    this.audio = new Map();
  }

  async load(manifest = {}) {
    const texturePromises = (manifest.textures ?? []).map((name) => this._loadTexture(name));
    const audioPromises = (manifest.audio ?? []).map((name) => this._loadAudio(name));
    await Promise.all([...texturePromises, ...audioPromises]);
    return { textures: this.textures, audio: this.audio };
  }

  texture(name) {
    return this.textures.get(name) ?? null;
  }

  sound(name) {
    return this.audio.get(name) ?? null;
  }

  play(name, { volume = 1, loop = false } = {}) {
    const source = this.audio.get(name);
    if (!source) return null;
    const clone = source.cloneNode(true);
    clone.volume = volume;
    clone.loop = loop;
    clone.play().catch(() => {});
    return clone;
  }

  _loadTexture(name) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { this.textures.set(name, img); resolve(img); };
      img.onerror = () => { this.textures.set(name, null); resolve(null); };
      img.src = this._resolvePath(this.baseTextures, name);
    });
  }

  _loadAudio(name) {
    return new Promise((resolve) => {
      const audio = new Audio();
      const done = () => { this.audio.set(name, audio); resolve(audio); };
      audio.oncanplaythrough = done;
      audio.onerror = () => { this.audio.set(name, null); resolve(null); };
      audio.src = this._resolvePath(this.baseAudio, name);
      audio.load();
      setTimeout(done, 1500);
    });
  }

  _resolvePath(base, name) {
    if (/^(https?:|\.?\/)/.test(name)) return name;
    return base.endsWith('/') ? base + name : `${base}/${name}`;
  }
}
