import { Object3D } from 'three/src/core/Object3D';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera';

class Sun {

  object: Object3D;

  constructor() {
    const sun = new DirectionalLight(0xFFFFFF, 1);
    sun.position.set(0, 100, 50);
    sun.castShadow = true;
    sun.shadow.camera = new OrthographicCamera(-400, 400, 400, -400, 0.5, 301);
    this.object = sun;

    //Create a helper for the shadow camera (optional)
    // const sunCamHelper = new CameraHelper(sun.shadow.camera);
    // scene.add(sunCamHelper);
  }

}

export default Sun;