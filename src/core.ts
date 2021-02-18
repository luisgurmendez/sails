import { Color } from 'three/src/math/Color';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { HemisphereLight } from 'three/src/lights/HemisphereLight';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { Scene } from 'three/src/scenes/Scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Ocean from './enviorment/ocean';

import { PCFSoftShadowMap } from 'three/src/constants';
import { CameraHelper } from 'three/src/helpers/CameraHelper';
import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera';

const scene = new Scene();
scene.background = new Color('#DEFEFF');
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const hemispherelight = new HemisphereLight(0xf6e86d, 0x404040, 0.4);
hemispherelight.position.set(5, 40, 5);
scene.add(hemispherelight);

const directionalLight = new DirectionalLight(0xFFFFFF, 1);
directionalLight.position.set(0, 100, 50);
directionalLight.castShadow = true;
directionalLight.shadow.camera = new OrthographicCamera(-400, 400, 400, -400, 0.5, 301);
scene.add(directionalLight);

//Create a helper for the shadow camera (optional)
// const directionaLightCamHelper = new CameraHelper(directionalLight.shadow.camera);
// scene.add(directionaLightCamHelper);

const ocean = new Ocean();
scene.add(ocean.object);

const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;

(function initializeRenderer() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(100, 100, 100);
  controls.update();
})()

export { scene, camera, renderer };