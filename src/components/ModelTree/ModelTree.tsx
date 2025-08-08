import { SceneController, type MeshNode } from "../../babylon-components/SceneController/SceneController";
import styles from "./ModelTree.module.scss";
import { useState } from "react";
import { sceneManager } from "../../babylon-components/SceneManager/SceneManager";
import { modelManager } from "../../babylon-components/ModelManager/ModelManager";

export function ModelTree() {

    const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());
    const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedNodes((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    const onMeshClick = (uniqueId: number) => {
        const mesh = sceneManager.Scene?.getMeshByUniqueId(uniqueId);
        if (!mesh) return;

        SceneController.clearEdges();
        SceneController.enableEdges(mesh);
        modelManager.focusModel(mesh);
        SceneController.pickedMesh = mesh;
    }

    const handleSelect = (id: number) => {
        setSelectedNodeId(id);
    };

    const renderTree = (node: MeshNode) => {
        const isExpanded = expandedNodes.has(node.mesh.uniqueId);
        const isSelected = selectedNodeId === node.mesh.uniqueId;

        return (
            <li key={node.mesh.uniqueId}>
                <div
                    className={`${styles.treeNode} ${isSelected ? styles.selected : ""}`}
                    onClick={() => handleSelect(node.mesh.uniqueId)}
                >
                    {node.children.length > 0 && (
                        <span
                            className={styles.expandToggle}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(node.mesh.uniqueId);
                            }}
                        >
                            {isExpanded ? "▼" : "▶"}
                        </span>
                    )}
                    <span className={styles.meshName} onClick={() => onMeshClick(node.mesh.uniqueId)}>{node.mesh.name}</span>
                </div>
                {isExpanded && node.children.length > 0 && (
                    <ul className={styles.nestedList}>
                        {node.children.map((child) => renderTree(child))}
                    </ul>
                )}
            </li>
        );
    };

    if (!SceneController.modelTree) {
        return <div className={styles.modelTreeContainer}><>No model loaded.</></div>;
    }

    return (
        <div className={styles.modelTreeContainer}>
            <h3 className={styles.meshTreeHeader}>Meshes</h3>
            <ul className={styles.rootList}>{renderTree(SceneController.modelTree)}</ul>
        </div>
    );
}
