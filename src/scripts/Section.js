export default class Section {
  constructor( {data, renderer}, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
