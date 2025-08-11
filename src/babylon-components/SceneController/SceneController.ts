import { AbstractMesh, Camera, Color4, HDRCubeTexture, Light, TransformNode } from "@babylonjs/core";
import { cameraManager } from "../CameraManager/CameraManager";
import { engineManager } from "../EngineManager/EngineManager";
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
    static skybox: any;

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

    private setDefaultEnvironment() {
        const hdrTexture = new HDRCubeTexture("./Default.hdr", sceneManager.Scene!, 512);
        const skyBox = sceneManager.Scene?.createDefaultSkybox(hdrTexture, true, 1000, 0, true);
        skyBox!.name = "rvSkyBox";

        sceneManager.Scene!.environmentIntensity = 0.7;
    }

    static setEnvironment(name: string, callBack?: any) {
        sceneManager.Scene!.environmentTexture = null;
        sceneManager.Scene?.getMeshByName("rvSkyBox")?.dispose();

        const hdrTexture = new HDRCubeTexture(`${name}.hdr`, sceneManager.Scene!, 512);
        const skyBox = sceneManager.Scene?.createDefaultSkybox(hdrTexture, true, 1000, 0, true);
        skyBox!.name = "rvSkyBox";

        sceneManager.Scene!.environmentIntensity = 0.7;

        if (callBack) callBack();
    }
}