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
  selector: 'app-coin-animation',
  template: `
    <canvas #coinAnimation id="coinAnimation"></canvas>
  `,
  styles: []
})
export class CoinAnimationComponent implements AfterViewInit, OnInit {
  @ViewChild('coinAnimation') canvasCoinAnimation: ElementRef;

  public context: CanvasRenderingContext2D;
  public coinImage: HTMLImageElement;
  public coin: Sprite;

  constructor(public ngZone: NgZone) {}

  ngOnInit() {
    this.coinImage = new Image(1000, 100);
    this.coinImage.src = 'assets/images/coin-sprite-animation.png';
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasCoinAnimation.nativeElement as HTMLCanvasElement;
    canvas.width = 100;
    canvas.height = 100;
    this.context = canvas.getContext('2d');
    this.render();
  }

  public render() {
    this.coin = new Sprite({
      context: this.context,
      width: 100,
      height: 100,
      image: this.coinImage,
      destination: {
        size: { width: 100, height: 100 },
        position: { x: 0, y: 0 }
      },
      framePositions: Array.from(Array(10).keys()).map(value => ({
        x: value * 100,
        y: 0
      }))
    });

    // Start the game loop as soon as the sprite sheet is loaded
    this.coinImage.addEventListener('load', this.gameLoop.bind(this));
  }

  public gameLoop() {
    this.ngZone.runOutsideAngular(() => {
      window.requestAnimationFrame(this.gameLoop.bind(this));
    });

    this.coin.update();
    this.coin.render();
  }
}
