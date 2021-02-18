interface MovingObject {
  step(time: number, deltaTime: number): void;
}

export default MovingObject;