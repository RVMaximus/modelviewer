import styles from "./OptionsPanel.module.scss";
import { Box, Palette, Layers, AudioLines, Lightbulb, Camera, House } from "lucide-react";

export function OptionsPanel() {
  return (
    <>
      <div className={styles.optionsPanelContainer}>
        <div title="Meshes">
          <Box size={20} strokeWidth={1} className={styles.optionIcons} />
        </div>
        <div title="Materials">
          <Palette size={20} strokeWidth={1} className={styles.optionIcons} />
        </div>
        <div title="Textures">
          <Layers size={20} strokeWidth={1} className={styles.optionIcons} />
        </div>
        <div title="Sounds">
          <AudioLines
            size={20}
            strokeWidth={1}
            className={styles.optionIcons}
          />
        </div>
        <div title="Lights">
          <Lightbulb
            size={20}
            strokeWidth={1}
            className={styles.optionIcons}
          />
        </div>
        <div title="Cameras">
          <Camera size={20} strokeWidth={1} className={styles.optionIcons} />
        </div>
        <div title="Environments">
          <House size={20} strokeWidth={1} className={styles.optionIcons} />
        </div>
      </div>
    </>
  );
}
