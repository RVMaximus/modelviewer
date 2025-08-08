import { useRef, type ChangeEvent } from "react";
import styles from "./ToolBar.module.scss";
import {
  ArrowUpFromLine,
  Focus,
  // Move,
  // RotateCw
} from "lucide-react";
import { sceneManager } from "../../babylon-components/SceneManager/SceneManager";
import { getModelExtension } from "../../Utils/utils";
import { modelManager } from "../../babylon-components/ModelManager/ModelManager";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setModelLoading, setRenderMeshTree, setShowToast, setToastContent, setToastType } from "../../redux/slices/sceneSlice";
import { SceneController } from "../../babylon-components/SceneController/SceneController";

export function ToolBar() {

  const disptach = useDispatch<AppDispatch>();

  const isModelLoaded = useSelector((state: RootState) => state.scene.isModelLoaded);

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
      if (sceneManager.Scene) {
        try {
          const fileURL = URL.createObjectURL(files[0]);
          console.log(files[0]);
          const modelExt = getModelExtension(files[0].name);

          if (!modelExt) return;

          SceneController.activeModel?.dispose();
          SceneController.activeModel = null;

          disptach(setRenderMeshTree(false));

          await modelManager.loadModel(fileURL, modelExt);

          disptach(setRenderMeshTree(true))
        }
        catch (e) {
          showToastMessage("failure", "Failed to load Model")
          console.error("Failed to load model", e);
        }
        finally {
          disptach(setModelLoading(false));
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
              <div title="Focus Model" onClick={() => modelManager.focusModel(SceneController.activeModel!)}>
                <Focus
                  size={30}
                  strokeWidth={1}
                  className={styles.toolBarIcons}
                />
              </div>
              {/* <div title="Move Model" onClick={() => Gizmo.addPositionGizmo()}>
                <Move
                  size={30}
                  strokeWidth={1}
                  className={styles.toolBarIcons}
                />
              </div>
              <div title="Rotate Model" onClick={() => Gizmo.addRotationGizmo()}>
                <RotateCw
                  size={30}
                  strokeWidth={1}
                  className={styles.toolBarIcons}
                />
              </div> */}
            </> : <></>}
        </div>
      </div>
    </>
  );
}
