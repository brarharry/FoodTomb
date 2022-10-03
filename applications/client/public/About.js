import React from "react";
import "./styles/components.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "About";

function About() {
    return (
        <Router>
          <div className="Intros">
            <Switch>
              <Route exact path="/">
                <About />
              </Route> 
              </Switch>
            </div>
            </Router>
    );
}

export default About;