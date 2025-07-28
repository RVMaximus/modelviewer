import { createSlice } from "@reduxjs/toolkit";

export const sceneSlice = createSlice({
    name: "scene",
    initialState: {
        camera: {},
        light: {},
        model: {},
        isModelLoaded: false
    },
    reducers: {
        setCameraData: (state, action) => {state.camera = action.payload.camera},
        setLightData: (state, action) => {state.light = action.payload.light},
        setModelData: (state, action) => {state.model = action.payload.model},
        setIsModelLoaded: (state, action) => {state.isModelLoaded = action.payload}
    }
})

export const {setCameraData, setLightData, setModelData, setIsModelLoaded} = sceneSlice.actions;
export default sceneSlice.reducer;