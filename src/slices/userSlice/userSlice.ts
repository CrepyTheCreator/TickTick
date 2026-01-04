import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from '../../utils/cookie';
import type { TUserState } from '../../utils/types';

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: {
    name: '',
    email: '',
    profileColor: ''
  },
  orderLoading: false,
  loginUserError: null,
  loginUserRequest: true
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
      state.data = { email: '', name: '', profileColor: ''};
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      state.isAuthenticated = false;
      state.isAuthChecked = false;
    }
  },
  selectors: {
    getUser: (state) => state.data
  },
  //extraReducers(builder) {
  //  
  //}
});

export const { logout } = userSlice.actions;
export const {
  getUser
} = userSlice.selectors;
export default userSlice.reducer;
