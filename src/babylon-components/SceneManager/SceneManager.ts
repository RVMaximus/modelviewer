import { Scene, type Engine } from "babylonjs";

class SceneManager {
  private scene: Scene | null = null;

  public createScene(engine: Engine) {
    if (this.scene) {
      throw new Error("Scene has been already created");
    }

    this.scene = new Scene(engine);
  }

  public get Scene(): Scene | null {
    if (!this.scene) {
      throw new Error("Scene has not been created yet");
    }
    return this.scene;
  }
}

export const sceneManager = new SceneManager();
