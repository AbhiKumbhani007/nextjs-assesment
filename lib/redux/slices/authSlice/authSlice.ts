import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import type { ReduxThunkAction } from "@/lib/redux";

const initialState: any = {
  sessionData: [],
  status: "false",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    setSessionData: (state, action) => {
      state.sessionData = action.payload;
      state.status = "true";
    },
    clearSessionData: (state) => {
      state.sessionData = [];
      state.status = "false";
    },
  },
});

export const { clearSessionData, setSessionData } = authSlice.actions;
