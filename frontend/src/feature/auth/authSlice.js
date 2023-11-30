import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: JSON.parse(localStorage.getItem("auth"))?.access_token || null,
  user: JSON.parse(localStorage.getItem("auth"))?.user || null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.access_token = null;
      state.user = null;

      localStorage.removeItem("auth");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
