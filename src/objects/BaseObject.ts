import { Object3D } from "three/src/core/Object3D";

interface BaseObject {
  object: Object3D;
  type: string;
  shouldBeRemoved: boolean;
};

export default BaseObject;