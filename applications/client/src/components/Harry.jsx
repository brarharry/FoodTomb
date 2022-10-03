import React, { Component } from "react";
import Navbar from "./Navbar-about";
import "../styles/Harry.css";

const Harry = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="box">
        <h2 className="name">Harry Brar</h2>
        <h3 className="name">Team Lead</h3>
        <img className="photo" src={"witcher.jpg"}></img>
      </div>
    </div>
  );
};
export default Harry;
