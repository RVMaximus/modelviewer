import { createSlice } from "@reduxjs/toolkit";

// Create slice and export it use across app
export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => { state.value += 1 },
        decrement: (state) => { state.value -= 1 },
        incrementByValue: (state, action) => { state.value = action.payload }
    }
})

//export the generated Redux action creators and the reducer function for the whole slice
export const { increment, decrement, incrementByValue } = counterSlice.actions
export default counterSlice.reducer