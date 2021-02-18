import Animated from "./animated";

class RendererMgr {
  private animateds: Animated[];

  constructor() {
    this.animateds = [];
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.render = this.render.bind(this);
  }

  public add(animated: Animated) {
    this.animateds.push(animated);
  }

  public get(id: string) {
    const objectIndex = this.animateds.findIndex(a => a.getId() === id);
    if (objectIndex !== -1) {
      return this.animateds[objectIndex];
    }
    return undefined;
  }

  public remove(id: string) {
    const animatedIndex = this.animateds.findIndex(a => a.getId() === id);
    if (animatedIndex !== -1) {
      this.animateds.splice(animatedIndex, 1);
    }
  }

  public render() {
    for (const a of this.animateds) {
      a.animate();
    }
  }
}

export default RendererMgr;