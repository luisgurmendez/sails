import { Mesh } from 'three/src/objects/Mesh';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial';
import { DoubleSide } from 'three/src/constants';
import { SphereGeometry, Vector2 } from 'three';
import CannonBall from './cannonBall';

class SimpleCannonBall extends CannonBall {

  constructor(direction: Vector2) {

    const geometry = new SphereGeometry(0.5, 8, 8);
    const material = new MeshStandardMaterial({ color: 0x000000, side: DoubleSide });
    geometry.computeVertexNormals();
    material.flatShading = true;
    const cannonball = new Mesh(geometry, material);
    cannonball.castShadow = true;

    super(direction, cannonball, 50);
  }

}

export default SimpleCannonBall;