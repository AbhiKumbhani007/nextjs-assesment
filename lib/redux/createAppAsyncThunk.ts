// Import the `createAsyncThunk` function from Redux Toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import types for Redux state and dispatch from the "store" file (not shown in the provided code)
import type { ReduxState, ReduxDispatch } from "./store";

// Define the `createAppAsyncThunk` utility function using `createAsyncThunk.withTypes`
// This function takes three generic type parameters: state, dispatch, and rejectValue.
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: ReduxState; // The type for the Redux state in which the async thunk will operate
  dispatch: ReduxDispatch; // The type for the dispatch function to be used in the async thunk
  rejectValue: string; // The type for the reject value if the async operation fails
}>();
