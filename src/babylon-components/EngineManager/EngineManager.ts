import { Engine } from "babylonjs";

class EngineManager {
  private engine: Engine | null = null;

  public createEngine(canvas: HTMLCanvasElement) {
    if (this.engine) {
      throw new Error("Engine has been already created");
    }
    this.engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
  }

  public get Engine(): Engine | null {
    if (!this.engine) {
      throw new Error("Engine has not been created.");
    }
    return this.engine;
  }
}

export const engineManager = new EngineManager();
