// reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true', // Initialize from session storage
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem('isAuthenticated', 'true'); // Store in session storage
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.setItem('isAuthenticated', 'false'); // Store in session storage
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem('isAuthenticated', 'true'); // Store in session storage
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
