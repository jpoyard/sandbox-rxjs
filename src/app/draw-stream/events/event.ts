export interface EventGraphicObject {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  render: () => EventGraphicObject;
}
