import { ArrowUpFromLine } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import styles from "./Viewer.module.scss";
import { SceneController } from "../../babylon-components/SceneController/SceneController";
import { sceneManager } from "../../babylon-components/SceneManager/SceneManager";
import "@babylonjs/loaders/gltf";
import { Toaster } from "../Toaster/Toaster";
import { getModelExtension } from "../../Utils/utils";
import { modelManager } from "../../babylon-components/ModelManager/ModelManager";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { setIsModelLoaded } from "../../redux/slices/sceneSlice";

export function Viewer() {

  const disptach = useDispatch<AppDispatch>();
  const isModelLoaded = useSelector((state: RootState) => state.scene.isModelLoaded);

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const [toastType, setToastType] = useState("");

  const modelInputRef = useRef<HTMLInputElement>(null);

  const showToastMessage = (type: string, message: string) => {
    setShowToast(true);
    setToastContent(message);
    setToastType(type)
    setTimeout(() => {
      clearToast();
    }, 2000);
  }

  const clearToast = () => {
    setShowToast(false);
    setToastContent("");
    setToastType("")
  }

  const handleModelUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      setIsModelLoading(true);
      const sceneController = new SceneController();
      sceneController.initScene();

      if (sceneManager.Scene) {
        try {
          const fileURL = URL.createObjectURL(files[0]);
          console.log(files[0]);
          const modelExt = getModelExtension(files[0].name);

          if (!modelExt) return;

          await modelManager.loadModel(fileURL, modelExt)

          disptach(setIsModelLoaded(true));
          setIsModelLoading(false);
        }
        catch (e) {
          console.error("Failed to load model", e);
          disptach(setIsModelLoaded(false));
          setIsModelLoading(false);
          showToastMessage("failure", "Failed to load Model")
        }
      }
    }
  }

  return (
    <>
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
        </div>
      </> : <></>}

      {showToast ? <Toaster type={toastType} content={toastContent} /> : <></>}
    </>
  );
}
