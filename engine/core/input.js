export class Input {
  constructor(target = window) {
    this.target = target;
    this.keys = new Set();
    this.axes = { x: 0, y: 0 };
    this._onKeyDown = (e) => this._press(e.key);
    this._onKeyUp = (e) => this._release(e.key);
    target.addEventListener('keydown', this._onKeyDown);
    target.addEventListener('keyup', this._onKeyUp);
  }

  _press(key) {
    this.keys.add(key.toLowerCase());
    this._recomputeAxes();
  }

  _release(key) {
    this.keys.delete(key.toLowerCase());
    this._recomputeAxes();
  }

  _recomputeAxes() {
    const left = this.keys.has('arrowleft') || this.keys.has('a');
    const right = this.keys.has('arrowright') || this.keys.has('d');
    const up = this.keys.has('arrowup') || this.keys.has('w');
    const down = this.keys.has('arrowdown') || this.keys.has('s');
    this.axes.x = (right ? 1 : 0) - (left ? 1 : 0);
    this.axes.y = (down ? 1 : 0) - (up ? 1 : 0);
  }

  isDown(key) {
    return this.keys.has(key.toLowerCase());
  }

  dispose() {
    this.target.removeEventListener('keydown', this._onKeyDown);
    this.target.removeEventListener('keyup', this._onKeyUp);
  }
}
