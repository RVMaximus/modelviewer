import { useState } from "react";
import { sceneManager } from "../../babylon-components/SceneManager/SceneManager";
import styles from "./MaterialPanel.module.scss";
import { StandardMaterial, type Material } from "@babylonjs/core";

const materialList = ["Gold", "Silver", "Bronze", "Fabric", "Wood", "Glass", "Plastic"];

export function MaterialPanel() {
    const [currentMaterial, setcurrentMaterial] = useState<Material | null>();
    const [currentMatType, setCurrentMatType] = useState<String>();

    const applyMaterial = (material: Material) => {
        setCurrentMatType("");
        setcurrentMaterial(material);

        if (material.metadata && material.metadata.materialType) {
            setCurrentMatType(material.metadata.materialType);
        }
    }

    const setMatType = (materialType: string) => {
        setCurrentMatType(materialType);
        currentMaterial!.metadata = { ...(currentMaterial!.metadata || {}), materialType: materialType }
    }

    const getMaterials = () => {
        if (!sceneManager.Scene) return <>No Materials loaded</>

        const materials = sceneManager.Scene.materials;

        if (materials && materials.length) {
            return (
                <>
                    <h3 className={styles.materialHeader}>Materials</h3>
                    {
                        materials.map((material) => {
                            if (material.name == "default material" || material.name == "skyBox" || material instanceof StandardMaterial) return;
                            return (
                                <p className={`${styles.materialName} ${material.name === currentMaterial?.name ? styles.active : ""}`} onClick={() => applyMaterial(material)}>{material.name}</p>
                            )
                        })
                    }
                </>
            )
        }
        else return <></>
    }

    const renderMaterialType = () => {
        return (
            <div className={styles.materialTypeContainer}>
                {
                    materialList.map((material: string) => {
                        return (
                            <>
                                <div className={styles.materialType} onClick={() => setMatType(material)}>
                                    <img src={`${material}.jpg`} title={material} className={`${styles.materialThumbnail} ${(currentMaterial?.metadata.materialType || currentMatType) === material ? styles.active : ""}`} />
                                </div>
                            </>
                        )
                    })
                }
            </div>
        )
    }

    const renderMaterialProperties = () => {
        return (
            <>
                <div className={styles.matFirstRow}>
                    <div className={styles.colorProp}>
                        <p>Color</p>
                        <input type="color" />
                    </div>
                    <div className={styles.opacityProp}>
                        <p>Opacity</p>
                        <input type="number" />
                    </div>
                </div>
                <div className={styles.matSecondRow}>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={styles.materialPanelContainer}>
                {getMaterials()}
            </div>
            {currentMaterial ? renderMaterialType() : <></>}
            {currentMatType ? renderMaterialProperties() : <></>}
        </>
    )
}