import styles from "./PropertyPanel.module.scss";
import { ModelTree } from "../ModelTree/ModelTree";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { MaterialPanel } from "../MaterialPanel/MaterialPanel";
import { EnvironmentPanel } from "../EnvironmentPanel/EnvironmentPanel";

export function PropertyPanel() {
  const renderModelTree = useSelector((state: RootState) => state.scene.renderMeshTree);
  const currentOption = useSelector((state: RootState) => state.scene.currentOption);

  const getPropertyRenderPanel = () => {
    switch (currentOption) {
      case "mesh":
        return renderModelTree ? <ModelTree /> : <>No model loaded</>
      case "material":
        return renderModelTree ? <MaterialPanel /> : <>No material loaded</>
      case "environment":
        return renderModelTree ? <EnvironmentPanel /> : <>No model loaded</>
      default:
        return <ModelTree />;
    }
  }

  return (
    <>
      <div className={styles.menuPanelContainer}>
        {getPropertyRenderPanel()}
      </div>
    </>
  );
}
