import styles from "./ToolBar.module.scss";
import {
  ArrowUpFromLine,
  Lightbulb,
  Camera,
  // RectangleGoggles,
  House,
} from "lucide-react";

export function ToolBar() {
  return (
    <>
      <div className={styles.toolBarContainer}>
        <div className={styles.leftToolBarIconsDiv}>
          <div title="Upload Model">
            <ArrowUpFromLine
              size={30}
              strokeWidth={1}
              className={styles.toolBarIcons}
            />
          </div>
          {/* <div title="View in your room">
            <RectangleGoggles
              size={30}
              strokeWidth={1}
              className={styles.toolBarIcons}
            />
          </div> */}
        </div>
        <div className={styles.rightToolBarIconsDiv}>
          <div title="Lights">
            <Lightbulb
              size={30}
              strokeWidth={1}
              className={styles.toolBarIcons}
            />
          </div>
          <div title="Cameras">
            <Camera size={30} strokeWidth={1} className={styles.toolBarIcons} />
          </div>
          <div title="Environments">
            <House size={30} strokeWidth={1} className={styles.toolBarIcons} />
          </div>
        </div>
      </div>
    </>
  );
}
