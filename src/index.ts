
import { camera, renderer, scene, controls } from './core';
import loadShipAsync from './objects/ship/shipLoader';
import SimpleShip from './objects/ship/simpleShip';
import PressedKey, { RIGHT, LEFT, UP } from './controls';
import { ShipSide } from './objects/ship/types';
import Stats from 'stats.js';
import { Clock, MathUtils, Vector2 } from 'three';
import CannonBall from 'objects/cannonBall/cannonBall';

const stats = new Stats()
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

// (function () {
//   const rendererMgr = new RendererMgr();
//   loadShip().then(ship => {
//     rendererMgr.add(ship.shipAnimation);
//     rendererMgr.render();
//   });
// })()

(function () {
  const pressedKeys = new PressedKey()

  loadShipAsync('models/ship/ship.gltf').then(shipMesh => {
    scene.add(shipMesh);
    const simpleShip = new SimpleShip(shipMesh);
    console.log(simpleShip);
    const clock = new Clock();
    const balls: CannonBall[] = [];

    const steerWheel = document.getElementById('steer-wheel');
    if (steerWheel) {
      steerWheel.onclick = function () {
        camera.lookAt(simpleShip.object.position.clone());
        controls.target = simpleShip.object.position.clone();
      }
    }

    function animate(t: number) {
      const dt = clock.getDelta()
      stats.begin()
      pressedKeys.isKeyPressed(RIGHT) && simpleShip.rotate('right');
      pressedKeys.isKeyPressed(LEFT) && simpleShip.rotate('left');
      pressedKeys.isKeyPressed(UP) && simpleShip.accelerate();
      if (pressedKeys.isKeyPressed('a')) {
        balls.push(...simpleShip.shoot(ShipSide.PORT));
        balls.forEach(b => {
          scene.add(b.object);
        })
      }
      if (pressedKeys.isKeyPressed('d')) {
        balls.push(...simpleShip.shoot(ShipSide.STARBOARD));
        balls.forEach(b => {
          scene.add(b.object)
        })
      }

      simpleShip.step(t, dt);
      balls.forEach(c => {
        c.move();
      })
      renderer.render(scene, camera);
      stats.end()
      // enable dumping
      controls.update();
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

      // const north = new Vector2(1, 0);

      const INITIAL_COMPASS_IMAGE_ROTATION = -30;
      const shipDirectionInDegreesWithRespectWithNorth = -1 * MathUtils.radToDeg(simpleShip.direction.angle()) + INITIAL_COMPASS_IMAGE_ROTATION;
      const compassDOM = document.getElementById('compass-img');
      compassDOM!.style.transform = `rotate(${shipDirectionInDegreesWithRespectWithNorth}deg)`

      requestAnimationFrame(animate);
    }


    animate(0.1);
    // const shipAnimation = new Animated(simpleShip.move, 'player');
    // rendererMgr.add(shipAnimation);
    // rendererMgr.render();
  });
})()
