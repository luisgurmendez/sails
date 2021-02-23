import Enviorment from "../../enviorment/enviorment";
import Stepable from "objects/Stepable";
import { Vector2 } from "three";
import CannonBall from "../cannonBall/cannonBall";

abstract class Cannon implements Stepable {
  public angle: number;
  constructor(angle: number) {
    this.angle = angle;
  }
  abstract isRecharging(): boolean;
  abstract startRecharge(): void;
  abstract fire(direction: Vector2): CannonBall | undefined;

  abstract step(env: Enviorment, t: number, dt: number): void;
}

export default Cannon;