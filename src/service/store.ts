import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import feedSlice from '../slices/feedSlice/feedSlice';
//import userSlice from '../slices/userSlice/userSlice';

const rootReducer = combineReducers({
  feed: feedSlice
  //user: userSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
