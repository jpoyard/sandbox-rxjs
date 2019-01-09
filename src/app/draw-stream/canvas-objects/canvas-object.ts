export interface CanvasObject {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  render: () => CanvasObject;
}
