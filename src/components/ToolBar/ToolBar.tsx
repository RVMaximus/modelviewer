import { useRef, type ChangeEvent } from "react";
import styles from "./ToolBar.module.scss";
import {
  ArrowUpFromLine
} from "lucide-react";
import { sceneManager } from "../../babylon-components/SceneManager/SceneManager";
import { getModelExtension } from "../../Utils/utils";
import { modelManager } from "../../babylon-components/ModelManager/ModelManager";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export function ToolBar() {

  const isModelLoaded = useSelector((state: RootState) => state.scene.isModelLoaded);

  const modelInputRef = useRef<HTMLInputElement>(null);

  const handleModelUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length) {

      if (sceneManager.Scene) {
        try {
          const fileURL = URL.createObjectURL(files[0]);
          console.log(files[0]);
          const modelExt = getModelExtension(files[0].name);

          if (!modelExt) return;
          sceneManager.Scene?.getMeshByName("viewerModel")?.dispose();

          await modelManager.loadModel(fileURL, modelExt);

        }
        catch (e) {
          console.error("Failed to load model", e);
        }
      }
    }
  }

  return (
    <>
      <div className={styles.toolBarContainer}>
        <div className={styles.leftToolBarIconsDiv}>
          {isModelLoaded ?
            <>
              <input
                type="file"
                accept=".glb,.gltf,.babylon,.obj"
                onChange={handleModelUpload}
                style={{ display: "none" }}
                ref={modelInputRef}
              />
              <div title="Upload Model" onClick={() => modelInputRef.current?.click()}>
                <ArrowUpFromLine
                  size={30}
                  strokeWidth={1}
                  className={styles.toolBarIcons}
                />
              </div>
            </> : <></>}

        </div>
      </div>
    </>
  );
}
