export type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: {
    email: string;
    name: string;
    profileColor: string;
  };
  orderLoading: boolean;
  loginUserError: string | null;
  loginUserRequest: boolean | null;
};