import { createSlice } from "@reduxjs/toolkit";

export const sceneSlice = createSlice({
    name: "scene",
    initialState: {
        isModelLoaded: false,
        isModelLoading: false,
        showToast: false,
        toastContent: "",
        toastType: "",
        pickedMeshName: "",
        renderMeshTree: false,
        currentOption: ""
    },
    reducers: {
        setIsModelLoaded: (state, action) => { state.isModelLoaded = action.payload },
        setModelLoading: (state, action) => { state.isModelLoading = action.payload },
        setShowToast: (state, action) => { state.showToast = action.payload },
        setToastContent: (state, action) => { state.toastContent = action.payload },
        setToastType: (state, action) => { state.toastType = action.payload },
        setPickedMesh: (state, action) => { state.pickedMeshName = action.payload },
        setRenderMeshTree: (state, action) => { state.renderMeshTree = action.payload },
        setCurrentOption: (state, action) => { state.currentOption = action.payload }
    }
})

export const {
    setIsModelLoaded,
    setModelLoading,
    setShowToast,
    setToastContent,
    setToastType,
    setPickedMesh,
    setRenderMeshTree,
    setCurrentOption
} = sceneSlice.actions;
export default sceneSlice.reducer;