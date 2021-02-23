import { Object3D } from "three/src/core/Object3D";

//TODO: Does it even make sense to have a Base Object?

export interface BaseObject {
  object: Object3D;
  type: string;
  shouldBeRemoved: boolean;
};

