// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { registerUser } = userSlice.actions;

export const selectUserData = state => state.user.userData;

export default userSlice.reducer;
