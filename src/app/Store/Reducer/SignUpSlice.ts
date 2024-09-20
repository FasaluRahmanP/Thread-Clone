import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface SignupState {
    name: string;
    username: string;
    email: string;
    phoneNumber: string,
    password: string;
    confirmPassword: string;
    status: "Idle" | "Loading" | "Successfull" | "Failed";
    error: string | null;
}
const initialState: SignupState = {
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    status: "Idle",
    error: null
}
export const SignupUser = createAsyncThunk(
    'signup/signupUser',
    async (userData: { name: string; username: string; email: string; phoneNumber: string; password: string; }, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://social-media-rest-apis.onrender.com/api/users/signup", userData)
            return response.data;
        }
        catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

const SignupSlice = createSlice({
    name: "Signup",
    initialState,
    reducers: {
        SetName: (state, action) => {
            state.name = action.payload
        },
        SetUserName: (state, action) => {
            state.username = action.payload
        },
        SetEmail: (state, action) => {
            state.email = action.payload
        },
        SetPhone: (state, action) => {
            state.phoneNumber = action.payload
        },
        SetPassword: (state, action) => {
            state.password = action.payload
        },
        SetConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SignupUser.pending, (state) => {
                state.status = "Loading";
            })
            .addCase(SignupUser.fulfilled, (state) => {
                state.status = "Successfull";
            })
            .addCase(SignupUser.rejected, (state,action) => {
                state.status = "Failed";
                state.error = action.payload as string
            })
    }
})
export const { SetName, SetUserName, SetEmail, SetPhone, SetPassword, SetConfirmPassword } = SignupSlice.actions
export default SignupSlice.reducer