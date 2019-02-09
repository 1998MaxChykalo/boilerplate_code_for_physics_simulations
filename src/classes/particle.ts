import Vector from "../classes/vector";
import { DRAG_COEFFICIENT, AIR_DENSITY, WIND_SPEED, GRAVITY_ACCELERATION, context, WINDOW_WIDTH, WINDOW_HEIGHT, RADIUS, EPS, GROUND_PLANE, RESTITUTION, TIME_INTERVAL, NUM_OBSTACLES } from "../constants";
import { randomIntFromRange } from "../scripts/utils";

export default class Particle {
  public mass = 1;
  public position: Vector;
  public velocity: Vector;
  public forces: Vector;
  public radius: number;
  public gravity: Vector;
  public previousPosition = new Vector();
  public impactForces = new Vector();
  public collision: boolean = false;
  public length = 4;
  public isBlocked = false;
  public springs = new Vector();
  public color = `rgb(${randomIntFromRange(0, 255)},${randomIntFromRange(0, 255)},${randomIntFromRange(0, 255)})`;
  constructor(position?: Vector, velocity?: Vector, forces?: Vector) {
    this.position = position || new Vector();
    this.velocity = velocity || new Vector();
    this.forces = forces || new Vector();
    this.gravity = new Vector(0, this.mass * GRAVITY_ACCELERATION);
    this.radius = RADIUS;
  }
  public get speed(): number {
    return this.velocity.magnitude();
  }
  public calcLoads(): Particle { 
    if (!this.isBlocked) {
      this.forces.x = 0;
      this.forces.y = 0;
      this.forces.add(this.springs.divide(10));
      if (this.collision) {
        this.forces.add(this.impactForces);
      } else {
        this.forces.add(this.gravity);
        // air drag
        let vdrag = new Vector(),
          fdrag: number;
        vdrag.Subtract(this.velocity);
        vdrag.normalize();
        fdrag = .5 * AIR_DENSITY * this.speed * this.speed * (Math.PI * this.radius * this.radius) * DRAG_COEFFICIENT;
        vdrag.multiply(fdrag);
        this.forces.add(vdrag);
  
        //wind
        const wind = new Vector();
        wind.x = .5 * AIR_DENSITY * WIND_SPEED * WIND_SPEED * (Math.PI * this.radius * this.radius) * DRAG_COEFFICIENT;
        this.forces.add(wind);
      }
    }

    return this;
  }

  public update = (dt: number) => {
    let a = Vector.Divide(this.forces, this.mass),
      dv = Vector.Multiply(a, dt),
      ds;

    this.velocity.add(dv);
    ds = Vector.Multiply(this.velocity, dt);
    this.position.add(ds);
    // this.checkWindowBounds();
  }

  public checkWindowBounds() {
    // debugger;
    if (this.position.x > WINDOW_WIDTH) this.position.x = 0;
    if (this.position.x < 0) this.position.x = WINDOW_WIDTH;
    if (this.position.y > WINDOW_HEIGHT) this.position.y = 0;
    if (this.position.y < 0) this.position.y = WINDOW_HEIGHT
  }

  public draw = () => {
    context.beginPath()
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    context.fillStyle = this.color;
    context.fill()
    context.stroke();
    context.closePath()
  }
}

