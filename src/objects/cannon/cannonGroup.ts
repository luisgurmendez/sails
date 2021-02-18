import { Vector2 } from "three/src/math/Vector2";
import CannonBall from "../cannonBall/cannonBall";
import Cannon from './cannon';
import { ShipSide } from '../ship/types';
import { Vector3 } from "three/src/math/Vector3";

class CannonGroup {

  private count: number;
  private cannon: Cannon;
  private side: ShipSide;

  // This is the length in meters of the cannon group
  private length: number;

  constructor(count: number, cannon: Cannon, length: number, side: ShipSide) {
    this.count = count;
    this.cannon = cannon;
    this.length = length;
    this.side = side;
  }

  fire(shipDirection: Vector2, shipPosition: Vector3) {
    const cannonBalls: CannonBall[] = [];
    if (!this.cannon.isRecharging()) {


      const distanceBetweenCannons = this.length / this.count;

      //TODO: Suport STERN and BOW cannon ball positions
      const cannonBallInitialPosition = shipPosition.clone();

      // Put initial ball position in the ship's port
      cannonBallInitialPosition.x -= shipDirection.x * this.length / 2;
      cannonBallInitialPosition.z -= shipDirection.y * this.length / 2;

      // TODO: This should depent on the ships height?
      cannonBallInitialPosition.y += 2;

      const shootingDirection = this.getShootingDirection(shipDirection);

      // create a cannon ball for each cannon on that side, separated by the ships size
      for (let c = 0; c < this.count; c++) {

        const ball = this.cannon.fire(shootingDirection);
        if (ball) {
          ball.object.position.copy(cannonBallInitialPosition);

          // Move cannonBall position so that not all balls fire from the same point.
          // Ideally this should be evenly divided in the ships firing side.
          ball.object.position.x += shipDirection.x * (distanceBetweenCannons * c)
          ball.object.position.z += shipDirection.y * (distanceBetweenCannons * c)

          cannonBalls.push(ball);
        }
      }

      this.cannon.startRecharge();
    }

    return cannonBalls;
  }

  getCannon() {
    return this.cannon;
  }

  private getShootingDirection(shipDirection: Vector2): Vector2 {
    let ballDirection: Vector2;

    switch (this.side) {
      case ShipSide.BOW:
        ballDirection = shipDirection.clone();
        break;

      case ShipSide.STARBOARD:
        ballDirection = new Vector2(-shipDirection.y, shipDirection.x);
        break;

      case ShipSide.STERN:
        ballDirection = new Vector2(-shipDirection.x, -shipDirection.y);
        break;

      case ShipSide.PORT:
        ballDirection = new Vector2(shipDirection.y, -shipDirection.x);
        break;
    }

    return ballDirection;
  }

}

export default CannonGroup;