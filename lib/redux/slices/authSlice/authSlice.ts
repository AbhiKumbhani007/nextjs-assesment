// Import required modules and types
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the auth slice of the Redux store
const initialState: any = {
  sessionData: [], // An array to store session data
  status: "false", // A string representing the status of the session (either "true" or "false")
};

// Create the auth slice using createSlice function from Redux Toolkit
export const authSlice = createSlice({
  name: "auth", // The name of the slice
  initialState, // The initial state defined above
  reducers: {
    // Define the reducers, these functions modify the state when corresponding actions are dispatched

    // Reducer for setting session data
    setSessionData: (state, action) => {
      state.sessionData = action.payload; // Set the sessionData to the payload of the action
      state.status = "true"; // Set the status to "true"
    },

    // Reducer for clearing session data
    clearSessionData: (state) => {
      state.sessionData = []; // Clear the sessionData array
      state.status = "false"; // Set the status to "false"
    },
  },
});

// Export the actions created by the auth slice
export const { clearSessionData, setSessionData } = authSlice.actions;
