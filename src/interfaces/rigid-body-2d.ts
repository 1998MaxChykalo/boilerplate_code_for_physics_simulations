import Vector from "../classes/vector";

export default interface IRigidBody2d {
  mass: number;
  inertia: number;
  inertiaInverse: number;
  position: Vector;
  velocity: Vector;
  velocityBody: Vector;
  angularVelocity: Vector;

  speed: number;
  orientation: number;

  forces: Vector;
  moment: Vector;

  thrustForce: number;
  leftThrust: Vector;
  rightThrust: Vector;

  width: number;
  length: number;
  height: number;

  centerOfDragInBodyCoords: Vector;
  centerOfPropellerTrustInBodyCoords: Vector;
  leftThrusterInBodyCoords: Vector;
  rightThrusterInBodyCoords: Vector;

  projectedArea: number;

  calcLoads(): void;
  updateBodyEuler(dt: number): void;
  setThrusters(p: boolean, s: boolean): void;
  modulateThrust(up: boolean): void;
};

