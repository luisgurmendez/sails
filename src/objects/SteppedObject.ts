import { BaseObject } from './BaseObject';
import Enviorment from '../enviorment/enviorment';

interface SteppedObject extends BaseObject {
  step(enviorment: Enviorment, time: number, deltaTime: number): void;
}

export default SteppedObject;