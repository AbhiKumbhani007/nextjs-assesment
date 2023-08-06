import { authSlice, dashboardSlice } from "./slices";

// The `reducer` object holds the combined reducers from the "auth" and "dashboard" slices
export const reducer = {
  auth: authSlice.reducer, // The reducer for the "auth" slice
  dashboard: dashboardSlice.reducer, // The reducer for the "dashboard" slice
};
