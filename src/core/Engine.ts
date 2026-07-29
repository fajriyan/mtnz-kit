import type { MtnzAnimation, MtnzOptions } from "../types/MtnzOptions";
import Parser from "./Parser";
import Registry from "./Registry";
import Observer from "./Observer";
import fadeAnimation, {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  fadeUpRight,
  fadeUpLeft,
  fadeDownRight,
  fadeDownLeft,
} from "../animations/fade";
import { flipUp, flipDown, flipLeft, flipRight } from "../animations/flip";
import { slideUp, slideDown, slideLeft, slideRight } from "../animations/slide";
import {
  zoomIn,
  zoomInUp,
  zoomInDown,
  zoomInLeft,
  zoomInRight,
  zoomOut,
  zoomOutUp,
  zoomOutDown,
  zoomOutLeft,
  zoomOutRight,
} from "../animations/zoom";

const DEFAULT_OPTIONS: MtnzOptions = {
  once: true,
  offset: 0,
  duration: 600,
  delay: 0,
  easing: "ease-out",
  animation: "fade",
};

class Engine {
  private observer: Observer | null = null;
  private options: MtnzOptions = { ...DEFAULT_OPTIONS };
  private initialized = false;

  public init(options: MtnzOptions = {}): void {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    if (!this.initialized) {
      this.register("fade", fadeAnimation);
      this.register("fade-up", fadeUp);
      this.register("fade-down", fadeDown);
      this.register("fade-left", fadeLeft);
      this.register("fade-right", fadeRight);
      this.register("fade-up-right", fadeUpRight);
      this.register("fade-up-left", fadeUpLeft);
      this.register("fade-down-right", fadeDownRight);
      this.register("fade-down-left", fadeDownLeft);

      this.register("flip-up", flipUp);
      this.register("flip-down", flipDown);
      this.register("flip-left", flipLeft);
      this.register("flip-right", flipRight);

      this.register("slide-up", slideUp);
      this.register("slide-down", slideDown);
      this.register("slide-left", slideLeft);
      this.register("slide-right", slideRight);

      this.register("zoom-in", zoomIn);
      this.register("zoom-in-up", zoomInUp);
      this.register("zoom-in-down", zoomInDown);
      this.register("zoom-in-left", zoomInLeft);
      this.register("zoom-in-right", zoomInRight);
      this.register("zoom-out", zoomOut);
      this.register("zoom-out-up", zoomOutUp);
      this.register("zoom-out-down", zoomOutDown);
      this.register("zoom-out-left", zoomOutLeft);
      this.register("zoom-out-right", zoomOutRight);

      this.initialized = true;
    }

    this.refresh();
  }

  public refresh(): void {
    this.observer?.disconnect();

    this.observer = new Observer(
      (entry) => this.handleIntersect(entry),
      {
        rootMargin: `${this.options.offset ?? 0}px 0px ${this.options.offset ?? 0}px 0px`,
        threshold: 0.1,
      }
    );

    this.observer.observeAll(this.collectMotionElements());
  }

  public destroy(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.initialized = false;
  }

  public register(name: string, animation: MtnzAnimation): void {
    Registry.register(name, animation);
  }

  private collectMotionElements(): HTMLElement[] {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-mtnz], [data-motion]"));

    elements.forEach((element) => {
      element.classList.add("mtnz-hidden");
      element.style.opacity = "0";
      element.style.willChange = "opacity, transform";
    });

    return elements;
  }

  private handleIntersect(entry: IntersectionObserverEntry): void {
    const element = entry.target as HTMLElement;

    if (!entry.isIntersecting) {
      return;
    }

    const options = Parser.parseElementOptions(element, this.options);
    const animationName = options.animation ?? element.dataset.motion ?? element.dataset.mtnz ?? "fade";
    const animation = Registry.get(animationName) ?? Registry.get("fade");

    animation?.(element, options);

    if (options.once ?? true) {
      this.observer?.unobserve(element);
    }
  }
}

export default new Engine();
