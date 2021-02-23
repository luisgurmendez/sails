import Enviorment from "../enviorment/enviorment";
import { Camera, Clock, Color, PCFSoftShadowMap, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Keyboard from "../utils/Keyboard";
import Stats from 'stats.js';
import BaseObject from "../objects/BaseObject";
import Stepable, { isStepable } from "../objects/Stepable";

class Game {

  public objects: (BaseObject | (BaseObject & Stepable))[];
  public enviorment: Enviorment;
  public clock: Clock;
  public scene: Scene;
  public camera: Camera;
  public renderer: WebGLRenderer;
  public orbitControls: OrbitControls;
  public stats: Stats;
  public pressedKeys: Keyboard;

  constructor() {
    this.objects = [];
    this.enviorment = new Enviorment();
    this.clock = new Clock();

    this.pressedKeys = new Keyboard()

    this.stats = new Stats();
    this.stats.showPanel(1);

    this.scene = new Scene();
    this.scene.background = new Color('#DEFEFF');

    this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(100, 100, 100);

    this.renderer = new WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.update();
    this.orbitControls.enableDamping = true;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.enviorment.init(this.scene);

    document.body.appendChild(this.renderer.domElement);
    document.body.appendChild(this.stats.dom);
  }

  loop = (update: () => void) => {
    return () => {
      this.beforeUpdate();
      update();
      this.afterUpdate();
      requestAnimationFrame(this.loop(update));
    }
  }

  public addObject(object: BaseObject) {
    this.objects.push(object);
    this.scene.add(object.object);
  }

  public step() {
    const dt = this.clock.getDelta();
    const t = this.clock.getElapsedTime();

    this.objects.forEach(object => {
      if (isStepable(object)) {
        object.step(this.enviorment, t, dt);
      }
    })
  }

  private beforeUpdate() {
    this.stats.begin()
  }

  private afterUpdate() {
    this.renderer.render(this.scene, this.camera);
    this.orbitControls.update();
    this.stats.end();
    this.objects.forEach(o => {
      if (o.shouldBeRemoved) {
        this.scene.remove(o.object);
      }
    })
  }
}


export default Game;