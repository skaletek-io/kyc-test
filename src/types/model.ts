export type BBox = [number, number, number, number];

export interface Prediction {
  bbox: BBox;
  label: string;
  prob: number;
}

export interface CutoutArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PositionFeedback {
  direction: "top" | "bottom" | "left" | "right" | "inside" | "outside";
  description: string;
  style: string;
}
