import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.css";

const Navbar = () => {
  return (
    <nav className="navbar1">
      <div className="links">
        <ul>
          <Link to="/" className="button m-4 border border-success float-end">
            HOME
          </Link>
          <Link to="/Navbar-about" className="button m-4 border border-success float-end">
            ABOUT
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
