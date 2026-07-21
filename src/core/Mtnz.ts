import type { MtnzAnimation, MtnzOptions } from "../types/MtnzOptions";
import Engine from "./Engine";

class Mtnz {
  public init(options: MtnzOptions = {}): void {
    Engine.init(options);
  }

  public refresh(): void {
    Engine.refresh();
  }

  public destroy(): void {
    Engine.destroy();
  }

  public register(name: string, animation: MtnzAnimation): void {
    Engine.register(name, animation);
  }
}

export default new Mtnz();
