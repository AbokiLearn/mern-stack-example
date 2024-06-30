import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Navbar from './Navbar';
import { ThemeContext } from '../App';

describe('Navbar', () => {
  it('renders navbar with logo and links', () => {
    render(
      <Router>
        <ThemeContext.Provider value={{ theme: 'regular', toggleTheme: jest.fn() }}>
          <Navbar />
        </ThemeContext.Provider>
      </Router>
    );

    expect(screen.getByAltText('MongoDB logo')).toBeInTheDocument();
    expect(screen.getByText('Create Employee')).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', () => {
    const mockToggleTheme = jest.fn();
    render(
      <Router>
        <ThemeContext.Provider value={{ theme: 'regular', toggleTheme: mockToggleTheme }}>
          <Navbar />
        </ThemeContext.Provider>
      </Router>
    );

    const themeButton = screen.getByRole('button', { name: 'regular' });

    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('displays correct theme on button', () => {
    render(
      <Router>
        <ThemeContext.Provider value={{ theme: 'typewritter', toggleTheme: jest.fn() }}>
          <Navbar />
        </ThemeContext.Provider>
      </Router>
    );

    expect(screen.getByText('typewritter')).toBeInTheDocument();
  });
});