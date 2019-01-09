import { EventGraphicObject } from './event';

export class ErrorEventGraphicObject implements EventGraphicObject {
  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public size: number,
    public color: string = 'black'
  ) {}

  render(): EventGraphicObject {
    this.context.beginPath();
    this.context.moveTo(this.x - this.size / 2, this.y);
    this.context.lineTo(this.x + this.size / 2, this.y + this.size);
    this.context.moveTo(this.x - this.size / 2, this.y + this.size);
    this.context.lineTo(this.x + this.size / 2, this.y);
    this.context.closePath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 2;
    this.context.stroke();
    return this;
  }
}
