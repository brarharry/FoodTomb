import React from "react";
import "../styles/SignIn.css";

const UserEmail = (props) => {
  return (
    <div className="sign-in-form-container">
      <form className="signin-form" onSubmit={props.emailSubmit}>
        <h5 class="signin-header"><br/><br/><br/><br/></h5>
        <input
          className="signin-form-field"
          placeholder="Email"
          onChange={props.enterEmail}
          type="email"
          value={props.userEmail}
        ></input>
        <div className="sign-in-form-submit-container">
          <button className="signin-form-submit">SIGN IN</button>
        </div>
      </form>
    </div>
  );
};

export default UserEmail;
