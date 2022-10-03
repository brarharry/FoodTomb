import React from "react";
import Navbar from "./Navbar-user";
import { Link } from "react-router-dom";

const AddIngredient = () => {
  return (
    <div>
      <Navbar> </Navbar>
      <input placeholder="Ingredient"></input>
      <input placeholder="Quantity"></input>
      <Link to="/inventory" className="button btn btn-success m-4">
        Add Ingredient
      </Link>
      <Link to="/barcode" className="button btn btn-success m-4">
        Add Ingredient with Barcode
      </Link>
    </div>
  );
};

export default AddIngredient;
