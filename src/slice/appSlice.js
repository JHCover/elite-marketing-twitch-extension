import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    marketingStats: {}
}
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setInitialStats: (state, action) => {
            state.marketingStats = action.payload;
        }
    }
});

export const { setInitialStats } = appSlice.actions;
export const selectTitle = state => state.app.title;
export default appSlice.reducer;
