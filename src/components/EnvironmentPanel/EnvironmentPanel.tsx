import styles from "./EnvironmentPanel.module.scss";
import { SceneController } from "../../babylon-components/SceneController/SceneController";

export function EnvironmentPanel() {
    const hdriList = ["Default", "Misty", "Night", "Dusk", "Morning"];

    const loadHdri = (hdri: string) => {

        SceneController.setEnvironment(hdri);
    }

    return (
        <>
            <div className={styles.envContainer}>
                <div className={styles.envDiv}>
                    {
                        hdriList.map((hdri) => {
                            return (
                                <>
                                    <div className={styles.hdriDiv} onClick={() => loadHdri(hdri)}>
                                        <img src={`${hdri}.webp`} />
                                        <span>{hdri}</span>
                                    </div>

                                </>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}