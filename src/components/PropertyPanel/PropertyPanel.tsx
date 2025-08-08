import styles from "./PropertyPanel.module.scss";
import { ModelTree } from "../ModelTree/ModelTree";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { MaterialPanel } from "../MaterialPanel/MaterialPanel";

export function PropertyPanel() {
  const renderModelTree = useSelector((state: RootState) => state.scene.renderMeshTree);
  const currentOption = useSelector((state: RootState) => state.scene.currentOption);

  const getPropertyRenderPanel = () => {
    switch (currentOption) {
      case "mesh":
        return renderModelTree ? <ModelTree /> : <>No model loaded</>
      case "material":
        return renderModelTree ? <MaterialPanel /> : <>No material loaded</>
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
