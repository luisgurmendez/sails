import { Object3D, Vector2 } from "three";
import CannonBall from "../cannonBall/cannonBall";
import { ShipCannons, ShipSize, ShipSide } from "./types";
import SteppedObject from '../SteppedObject';
import Enviorment from "../../enviorment/enviorment";
import Sails from './sails';
import { GRAVITY } from '../../utils/phyisics';

abstract class Ship implements SteppedObject {

  static ROTATE_LEFT = 'left';
  static ROTATE_RIGHT = 'right';

  public direction: Vector2;
  public acceleration: number;
  public speed: number;

  // TODO: public rotationSpeed: number;

  public object: Object3D;

  public size: ShipSize;
  public weight: number;

  public maxSpeed: number;

  public type: string;
  public shouldBeRemoved = false;

  public cannons: ShipCannons;

  public sails: Sails;
  public mass: number;

  constructor(object: Object3D, size: ShipSize, weight: number, cannons: ShipCannons, maxSpeed: number) {
    this.type = 'Ship';
    this.direction = new Vector2(1, 0);
    this.speed = 0;
    this.acceleration = 0;
    this.object = object;
    this.size = size;
    this.weight = weight;
    this.cannons = cannons;
    this.maxSpeed = maxSpeed;
    this.sails = new Sails(10, 5);
    this.mass = 1000;
  }

  shoot(side: ShipSide): CannonBall[] {
    const cannonGroup = this.cannons[side];
    if (cannonGroup !== undefined) {
      return cannonGroup.fire(this.direction, this.object.position);
    }
    return []
  }

  rotate(side: 'left' | 'right') {
    const rotationDelta = (Math.PI / 360) * this.speed;
    const minRotation = (Math.PI / 360) / 2;
    // TODO: fix this
    const rotationAngle = this.isMoving() ? minRotation : rotationDelta + minRotation

    if (side === 'left') {
      this.rotateLeft(rotationAngle);
    } else {
      this.rotateRight(rotationAngle);
    }
  }

  move = (dt: number) => {
    if (this.acceleration !== 0) {
      // Move ship in the x and z axis depending on the direction
      const velocity = new Vector2(this.direction.x * this.speed * dt, this.direction.y * this.speed * dt);
      const dx = this.object.position.x + velocity.x
      const dz = this.object.position.z + velocity.y

      this.object.position.setX(dx);
      this.object.position.setZ(dz);
    }
  }

  step = (enviorment: Enviorment, t: number, dt: number) => {
    this.acceleration = this.calculateAcceleration(enviorment);
    this.calculateSpeed(dt);
    this.waveMovement(t);
    this.move(dt);
    // this.desAccelerate(); // TODO: use calculateAcceleration
    Object.keys(this.cannons).forEach(c => {
      const cannon: ShipSide = c as ShipSide;
      const cannonGroup = this.cannons[cannon];
      cannonGroup && cannonGroup.getCannon().step(dt);
    })
  }

  openSails() {
    this.sails.open = true;
  }

  closeSails() {
    this.sails.open = false;
  }

  private calculateAcceleration(enviorment: Enviorment) {
    // f=m*a --> a = f/m;
    // f = fw(wind force) + fd(drag force) - fr(friction force)
    // fw = wind preassure * Sails Area
    // fd = Water preassure * keel area + air preassure * exposed boat area.
    // wind preassure (simplified) = wp = air mass density (kg/m^3) * wind speed^2(m/s^2)
    // We will assume that the air density is constant and 1.225
    // Sails Area = sa = the proyected area of the rectangled sail in the plane of the wind = sails.width * cos(angle in which the wind comes with respect to the boats direction) * sails.height


    const airMassDensity = 1.225;


    const wind = enviorment.wind.getWindAtPosition(this.object.position);
    const windPreassure = airMassDensity * Math.pow(wind.speed, 2);

    // const angleBetweenWindDirectionAndShipDirection = angleTo(this.direction, wind.direction);
    let proyectedSailsAreaInWindsDirection = 30 //this.sails.width * Math.cos(angleBetweenWindDirectionAndShipDirection) * this.sails.height;

    if (!this.sails.open) {
      proyectedSailsAreaInWindsDirection = 0;
    }

    const dragForce = 0;

    const shipsNormalForce = this.mass * GRAVITY;

    const waterShipFrictionCoeficcient = 0.2;
    const windForce = windPreassure * proyectedSailsAreaInWindsDirection;
    let frictionForce = shipsNormalForce * waterShipFrictionCoeficcient;
    if (!this.isMoving()) {
      frictionForce = 0
    }
    const totalForce = windForce + dragForce - frictionForce;
    const acceleration = totalForce / this.mass;
    return acceleration;
  }

  private calculateSpeed(dt: number) {
    this.speed += this.acceleration * dt;
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
  }

  // private desAccelerate() {
  //   if (this.isMoving()) {
  //     this.acceleration = -1;
  //   } else {
  //     this.acceleration = 0;
  //   }
  // }

  private isMoving() {
    const velocityThreshold = 0.01;
    return this.speed > velocityThreshold;
  }

  private rotateLeft(angle: number) {
    this.direction.rotateAround(new Vector2(), -angle);
    this.object.rotation.y += angle
  }

  private rotateRight(angle: number) {
    this.direction.rotateAround(new Vector2(), angle);
    this.object.rotation.y -= angle
  }

  private waveMovement(t: number) {
    // Almost 1 ocilation every 5 seg.
    // TODO: this should depend on the waves direction.
    this.object.rotation.z = (1 / 10) * Math.sin(t);
  }

}

export default Ship;




function angleTo(v1: Vector2, v2: Vector2) {
  const dot = v1.dot(v2);
  const mv1 = v1.length();
  const mv2 = v2.length();

  return Math.acos(dot / (mv1 * mv2));
}