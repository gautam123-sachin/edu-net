// reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

// Load user details from session storage
const loadUserFromSessionStorage = () => {
  const user = sessionStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const initialState = {
  user: loadUserFromSessionStorage(),
  isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true', // Initialize from session storage
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem('user', JSON.stringify(action.payload)); // Store user in session storage
      sessionStorage.setItem('isAuthenticated', 'true'); // Store authentication status in session storage
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('user'); // Remove user from session storage
      sessionStorage.setItem('isAuthenticated', 'false'); // Store authentication status in session storage
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem('user', JSON.stringify(action.payload)); // Store user in session storage
      sessionStorage.setItem('isAuthenticated', 'true'); // Store authentication status in session storage
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
