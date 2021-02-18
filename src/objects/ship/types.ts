import CannonGroup from "../cannon/cannonGroup";


export enum ShipSide {
  BOW = 'bow',
  STERN = 'stern',
  PORT = 'port',
  STARBOARD = 'starboard'
}

export interface ShipSize {
  [ShipSide.BOW]: number;
  [ShipSide.STERN]: number;
  [ShipSide.PORT]: number;
  [ShipSide.STARBOARD]: number;
}

export interface ShipCannons {
  [ShipSide.BOW]?: CannonGroup
  [ShipSide.STERN]?: CannonGroup;
  [ShipSide.PORT]?: CannonGroup;
  [ShipSide.STARBOARD]?: CannonGroup;
}