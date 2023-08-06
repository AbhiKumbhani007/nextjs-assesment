// Import required modules and types
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { contentfulClient } from "@/app/api/contentfulData/contentfulConfig";

// Define the initial state for the dashboard slice of the Redux store
const initialState: any = {
  contenfulData: [], // An array to store the fetched Contentful data
  status: "false", // A string representing the status of the data (either "true" or "false")
};

// Define an asynchronous thunk to fetch Contentful data
export const getContentfulData: any = createAppAsyncThunk(
  "auth/getContentfulData",
  async () => {
    const response = contentfulClient.getEntries(); // Fetch data using Contentful client
    return response; // Return the fetched data
  }
);

// Create the dashboard slice using createSlice function from Redux Toolkit
export const dashboardSlice = createSlice({
  name: "dashboard", // The name of the slice
  initialState, // The initial state defined above
  reducers: {}, // No additional reducers defined in this case
  extraReducers: (builder) => {
    // Define extra reducers, these functions handle actions dispatched by async thunks

    builder.addCase(getContentfulData.fulfilled, (state, action) => {
      // Handle the fulfilled action when getContentfulData async thunk is resolved successfully

      state.contenfulData = action.payload.items; // Set the contenfulData to the payload items received from the fulfilled action
      state.status = "true"; // Set the status to "true"
    });
  },
});

// No actions defined in the reducers section, so there are no exported actions from the dashboard slice.
