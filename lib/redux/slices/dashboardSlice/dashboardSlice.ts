import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { contentfulClient } from "@/app/api/contentfulData/contentfulConfig";

const initialState: any = {
  contenfulData: [],
  status: "false",
};

export const getContentfulData: any = createAppAsyncThunk(
  "auth/getContentfulData",
  async () => {
    const response = contentfulClient.getEntries();
    return response;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContentfulData.fulfilled, (state, action) => {
      state.contenfulData = action.payload.items;
      state.status = "true";
    });
  },
});


