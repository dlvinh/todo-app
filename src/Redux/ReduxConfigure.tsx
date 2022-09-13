import { configureStore } from "@reduxjs/toolkit";
import { AppStateReducer1 } from "./Reducers/AppReducer";

// const rootReducer = combineReducers({
//     AppState: AppStateReducer
// });

export const store = configureStore({
    reducer: {
        // AppState: AppStateReducer
        AppState: AppStateReducer1.reducer, // using redux tool kit createSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

