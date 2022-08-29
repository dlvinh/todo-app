import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { AppStateReducer } from "./Reducers/AppReducer";

// const rootReducer = combineReducers({
//     AppState: AppStateReducer
// });

export const store = configureStore({
    reducer: {
        AppState: AppStateReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

