
import Keyboard, { RIGHT, LEFT, UP, DOWN } from '../utils/Keyboard';
import { ShipSide } from '../objects/ship/types';
import { MathUtils } from 'three';
import Game from '../core/Game';
import Ship from '../objects/ship/ship';
import { angleTo } from '../utils/math'

export function addControlHanlders(game: Game, ship: Ship) {
  const steerWheel = document.getElementById('steer-wheel');
  if (steerWheel) {
    steerWheel.onclick = function () {
      game.camera.lookAt(ship.object.position.clone());
      game.orbitControls.target = ship.object.position.clone();
    }
  }
}


export function handleExternalControls(game: Game, ship: Ship) {

  const shipPositionDOM = document.getElementById('ship-stats-position');
  shipPositionDOM!.innerHTML = `
      <div class="stat">x: ${ship.object.position.x.toFixed(1)}</div>
      <div class="stat">y: ${ship.object.position.y.toFixed(1)}</div>
      <div class="stat">z: ${ship.object.position.z.toFixed(1)}</div>
      `;

  const shipSpeedDOM = document.getElementById('ship-stats-speed');
  shipSpeedDOM!.innerHTML = `
      <div class="stat">speed: ${ship.speed.toFixed(1)}</div>
      `;

  const shipAccelerationDOM = document.getElementById('ship-stats-acceleration');
  shipAccelerationDOM!.innerHTML = `
      <div class="stat">acceleration: ${ship.acceleration.toFixed(3)}</div>
      `;

  // const north = new Vector2(1, 0);
  const INITIAL_COMPASS_IMAGE_ROTATION = -30;
  const shipDirectionInDegreesWithRespectWithNorth = -1 * MathUtils.radToDeg(ship.direction.angle()) + INITIAL_COMPASS_IMAGE_ROTATION;
  const compassDOM = document.getElementById('compass-img');
  compassDOM!.style.transform = `rotate(${shipDirectionInDegreesWithRespectWithNorth}deg)`;

  const windDirection = -1 * MathUtils.radToDeg(angleTo(game.enviorment.wind.getWindAtPosition(ship.object.position).direction, ship.direction));
  const windDOM = document.getElementById('wind-img');
  windDOM!.style.transform = `rotate(${windDirection}deg)`

}