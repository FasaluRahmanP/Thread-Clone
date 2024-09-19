import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface SignupState {
    Name: string;
    UserName: string;
    Email: string;
    Phone: string,
    Password: string;
    ConfirmPassword: string;
    status: "Idle" | "Loading" | "Successfull" | "Failed";
    error: string | null;
}
const initialState: SignupState = {
    Name: "",
    UserName: "",
    Email: "",
    Phone: "",
    Password: "",
    ConfirmPassword: "",
    status: "Idle",
    error: null
}
export const SignupUser = createAsyncThunk(
    'signup/signupUser',
    async (userData: { Name: string; UserName: string; Email: string; Phone: string; Password: string; }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://social-media-rest-apis.onrender.com/api/users/signup", userData)
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
            state.Name = action.payload
        },
        SetUserName: (state, action) => {
            state.UserName = action.payload
        },
        SetEmail: (state, action) => {
            state.Email = action.payload
        },
        SetPhone: (state, action) => {
            state.Phone = action.payload
        },
        SetPassword: (state, action) => {
            state.Password = action.payload
        },
        SetConfirmPassword: (state, action) => {
            state.ConfirmPassword = action.payload
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