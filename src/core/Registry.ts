import type { MotionzAnimation } from "../types/MotionzOptions";

const registry = new Map<string, MotionzAnimation>();

export default class Registry {
  public static register(name: string, animation: MotionzAnimation): void {
    registry.set(name, animation);
  }

  public static get(name: string): MotionzAnimation | undefined {
    return registry.get(name);
  }

  public static has(name: string): boolean {
    return registry.has(name);
  }
}
