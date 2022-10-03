import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.css";

const Navbar_user = () => {
  return (
    <nav className="navbar2">
      <div className="">
          <ul>
          <Link to="/" className="button m-4 border border-success float-end">
            LOGOUT
          </Link>
          <Link to="/refrigerator" className="button m-4 border border-success float-end">
            INVENTORY
          </Link>
          <Link to="/recipes" className="button m-4 border border-success float-end">
            RECIPES
          </Link>
          <Link to="/shoppingList" className="button m-4 border border-success float-end">
            SHOPPING LIST
          </Link>
        </ul>
        </div>
        
    </nav>
  );
};

export default Navbar_user;
