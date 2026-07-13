import type { MotionzAnimation, MotionzOptions } from "../types/MotionzOptions";
import Parser from "./Parser";
import Registry from "./Registry";
import Observer from "./Observer";
import fadeAnimation from "../animations/fade";

const DEFAULT_OPTIONS: MotionzOptions = {
  once: true,
  offset: 0,
  duration: 600,
  delay: 0,
  easing: "ease-out",
  animation: "fade",
};

class Engine {
  private observer: Observer | null = null;
  private options: MotionzOptions = { ...DEFAULT_OPTIONS };
  private initialized = false;

  public init(options: MotionzOptions = {}): void {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    if (!this.initialized) {
      this.register("fade", fadeAnimation);
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

  public register(name: string, animation: MotionzAnimation): void {
    Registry.register(name, animation);
  }

  private collectMotionElements(): HTMLElement[] {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-motionz], [data-motion]"));

    elements.forEach((element) => {
      element.classList.add("motionz-hidden");
      element.style.opacity = "0";
      element.style.transform = "translateY(16px)";
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
    const animationName = options.animation ?? element.dataset.motion ?? element.dataset.motionz ?? "fade";
    const animation = Registry.get(animationName) ?? Registry.get("fade");

    animation?.(element, options);

    if (options.once ?? true) {
      this.observer?.unobserve(element);
    }
  }
}

export default new Engine();
