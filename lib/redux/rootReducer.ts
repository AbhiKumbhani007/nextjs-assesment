/* Instruments */
import { authSlice, dashboardSlice } from "./slices";

export const reducer = {
  auth: authSlice.reducer,
  dashboard: dashboardSlice.reducer,
};
