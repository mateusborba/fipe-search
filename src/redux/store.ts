import { configureStore } from "@reduxjs/toolkit";
import mySliceReducer from "@/redux/features/slice"

export const store = configureStore({
    reducer: {
        mySlice: mySliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch