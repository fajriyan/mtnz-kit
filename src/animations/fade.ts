import type { MtnzAnimation, MtnzOptions } from "../types/MtnzOptions";

const DEFAULTS: Required<
  Pick<MtnzOptions, "duration" | "delay" | "easing">
> = {
  duration: 600,
  delay: 0,
  easing: "ease-out",
};

const fadeAnimation: MtnzAnimation = (element, options) => {
  const duration = options.duration ?? DEFAULTS.duration;
  const delay = options.delay ?? DEFAULTS.delay;
  const easing = options.easing ?? DEFAULTS.easing;

  element.style.opacity = "0";
  element.style.transform = "translateY(16px)";
  element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
  element.classList.remove("mtnz-hidden");
  element.classList.add("mtnz-visible");

  requestAnimationFrame(() => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  });
};

export default fadeAnimation;
