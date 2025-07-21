import { ModelPropertyPanel } from "../../components/ModelPropertyPanel/ModelPropertyPanel";
import { OptionsPanel } from "../../components/OptionsPanel/OptionsPanel";
import { ScenePropertyPanel } from "../../components/ScenePropertyPanel/ScenePropertyPanel";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { Viewer } from "../../components/Viewer/Viewer";
import styles from "./ModelViewer.module.scss";

export function ModelViewer() {
  return (
    <>
      <div className={styles.viewerContainer}>
        <div className={styles.toolBarDiv}>
          <ToolBar />
        </div>
        <div className={styles.panelContainer}>
          <OptionsPanel />
          <ModelPropertyPanel />
          <Viewer />
          <ScenePropertyPanel />
        </div>
      </div>
    </>
  );
}
