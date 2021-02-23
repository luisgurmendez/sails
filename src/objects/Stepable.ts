import Enviorment from '../enviorment/enviorment';

interface Stepable {
  step(enviorment: Enviorment, time: number, deltaTime: number): void;
}

export function isStepable(object: any): object is Stepable {
  return typeof object === 'object' && object.step !== undefined;
}

export default Stepable;