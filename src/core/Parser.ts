import type { MtnzOptions } from "../types/MtnzOptions";

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
    defaults: MtnzOptions,
  ): MtnzOptions {
    const dataset = element.dataset;
    const options: MtnzOptions = {};

    const animation = dataset.motion || dataset.mtnz || defaults.animation;
    if (animation !== undefined) {
      options.animation = animation;
    }

    const once = parseBoolean(
      dataset.mtnzOnce || dataset.motionOnce,
      defaults.once,
    );
    if (once !== undefined) {
      options.once = once;
    }

    const offset = parseNumber(
      dataset.mtnzOffset || dataset.motionOffset,
      defaults.offset,
    );
    if (offset !== undefined) {
      options.offset = offset;
    }

    const duration = parseNumber(
      dataset.mtnzDuration || dataset.motionDuration,
      defaults.duration,
    );
    if (duration !== undefined) {
      options.duration = duration;
    }

    const delay = parseNumber(
      dataset.mtnzDelay || dataset.motionDelay,
      defaults.delay,
    );
    if (delay !== undefined) {
      options.delay = delay;
    }

    const easing =
      dataset.mtnzEasing || dataset.motionEasing || defaults.easing;
    if (easing !== undefined) {
      options.easing = easing;
    }

    return options;
  }
}
