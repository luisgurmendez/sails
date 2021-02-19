import { Object3D } from 'three/src/core/Object3D';
import { HemisphereLight } from 'three/src/lights/HemisphereLight';

class Daylight {

  object: Object3D;

  constructor() {
    const daylight = new HemisphereLight(0xf6e86d, 0x404040, 0.4);
    daylight.position.set(5, 40, 5);
    this.object = daylight;
  }

}

export default Daylight;