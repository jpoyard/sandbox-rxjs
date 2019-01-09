import { EventCanvasObject } from './event-object';

export class NextEvent implements EventCanvasObject {
  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public size: number,
    public color: string,
    public data: any // { color: string; value: any } | number
  ) {
    console.info(data);
  }

  render(): EventCanvasObject {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fillStyle = this.color ? this.color : 'red';
    this.context.fill();

    this.context.font = `${this.size}px Comic Sans MS`;
    this.context.fillStyle = this.color === 'yellow' ? 'black' : 'white';
    this.context.textAlign = 'center';
    this.context.fillText(
      this.data.value === 0 || this.data.value ? this.data.value : this.data,
      this.x,
      this.y + this.size / 3
    );
    return this;
  }
}
