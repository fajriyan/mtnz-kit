import type { MtnzAnimation } from "../types/MtnzOptions";

const registry = new Map<string, MtnzAnimation>();

export default class Registry {
  public static register(name: string, animation: MtnzAnimation): void {
    registry.set(name, animation);
  }

  public static get(name: string): MtnzAnimation | undefined {
    return registry.get(name);
  }

  public static has(name: string): boolean {
    return registry.has(name);
  }
}
