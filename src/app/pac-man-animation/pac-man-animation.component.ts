import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  NgZone
} from '@angular/core';
import { Sprite } from '../sprite.class';

@Component({
  selector: 'app-pac-man-animation',
  template: `
    <canvas #pacManAnimation id="pacManAnimation"></canvas>
  `,
  styles: []
})
export class PacManAnimationComponent implements AfterViewInit, OnInit {
  @ViewChild('pacManAnimation') canvaspacManAnimation: ElementRef;

  public context: CanvasRenderingContext2D;
  public coinImage: HTMLImageElement;
  public ghosts: Sprite[] = [];

  constructor(public ngZone: NgZone) {}

  ngOnInit() {
    this.coinImage = new Image(384, 240);
    this.coinImage.src = 'assets/images/pac-man-sprite.png';
  }

  ngAfterViewInit(): void {
    const canvas = this.canvaspacManAnimation
      .nativeElement as HTMLCanvasElement;
    canvas.width = 100;
    canvas.height = 100;
    this.context = canvas.getContext('2d');
    this.render();
  }

  public render() {
    // red
    this.ghosts.push(
      new Sprite({
        context: this.context,
        width: 22,
        height: 22,
        image: this.coinImage,
        destination: {
          size: { width: 22, height: 22 },
          position: { x: 0, y: 0 }
        },
        framePositions: Array.from(Array(8).keys()).map(value => ({
          x: value * (22 + 2),
          y: 144
        }))
      })
    );

    // pink
    this.ghosts.push(
      new Sprite({
        context: this.context,
        width: 22,
        height: 22,
        image: this.coinImage,
        destination: {
          size: { width: 22, height: 22 },
          position: { x: 22, y: 0 }
        },
        framePositions: Array.from(Array(8).keys()).map(value => ({
          x: value * (22 + 2),
          y: 192
        }))
      })
    );

    // blue
    this.ghosts.push(
      new Sprite({
        context: this.context,
        width: 22,
        height: 22,
        image: this.coinImage,
        destination: {
          size: { width: 22, height: 22 },
          position: { x: 0, y: 22 }
        },
        framePositions: Array.from(Array(8).keys()).map(value => ({
          x: 192 + value * (22 + 2),
          y: 192
        }))
      })
    );

    // yellow
    this.ghosts.push(
      new Sprite({
        context: this.context,
        width: 22,
        height: 22,
        image: this.coinImage,
        destination: {
          size: { width: 22, height: 22 },
          position: { x: 22, y: 22 }
        },
        framePositions: Array.from(Array(8).keys()).map(value => ({
          x: value * (22 + 2),
          y: 216
        }))
      })
    );

    // eyes
    this.ghosts.push(
      new Sprite({
        context: this.context,
        width: 22,
        height: 22,
        image: this.coinImage,
        destination: {
          size: { width: 22, height: 22 },
          position: { x: 0, y: 44 }
        },
        framePositions: Array.from(Array(8).keys()).map(value => ({
          x: 192 + value * (22 + 2),
          y: 216
        }))
      })
    );

    // Start the game loop as soon as the sprite sheet is loaded
    this.coinImage.addEventListener('load', this.gameLoop.bind(this));
  }

  public gameLoop() {
    this.ngZone.runOutsideAngular(() => {
      window.requestAnimationFrame(this.gameLoop.bind(this));
    });

    this.ghosts.forEach(ghost => {
      ghost.update();
      ghost.render();
    });
  }
}
