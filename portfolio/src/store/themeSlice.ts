import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

type ThemeState = { mode: ThemeMode };

function applyThemeToDom(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

const initialTheme = getInitialTheme();
applyThemeToDom(initialTheme);

const initialState: ThemeState = { mode: initialTheme };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
      applyThemeToDom(action.payload);
    },
    toggleTheme(state) {
      const next: ThemeMode = state.mode === "dark" ? "light" : "dark";
      state.mode = next;
      localStorage.setItem("theme", next);
      applyThemeToDom(next);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
