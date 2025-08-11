import { GizmoManager, UtilityLayerRenderer } from "@babylonjs/core";
import { sceneManager } from "../SceneManager/SceneManager";
import { SceneController } from "../SceneController/SceneController";

export class Gizmo {
    static gizmo: GizmoManager;

    static addPositionGizmo() {
        this.createGizmoManager();
        Gizmo.gizmo.rotationGizmoEnabled = false;
        Gizmo.gizmo.positionGizmoEnabled = true;
        Gizmo.gizmo.gizmos.positionGizmo!.scaleRatio = 1.5;
        Gizmo.gizmo.attachToMesh(SceneController.activeModel);
    }

    static addRotationGizmo() {
        this.createGizmoManager();
        Gizmo.gizmo.positionGizmoEnabled = false;
        Gizmo.gizmo.rotationGizmoEnabled = true;
    }

    static createGizmoManager() {
        if (!Gizmo.gizmo) {
            const scene = sceneManager.Scene;
            if (!scene) return;
            const utilityLayer = new UtilityLayerRenderer(scene, true);
            utilityLayer.render();

            Gizmo.gizmo = new GizmoManager(scene, 1, utilityLayer, utilityLayer)
            Gizmo.gizmo.usePointerToAttachGizmos = false;

            console.log("GizmoManager created", Gizmo.gizmo);

        }
    }

    static disposeGizmos() {
        Gizmo.gizmo.utilityLayer.dispose();
        Gizmo.gizmo.dispose();
    }
}