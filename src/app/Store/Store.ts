import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "./Reducer/SignUpSlice";
import UserSlice from "./Reducer/UserSlice"

 export const store=configureStore({
    reducer:{
        signup:SignupSlice,
        users:UserSlice
    }
})

export type Rootstate=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;