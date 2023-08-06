import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import { reducer } from "./rootReducer"; // Imports the combined reducer from './rootReducer'
import { middleware } from "./middleware"; // Imports the middleware array from './middleware'

// Configure and create the Redux store using Redux Toolkit's configureStore function
export const reduxStore = configureStore({
  reducer, // Pass the combined reducer to the store configuration
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware); // Concatenate custom middleware with Redux Toolkit's default middleware
  },
});

// Define a custom useDispatch function to use the Redux store's dispatch function with type support
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();

// Define a custom useSelector hook with type support for selecting state from the Redux store
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = typeof reduxStore; // Type definition for the Redux store
export type ReduxState = ReturnType<typeof reduxStore.getState>; // Type definition for the Redux state
export type ReduxDispatch = typeof reduxStore.dispatch; // Type definition for the Redux dispatch function
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>; // Type definition for Redux Thunk actions, with optional return type
