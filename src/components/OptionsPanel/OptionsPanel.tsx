import styles from "./OptionsPanel.module.scss";
import { Box, Palette, Layers, AudioLines } from "lucide-react";

export function OptionsPanel() {
  return (
    <>
      <div className={styles.optionsPanelContainer}>
        <div title="Meshes">
          <Box size={30} strokeWidth={1} className={styles.optionIcons} />
        </div>
        <div title="Materials">
          <Palette size={30} strokeWidth={1} className={styles.optionIcons} />
        </div>
        <div title="Textures">
          <Layers size={30} strokeWidth={1} className={styles.optionIcons} />
        </div>
        <div title="Sounds">
          <AudioLines
            size={30}
            strokeWidth={1}
            className={styles.optionIcons}
          />
        </div>
      </div>
    </>
  );
}
