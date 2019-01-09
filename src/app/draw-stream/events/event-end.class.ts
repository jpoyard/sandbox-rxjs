import { EventGraphicObject } from './event';

export class EndEventGraphicObject implements EventGraphicObject {
  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public lineWidth: number,
    public height: number,
    public color: string = 'black'
  ) {}

  render(): EventGraphicObject {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x, this.y + this.height);
    this.context.closePath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.lineWidth;
    this.context.stroke();
    return this;
  }
}
