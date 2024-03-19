// store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import userReducer from './userSlice';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import persistConfig from './persistConfig';
import {

  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store);


export default store;


