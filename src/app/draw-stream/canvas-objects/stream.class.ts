import { CanvasObject } from './canvas-object';
import {
  EventCanvasObject,
  CompleteEvent,
  ErrorEvent,
  NextEvent
} from './events';
import { Timeline } from './timeline.class';
import { Observer } from 'rxjs';

const SPEED_X = 1;

export class StreamObject implements CanvasObject, Observer<string> {
  events: EventCanvasObject[] = [];

  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public lineWidth: number,
    public color: string
  ) {}

  next(value: any) {
    this.events.push(
      new NextEvent(
        this.context,
        this.width + this.height,
        this.y,
        this.height,
        value.color,
        value
      ).render()
    );
  }

  error(err: any) {
    this.events.push(
      new ErrorEvent(
        this.context,
        this.width + this.height,
        this.y + this.height / 2,
        this.height
      ).render()
    );
  }

  complete() {
    this.events.push(
      new CompleteEvent(
        this.context,
        this.width + this.height,
        this.y - this.height,
        this.lineWidth,
        this.height * 2
      ).render()
    );
  }

  render(): CanvasObject {
    // Draw Timeline
    new Timeline(
      this.context,
      this.x,
      this.y,
      this.width,
      this.height,
      this.lineWidth
    ).render();

    // Draw events
    this.events = this.events.filter(event => {
      event.x -= SPEED_X;
      event.render();
      return !(event.x < 0);
    });
    return this;
  }
}
