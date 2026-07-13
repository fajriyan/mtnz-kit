import type { MotionzOptions } from "../types/MotionzOptions";

function parseBoolean(
  value: string | undefined,
  fallback: boolean | undefined,
): boolean | undefined {
  if (value === undefined) {
    return fallback;
  }

  return value === "true" || value === "1";
}

function parseNumber(
  value: string | undefined,
  fallback: number | undefined,
): number | undefined {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default class Parser {
  public static parseElementOptions(
    element: HTMLElement,
    defaults: MotionzOptions,
  ): MotionzOptions {
    const dataset = element.dataset;
    const options: MotionzOptions = {};

    const animation = dataset.motion || dataset.motionz || defaults.animation;
    if (animation !== undefined) {
      options.animation = animation;
    }

    const once = parseBoolean(
      dataset.motionzOnce || dataset.motionOnce,
      defaults.once,
    );
    if (once !== undefined) {
      options.once = once;
    }

    const offset = parseNumber(
      dataset.motionzOffset || dataset.motionOffset,
      defaults.offset,
    );
    if (offset !== undefined) {
      options.offset = offset;
    }

    const duration = parseNumber(
      dataset.motionzDuration || dataset.motionDuration,
      defaults.duration,
    );
    if (duration !== undefined) {
      options.duration = duration;
    }

    const delay = parseNumber(
      dataset.motionzDelay || dataset.motionDelay,
      defaults.delay,
    );
    if (delay !== undefined) {
      options.delay = delay;
    }

    const easing =
      dataset.motionzEasing || dataset.motionEasing || defaults.easing;
    if (easing !== undefined) {
      options.easing = easing;
    }

    return options;
  }
}
