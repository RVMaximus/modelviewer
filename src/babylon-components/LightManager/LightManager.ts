import {
  DirectionalLight,
  HemisphericLight,
  PointLight,
  Scene,
  SpotLight,
  Vector3,
} from "babylonjs";
import { sceneManager } from "../SceneManager/SceneManager";

class LightManager {
  public createLight(type: string, lightConfig: Record<string, any>) {
    const scene = sceneManager.Scene;
    try {
      if (!scene) {
        throw new Error("Scene is not defined");
      }

      switch (type) {
        case "hemispheric":
          return this.createHemisphericLight(lightConfig, scene);
        case "directional":
          return this.createDirectionalLight(lightConfig, scene);
        case "spot":
          return this.createSpotLight(lightConfig, scene);
        case "point":
          return this.pointLight(lightConfig, scene);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private createHemisphericLight(
    lightConfig: Record<string, any>,
    scene: Scene
  ) {
    const { name = "hemisphericLight", direction = new Vector3(-1, 1, 0) } =
      lightConfig;
    return new HemisphericLight(name, direction, scene);
  }

  private createDirectionalLight(
    lightConfig: Record<string, any>,
    scene: Scene
  ) {
    const { name = "directionalLight", direction = new Vector3(0, -1, 0) } =
      lightConfig;
    return new DirectionalLight(name, direction, scene);
  }

  private createSpotLight(lightconfig: Record<string, any>, scene: Scene) {
    const {
      name = "spotLight",
      position = new Vector3(-1, 1, -1),
      direction = new Vector3(0, -1, 0),
      angle = 90,
      exponent = 10,
    } = lightconfig;
    return new SpotLight(name, position, direction, angle, exponent, scene);
  }

  private pointLight(lightConfig: Record<string, any>, scene: Scene) {
    const { name = "pointLight", position = new Vector3(0, 1, 0) } =
      lightConfig;
    return new PointLight(name, position, scene);
  }
}

export const lightManager = new LightManager();
