import { axiosInstance } from "@/Axios/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface User {
    _id: string
    name: string
    username: string
    email: string
    profilePic: string
}
interface Notification {
    id: string
    description: string
    senderuserId: User
}
interface NotificationState {
    notification: Notification[]
    status: "Idle" | "Loading" | "Succeeded" | "Failed"
    error: string | null
}
const initialState: NotificationState = {
    notification: [],
    status: "Idle",
    error: null

}
export const fetchNotification=createAsyncThunk(
    "fetch/fetchNotification",
    async()=>{
        try{
            const userId=localStorage.getItem("userId")
            if(userId){
                const response=await axiosInstance.get(`api/users/notification/${userId}`)
                return response.data.notification
            }
        }catch(error){
            console.log("Error",error)
        }
    }
)
export const NotificationSlice=createSlice({
    name:"notification",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNotification.pending,(state)=>{
            state.status="Loading"
            state.error=null
        })
        .addCase(fetchNotification.fulfilled,(state,action)=>{
            state.status="Succeeded"
            state.notification=action.payload
        })
        .addCase(fetchNotification.rejected,(state,action)=>{
            state.status="Failed"
            state.error=action.error.message||"Failed to get Notification"
        })
    }
})
export default NotificationSlice.reducer