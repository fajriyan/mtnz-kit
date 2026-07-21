export interface MtnzOptions {
  once?: boolean;
  offset?: number;
  duration?: number;
  delay?: number;
  easing?: string;
  animation?: string;
}

export type MtnzAnimation = (
  element: HTMLElement,
  options: MtnzOptions,
) => void;
