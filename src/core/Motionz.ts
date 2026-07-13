import type { MotionzAnimation, MotionzOptions } from "../types/MotionzOptions";
import Engine from "./Engine";

class Motionz {
  public init(options: MotionzOptions = {}): void {
    Engine.init(options);
  }

  public refresh(): void {
    Engine.refresh();
  }

  public destroy(): void {
    Engine.destroy();
  }

  public register(name: string, animation: MotionzAnimation): void {
    Engine.register(name, animation);
  }
}

export default new Motionz();
