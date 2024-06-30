import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { createContext, useState } from "react";

// Create a ThemeContext with default value 'light'
export const ThemeContext = createContext({
  theme: 'regular',
  toggleTheme: () => {}
});

export default function App() {
  const [theme, setTheme] = useState('regular');

  // Toggle theme function
  const toggleTheme = () => {
    if (theme === 'regular') {
      setTheme('typewritter');
    } else {
      setTheme('regular');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <Navbar />
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
};
