import { useDispatch, useSelector } from "react-redux";
import styles from "./OptionsPanel.module.scss";
import { Box, Palette, House } from "lucide-react";
import type { AppDispatch, RootState } from "../../redux/store";
import { setCurrentOption } from "../../redux/slices/sceneSlice";

export function OptionsPanel() {

  const dispatch = useDispatch<AppDispatch>();
  const currentOption = useSelector((state: RootState) => state.scene.currentOption);

  return (
    <>
      <div className={styles.optionsPanelContainer}>
        <div title="Meshes" onClick={() => dispatch(setCurrentOption("mesh"))}>
          <Box size={30} strokeWidth={1} className={`${styles.optionIcons} ${currentOption === "mesh" ? styles.optionIconsActive : ""}`} />
        </div>
        <div title="Materials" onClick={() => dispatch(setCurrentOption("material"))}>
          <Palette size={30} strokeWidth={1} className={`${styles.optionIcons} ${currentOption === "material" ? styles.optionIconsActive : ""}`} />
        </div>
        <div title="Environments" onClick={() => dispatch(setCurrentOption("environment"))}>
          <House size={30} strokeWidth={1} className={`${styles.optionIcons} ${currentOption === "environment" ? styles.optionIconsActive : ""}`} />
        </div>
      </div>
    </>
  );
}
