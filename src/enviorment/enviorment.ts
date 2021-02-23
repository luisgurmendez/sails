import Stepable from "../objects/Stepable";
import { Scene } from "three";
import Daylight from "./daylight";
import Ocean from "./ocean";
import Sun from "./sun";
import Wind from "./wind";

class Enviorment implements Stepable {

  public sun: Sun;
  public ocean: Ocean;
  public daylight: Daylight;
  public wind: Wind;

  constructor() {
    this.sun = new Sun();
    this.ocean = new Ocean();
    this.daylight = new Daylight();
    this.wind = new Wind();
  }

  init(scene: Scene) {
    scene.add(this.sun.object);
    scene.add(this.ocean.object);
    scene.add(this.daylight.object);
  }

  step() {

  }

}

export default Enviorment;