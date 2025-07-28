import { PointerEventTypes } from "@babylonjs/core";
import { cameraManager } from "../CameraManager/CameraManager";
import { engineManager } from "../EngineManager/EngineManager";
import { lightManager } from "../LightManager/LightManager";
import { sceneManager } from "../SceneManager/SceneManager";

export class SceneController {
    private canvas: HTMLCanvasElement | null = null;

    constructor() {
        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    }

    public initScene() {
        try {
            if (!this.canvas) return;

            engineManager.createEngine(this.canvas);

            if (!engineManager.Engine) return;

            sceneManager.createScene(engineManager.Engine);

            if (!sceneManager.Scene) return;

            const camera = cameraManager.createCamera("universalCamera", {});
            if(!camera) return;

            camera.attachControl(this.canvas, false);
            camera.inputs.addMouseWheel();
            camera.speed = 1;

            lightManager.createLight("hemispheric", {})

            this.setMeshPick();

            engineManager.Engine.runRenderLoop(() => {
                sceneManager.Scene?.render()
            })

            window.addEventListener("resize", () => {
                engineManager.Engine?.resize();
            })
        }
        catch (e) {
            console.error(e);
        }
    }

    public dispose() {
        engineManager.disposeEngine();
        sceneManager.disposeScene();
    }

    private setMeshPick() {
        if(!sceneManager.Scene) return;
        sceneManager.Scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type == PointerEventTypes.POINTERPICK) {
                const pickInfo = pointerInfo.pickInfo;
                console.log("pickinfo", pickInfo);
                if (pickInfo?.pickedMesh) {
                    console.log("pickedMesh", pickInfo.pickedMesh)
                }
            }
        })
    }
}