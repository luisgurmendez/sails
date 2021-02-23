import SteppedObject from "objects/SteppedObject";
import { Object3D, Vector2 } from "three";

abstract class CannonBall implements SteppedObject {

  public direction: Vector2;
  public object: Object3D;
  public range: number;
  public type = 'CannonBall';
  public shouldBeRemoved = false;

  constructor(direction: Vector2, object: Object3D, range: number) {
    this.direction = direction;
    this.object = object;
    this.range = range;
  }

  public step() {
    const speed = 1;
    this.object.position.x = this.object.position.x + this.direction.x * speed;
    this.object.position.z = this.object.position.z + this.direction.y * speed;

    // gravity
    this.object.position.y -= 0.01 * speed

    if (this.object.position.y < 0) {
      this.shouldBeRemoved = true;
    }
  }

}

export default CannonBall;