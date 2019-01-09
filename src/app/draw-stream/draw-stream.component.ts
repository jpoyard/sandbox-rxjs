import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  EndEventGraphicObject,
  ErrorEventGraphicObject,
  NextEventGraphicObject
} from './events';

@Component({
  selector: 'app-draw-stream',
  template: `
    <canvas #streamAnimation id="streamAnimation"></canvas>
  `,
  styles: [
    `
      :host {
        height: 50px;
        position: absolute;
        left: 0;
        right: 0;
      }
    `
  ]
})
export class DrawStreamComponent implements AfterViewInit, OnInit {
  private intervalID: any;

  @ViewChild('streamAnimation') canvasStreamAnimation: ElementRef;
  public raf;
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public events = [];
  public vx = 1;

  public objectSize: number;
  public lineWidth: number;

  constructor(public eltRef: ElementRef, public ngZone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.canvas = this.canvasStreamAnimation.nativeElement as HTMLCanvasElement;
    this.canvas.width = this.eltRef.nativeElement.offsetWidth;
    this.canvas.height = this.eltRef.nativeElement.offsetHeight;
    this.context = this.canvas.getContext('2d');

    this.objectSize = this.canvas.height / 4;
    this.lineWidth = 2;

    /** tmp */

    this.canvas.addEventListener('mouseover', e => {
      this.intervalID = setInterval(() => {
        this.addEvent({ type: 'next' });
      }, 1000);
      this.render();
    });

    this.canvas.addEventListener('mouseout', e => {
      clearInterval(this.intervalID);
      this.ngZone.runOutsideAngular(() => {
        window.cancelAnimationFrame(this.raf);
      });
    });

    this.canvas.addEventListener('click', e => {
      this.addEvent({ type: 'next' });
    });
    /** tmp */
  }

  public render(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw line
    this.context.beginPath();
    this.context.moveTo(0, this.canvas.height / 2);
    this.context.lineTo(this.canvas.width, this.canvas.height / 2);
    this.context.closePath();
    this.context.strokeStyle = 'black';
    this.context.lineWidth = this.lineWidth;
    this.context.stroke();

    // Draw events
    this.events = this.events.filter(event => {
      event.x -= this.vx;
      event.render();
      return !(event.x + event.size < 0);
    });

    // Draw arrow
    this.context.beginPath();
    this.context.moveTo(this.canvas.width, this.canvas.height / 2);
    this.context.lineTo(
      this.canvas.width - this.objectSize,
      this.canvas.height / 2 + this.objectSize
    );
    this.context.lineTo(
      this.canvas.width - this.objectSize,
      this.canvas.height / 2 - this.objectSize
    );
    this.context.closePath();
    this.context.fillStyle = 'black';
    this.context.fill();

    // Wait next tick
    if (this.events.length > 0) {
      this.ngZone.runOutsideAngular(() => {
        this.raf = window.requestAnimationFrame(this.render.bind(this));
      });
    }
  }

  public addEvent({
    type,
    color = 'blue'
  }: {
    type: 'next' | 'error' | 'end';
    color?: string;
  }) {
    // TODO: static position
    const x = this.canvas.width + this.objectSize;
    const y = this.canvas.height / 2;

    switch (type) {
      case 'next':
        this.events.push(
          new NextEventGraphicObject(
            this.context,
            x,
            this.canvas.height / 2,
            this.objectSize,
            color
          ).render()
        );
        break;
      case 'end':
        this.events.push(
          new EndEventGraphicObject(
            this.context,
            x,
            y + this.objectSize / 2,
            this.lineWidth,
            this.objectSize
          ).render()
        );
        break;
      case 'error':
        this.events.push(
          new ErrorEventGraphicObject(
            this.context,
            x,
            y + this.objectSize / 2,
            this.objectSize
          ).render()
        );
        break;
    }
  }
}
