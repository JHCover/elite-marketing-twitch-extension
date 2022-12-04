import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.value = action.payload;
        },
        decrement: (state, action) => {
            state.value = action.payload;
        },
        setCount: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { increment, decrement, setCount } = counterSlice.actions;
export const selectCount = state => state.counter.value;
export default counterSlice.reducer;