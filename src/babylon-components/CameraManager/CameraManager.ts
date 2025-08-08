import { ArcRotateCamera, FreeCamera, UniversalCamera, Vector3, type Scene } from "@babylonjs/core";
import { sceneManager } from "../SceneManager/SceneManager";

class CameraManager {
  public createCamera(type: string, cameraConfig: Record<string, any>) {
    const scene = sceneManager.Scene;
    try {
      if (!scene) throw new Error("Scene is not defined");

      switch (type) {
        case "universalCamera":
          return this.createUniversalCamera(cameraConfig, scene);
        case "freeCamera":
          return this.createFreeCamera(cameraConfig, scene);
        case "arcRotateCamera":
          return this.createArcRotateCamera(cameraConfig, scene);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private createUniversalCamera(
    cameraConfig: Record<string, any>,
    scene: Scene
  ) {
    const { name = "universalCamera", position = new Vector3(0, 0, -5) } =
      cameraConfig;
    return new UniversalCamera(name, position, scene);
  }

  private createFreeCamera(cameraConfig: Record<string, any>, scene: Scene) {
    const { name = "freeCamera", position = new Vector3(0, 5, -5) } =
      cameraConfig;
    return new FreeCamera(name, position, scene);
  }

  private createArcRotateCamera(
    cameraConfig: Record<string, any>,
    scene: Scene
  ) {
    const {
      name = "arcRotateCamera",
      alpha = Math.PI / 2,
      beta = Math.PI / 4,
      radius = 10,
      target = new Vector3(0, 0, 0),
    } = cameraConfig;
    return new ArcRotateCamera(name, alpha, beta, radius, target, scene);
  }
}

export const cameraManager = new CameraManager();
