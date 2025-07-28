import { Engine } from "@babylonjs/core";


class EngineManager {
  private engine: Engine | null = null;

  public createEngine(canvas: HTMLCanvasElement) {
    if (this.engine) {
      throw new Error("Engine has been already created");
    }
    this.engine = new Engine(canvas, true, {
      antialias: true
    });
    this.engine.setSize(window.innerWidth, window.innerHeight);
    this.engine.setHardwareScalingLevel(1/ window.devicePixelRatio);
  }

  public get Engine(): Engine | null {
    if (!this.engine) {
      throw new Error("Engine has not been created.");
    }
    return this.engine;
  }

  public disposeEngine() {
    this.engine?.dispose();
  }
}

export const engineManager = new EngineManager();
