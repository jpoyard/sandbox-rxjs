import { CanvasObject } from '../canvas-object';

export interface EventCanvasObject extends CanvasObject {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  render: () => CanvasObject;
}
