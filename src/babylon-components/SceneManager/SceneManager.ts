import { Scene, type Engine } from "@babylonjs/core";

class SceneManager {
  private scene: Scene | null = null;

  public createScene(engine: Engine) {
    if (this.scene) {
      throw new Error("Scene has been already created");
    }

    this.scene = new Scene(engine);
  }

  public get Scene(): Scene | null {
    if (this.scene) {
      return this.scene;
    }
    return null;
  }

  public disposeScene() {
    this.scene?.dispose();
  }
}

export const sceneManager = new SceneManager();
