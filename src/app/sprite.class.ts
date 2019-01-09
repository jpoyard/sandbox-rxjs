export class Sprite {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  image: HTMLImageElement;
  frameIndex: number;
  tickCount: number;
  ticksPerFrame: number;
  numberOfFrames: number;
  framePositions: Array<{ x: number; y: number }>;
  destination: {
    size: { width: number; height: number };
    position: { x: number; y: number };
  };

  constructor(options: {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    image: HTMLImageElement;
    ticksPerFrame?: number;
    framePositions: Array<{ x: number; y: number }>;
    destination: {
      size: { width: number; height: number };
      position: { x: number; y: number };
    };
  }) {
    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 10;
    this.framePositions = [...options.framePositions];
    this.destination = options.destination;
    this.numberOfFrames = this.framePositions.length;
  }

  render() {
    if (this.tickCount === 0) {
      // Clear the canvas
      this.context.clearRect(
        this.destination.position.x,
        this.destination.position.y,
        this.destination.size.width,
        this.destination.size.height
      );

      // Draw the animation
      this.context.drawImage(
        this.image,
        this.framePositions[this.frameIndex].x,
        this.framePositions[this.frameIndex].y,
        this.width,
        this.height,
        this.destination.position.x,
        this.destination.position.y,
        this.destination.size.width,
        this.destination.size.height
      );
    }
  }

  public update() {
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      // Go to the next frame
      this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
    }
  }
}
