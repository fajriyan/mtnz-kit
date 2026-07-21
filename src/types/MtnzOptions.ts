export interface MotionzOptions {
  once?: boolean;
  offset?: number;
  duration?: number;
  delay?: number;
  easing?: string;
  animation?: string;
}

export type MotionzAnimation = (
  element: HTMLElement,
  options: MotionzOptions,
) => void;
