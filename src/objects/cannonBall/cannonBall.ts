import Stepable from "../Stepable";
import { Object3D, Vector2 } from "three";
import Enviorment from "../../enviorment/enviorment";

abstract class CannonBall implements Stepable {

  public direction: Vector2;
  public object: Object3D;
  public type = 'CannonBall';
  public shouldBeRemoved = false;

  constructor(direction: Vector2, object: Object3D, range: number) {
    this.direction = direction;
    this.object = object;
  }

  public step(env: Enviorment, t: number, dt: number) {
    const speed = 1 //GRAVITY * dt;

    const horizontalSpeed = 1;

    this.object.position.x = this.object.position.x + this.direction.x * horizontalSpeed;
    this.object.position.z = this.object.position.z + this.direction.y * horizontalSpeed;

    // gravity
    this.object.position.y += -0.01 * speed

    if (this.object.position.y < 0) {
      this.shouldBeRemoved = true;
    }
  }

}

export default CannonBall;