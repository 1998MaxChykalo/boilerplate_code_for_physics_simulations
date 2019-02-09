export default class Vector {
  private epsilon = 0.001;
  public x: number;
  public y: number;
  public z: number;
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  public normalize(): Vector {
    let magnitude = this.magnitude();
    if (magnitude < this.epsilon) {
      magnitude = 1;
    }
    this.x /= magnitude;
    this.y /= magnitude;
    this.z /= magnitude;
    if (Math.abs(this.x) < this.epsilon) this.x = 0;
    if (Math.abs(this.y) < this.epsilon) this.y = 0;
    if (Math.abs(this.z) < this.epsilon) this.z = 0;
    return this;
  }
  public reverse(): Vector {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  public add(v: Vector): Vector {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  public Subtract(v: Vector): Vector {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }
  public multiply(multiplier: number): Vector {
    this.x *= multiplier;
    this.y *= multiplier;
    this.z *= multiplier;
    return this;
  }
  public divide(denominator: number): Vector {
    this.x /= denominator;
    this.y /= denominator;
    this.z /= denominator;
    return this;
  }
  public negative(): Vector {
    return new Vector(-this.x, -this.y, -this.z);
  }
  public static Add(v1: Vector, v2: Vector): Vector {
    let x = v1.x + v2.x;
    let y = v1.y + v2.y;
    let z = v1.z + v2.z;
    return new Vector(x, y, z);
  }
  public static Subtract(v1: Vector, v2: Vector): Vector {
    let x = v1.x - v2.x;
    let y = v1.y - v2.y;
    let z = v1.z - v2.z;
    return new Vector(x, y, z);
  }
  public static Multiply(u: Vector, s: number | Vector) {
    if (typeof s === 'number')
      return new Vector(u.x * s, u.y * s, u.z * s);
    else
      return new Vector(u.x * s.x, u.y * s.y, u.z * s.z);
  }
  public static Divide(u: Vector, s: number) {
    return new Vector(u.x / s, u.y / s, u.z / s);
  }
  public static CrossProduct(u: Vector, v: Vector): Vector {
    const x = u.y * v.z - u.z * v.y,
      y = -u.x * v.z + u.z * v.x,
      z = u.x * v.y - u.y * v.x;
    return new Vector(x, y, z);
  }

  public static TripleScalarProduct(u: Vector, v: Vector, w = new Vector()) {
    return ((u.x * (v.y * w.z - v.z * w.y)) +
      (u.y * (-v.x * w.z + v.z * w.x)) +
      (u.z * (v.x * w.y - v.y * w.x)));
  }

  public static Normalize(u: Vector) {
    const newVector = new Vector(u.x, u.y, u.z);
    let magnitude = newVector.magnitude();
    if (magnitude < newVector.epsilon) {
      magnitude = 1;
    }
    newVector.x /= magnitude;
    newVector.y /= magnitude;
    newVector.z /= magnitude;
    if (Math.abs(newVector.x) < newVector.epsilon) newVector.x = 0;
    if (Math.abs(newVector.y) < newVector.epsilon) newVector.y = 0;
    if (Math.abs(newVector.z) < newVector.epsilon) newVector.z = 0;
    return newVector;
  }

  public static DotProduct(u: Vector, v: Vector): number {
    return (u.x * v.x + u.y * v.y + u.z * v.z);
  }

}