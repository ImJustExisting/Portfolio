import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Navbar from '../components/navbar/Navbar';
import themeReducer from '../store/themeSlice';

function renderNavbar(initialPath = '/') {
  const store = configureStore({
    reducer: { theme: themeReducer },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );
}

describe('Navbar', () => {
  it('renders all navigation links', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    renderNavbar();
    expect(
      screen.getByRole('button', { name: /switch to/i })
    ).toBeInTheDocument();
  });

  it('home link points to correct route', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
  });

  it('projects link points to correct route', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '/projects');
  });
});