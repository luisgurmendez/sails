import { Vector2, Vector3 } from "three";

// Here the Vector3 represents the direction and the z value represents the wind speed.
interface WindUnit {
  direction: Vector2;
  speed: number;
}

// There is a direct mapping between the worlds (x, y) coordinates and (i,j) array indexes.
type WindMap = WindUnit[][];

class Wind {

  private windMap: WindMap;

  constructor() {
    this.windMap = [];
    // TODO: get from constructor
    const mapSize = 1000;

    for (let x = 0; x < mapSize; x++) {
      for (let y = 0; y < mapSize; y++) {

        if (this.windMap[x] === undefined) {
          this.windMap[x] = [];
        }
        // TODO: make this map by using some kind of noise
        this.windMap[x][y] = {
          speed: 10,
          direction: new Vector2(1, 0)
        }
      }
    }
  }

  getWindAtPosition(position: Vector3): WindUnit {

    // TODO: negative position values?
    const x = Math.round(position.x);
    const y = Math.round(position.z);

    if (this.windMap[x] !== undefined && x > 0 && y > 0) {
      return this.windMap[x][y]
    }
    return {
      speed: 10,
      direction: new Vector2(1, 0)
    }
  }
}

export default Wind;