import type { MtnzAnimation, MtnzOptions } from "../types/MtnzOptions";

const DEFAULTS: Required<
  Pick<MtnzOptions, "duration" | "delay" | "easing">
> = {
  duration: 600,
  delay: 0,
  easing: "ease-out",
};

const SCALE_IN = 0.6;
const SCALE_OUT = 1.2;

function createZoom(
  transformStart: string,
  scaleStart: number,
): MtnzAnimation {
  return (element, options) => {
    const duration = options.duration ?? DEFAULTS.duration;
    const delay = options.delay ?? DEFAULTS.delay;
    const easing = options.easing ?? DEFAULTS.easing;

    element.style.opacity = "0";
    element.style.transform = `${transformStart} scale(${scaleStart})`.trim();
    element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
    element.classList.remove("mtnz-hidden");
    element.classList.add("mtnz-visible");

    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translate(0, 0) scale(1)";
    });
  };
}

export const zoomIn = createZoom("", SCALE_IN);
export const zoomInUp = createZoom("translateY(16px)", SCALE_IN);
export const zoomInDown = createZoom("translateY(-16px)", SCALE_IN);
export const zoomInLeft = createZoom("translateX(-16px)", SCALE_IN);
export const zoomInRight = createZoom("translateX(16px)", SCALE_IN);

export const zoomOut = createZoom("", SCALE_OUT);
export const zoomOutUp = createZoom("translateY(16px)", SCALE_OUT);
export const zoomOutDown = createZoom("translateY(-16px)", SCALE_OUT);
export const zoomOutLeft = createZoom("translateX(16px)", SCALE_OUT);
export const zoomOutRight = createZoom("translateX(-16px)", SCALE_OUT);
