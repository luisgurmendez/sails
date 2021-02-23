
import loadShipAsync from './objects/ship/shipLoader';
import SimpleShip from './objects/ship/simpleShip';
import Keyboard, { RIGHT, LEFT, UP, DOWN } from './utils/Keyboard';
import { ShipSide } from './objects/ship/types';
import { MathUtils } from 'three';
import Game from './core/Game';

(function () {
  const pressedKeys = new Keyboard()
  const game = new Game();

  loadShipAsync('models/ship/ship.gltf').then(shipMesh => {
    const simpleShip = new SimpleShip(shipMesh);
    game.addSteppedObject(simpleShip);


    const steerWheel = document.getElementById('steer-wheel');
    if (steerWheel) {
      steerWheel.onclick = function () {
        game.camera.lookAt(simpleShip.object.position.clone());
        game.orbitControls.target = simpleShip.object.position.clone();
      }
    }

    function update() {
      const dt = game.clock.getDelta();
      const t = game.clock.getElapsedTime();

      game.pressedKeys.isKeyPressed(RIGHT) && simpleShip.rotate('right');
      game.pressedKeys.isKeyPressed(LEFT) && simpleShip.rotate('left');
      game.pressedKeys.isKeyPressed(UP) && simpleShip.openSails();
      game.pressedKeys.isKeyPressed(DOWN) && simpleShip.closeSails();


      if (game.pressedKeys.isKeyPressed('a')) {
        const balls = simpleShip.shoot(ShipSide.PORT);
        balls.forEach(b => {
          game.addSteppedObject(b);
        });
      }

      if (pressedKeys.isKeyPressed('d')) {
        const balls = simpleShip.shoot(ShipSide.STARBOARD);
        balls.forEach(b => {
          game.addSteppedObject(b);
        });
      }

      game.steppedObjects.forEach(c => {
        c.step(game.enviorment, t, dt);
      })

      const shipPositionDOM = document.getElementById('ship-stats-position');
      shipPositionDOM!.innerHTML = `
      <div class="stat">x: ${simpleShip.object.position.x.toFixed(1)}</div>
      <div class="stat">y: ${simpleShip.object.position.y.toFixed(1)}</div>
      <div class="stat">z: ${simpleShip.object.position.z.toFixed(1)}</div>
      `;

      const shipSpeedDOM = document.getElementById('ship-stats-speed');
      shipSpeedDOM!.innerHTML = `
      <div class="stat">speed: ${simpleShip.speed.toFixed(1)}</div>
      `;

      const shipAccelerationDOM = document.getElementById('ship-stats-acceleration');
      shipAccelerationDOM!.innerHTML = `
      <div class="stat">acceleration: ${simpleShip.acceleration.toFixed(3)}</div>
      `;

      // const north = new Vector2(1, 0);
      const INITIAL_COMPASS_IMAGE_ROTATION = -30;
      const shipDirectionInDegreesWithRespectWithNorth = -1 * MathUtils.radToDeg(simpleShip.direction.angle()) + INITIAL_COMPASS_IMAGE_ROTATION;
      const compassDOM = document.getElementById('compass-img');
      compassDOM!.style.transform = `rotate(${shipDirectionInDegreesWithRespectWithNorth}deg)`;

      const windDirection = -1 * MathUtils.radToDeg(game.enviorment.wind.getWindAtPosition(simpleShip.object.position).direction.angle());
      const windDOM = document.getElementById('wind-img');
      windDOM!.style.transform = `rotate(${windDirection}deg)`


    }

    const init = game.loop(update);
    init();

  });
})()
