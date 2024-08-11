import { IAuth } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoAction } from "./actions";

interface AuthState {
  user: IAuth | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserInfoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfoAction.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(getUserInfoAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default auth.reducer;

export const {} = auth.actions;
