import Animated from './animated';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { scene, pressedKeys } from './core';
import { DOWN, LEFT, RIGHT, UP } from './controls';
import { Vector2 } from 'three';
import SimpleCannonBall from './objects/cannonBall/simpleCannonBall';
import CannonBall from 'objects/cannonBall/cannonBall';

const loader = new GLTFLoader();

async function loadShipAsync(handleLoadingProgress?: (e: ProgressEvent) => void) {

  // Load a glTF resource
  const gltf = await loader.loadAsync(
    'models/ship/ship.gltf',
    handleLoadingProgress
  );

  // Make all components of the ship cast shadow
  gltf.scene.traverse(function (node) {
    node.castShadow = true;
    // node.receiveShadow = true;
  });

  const ship = gltf.scene
  console.log(ship);

  function shipMovementAnimation(direction: Vector2, acceleration: number) {

    const rotationDelta = (Math.PI / 360) * acceleration;
    const minRotation = (Math.PI / 360) / 2;
    const rotation = acceleration === 0 ? minRotation : rotationDelta + minRotation

    function moveForward() {

      const _acceleration = acceleration / 3;

      // Move ship in the x and z axis depending on the direction
      const x = ship.position.x + direction.x * _acceleration
      const z = ship.position.z + direction.y * _acceleration

      ship.position.setX(x);
      ship.position.setZ(z);
    }

    function rotateRight() {
      direction.rotateAround(new Vector2(), rotation);
      ship.rotation.y -= rotation
      // ship.rotation.x = direction.x * Math.PI / 6;
    }

    function down() {
      // ship.position.setX(ship.position.x - deltaMovement);
    }

    function rotateLeft() {
      direction.rotateAround(new Vector2(), -rotation);
      ship.rotation.y += rotation
      // ship.rotation.x = direction.x * Math.PI / 6;
    }

    pressedKeys.isKeyPressed(RIGHT) && rotateRight();
    pressedKeys.isKeyPressed(DOWN) && down();
    pressedKeys.isKeyPressed(LEFT) && rotateLeft();
    moveForward()
  }

  function calculateAcceleration(_acceleration: number) {

    const deltaAcc = 0.003
    const deltaDesacc = 0.002

    if (pressedKeys.isKeyPressed(UP)) {
      if (_acceleration >= 1) {
        return 1
      }
      return _acceleration + deltaAcc
    }
    if (_acceleration <= 0) {
      return 0;
    }
    return _acceleration - deltaDesacc
  }

  function shoot(direction: Vector2, cannonballs: any) {
    const speed = 1.5;
    let shouldCreateCannonBall = false;
    let cannonballDirection: Vector2 | undefined;

    if (pressedKeys.isKeyPressed('a')) {
      cannonballDirection = new Vector2(-direction.y, direction.x);
      shouldCreateCannonBall = true;
    }

    if (pressedKeys.isKeyPressed('d')) {
      cannonballDirection = new Vector2(direction.y, -direction.x);
      shouldCreateCannonBall = true;
    }

    if (shouldCreateCannonBall && cannonballDirection !== undefined) {
      const cannonball = new SimpleCannonBall(cannonballDirection);
      const cannonBallInitialPosition = ship.position.clone();
      cannonBallInitialPosition.y += 3;
      cannonball.mesh.position.copy(cannonBallInitialPosition);
      cannonballs.push(cannonball);
      scene.add(cannonball.mesh);
    }

    cannonballs.forEach((ball: CannonBall) => {
      ball.move();
    });
  }

  function shipWaveAnimation(x: number) {
    ship.rotation.z = (Math.sin(x * 0.03) + 0.7) / 10
  }

  function shipAnimation() {
    let step = 0;
    const direction = new Vector2(1, 0);
    const cannonballs: CannonBall[] = [];

    // Goes from 0 to 1
    let _acceleration = 0;

    return function () {
      shoot(direction, cannonballs);
      _acceleration = calculateAcceleration(_acceleration)
      shipWaveAnimation(step);
      shipMovementAnimation(direction, _acceleration)
      step++;
    }
  }

  const AnimatedShip = new Animated(shipAnimation(), 'ship-animation');
  scene.add(ship);

  return { ship, shipAnimation: AnimatedShip };
}

export default loadShipAsync;