
import { camera, renderer, scene } from './core';
import loadShipAsync from './objects/ship/shipLoader';
import SimpleShip from './objects/ship/simpleShip';
import PressedKey, { RIGHT, LEFT, UP } from './controls';
import { ShipSide } from './objects/ship/types';
import Stats from 'stats.js';
import { Clock } from 'three';
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
      requestAnimationFrame(animate);
    }


    animate(0.1);
    // const shipAnimation = new Animated(simpleShip.move, 'player');
    // rendererMgr.add(shipAnimation);
    // rendererMgr.render();
  });
})()
