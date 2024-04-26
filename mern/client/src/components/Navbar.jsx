import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/">
          <img alt="MongoDB logo" className="nav-logo" src="https://raw.githubusercontent.com/mongodb-developer/mern-stack-example/603144e25ba5549159d1962601337652a7bfa253/mern/client/src/assets/mongodb.svg"></img>
        </NavLink>

        <NavLink className="button" to="/create">
          Create Employee
        </NavLink>
      </nav>
    </div>
  );
}
