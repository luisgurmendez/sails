import { Object3D, Vector2 } from "three";
import CannonBall from "../cannonBall/cannonBall";
import { ShipCannons, ShipSize, ShipSide } from "./types";
import MovingObject from '../movingObject';

abstract class Ship implements MovingObject {

  static ROTATE_LEFT = 'left';
  static ROTATE_RIGHT = 'right';

  public direction: Vector2;
  public acceleration: number;

  public object: Object3D;
  public size: ShipSize;

  public speed: number;
  public maxSpeed: number;

  // The type of cannon used in this ship.
  public cannons: ShipCannons;

  constructor(object: Object3D, size: ShipSize, cannons: ShipCannons, maxSpeed: number) {
    this.direction = new Vector2(1, 0);
    this.speed = 0;
    this.acceleration = 0;
    this.object = object;
    this.size = size;
    this.cannons = cannons;
    this.maxSpeed = maxSpeed;
  }

  shoot(side: ShipSide) {
    const cannonGroup = this.cannons[side];
    if (cannonGroup !== undefined) {
      return cannonGroup.fire(this.direction, this.object.position);
    }
    return []
  }

  // shoot(side: ShipSide): CannonBall[] {

  //   let ballDirection: Vector2;

  //   switch (side) {
  //     case ShipSide.BOW:
  //       ballDirection = this.direction.clone();
  //       break;

  //     case ShipSide.STARBOARD:
  //       ballDirection = new Vector2(this.direction.y, -this.direction.x);
  //       break;

  //     case ShipSide.STERN:
  //       ballDirection = new Vector2(-this.direction.y, -this.direction.x);
  //       break;

  //     case ShipSide.PORT:
  //       ballDirection = new Vector2(-this.direction.y, this.direction.x);
  //       break;
  //   }

  //   if (this.cannons[side] !== undefined && this.cannons[side]!.count !== 0) {

  //     const numOfCannonsInShootingSide = this.cannons[side]!.count;
  //     const cannonOfShootingSide = this.cannons[side]!.cannon;

  //     const distanceBetweenCannons = this.size[side] / numOfCannonsInShootingSide;
  //     const cannonBallInitialPosition = this.object.position.clone();


  //     // Put initial ball position in the ship's port
  //     cannonBallInitialPosition.x -= this.direction.x * this.size[side] / 2;
  //     cannonBallInitialPosition.z -= this.direction.y * this.size[side] / 2;

  //     // TODO: This should depent on the ships height?
  //     cannonBallInitialPosition.y += 2;

  //     const cannonBalls: CannonBall[] = [];
  //     // create a cannon ball for each cannon on that side, separated by the ships size
  //     for (let c = 0; c < this.cannons[side]!.count; c++) {

  //       // Fire!!
  //       const ball = cannonOfShootingSide.fire(ballDirection);

  //       if (ball) {
  //         console.log(this.direction);
  //         console.log(ballDirection);
  //         ball.object.position.copy(cannonBallInitialPosition);

  //         // Move cannonBall position so that not all balls fire from the same point.
  //         // Ideally this should be evenly divided in the ships firing side.

  //         ball.object.position.x += this.direction.x * (distanceBetweenCannons * c)
  //         ball.object.position.z += this.direction.y * (distanceBetweenCannons * c)


  //         cannonBalls.push(ball);
  //       }
  //     }

  //     cannonOfShootingSide.startRecharge();

  //     return cannonBalls;

  //   }

  //   return [];
  // }

  rotate(side: 'left' | 'right') {

    const rotationDelta = (Math.PI / 360) * this.speed;
    const minRotation = (Math.PI / 360) / 2;
    const rotationAngle = this.isMoving() ? minRotation : rotationDelta + minRotation

    if (side === 'left') {
      this.rotateLeft(rotationAngle);
    } else {
      this.rotateRight(rotationAngle);
    }
  }

  accelerate = () => {
    // console.log('accelerate')
    this.acceleration = 2;
  }

  move = (dt: number) => {

    if (this.acceleration !== 0) {
      // Move ship in the x and z axis depending on the direction

      const velocity = new Vector2(this.direction.x * this.speed * dt, this.direction.y * this.speed * dt);
      const dx = this.object.position.x + velocity.x
      const dz = this.object.position.z + velocity.y

      this.object.position.setX(dx);
      this.object.position.setZ(dz);
    }
  }

  step = (t: number, dt: number) => {
    this.calculateSpeed(dt);
    this.waveMovement(t);
    this.move(dt);
    this.desAccelerate();
    Object.keys(this.cannons).forEach(c => {
      const cannon: ShipSide = c as ShipSide;
      const cannonGroup = this.cannons[cannon];
      cannonGroup && cannonGroup.getCannon().step(dt);
    })
  }

  private calculateSpeed(dt: number) {
    this.speed += this.acceleration * dt;
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
  }

  private desAccelerate() {
    if (this.isMoving()) {
      this.acceleration = -1;
    } else {
      this.acceleration = 0;
    }
  }

  private isMoving() {
    const velocityThreshold = 0.01;
    return this.speed > velocityThreshold;
  }

  private rotateLeft(angle: number) {
    this.direction.rotateAround(new Vector2(), -angle);
    this.object.rotation.y += angle
  }

  private rotateRight(angle: number) {
    this.direction.rotateAround(new Vector2(), angle);
    this.object.rotation.y -= angle
  }

  private waveMovement(t: number) {
    const deltaMov = 0.001;
    this.object.rotation.z = (Math.sin(t * deltaMov) + 0.7) / 10;
  }

}

export default Ship;