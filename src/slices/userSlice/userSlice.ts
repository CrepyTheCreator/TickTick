import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import type { TUserState } from '../../utils/types';
import { loginUserApi, refreshUserApi, registerUserApi, type TLoginData, type TRegisterData } from '../../utils/api';

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: {
    name: '',
    profileColor: ''
  },
  loginUserError: null,
  loginUserRequest: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ username, profileColor, password }: TRegisterData) => {
    const data = await registerUserApi({username, profileColor, password});
    setCookie('accessToken', data.accessToken);
    //localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }: TLoginData) => {
    const data = await loginUserApi({username, password});
    setCookie('accessToken', data.accessToken);
    //localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const refreshUser = createAsyncThunk(
  'user/refresh',
  async () => {
    const data = await refreshUserApi();
    setCookie('accessToken', data.accessToken);
    return data;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = { name: '', profileColor: ''};
      deleteCookie('accessToken');
      state.isAuthenticated = false;
      state.isAuthChecked = false;
    }
  },
  selectors: {
    getUser: (state) => state.data,
    getUserRequest: (state) => state.loginUserRequest,
    getAuthCheck: (state) => state.isAuthChecked,
    getAuthenticate: (state) => state.isAuthenticated
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true
        state.data = {name: '', profileColor: ''}
        state.isAuthChecked = false
        state.isAuthenticated = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loginUserRequest = false
        state.data.name = action.payload.username
        state.data.profileColor = action.payload.profileColor
        state.isAuthChecked = true
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state) => {
        state.loginUserRequest = false
        state.isAuthChecked = false
        state.isAuthenticated = false
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true
        state.isAuthChecked = false
        state.isAuthenticated = false
        state.data = {name: '', profileColor: ''}
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false
        state.isAuthChecked = true
        state.isAuthenticated = true
        state.data.name = action.payload.username
        state.data.profileColor = action.payload.profileColor
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginUserRequest = false
        state.isAuthChecked = false
        state.isAuthenticated = false
      })
      .addCase(refreshUser.pending, (state) => {
        state.loginUserRequest = true
        state.isAuthChecked = false
        state.isAuthenticated = false
        state.data = {name: '', profileColor: ''}
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loginUserRequest = false
        state.isAuthChecked = true
        state.isAuthenticated = true
        state.data.name = action.payload.username
        state.data.profileColor = action.payload.profileColor
      })
      .addCase(refreshUser.rejected, (state) => {
        state.loginUserRequest = false
        state.isAuthChecked = false
        state.isAuthenticated = false
      })
  }
});

export const { logout } = userSlice.actions;
export const {
  getUser,
  getUserRequest,
  getAuthCheck,
  getAuthenticate
} = userSlice.selectors;
export default userSlice.reducer;
