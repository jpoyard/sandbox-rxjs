import { EventCanvasObject } from './event-object';

export class CompleteEvent implements EventCanvasObject {
  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public lineWidth: number,
    public size: number,
    public color: string = 'black'
  ) {}

  render(): EventCanvasObject {
    this.context.beginPath();
    this.context.moveTo(this.x + this.size / 2, this.y);
    this.context.lineTo(this.x + this.size / 2, this.y + this.size);
    this.context.closePath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.lineWidth;
    this.context.stroke();
    return this;
  }
}
