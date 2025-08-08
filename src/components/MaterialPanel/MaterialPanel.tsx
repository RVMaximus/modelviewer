import { useState } from "react";
import { sceneManager } from "../../babylon-components/SceneManager/SceneManager";
import styles from "./MaterialPanel.module.scss";
import { Color3, PBRMaterial, type Material } from "@babylonjs/core";

const materialList = ["Gold", "Silver", "Fabric", "Wood", "Glass", "Plastic"];

export function MaterialPanel() {
    const [currentMaterial, setcurrentMaterial] = useState<Material>();

    const applyMaterial = (material: Material) => {
        setcurrentMaterial(material);

        if (material instanceof PBRMaterial) {
            material.albedoColor = Color3.FromHexString("#CC7E35");
            material.roughness = 0.15;
            material.metallic = 0.65
        }
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
                            if (material.name == "default material" || material.name == "skyBox") return;
                            return (
                                <p className={styles.materialName} onClick={() => applyMaterial(material)}>{material.name}</p>
                            )
                        })
                    }
                </>
            )
        }
        else return <></>
    }

    const renderMaterialProperties = () => {
        return (
            <div className={styles.materialTypeContainer}>
                {
                    materialList.map((material: string) => {
                        return (
                            <>
                                <div className={styles.materialType}>

                                </div>
                            </>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <>
            <div className={styles.materialPanelContainer}>
                {getMaterials()}
            </div>
            {currentMaterial ? renderMaterialProperties() : <></>}
        </>
    )
}