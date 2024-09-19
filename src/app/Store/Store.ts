import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "./Reducer/SignUpSlice";

 export const store=configureStore({
    reducer:{
        signup:SignupSlice
    }
})

export type Rootstate=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;