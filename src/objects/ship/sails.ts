class Sails {
  public open: boolean;
  public width: number;
  public height: number;

  constructor(w: number, h: number) {
    this.open = false;
    this.width = w;
    this.height = h;
  }

  area() {
    return this.width * this.height;
  }
}

export default Sails;