import { Object3D, Vector2 } from "three";

abstract class CannonBall {

  public direction: Vector2;
  public object: Object3D;
  public range: number;

  constructor(direction: Vector2, object: Object3D, range: number) {
    this.direction = direction;
    this.object = object;
    this.range = range;
  }

  public move() {
    const speed = 1;
    this.object.position.x = this.object.position.x + this.direction.x * speed;
    this.object.position.z = this.object.position.z + this.direction.y * speed;

    // gravity
    this.object.position.y -= 0.01 * speed
  }

}

export default CannonBall;