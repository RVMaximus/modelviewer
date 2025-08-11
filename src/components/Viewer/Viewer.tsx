import { ArrowUpFromLine } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import styles from "./Viewer.module.scss";
import { SceneController } from "../../babylon-components/SceneController/SceneController";
import { sceneManager } from "../../babylon-components/SceneManager/SceneManager";
import "@babylonjs/loaders";
import "@babylonjs/inspector";
import { Toaster } from "../Toaster/Toaster";
import { getModelExtension } from "../../Utils/utils";
import { modelManager } from "../../babylon-components/ModelManager/ModelManager";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { setCurrentOption, setIsModelLoaded, setModelLoading, setRenderMeshTree, setShowToast, setToastContent, setToastType } from "../../redux/slices/sceneSlice";

export function Viewer() {

  const disptach = useDispatch<AppDispatch>();

  const isModelLoaded = useSelector((state: RootState) => state.scene.isModelLoaded);
  const showToast = useSelector((state: RootState) => state.scene.showToast);
  const toastContent = useSelector((state: RootState) => state.scene.toastContent);
  const toastType = useSelector((state: RootState) => state.scene.toastType);
  const isModelLoading = useSelector((state: RootState) => state.scene.isModelLoading);

  const modelInputRef = useRef<HTMLInputElement>(null);

  const showToastMessage = (type: string, message: string) => {
    disptach(setShowToast(true));
    disptach(setToastContent(message));
    disptach(setToastType(type))
    setTimeout(() => {
      clearToast();
    }, 2000);
  }

  const clearToast = () => {
    disptach(setShowToast(false));
    disptach(setToastContent(""));
    disptach(setToastType(""))
  }

  const handleModelUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      disptach(setModelLoading(true));
      const sceneController = new SceneController();
      sceneController.initScene();

      if (sceneManager.Scene) {
        try {
          const fileURL = URL.createObjectURL(files[0]);

          const modelExt = getModelExtension(files[0].name);

          if (!modelExt) return;

          SceneController.activeModel?.dispose();
          SceneController.activeModel = null;

          disptach(setRenderMeshTree(false))

          await modelManager.loadModel(fileURL, modelExt)

          disptach(setRenderMeshTree(true));

          disptach(setIsModelLoaded(true));

          disptach(setCurrentOption("mesh"));
        }
        catch (e) {
          disptach(setIsModelLoaded(false));
          showToastMessage("failure", "Failed to load Model")
        }
        finally {
          disptach(setModelLoading(false));
        }
      }
    }
  }

  return (
    <>
      <div className={styles.modelViewerContainer}>
        <div className={styles.viewerDiv} style={isModelLoaded ? { display: "block" } : { display: "none" }}>
          <canvas id="renderCanvas" className={styles.viewerCanvas}></canvas>
        </div>

        {isModelLoading && !isModelLoaded ? <div className={styles.loaderDiv}><img src="./model_loader.svg" /></div> : <></>}

        {!isModelLoading && !isModelLoaded ? <>
          <input
            type="file"
            accept=".glb,.gltf,.babylon,.obj"
            onChange={handleModelUpload}
            style={{ display: "none" }}
            ref={modelInputRef}
          />

          <div className={styles.uploadButtonContainer} onClick={() => modelInputRef.current?.click()}>
            <div className={styles.uploadButton}>
              <ArrowUpFromLine
                size={30}
                strokeWidth={1}
                className={styles.toolBarIcons}
              />
              <span>Upload Model</span>
            </div>
            <p className={styles.extensionSupport}>Upload glb, gltf, babylon, obj, ply, splat, spz files</p>
          </div>
        </> : <></>}
      </div>
      {showToast ? <div className={styles.toasterDiv}><Toaster type={toastType} content={toastContent} /></div> : <></>}
    </>
  );
}
