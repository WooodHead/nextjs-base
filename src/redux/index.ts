import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./role-slice";

export const store = configureStore({
  reducer: {
    role: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
