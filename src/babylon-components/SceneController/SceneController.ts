import { AbstractMesh, Camera, Color4, HDRCubeTexture, Light, TransformNode } from "@babylonjs/core";
import { cameraManager } from "../CameraManager/CameraManager";
import { engineManager } from "../EngineManager/EngineManager";
import { lightManager } from "../LightManager/LightManager";
import { sceneManager } from "../SceneManager/SceneManager";

export interface MeshNode {
    mesh: AbstractMesh | TransformNode;
    children: MeshNode[];
}
export class SceneController {
    private canvas: HTMLCanvasElement | null = null;
    static activeCamera: Camera | null = null;
    static activeLight: Light | null = null;
    static activeModel: AbstractMesh | null = null;
    static pickedMesh: AbstractMesh | null = null;
    static modelTree: MeshNode | null = null;

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

            sceneManager.Scene.clearColor = new Color4(0.1, 0.1, 0.1, 1)

            this.setCamera();

            this.setLight();

            this.setDefaultEnvironment();

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

    static clearEdges() {
        if (!SceneController.pickedMesh) return;
        SceneController.pickedMesh?.disableEdgesRendering();
    }

    static enableEdges(mesh: AbstractMesh) {
        mesh.enableEdgesRendering();
        mesh.edgesWidth = 1;
        mesh.edgesColor = new Color4(1, 0, 0, 0.5);
    }

    private setCamera() {
        const camera = cameraManager.createCamera("universalCamera", {});
        if (!camera) return;

        camera.attachControl(this.canvas, false);
        camera.inputs.addMouseWheel();
        camera.speed = 0.5;

        SceneController.activeCamera = camera;
    }

    private setLight() {
        const light = lightManager.createLight("hemispheric", {});
        if (!light) return;

        SceneController.activeLight = light;
    }

    private setDefaultEnvironment() {
        const hdrTexture = new HDRCubeTexture("./Afternoon.hdr", sceneManager.Scene!, 512);
        sceneManager.Scene?.createDefaultSkybox(hdrTexture, false, 1000, 0, true);
        sceneManager.Scene!.environmentIntensity = 0.5;
    }
}