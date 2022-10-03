import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.css";

const Navbar_about = () => {
  return (
    <nav className="navbar2">
      <div className="links">
        <ul>
          <Link to="/" className="button m-2 border border-success float-end">
            HOME
          </Link>
          <Link
            to="/uyen"
            className="button m-2 border border-success float-end"
          >
            Uyen
          </Link>
          <Link
            to="/manjot"
            className="button m-2 border border-success float-end"
          >
            Manjot
          </Link>
          <Link
            to="/raymond"
            className="button m-2 border border-success float-end"
          >
            Raymond
          </Link>
          <Link
            to="/harry"
            className="button m-2 border border-success float-end"
          >
            Harry
          </Link>
          <Link
            to="/kevin"
            className="button m-2 border border-success float-end"
          >
            Kevin
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar_about;
