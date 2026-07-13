type ObserverCallback = (entry: IntersectionObserverEntry) => void;

export default class Observer {
  private observer: IntersectionObserver;

  constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, options);
  }

  public observeAll(elements: HTMLElement[]): void {
    elements.forEach((element) => this.observer.observe(element));
  }

  public unobserve(element: HTMLElement): void {
    this.observer.unobserve(element);
  }

  public disconnect(): void {
    this.observer.disconnect();
  }
}
