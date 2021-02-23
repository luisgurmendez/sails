import { BaseObject } from './BaseObject';
import MovingObject from './movingObject';

export type AllObject = BaseObject | MovingObject

export function isMovingObject(obj: AllObject): obj is MovingObject {
  return false
}
