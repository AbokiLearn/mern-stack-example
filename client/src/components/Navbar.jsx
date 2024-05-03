import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/">
          <img alt="MongoDB logo" className="nav-logo" src="/mongodb.svg"></img>
        </NavLink>

        <NavLink className="button" to="/create">
          Create Employee
        </NavLink>
      </nav>
    </div>
  );
}
