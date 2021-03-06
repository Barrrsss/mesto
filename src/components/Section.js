export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems(items = this._items) {
       items.reverse().forEach(item => {
         this._renderer(item);
       });
    }

    addItem(item) {
       this._container.prepend(item);
    }

}
