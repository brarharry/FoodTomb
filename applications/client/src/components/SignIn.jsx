import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Enter from "./Enter";
//import Navbar from "./Navbar-user";
import UserEmail from "./UserEmail";
import Home from "./Home";

const URL = "http://localhost:5000";

function SignIn() {
  console.log("here 1");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Dealing with the token
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const verify_token = async () => {
      if (token === null) return setLoggedIn(false);
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(`${URL}/users/verify`);
        return response.data.ok ? login(token) : logout();
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, []);

  // ---

  // Sign in, log in, log out
  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };
  const signIn = async (email, magicLink) => {
    try {
      console.log("errorr 1");
      let res = await axios.post(`${URL}/users/enter`, { email, magicLink });
      //console.log("errorr 2");
      if (res.data.token) {
        alert(res.data.message);
        console.log(res.data.token);
        login(res.data.token);
      } else {
        console.log("here");
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };
  // ---

  // Event listeners
  const enterEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const emailSubmit = (e) => {
    e.preventDefault();
    signIn(userEmail);
    console.log("IN EMAIL SUBMIT" + userEmail);
    setUserEmail("");
  };
  // ---

  return (
    <div className="App">
      {!loggedIn ? (
        <UserEmail
          enterEmail={enterEmail}
          emailSubmit={emailSubmit}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      <Router>
        <Switch>
          <Route
            path="/enter/:email/:link"
            element={<Enter signIn={signIn} />}
          />
          <Route path="/" element={<Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default SignIn;
