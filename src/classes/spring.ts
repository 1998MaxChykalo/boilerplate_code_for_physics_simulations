import { context, Objects } from "../constants";

export default class Spring {
  end1: number;
  end2: number;
  k: number;
  d: number;
  initialLength: number;

  public draw(): void {
    context.beginPath()
    context.lineWidth = 2;
    context.fillStyle = 'rgba(0, 0, 0, .1)';
    context.moveTo(Objects[this.end1].position.x, Objects[this.end1].position.y);
    context.lineTo(Objects[this.end2].position.x, Objects[this.end2].position.y);
    context.stroke();
    context.closePath()
  }
}