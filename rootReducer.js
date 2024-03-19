// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
});

export default rootReducer;
