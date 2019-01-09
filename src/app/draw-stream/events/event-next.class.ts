import { EventGraphicObject } from './event';

export class NextEventGraphicObject implements EventGraphicObject {
  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public size: number,
    public color: string
  ) {}

  render(): EventGraphicObject {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fillStyle = this.color;
    this.context.fill();
    return this;
  }
}
