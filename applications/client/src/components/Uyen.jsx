import React from "react";
import Navbar from "./Navbar-about";
import "../styles/Uyen.css";

const Uyen = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className="introUyen">
        <h2 className="indIntro">Uyen Vo🌻</h2>
        <p>Role: Front end</p>
        <img src="cat.png" width="250" height="200"></img>
      </div>
    </div>
  );
};

export default Uyen;
