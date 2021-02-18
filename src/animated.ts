import { camera, renderer, scene } from "./core";

type AnimationCb = () => void;

interface Animate {
  animate: AnimationCb;
}

class Animated implements Animate {

  private _a: AnimationCb;
  private id: string;

  public animate() {
    requestAnimationFrame(this.animate);
    this._a();
    renderer.render(scene, camera);
  }

  public getId() { return this.id };

  constructor(_animate: AnimationCb, id: string) {
    this._a = _animate;
    this.id = id;
    this.animate = this.animate.bind(this);
    this.getId = this.getId.bind(this);
  }
}

export default Animated;
