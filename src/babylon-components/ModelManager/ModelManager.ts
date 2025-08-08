import { AbstractMesh, ImportMeshAsync, TransformNode, UniversalCamera, Animation } from "@babylonjs/core";
import { sceneManager } from "../SceneManager/SceneManager";
import { SceneController } from "../SceneController/SceneController";

interface MeshNode {
    mesh: AbstractMesh | TransformNode;
    children: MeshNode[];
}
class ModelManager {

    public async loadModel(fileUrl: string, modelExt: string) {
        if (!sceneManager.Scene) return;
        const model = await ImportMeshAsync(fileUrl, sceneManager.Scene, { pluginExtension: modelExt });

        console.log("Model loaded", model);

        if (!model.meshes.length) return;

        this.clearPastModelData();

        const rootMesh = model.meshes[0];

        this.focusModel(rootMesh);

        SceneController.activeModel = rootMesh;

        SceneController.modelTree = this.buildMeshTree(rootMesh);
    }

    public focusModel(model: AbstractMesh) {
        if (!model) return;

        const boundingInfo = model.getBoundingInfo();
        const center = boundingInfo.boundingBox.centerWorld.clone();

        const offsetDistance = model.name === "__root__" ? 10 : 2;

        const directionToCamera = SceneController.activeCamera!.position.subtract(center).normalize();

        const newCamPos = center.add(directionToCamera.scale(offsetDistance));

        Animation.CreateAndStartAnimation(
            "camMove",
            SceneController.activeCamera!,
            "position",
            60,
            30,
            SceneController.activeCamera!.position.clone(),
            newCamPos,
            Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        (SceneController.activeCamera! as UniversalCamera).setTarget(center);
    }

    private buildMeshTree = (mesh: AbstractMesh | TransformNode): MeshNode => {
        return {
            mesh,
            children: mesh.getChildren()
                .filter((node) =>
                    node instanceof AbstractMesh || node instanceof TransformNode
                )
                .map((node) => this.buildMeshTree(node))
        };
    }

    private clearPastModelData() {
        SceneController.activeModel = null;
        SceneController.modelTree = null;
    }
}

export const modelManager = new ModelManager()