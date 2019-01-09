import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  NgZone
} from '@angular/core';

import { Observable } from 'rxjs';
import { tap, share, filter, count, takeWhile } from 'rxjs/operators';

import { StreamObject } from './canvas-objects';

@Component({
  selector: 'app-draw-stream',
  template: `
    <canvas #streamAnimation id="streamAnimation"></canvas>
  `,
  styles: [
    `
      :host {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    `
  ]
})
export class DrawStreamComponent implements AfterViewInit, OnInit {
  @ViewChild('streamAnimation') canvasStreamAnimation: ElementRef;
  public raf;
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  public objectSize: number;
  public lineWidth: number;

  public observable = Observable.create(observer => {
    const values = ['blue', 'yellow', 'red', 'green', 'brown', 'yellow'];
    values.forEach((color, index) => {
      setTimeout(() => observer.next({ value: index, color }), index * 1000);
    });
    setTimeout(() => observer.complete(), values.length * 1000);
  }); // .pipe(share());

  constructor(public eltRef: ElementRef, public ngZone: NgZone) {}

  ngOnInit() {}

  streamObjs: StreamObject[];

  ngAfterViewInit(): void {
    this.canvas = this.canvasStreamAnimation.nativeElement as HTMLCanvasElement;
    this.canvas.width = this.eltRef.nativeElement.offsetWidth;
    this.canvas.height = this.eltRef.nativeElement.offsetHeight;
    this.context = this.canvas.getContext('2d');

    this.objectSize = this.canvas.height / 40;
    this.lineWidth = 2;

    const observables = [
      this.observable,
      this.observable.pipe(
        filter((data: { color: string }) => data.color === 'yellow')
      ),
      this.observable.pipe(
        count((data: { color: string }) => data.color === 'yellow')
      ),
      this.observable.pipe(
        takeWhile((data: { color: string }) => data.color !== 'brown')
      )
    ];

    const size = observables.length;
    const interval = this.canvas.height / (size + 1);

    this.streamObjs = Array.from(Array(size).keys()).map(
      index =>
        new StreamObject(
          this.context,
          0,
          interval * (index + 1),
          this.canvas.width,
          this.objectSize,
          this.lineWidth,
          'black'
        ).render() as StreamObject
    );

    this.canvas.addEventListener('mouseenter', e => {
      observables.forEach((observable, index) => {
        observable.subscribe(this.streamObjs[index]);
      });
    });

    // Wait next tick
    this.ngZone.runOutsideAngular(() => {
      this.raf = window.requestAnimationFrame(this.render.bind(this));
    });

    this.canvas.addEventListener('mouseout', e => {
      this.ngZone.runOutsideAngular(() => {
        window.cancelAnimationFrame(this.raf);
      });
    });
  }

  render(): void {
    // Clean canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.streamObjs.forEach(streamObj => streamObj.render());

    // Wait next tick
    this.ngZone.runOutsideAngular(() => {
      this.raf = window.requestAnimationFrame(this.render.bind(this));
    });
  }
}
