import { PropertyPanel } from "../../components/PropertyPanel/PropertyPanel";
import { OptionsPanel } from "../../components/OptionsPanel/OptionsPanel";
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
          <PropertyPanel />
          <Viewer />
        </div>
      </div>
    </>
  );
}
