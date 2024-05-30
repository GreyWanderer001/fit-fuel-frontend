import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";

import { User } from "./interfaces";

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("access_token") || null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, accessToken },
      }: PayloadAction<{ user: User; accessToken: string }>,
    ) => {
      state.user = user;
      state.accessToken = accessToken;
      localStorage.setItem("access_token", accessToken);
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    reset: () => ({ user: null, accessToken: null }),
  },
});

export const { setCredentials, setUser, reset } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
