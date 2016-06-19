const FIRST_POSITION = 0;

export default class ListSelector {
  constructor(list, initial) {
    this.selector = list || [];
    this.selected = initial || FIRST_POSITION;
    this.selectorLength = this.selector.length;
  }

  containing(value) {
    this.selector = value || [];
    this.selectorLength = this.selector.length;
    if (this.selected >= this.selectorLength) {
      this.selected = this.selectorLength - 1;
    }

    return this;
  }

  selectNext(onSuccess) {
    if (this.selected < (this.selectorLength - 1)) {
      this.selected = this.selected + 1;
      ListSelector.__callback(onSuccess);
    }

    return this;
  }

  selectPrevious(onSuccess) {
    if (this.selected > FIRST_POSITION) {
      this.selected = this.selected - 1;
      ListSelector.__callback(onSuccess);
    }
    return this;
  }

  selectedValue() {
    return this.selector[this.selected];
  }

  selectedIndex() {
    return this.selected;
  }

  allValues() {
    return this.selector;
  }

  canSelect() {
    return this.selector != null && this.selector.length > 0;
  }

  static __callback(cb) {
    (cb || () => {})();
  }
}
