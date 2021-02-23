import { Vector2 } from "three/src/math/Vector2";

export function angleTo(v1: Vector2, v2: Vector2) {
  return Math.atan2(v1.y, v1.x) - Math.atan2(v2.y, v2.x);

}