import { axiosInstance } from "@/Axios/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    _id: string;
    profilePic: string
    email: string
    username: string
}
interface Reply {
    _id: string
    text: string
    image?: string
}
interface Post {
    _id: string
    text: string
    postById: User
    image?: string
    likes: string[]
    replies: Reply[]
    createdOn: string
    reposts: string[]
    userId: string
    username: string
    userProfilePic: string
    comments: number;
    createdAt: string
    updatedAt: string
    __V: number
}
interface PostState {
    posts: Post[]
    status: "IDLE" | "Loading" | "Successfull" | "Failed"
    error: string | null
}
const initialState: PostState = {
    posts: [],
    status: "IDLE",
    error: null
}
export const fetchPostByUserId = createAsyncThunk(
    "posts/fetchPostByUserId",
    async (userId: string) => {
        const response = await axiosInstance.get("api/posts/${userId}")
        return response.data.post
    }
)
export const fetchPosts = createAsyncThunk(
    "posts,fetchPosts",
    async () => {
        const response = await axiosInstance.get("api/posts")
        return response.data.posts
    }
)
export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async (newPost: { userId: string; text: string; image: string }, { rejectWithValue }) => {
        try {
            console.log("Sending new post data", newPost)
            const response = await axiosInstance.post("api/posts", newPost)
            console.log("Recieved Response", response)
            console.log("Response data", response.data)
            return response.data
        } catch (error: any) {
            console.log("Error in adding newpost", error)
            if (error.response) {
                console.log("Error Response from API", error.response)
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue({ message: "Failed to add new Post" })
            }
        }
    }
)
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "Loading";
                state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "Successfull";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.error.message || "Failed to Fetch Post"
            })
            .addCase(fetchPostByUserId.pending, (state) => {
                state.status = "Loading"
                state.error = null
            })
            .addCase(fetchPostByUserId.fulfilled,(state,action:PayloadAction<Post[]>)=>{
                state.status="Successfull"
                state.error=null
            })
            .addCase(fetchPostByUserId.rejected, (state,action) => {
                state.status = "Failed"
                state.error = action.error.message||"Failed to Fetch Post"
            })
    }
})
export default postSlice.reducer