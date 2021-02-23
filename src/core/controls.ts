
import Keyboard, { RIGHT, LEFT, UP, DOWN } from '../utils/Keyboard';
import { ShipSide } from '../objects/ship/types';
import Game from '../core/Game';
import Ship from '../objects/ship/ship';

export function handleShipControls(game: Game, ship: Ship) {

  game.pressedKeys.isKeyPressed(RIGHT) && ship.rotate('right');
  game.pressedKeys.isKeyPressed(LEFT) && ship.rotate('left');
  game.pressedKeys.isKeyPressed(UP) && ship.openSails();
  game.pressedKeys.isKeyPressed(DOWN) && ship.closeSails();


  if (game.pressedKeys.isKeyPressed('a')) {
    const balls = ship.shoot(ShipSide.PORT);
    balls.forEach(b => {
      game.addObject(b);
    });
  }

  if (game.pressedKeys.isKeyPressed('d')) {
    const balls = ship.shoot(ShipSide.STARBOARD);
    balls.forEach(b => {
      game.addObject(b);
    });
  }

}

