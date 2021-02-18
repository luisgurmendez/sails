import { Vector2 } from "three";
import CannonBall from "../cannonBall/cannonBall";

abstract class Cannon {
  constructor() { }
  abstract isRecharging(): boolean;
  abstract startRecharge(): void;
  abstract fire(direction: Vector2): CannonBall | undefined;

  // TODO: Should be moved to a common interface
  abstract step(dt: number): void;
}

export default Cannon;