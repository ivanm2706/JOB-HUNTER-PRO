import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types/userType';
import axiosClient from '../../utils/axiosClient';
import type { AxiosError } from 'axios';
import axios from 'axios';

const getUserFromLocalStorage = (): User | null => {
  try {
    const data = localStorage.getItem('user');

    if (data) {
      return JSON.parse(data);
    }

    return null;
  } catch {
    return null;
  }
};

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

type AuthResponse = {
  user: User;
  token: string;
};

export const registerUser = createAsyncThunk<
  AuthResponse,
  { username: string; email: string; password: string },
  { rejectValue: { message: string } }
>('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const res = await axiosClient.post('/auth/register', userData);

    if (!res) {
      return thunkAPI.rejectWithValue({ message: 'res.error.message' });
    }

    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: (e as AxiosError<{ message: string }>).response?.data.message || 'faile to register',
    });
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: { message: string } }
>('auth/login', async (userData, thunkAPI) => {
  try {
    const res = await axiosClient.post('/auth/login', userData);

    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue({ message: e.response.data.message });
    }

    return thunkAPI.rejectWithValue({ message: 'login failed ' });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'failed register User';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
