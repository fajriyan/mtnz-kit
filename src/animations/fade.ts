import type { MotionzAnimation, MotionzOptions } from "../types/MotionzOptions";

const DEFAULTS: Required<
  Pick<MotionzOptions, "duration" | "delay" | "easing">
> = {
  duration: 600,
  delay: 0,
  easing: "ease-out",
};

const fadeAnimation: MotionzAnimation = (element, options) => {
  const duration = options.duration ?? DEFAULTS.duration;
  const delay = options.delay ?? DEFAULTS.delay;
  const easing = options.easing ?? DEFAULTS.easing;

  element.style.opacity = "0";
  element.style.transform = "translateY(16px)";
  element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
  element.classList.remove("motionz-hidden");
  element.classList.add("motionz-visible");

  requestAnimationFrame(() => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  });
};

export default fadeAnimation;
