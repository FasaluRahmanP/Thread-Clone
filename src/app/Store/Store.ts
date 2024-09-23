import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "./Reducer/SignUpSlice";
import UserSlice from "./Reducer/UserSlice"
import PostSlice from "./Reducer/PostSlice";

 export const store=configureStore({
    reducer:{
        signup:SignupSlice,
        users:UserSlice,
        posts:PostSlice
    }
})

export type Rootstate=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;