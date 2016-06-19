class AlreadyDispatchedKeyboard {
  constructor() {}
  on() { return this; }
  otherwise() { return this; }
  ignore() { return this; }
}

export default class Keyboard {
  constructor(event) {
    this._event = event;
    this._event.stopBubbling = () => {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  on(keypress, work) {
    if (!Array.isArray(keypress)) {
      return this.__dispatch([ keypress ], work);
    } else {
      return this.__dispatch(keypress, work);
    }
  }

  ignore(keypress) {
    return this.on(keypress, () => {});
  }

  otherwise(work) {
    work(this._event);
    return new AlreadyDispatchedKeyboard();
  }

  __dispatch(kpArray, work) {
    const key = this._event.key;
    if (kpArray.some(kp => key === kp)) {
      work(this._event);
      return new AlreadyDispatchedKeyboard();
    } else {
      return this;
    }
  }
}

Keyboard.UP = 'ArrowUp';
Keyboard.DOWN = 'ArrowDown';
Keyboard.ENTER = 'Enter';
Keyboard.ESCAPE = 'Escape';
Keyboard.LEFT = 'ArrowLeft';
Keyboard.RIGHT = 'ArrowRight';
Keyboard.SHIFT = 'Shift';
Keyboard.CONTROL = 'Control';
Keyboard.SPACE = ' ';
