import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Contact from "../pages/Contact";
import contactReducer from "../store/contactSlice";
import themeReducer from "../store/themeSlice";

function renderContact() {
  const store = configureStore({
    reducer: {
      contact: contactReducer,
      theme: themeReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    </Provider>,
  );
}

describe("Contact form", () => {
  it("renders all form fields", () => {
    renderContact();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    renderContact();

    // blur each field to trigger touched state and show errors
    fireEvent.blur(screen.getByLabelText(/name/i));
    fireEvent.blur(screen.getByLabelText(/email/i));
    fireEvent.blur(screen.getByLabelText(/subject/i));
    fireEvent.blur(screen.getByLabelText(/message/i));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it("shows email format error for invalid email", async () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "notanemail" },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it("disables submit button when form is invalid", () => {
    renderContact();
    const button = screen.getByRole("button", { name: /send message/i });
    expect(button).toBeDisabled();
  });
});
