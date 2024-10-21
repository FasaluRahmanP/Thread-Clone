import { axiosInstance } from "@/Axios/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface User {
    _id: string
    name: string
    username: string
    email: string
    profilePic: string | any
    notification: any;
}
interface Notification {
    id: string
    description: string
    senderUserId: User
}
interface NotificationState {
    notifications: Notification[]
    status: "Idle" | "Loading" | "Succeeded" | "Failed"
    error: string | null
}
const initialState: NotificationState = {
    notifications: [],
    status: "Idle",
    error: null

}
export const fetchNotification = createAsyncThunk(
    "fetch/fetchNotification",
    async () => {
        try {
            const userId = localStorage.getItem("userId")
            if (userId) {
                const response = await axiosInstance.get(`api/users/notification/${userId}`)
                // console.log(response.data)
                return response.data.notifications
            }
            throw new Error('User ID not found in localstorsge');
        } catch (error: any) {
            console.log("Error", error)
            throw error.response?.data?.message || error.message;

        }
    }
)
export const NotificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotification.pending, (state) => {
                state.status = "Loading"
                state.error = null
            })
            .addCase(fetchNotification.fulfilled, (state, action) => {
                console.log(action)
                state.status = "Succeeded";
                state.notifications = action.payload;
            })
            .addCase(fetchNotification.rejected, (state, action) => {
                state.status = "Failed"
                state.error = action.error.message || "Failed to get Notification"
            })
    }
})
export default NotificationSlice.reducer