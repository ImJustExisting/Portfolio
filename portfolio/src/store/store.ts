import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import projectsReducer from "./projectSlice";
import contactReducer from "./contactSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectsReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
