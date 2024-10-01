import { axiosInstance } from "@/Axios/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any | null;
  status: 'IDLE' | 'LOADING' | 'SUCCESSFULL' | 'FAILED';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'IDLE',
  error: null,
};

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData: { username: string; password: string }, { rejectWithValue }) => {
    try {
      console.log(userData)
      const response = await axiosInstance.post('api/users/login', userData);
      return response.data;

    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);


const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.status = 'IDLE';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'SUCCESSFULL';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'FAILED';
        state.error = action.payload;
      });
  },
});

export const { resetState } = loginSlice.actions;

export default loginSlice.reducer;