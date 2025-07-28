import { ImportMeshAsync } from "@babylonjs/core";
import { sceneManager } from "../SceneManager/SceneManager";

class ModelManager {
    public async loadModel(fileUrl: string, modelExt: string) {
        if (!sceneManager.Scene) return;
        const model = await ImportMeshAsync(fileUrl, sceneManager.Scene, { pluginExtension: modelExt });
        const rootMesh = model.meshes[0];
        rootMesh.name = "viewerModel";
        console.log("model", rootMesh, rootMesh.getChildMeshes());
    }
}

export const modelManager = new ModelManager()