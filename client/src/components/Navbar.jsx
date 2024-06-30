import { NavLink } from "react-router-dom";
import { ThemeContext } from "../App";
import { useContext } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <nav className="navbar">
        <NavLink to="/">
          <img alt="MongoDB logo" className="nav-logo" src="/mongodb.svg"></img>
        </NavLink>

        <button 
          id="themeButton" 
          data-testid="themeButton"
          className={`themeButton ${theme}`} 
          onClick={toggleTheme}
        >
          {theme}
        </button>

        <NavLink className="button" to="/create">
          Create Employee
        </NavLink>
      </nav>
    </div>
  );
}
