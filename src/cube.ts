import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import { Mesh } from 'three/src/objects/Mesh';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial';

import { scene } from './core';
import Animated from './animated';

const geometry = new BoxGeometry();
const material = new MeshStandardMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
cube.castShadow = true;
cube.position.set(0, 2, 0)
scene.add(cube);

const animate = function () {
  cube.rotation.x += 0.03;
  cube.rotation.y += 0.01;
};

const animatedCube = new Animated(animate, 'cube');
animatedCube.animate.bind(animatedCube);

export default animatedCube;