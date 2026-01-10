import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from '../../utils/cookie';
import type { TUserState } from '../../utils/types';

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

//export const loginUser = createAsyncThunk(
//  'user/loginUser',
//  async ({ email, password }: Omit<TRegisterData, 'name'>, thunkAPI) => {
//    const data = {};
//    if (!data?.success) {
//      return thunkAPI.rejectWithValue(data);
//    }
//    setCookie('accessToken', data.accessToken);
//    localStorage.setItem('refreshToken', data.refreshToken);
//    return data.user;
//  }
//);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = { name: '', profileColor: ''};
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
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
  //extraReducers(builder) {
  //  
  //}
});

export const { logout } = userSlice.actions;
export const {
  getUser,
  getUserRequest,
  getAuthCheck,
  getAuthenticate
} = userSlice.selectors;
export default userSlice.reducer;
