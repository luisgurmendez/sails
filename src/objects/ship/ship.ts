import { Object3D, Vector2 } from "three";
import CannonBall from "../cannonBall/cannonBall";
import { ShipCannons, ShipSize, ShipSide } from "./types";
import Stepable from '../Stepable';
import Enviorment from "../../enviorment/enviorment";
import Sails from './sails';
import BaseObject from '../BaseObject'
import { angleTo } from '../../utils/math'

abstract class Ship implements Stepable, BaseObject {

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

    // TODO: we should define a sails.area / mass ratio that can not be exceeded
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
      cannonGroup && cannonGroup.getCannon().step(enviorment, t, dt);
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
    // f = fw(wind force) + fd(drag force) - fr(resistancce force)

    // fr = viscous resistance (Rv) + wave making resistance(Rw) + air resistance(Raa). (https://www.usna.edu/NAOE/_files/documents/Courses/EN400/02.07%20Chapter%207.pdf) pg. 7-8
    // Lets assume that the air resistance is = 0
    // fr = Rv + Rw + 0.
    // Rv = f(water viscosity, speed, wattered ship area)
    // Rw = f(beam to length ratio, hull shape, froude number)
    // Since the formulas describe a parabolic shape with increasing ship speed we will simplify the fr(resitance force) with the shape of
    // fr = a*v^2 + b*v
    // Where ka and kb are constant

    // fw = wind preassure * Sails Area
    // fd = Water preassure * keel area + air preassure * exposed boat area.
    // wind preassure (simplified) = wp = air mass density (kg/m^3) * wind speed^2(m/s^2)
    // We will assume that the air density is constant and 1.225
    // Sails Area = sa = the proyected area of the rectangled sail in the plane of the wind = sails.width * cos(angle in which the wind comes with respect to the boats direction) * sails.height


    const airMassDensity = 1.225;

    const wind = enviorment.wind.getWindAtPosition(this.object.position);
    const windPreassure = airMassDensity * Math.pow(wind.speed, 2);

    const angleBetweenWindDirectionAndShipDirection = angleTo(this.direction, wind.direction);
    // To avoid having negative acceleration due to wind preassure opposite to the sails, let use the max function,
    let proyectedSailsAreaInWindsDirection = this.sails.width * Math.max(Math.cos(angleBetweenWindDirectionAndShipDirection), 0) * this.sails.height;

    if (!this.sails.open) {
      proyectedSailsAreaInWindsDirection = 0;
    }

    const dragForce = 0;
    const windForce = windPreassure * proyectedSailsAreaInWindsDirection;

    const resistanceCoefA = 30;
    const resistanceCoefB = 1;
    const resistanceForce = resistanceCoefA * Math.pow(this.speed, 2) + resistanceCoefB * this.speed;

    const totalForce = windForce + dragForce - resistanceForce;

    const acceleration = totalForce / this.mass;
    return acceleration;
  }

  private calculateSpeed(dt: number) {
    this.speed += this.acceleration * dt;
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
