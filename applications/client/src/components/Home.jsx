import React from "react";
import Navbar from "./Navbar";
import LogIn from "./SignIn";
import "../styles/SignIn.css";

const Home = () => {
  return (
    <div class="home-container">
      <Navbar></Navbar>
      <LogIn></LogIn>
    </div>
  );
};

export default Home;
