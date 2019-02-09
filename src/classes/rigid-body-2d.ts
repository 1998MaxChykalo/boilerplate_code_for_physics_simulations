import IRigidBody2d from "../interfaces/rigid-body-2d";
import Vector from './vector'
import { THRUST_FORCE, EPS, LINEAR_DRAG_COEFFICIENT, AIR_DENSITY, MAX_THRUST, MIN_THRUST, DTHRUST, STEERING_FORCE } from "../constants";
import { radiansToDegrees } from "../scripts/utils";

export class RigidBody2d implements IRigidBody2d {
  mass = 100;
  inertia = 500;
  inertiaInverse = 1 / this.inertia;
  position = new Vector();
  velocity = new Vector();
  velocityBody = new Vector();
  angularVelocity = new Vector();

  orientation = 0;
  forces = new Vector();
  moment = new Vector();
  thrustForce = THRUST_FORCE;
  leftThrust = new Vector();
  rightThrust = new Vector();
  width = 20;
  length = 40;
  height = 10;
  centerOfDragInBodyCoords = new Vector(-.25 * this.length);
  centerOfPropellerTrustInBodyCoords = new Vector(-.5 * this.length);
  leftThrusterInBodyCoords = new Vector(.5 * this.length, -.5 * this.width);
  rightThrusterInBodyCoords = new Vector(.5 * this.length, .5 * this.width);
  projectedArea = (this.length + this.width) / 2 * this.height;
  get speed(): number {
    return this.velocity.magnitude();
  };
  calcLoads(): void {
    const sumOfForces = new Vector(),
      sumOfMoments = new Vector(),
      // Define the thrust vector, which acts through the craft's center of gravity
      thrust = new Vector(1, 0, 0);
    thrust.multiply(this.thrustForce);
    this.forces = new Vector();
    this.moment = new Vector();

    // Calculate forces and moments in body space:
    let localVelocity = new Vector(),
      dragVector = new Vector();
    let resultant: Vector,
      vtmp = new Vector(),
      localSpeed = 0;
    // Calculate the aerodynamic drag force:
    // Calculate local velocity:
    // The local velocity includes the velocity due to
    // linear motion of the craft,
    // plus the velocity at each element
    // due to the rotation of the craft.

    // computes the linear velocity at the 
    // drag center by taking the vector cross
    // product of the angular velocity vector with
    // the position vector of the drag center
    vtmp = Vector.CrossProduct(this.angularVelocity, this.centerOfDragInBodyCoords);
    localVelocity = Vector.Add(this.velocityBody, vtmp);

    // Calculate local air speed
    localSpeed = localVelocity.magnitude();

    // Find the direction in which drag will act.
    // Drag always acts in line with the relative
    // velocity but in the opposing direction
    if (localSpeed > EPS) {
      dragVector = Vector.Normalize(this.velocity).negative();

      // Determine the resultant force on the element
      let tmp = .5 * AIR_DENSITY * localSpeed * localSpeed * this.projectedArea;
      resultant = Vector.Multiply(dragVector, LINEAR_DRAG_COEFFICIENT * tmp);

      // Keep a running total of these resultant force
      sumOfForces.add(resultant);

      // Calculate the moment about the CG
      // and keep a running total of these moments
      vtmp = Vector.CrossProduct(this.centerOfDragInBodyCoords, resultant);
      sumOfMoments.add(vtmp);
    }

    // Calculate the Port & Starboard bow thruster forces:
    // Keep a running total of these resultant forces
    sumOfForces.add(this.leftThrust);

    // Calculate the moment about the CG of this element's force
    // and keep a running total of these moments (total moment)
    vtmp = Vector.CrossProduct(this.leftThrusterInBodyCoords, this.leftThrust);
    sumOfMoments.add(vtmp);

    sumOfForces.add(this.rightThrust);

    vtmp = Vector.CrossProduct(this.rightThrusterInBodyCoords, this.rightThrust);
    sumOfMoments.add(vtmp);

    // Now add the propulsion thrust
    sumOfForces.add(thrust); // no moment since line of action is through CG

    // Convert forces from model space to earth space
    this.forces = this.rotate2d(this.orientation, sumOfForces);

    this.moment.add(sumOfMoments);
  }
  updateBodyEuler(dt: number): void {
    let a: Vector, dv: Vector, ds: Vector, angularAcceleration: number, dAngularVelocity: number, dr: number;

    // Calculate forces and moments:
    this.calcLoads();

    // Integrate linear equation of motion:
    a = Vector.Divide(this.forces, this.mass);
    dv = Vector.Multiply(a, dt);
    this.velocity.add(dv);

    ds = Vector.Multiply(this.velocity, dt);
    this.position.add(ds);

    // Integrate angular equation of motion:
    angularAcceleration = this.moment.z / this.inertia;

    dAngularVelocity = angularAcceleration * dt;

    this.angularVelocity.z += dAngularVelocity;

    dr = radiansToDegrees(this.angularVelocity.z * dt);
    this.orientation += dr;

    this.velocityBody = this.rotate2d(-this.orientation, this.velocity);

  }
  setThrusters(left: boolean, right: boolean): void {
    this.leftThrust.x = 0;
    this.rightThrust.x = 0;
    this.leftThrust.y = left ? STEERING_FORCE : 0;
    this.rightThrust.y = right ? -STEERING_FORCE : 0;
  }
  modulateThrust(up: boolean): void {
    const dT = up ? DTHRUST : -DTHRUST;
    this.thrustForce += dT;
    if (this.thrustForce > MAX_THRUST) this.thrustForce = MAX_THRUST;
    if (this.thrustForce < MIN_THRUST) this.thrustForce = MIN_THRUST;
  }

  // converts from local body coordinate system to XY coords
  public rotate2d(angle: number, u: Vector): Vector {
    let x = u.x * Math.cos(radiansToDegrees(-angle)) + u.y * Math.sin(radiansToDegrees(-angle)),
      y = -u.x * Math.sin(radiansToDegrees(-angle)) + u.y * Math.cos(radiansToDegrees(-angle));
    return new Vector(x, y, 0);
  }

}