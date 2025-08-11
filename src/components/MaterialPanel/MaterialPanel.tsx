import { useEffect, useState } from "react";
import { sceneManager } from "../../babylon-components/SceneManager/SceneManager";
import styles from "./MaterialPanel.module.scss";
import { Color3, PBRMaterial, StandardMaterial, type Material } from "@babylonjs/core";

export function MaterialPanel() {

    const [currentMaterial, setcurrentMaterial] = useState<Material | null>();
    const [matConfig, setMatConfig] = useState([{}]);

    const [currentMatType, setCurrentMatType] = useState<String>();
    const [opacity, setOpacity] = useState<number>(0);
    const [metallic, setMetallic] = useState<number>(0);
    const [roughness, setRoughness] = useState<number>(0);
    const [color, setColor] = useState<string>("");


    useEffect(() => {
        fetch("./materialConfig.json")
            .then((resp) => {
                if (resp.ok) return resp.json();
                else console.error("Failed to fetch material config")
            })
            .then((data) => setMatConfig(data))
            .catch((error) => console.error(error))
    }, [])

    const clearMat = () => {
        setCurrentMatType("");
        setOpacity(0);
        setRoughness(0);
        setMetallic(0);
        setColor("");
    }

    const applyMaterial = (material: Material) => {
        clearMat();

        setcurrentMaterial(material);
        if (material.metadata && material.metadata?.matConfig?.type) {
            setCurrentMatType(material.metadata?.matConfig?.type);
            setOpacity(material.metadata?.matConfig?.opacity);
            setRoughness(material.metadata?.matConfig?.roughness);
            setMetallic(material.metadata?.matConfig?.metallic);
            setColor(material.metadata?.matConfig?.color);
        }
    }

    const setMaterialConfig = (material: Material, materialConfig: any) => {
        material.metadata = material.metadata || {};
        material.metadata.matConfig = material.metadata.matConfig || {};
        clearMat();

        const color = materialConfig.color;
        const opacity = materialConfig.opacity;
        const metallic = materialConfig.metallic;
        const roughness = materialConfig.roughness;

        setCurrentMatType(materialConfig.type);
        setOpacity(opacity);
        setRoughness(roughness);
        setMetallic(metallic);
        setColor(color);

        if (material instanceof PBRMaterial) {
            material.albedoColor = Color3.FromHexString(color);
            material.alpha = opacity;
            material.metallic = metallic;
            material.roughness = roughness;
        }

        material.metadata.matConfig = { ...materialConfig, color, opacity, metallic, roughness };

        console.log("Material Config", material.metadata.matConfig);
    };


    const updateMaterial = (type: string, value: string | number) => {
        if (currentMaterial && currentMaterial instanceof PBRMaterial) {
            if (type === "color") {
                setColor(value as string);
                currentMaterial.albedoColor = Color3.FromHexString(value as string)
            }
            else if (type === "opacity") {
                setOpacity(value as number);
                currentMaterial.alpha = value as number;
            }
            else if (type === "metallic") {
                setMetallic(value as number);
                currentMaterial.metallic = value as number;
            }
            else if (type === "roughness") {
                setRoughness(value as number);
                currentMaterial.roughness = value as number;
            }
            currentMaterial!.metadata.matConfig[type] = value;
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
                        materials.map((material, idx) => {
                            if (material.name == "default material" || material.name == "skyBox" || material instanceof StandardMaterial) return;
                            return (
                                <p key={idx} className={`${styles.materialName} ${material.name === currentMaterial?.name ? styles.active : ""}`} onClick={() => applyMaterial(material)}>{material.name}</p>
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
                    matConfig?.map((material: any, idx) => {
                        return (
                            <>
                                <div key={idx} className={styles.materialType} onClick={() => setMaterialConfig(currentMaterial!, material)}>
                                    <img src={`${material.type}.jpg`} title={material.type} className={`${styles.materialThumbnail} ${(currentMaterial?.metadata.materialType || currentMatType) === material.type ? styles.active : ""}`} />
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
                        <input type="color" value={color} onChange={(e) => updateMaterial("color", e.target.value)} />
                    </div>
                    <div className={styles.opacityProp}>
                        <p>Opacity</p>
                        <input type="number" min={0} max={1} step={0.1} value={opacity} onChange={(e) => updateMaterial("opacity", Number(e.target.value))} />
                    </div>
                </div>
                <div className={styles.matSecondRow}>
                    <div className={styles.metallicProp}>
                        <p className={styles.metallicHeader}>Metallic :</p>
                        <div className={styles.metallicInput}>
                            <p>0</p>
                            <input type="range" min={0} max={1} step={0.1} value={metallic} onChange={(e) => updateMaterial("metallic", Number(e.target.value))} />
                            <p>1</p>
                        </div>
                    </div>
                    <div className={styles.metallicProp}>
                        <p className={styles.metallicHeader}>Rougness :</p>
                        <div className={styles.metallicInput}>
                            <p>0</p>
                            <input type="range" min={0} max={1} step={0.1} value={roughness} onChange={(e) => updateMaterial("roughness", Number(e.target.value))} />
                            <p>1</p>
                        </div>
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