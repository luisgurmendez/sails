import { Vector2 } from "three/src/math/Vector2";

export function angleTo(v1: Vector2, v2: Vector2) {
  const dot = v1.dot(v2);
  const mv1 = v1.length();
  const mv2 = v2.length();

  return Math.acos(dot / (mv1 * mv2));
}