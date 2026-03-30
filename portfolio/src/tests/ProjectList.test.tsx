import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ProjectsList from '../pages/projects/ProjectList';
import projectsReducer from '../store/projectSlice';
import themeReducer from '../store/themeSlice';

function renderProjectsList() {
  const store = configureStore({
    reducer: {
      projects: projectsReducer,
      theme: themeReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ProjectsList />
      </MemoryRouter>
    </Provider>
  );
}

describe('ProjectsList', () => {
  it('shows loading state initially', () => {
    renderProjectsList();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders projects after loading', async () => {
    renderProjectsList();
    await waitFor(() => {
      expect(screen.getByText(/budget buddy/i)).toBeInTheDocument();
    });
  });

  it('renders search input', async () => {
    renderProjectsList();
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/search by title or tag/i)
      ).toBeInTheDocument();
    });
  });

  it('renders category filter', async () => {
    renderProjectsList();
    await waitFor(() => {
      expect(screen.getByDisplayValue(/all/i)).toBeInTheDocument();
    });
  });
});