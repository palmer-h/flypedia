import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as authApi from '~api/auth';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  userId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthTokens: (
      state,
      action: PayloadAction<{
        accessToken: AuthState['accessToken'];
        refreshToken: AuthState['refreshToken'];
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: state => {
      state.accessToken = '';
      state.refreshToken = '';
      state.userId = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
    });
  },
});

export const login = createAsyncThunk(
  'auth/login',
  async (email: string, password: string) => {
    const res = await authApi.authenticate(email, password);
    return {
      userId: res.data.userId,
      accessToken: res.data.authToken,
      refreshToken: res.data.refreshToken,
    };
  },
);

export const { setAuthTokens, logout } = authSlice.actions;

export default authSlice.reducer;
