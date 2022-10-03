import React from "react";
import "./styles/components.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import Uyen from "./components/Uyen";
import Manjot from "./components/Manjot";
import Raymond from "./components/Raymond";
import Harry from "./components/Harry";
import Kevin from "./components/Kevin";
import Inventory from "./components/Inventory";
import Recipe from "./components/Recipes";
import ShoppingList from "./components/ShoppingList";
import Navbar_About from "./components/Navbar-about";
import Navbar_user from "./components/Navbar-user";
import Enter from "./components/Enter";
import signIn from "./components/SignIn";
import AddIngredient from "./components/AddIngredient";
import QRscanner from "./components/QRScanner";
import FoodList from "./components/FoodList";
import AddFood from "./components/AddFood";
import EditFood from "./components/EditFood";

function App() {
  return (
    <Router>
      <div className="Intros">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/uyen">
            <Uyen />
          </Route>
          <Route exact path="/manjot">
            <Manjot />
          </Route>
          <Route exact path="/raymond">
            <Raymond />
          </Route>
          <Route exact path="/harry">
            <Harry />
          </Route>
          <Route exact path="/kevin">
            <Kevin />
          </Route>
          <Route exact path="/inventory">
            <Inventory />
          </Route>
          <Route exact path="/recipes">
            <Recipe />
          </Route>
          <Route exact path="/shoppingList">
            <ShoppingList />
          </Route>
          <Route exact path="/navbar-about">
            <Navbar_About />
          </Route>
          <Route exact path="/navbar-user">
            <Navbar_user />
          </Route>
          <Route exact path="/addIngredient">
            <AddIngredient />
          </Route>
          <Route exact path="/enter/:email/:link">
            <Enter signIn={signIn} />
          </Route>
          <Route exact path="/qr_scanner">
            <QRscanner />
          </Route>
          <Route exact path={["/", "/refrigerator"]} component={FoodList} />
          <Route exact path="/add-food" component={AddFood} />
          <Route path="/refrigerator/:id" component={EditFood} />
          {/* <Route
            path="/enter/:email/:link"
            element={<Enter signIn={signIn} />}
          />
          <Route path="/" element={<Home />} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
