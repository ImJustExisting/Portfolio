import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ContactState = {
  status: "idle",
  error: null,
};


export const submitContactForm = createAsyncThunk<void, ContactPayload>(
  "contact/submitContactForm",
  async (payload) => {
    await new Promise((r) => setTimeout(r, 800));

    void payload;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactStatus(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { resetContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
