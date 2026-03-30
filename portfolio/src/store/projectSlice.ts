import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { projects as localProjects } from "../data/Projects";

export type ProjectCategory = "Web" | "Mobile" | "Design";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  shortDescription: string;
  longDescription: string;
  liveUrl: string;
  repoUrl?: string;
  previewImage?: string; // if using /public paths
};

type ProjectsState = {
  items: Project[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  // filters (Task 3 wants filters in Redux)
  selectedCategory: ProjectCategory | "All";
  query: string;
  sort: "title-asc" | "title-desc";
};

const initialState: ProjectsState = {
  items: [],
  status: "idle",
  error: null,
  selectedCategory: "All",
  query: "",
  sort: "title-asc",
};


export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async () => {
    // simulates an async fetch for loading state demonstration
    await new Promise((r) => setTimeout(r, 300));
    return localProjects;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<ProjectsState["selectedCategory"]>) {
      state.selectedCategory = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSort(state, action: PayloadAction<ProjectsState["sort"]>) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { setCategory, setQuery, setSort } = projectsSlice.actions;
export default projectsSlice.reducer;
