import appReducer from "./slice/appSlice";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        app: appReducer,
    },
});
