import { combineReducers } from 'redux';
import AuthReducers from '../reducers/reducer';
import { configureStore } from '@reduxjs/toolkit';
const RootReducers = combineReducers({
  //reducers
  AuthReducers,
});

export const store = configureStore({
  reducer: RootReducers,
});
