import { TIME_INTERVAL, context, WINDOW_WIDTH, WINDOW_HEIGHT, canvas, Objects, NUM_OBJECTS, NUM_SPRINGS, Springs, SPRING_K, SPRING_D } from "../constants";
import Vector from "./vector";
import Particle from "./particle";
import Spring from "./spring";
export default class World {
  time = 0;
  isClicked = false;
  public update = (dt: number) => {
    let i = 0, f = 0, dl = 0, j = 0,
      pt1 = new Vector(),
      pt2 = new Vector(),
      r = new Vector(),
      F = new Vector(),
      v1 = new Vector(),
      v2 = new Vector(),
      vr = new Vector();

    for (i = 0; i < NUM_OBJECTS; i++) {
      Objects[i].calcLoads();
      Objects[i].update(dt);
      Objects[i].springs.x = 0;
      Objects[i].springs.y = 0;
      Objects[i].springs.y = 0;
    }
    for (i = 0; i < NUM_SPRINGS - 1; i++) {
      j = Springs[i].end1;
      pt1 = Objects[j].position;
      v1 = Objects[j].velocity;

      j = Springs[i].end2;
      pt2 = Objects[j].position;
      v2 = Objects[j].velocity;

      vr = Vector.Subtract(v2, v1);
      r = Vector.Subtract(pt2, pt1);
      dl = r.magnitude() - Springs[i].initialLength;
      f = Springs[i].k * dl;
      r.normalize();

      // F = (r*f) + (Springs[i].d*(vr*r))*r;
      F = Vector.Add(
        Vector.Multiply(r, f),
        Vector.Multiply(
          Vector.Multiply(
            Vector.Multiply(vr, r),
            Springs[i].d), r)
      );
      if (F.magnitude() > 100) {
        // debugger;
      }
      j = Springs[i].end1;
      Objects[j].springs.add(F);
      j = Springs[i].end2;
      Objects[j].springs.Subtract(F);
    }
  }
  public tick = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.update(TIME_INTERVAL);
    this.draw();
    requestAnimationFrame(this.tick);
  }
  public initialize() {
    document.addEventListener('mousedown', () => this.isClicked = true);
    document.addEventListener('mousemove', (e) => {
      if (this.isClicked) {
        Objects[NUM_OBJECTS - 1].position.x = e.x
        Objects[NUM_OBJECTS - 1].position.y = e.y
        this.draw();
      }
    });
    document.addEventListener('mouseup', () => this.isClicked = false);
    let r = new Vector(), i = 0;

    for (i = 0; i < NUM_OBJECTS; i++) {
      Objects[i] = new Particle();
    }

    for (i = 0; i < NUM_SPRINGS; i++) {
      Springs[i] = new Spring();
    }

    Objects[0].isBlocked = true;

    for (i = 0; i < NUM_OBJECTS; i++) {
      Objects[i].position.x = WINDOW_WIDTH / 2 + Objects[0].length * i;
      Objects[i].position.y = WINDOW_HEIGHT / 2;
    }

    for (i = 0; i < NUM_SPRINGS - 1; i++) {
      Springs[i].end1 = i;
      // if (i === NUM_SPRINGS - 1) {
      //   Springs[i].end2 = 0;
      //   r = Vector.Subtract(Objects[0].position, Objects[i].position);

      //   Springs[i].initialLength = r.magnitude();
      //   Springs[i].k = SPRING_K;
      //   Springs[i].d = SPRING_D;
      // } else {
      Springs[i].end2 = i + 1;
      r = Vector.Subtract(Objects[i + 1].position, Objects[i].position);

      Springs[i].initialLength = r.magnitude();
      Springs[i].k = SPRING_K;
      Springs[i].d = SPRING_D;
      // }
    }
    return true;

  }
  draw(): void {
    context.beginPath();
    for (let i = 0; i < NUM_OBJECTS; i++) {
      Objects[i].draw();
    }
    for (let i = 0; i < NUM_SPRINGS - 1; i++) {
      Springs[i].draw();
    }
    context.closePath();

  }
}