export class Component {
  constructor(options = {}) {
    this.entity = null;
    this.options = options;
    this.enabled = true;
  }

  attach(entity) {
    this.entity = entity;
    this.onAttach?.();
  }

  detach() {
    this.onDetach?.();
    this.entity = null;
  }

  update(_dt) {}
  render(_ctx, _camera) {}
}
