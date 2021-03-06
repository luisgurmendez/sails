
export const LEFT = 'ArrowLeft';
export const UP = 'ArrowUp';
export const RIGHT = 'ArrowRight';
export const DOWN = 'ArrowDown';
export const SPACE = ' ';

export type Arrow = typeof LEFT | typeof RIGHT | typeof DOWN | typeof UP
export type ArrowKeysPressedMapping = { [key in Arrow]: boolean }
export type PressedKeysMapping = { [key: string]: boolean }

class Keyboard {
  private pressedKeys: PressedKeysMapping;

  constructor() {
    this.pressedKeys = {
      [UP]: false,
      [RIGHT]: false,
      [DOWN]: false,
      [LEFT]: false,
    };

    document.addEventListener('keydown', this.keyDownHanlder)
    document.addEventListener('keyup', this.keyUpHanlder)
  }

  private keyUpHanlder = (e: KeyboardEvent) => {
    this.pressedKeys[e.key as Arrow] = false;
  }

  private keyDownHanlder = (e: KeyboardEvent) => {
    this.pressedKeys[e.key as Arrow] = true;
  }

  public isKeyPressed = (key: string) => {
    return !!this.pressedKeys[key]
  }

  public clean() {
    document.removeEventListener('keydown', this.keyDownHanlder)
    document.removeEventListener('keyup', this.keyUpHanlder)
  }
}

export default Keyboard;