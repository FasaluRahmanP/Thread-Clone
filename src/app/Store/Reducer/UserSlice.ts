import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchuser=createAsyncThunk("user/fetchuser",async()=>{
    const response=await axios.get("https://social-media-rest-apis.onrender.com/api/users/")
    return response.data.users
})
interface user{
    id:string,
    name:string,
    email:string,
    username:string

}
interface userstate{
    users:user[];
    status:"Idle"|"Loading"|"Successfull"|"Failed"
    error:string|null
}
const initialState:userstate={
    users:[],
    status:"Idle",
    error:null
}
const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(buildres)=>{
        buildres
        .addCase(fetchuser.pending,(state)=>{
            state.status="Loading";
        })
        .addCase(fetchuser.fulfilled,(state,action)=>{
            state.status="Successfull";
            state.users=action.payload
        })
        .addCase(fetchuser.rejected,(state,action)=>{
            state.status="Failed";
            state.error=action.error as string
        })

    }
})
export default userSlice.reducer