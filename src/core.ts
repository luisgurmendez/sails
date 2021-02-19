import { Color } from 'three/src/math/Color';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Scene } from 'three/src/scenes/Scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Ocean from './enviorment/ocean';
import Sun from './enviorment/daylight';
import Daylight from './enviorment/sun';

import { PCFSoftShadowMap } from 'three/src/constants';

const scene = new Scene();
scene.background = new Color('#DEFEFF');
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const sun = new Sun();
const daylight = new Daylight()
const ocean = new Ocean();

scene.add(sun.object);
scene.add(daylight.object)
scene.add(ocean.object);

const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
const controls = new OrbitControls(camera, renderer.domElement);
console.log(controls);
camera.position.set(100, 100, 100);
controls.update();
controls.enableDamping = true;

(function initializeRenderer() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
})()

export { scene, camera, renderer, controls };