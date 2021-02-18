import { Vector2 } from "three/src/math/Vector2";
import SimpleCannonBall from "../cannonBall/simpleCannonBall";
import Cannon from "./cannon";

class SimpleCannon implements Cannon {

  private charingDelta: number;

  constructor() {
    this.charingDelta = 0;
  }

  step(dt: number) {
    if (this.charingDelta > 0) {
      this.charingDelta -= dt;
    }

    if (this.charingDelta < 0) {
      this.charingDelta = 0;
    }
  }

  isRecharging() {
    return this.charingDelta !== 0;
  }

  startRecharge() {
    this.charingDelta = 1;
  }

  fire(direction: Vector2) {
    if (!this.isRecharging()) {
      return new SimpleCannonBall(direction);
    }
    return undefined;
  }
}


export default SimpleCannon;