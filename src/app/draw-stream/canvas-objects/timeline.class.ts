import { CanvasObject } from './canvas-object';

export class Timeline implements CanvasObject {
  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public lineWidth: number,
    public color: string = 'black'
  ) {}

  render(): CanvasObject {
    // Draw line
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.width, this.y);
    this.context.closePath();
    this.context.strokeStyle = 'black';
    this.context.lineWidth = this.lineWidth;
    this.context.stroke();

    // Draw arrow
    this.context.beginPath();
    this.context.moveTo(this.width, this.y);
    this.context.lineTo(this.width - this.height, this.y + this.height);
    this.context.lineTo(this.width - this.height, this.y - this.height);
    this.context.closePath();
    this.context.fillStyle = 'black';
    this.context.fill();
    return this;
  }
}
