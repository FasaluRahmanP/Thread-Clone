import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User{
    _id:string,
    username:string,
    email:string,
    profilePic:string
}
interface Post{
    _id: string;
    postById: User;
    text: string;
    image?: string;
    likes: string[];
    replies: string[];
    createdOn: string;

}
interface PostState{
    posts:Post[],
    status:"IDLE"|"Loading"|"Successfull"|"Failed";
    error:string|null;
}

const initialState:PostState={
    posts:[],
    status:"IDLE",
    error:null
}
export const fetchPosts=createAsyncThunk("posts,fetchPosts",async()=>{
    const response=await axios.get("https://social-media-rest-apis.onrender.com/api/posts");
    return response.data.posts
})

const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending,(state)=>{
            state.status="Loading";
            state.error=null
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status="Successfull";
            state.posts=action.payload;
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status="Failed";
            state.error=action.error.message||"Failed to Fetch Post"
        })
    }
})
export default postSlice.reducer