import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
// import { RootState } from "./types"; // Adjust the import based on where you define RootState

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production", // Optional: Enable devTools only in non-production environment
});

export default store;

// Type for the state of the entire store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
