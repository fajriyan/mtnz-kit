import type { MtnzAnimation, MtnzOptions } from "../types/MtnzOptions";

const DEFAULTS: Required<
  Pick<MtnzOptions, "duration" | "delay" | "easing">
> = {
  duration: 600,
  delay: 0,
  easing: "ease-out",
};

function createFlip(transformStart: string): MtnzAnimation {
  return (element, options) => {
    const duration = options.duration ?? DEFAULTS.duration;
    const delay = options.delay ?? DEFAULTS.delay;
    const easing = options.easing ?? DEFAULTS.easing;

    element.style.opacity = "0";
    element.style.transform = transformStart;
    element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
    element.classList.remove("mtnz-hidden");
    element.classList.add("mtnz-visible");

    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "rotateX(0) rotateY(0)";
    });
  };
}

export const flipUp = createFlip("rotateX(90deg)");
export const flipDown = createFlip("rotateX(-90deg)");
export const flipLeft = createFlip("rotateY(-90deg)");
export const flipRight = createFlip("rotateY(90deg)");
