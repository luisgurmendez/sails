import { Mesh, Object3D } from "three";
import Ship from "./ship";
import { ShipCannons, ShipSize, ShipSide } from "./types";
import SimpleCannon from '../cannon/simpleCannon';
import CannonGroup from "../cannon/cannonGroup";

class SimpleShip extends Ship {
  constructor(mesh: Object3D) {
    const size: ShipSize = {
      [ShipSide.BOW]: 5,
      [ShipSide.STARBOARD]: 10,
      [ShipSide.STERN]: 5,
      [ShipSide.PORT]: 10
    }

    // Create cannon groups.
    const portCannonGroup = new CannonGroup(4, new SimpleCannon(), size[ShipSide.PORT], ShipSide.PORT);
    const starboardCannonGroup = new CannonGroup(2, new SimpleCannon(), size[ShipSide.STARBOARD], ShipSide.STARBOARD);
    const bowCannonGroup = new CannonGroup(3, new SimpleCannon(), size[ShipSide.BOW], ShipSide.BOW);
    const sternCannonGroup = new CannonGroup(1, new SimpleCannon(), size[ShipSide.STERN], ShipSide.STERN);

    const cannons: ShipCannons = {
      [ShipSide.PORT]: portCannonGroup,
      [ShipSide.STARBOARD]: starboardCannonGroup,
      [ShipSide.BOW]: bowCannonGroup,
      [ShipSide.STERN]: sternCannonGroup
    }

    //TODO: in kilograms
    const weight = 1000;

    super(mesh, size, weight, cannons, 15);
  }
}

export default SimpleShip;