import { ArrowUpFromLine } from "lucide-react";
import styles from "./Viewer.module.scss";

export function Viewer() {
  return (
    <>
      {/* <div className={styles.viewerDiv}>
        <canvas id="renderCanvas" className={styles.viewerCanvas}></canvas>
      </div> */}
      <div className={styles.uploadButtonContainer}>
        <div className={styles.uploadButton}>
          <ArrowUpFromLine
            size={30}
            strokeWidth={1}
            className={styles.toolBarIcons}
          />
          <span>Upload Model</span>
        </div>
      </div>
    </>
  );
}
