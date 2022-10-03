import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar-user";
import axios from "axios";
import "../styles/Recipes.css";

let rand = 0;
class Recipes extends Component {
  constructor(props) {
    super(props);

    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: "",
      recipeName: "",
      displayName: "",
      description: "",
      recipes: [],
      ingredientsNeeded: [],
      ids: [],
      availableIngredients: [],
      missingIngredients: [],
    };
  }

  componentDidMount() {
    // this.setState({
    //   foods: ["onion", "apples"],
    //   foodName: "onion",
    // });
    this.getAvailableIngredients();
    //this.getRandom();
    axios
      .get("http://localhost:5000/recipe/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            recipes: response.data.map((recipe) => recipe.recipeName),
            ids: response.data.map((recipe) => recipe._id),
            //id: response.data[0]._id,
            //foodName: response.data[0].foodname,
            //quantity: response.data[0].quantity,
            // expiryDate: response.data[0].expiryDate,
          });
        }
        //console.log("foods: " + this.state.foods);
        //console.log("ids: " + this.state.ids);
        //console.log("QUANTITY: " + this.state.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangeRecipeName(e) {
    this.setState({
      recipeName: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  getAvailableIngredients() {
    axios
      .get("http://localhost:5000/api/tutorials/")
      .then((response) => {
        if (response.data.length > 0) {
          console.log("response in getMiss " + JSON.stringify(response.data));
          this.setState({
            availableIngredients: response.data.map((items) => items.title),
            //ids: response.data.map((recipe) => recipe._id),
            //id: response.data[0]._id,
            //foodName: response.data[0].foodname,
            //quantity: response.data[0].quantity,
            // expiryDate: response.data[0].expiryDate,
          });
        }
        console.log("availableIngredients " + this.state.availableIngredients);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("foods: " + this.state.foodName);
    // console.log("ids: " + this.state.id);
    // console.log("QUANTITY: " + this.state.quantity);
  }

  getMissingIngredients() {
    //console.log("length" + this.state.missingIngredients.length);
    let templength = this.state.missingIngredients.length;
    const missingCont = document.getElementById("missingIngList");
    missingCont.innerHTML = "";
    for (let i = 0; i < templength; i++) {
      this.state.missingIngredients.pop();
    }
    console.log("here 3 :" + this.state.ingredientsNeeded.length);
    for (let i = 0; i < this.state.ingredientsNeeded.length; i++) {
      let missing = true;
      for (let j = 0; j < this.state.availableIngredients.length; j++) {
        if (
          this.state.ingredientsNeeded[i] == this.state.availableIngredients[j]
        ) {
          console.log("here 2");
          missing = false;
          // this.state.missingIngredients.push()
        }
      }
      if (missing) {
        console.log("here");
        this.setState({
          missingIngredients: this.state.missingIngredients.concat([
            this.state.ingredientsNeeded[i],
          ]),
        });
        // create emelemt and add to ui /*******************new*************/
        const newMissingIngr = document.createElement("li");
        newMissingIngr.className = "list-group-item";
        const missingIngrName = document.createTextNode(
          this.state.ingredientsNeeded[i]
        );
        newMissingIngr.append(missingIngrName);

        const missingIngrBtn = document.createElement("button");
        missingIngrBtn.className = "btn btn-xs btn-success float-end";
        const btnText = document.createTextNode("add to shopping list");
        const addedText = document.createTextNode("added!");
        missingIngrBtn.append(btnText);
        missingIngrBtn.onclick = function () {
          this.innerHTML = "";
          this.className = "btn btn-xs btn-success float-end";
          this.append(addedText);
          this.disabled = "disabled";

          console.log(missingIngrName.textContent);

          axios
            .post("/shoppingList/add", {
              foodName: missingIngrName.textContent,
              quantity: 1,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        };

        newMissingIngr.append(missingIngrBtn);
        missingCont.append(newMissingIngr);

        //this.state.missingIngredients.push(this.state.ingredientsNeeded[i]);
      }
    }
  }
  // getRandom() {
  //   console.log("called 1");
  //   rand = Math.floor(Math.random() * 4000);
  //   console.log("called");
  //   return rand;
  // }

  addMissingIngrToList(value, btn) {
    return function () {
      console.log(value);
      console.log(JSON.stringify(btn.id));
      console.log(btn);
      //btn.textContent = "Added";
      //btn.innerHTML = `<span style="background-color: salmon">Button clicked<span>`;
      // document.btn.innnerHTML = "New Button Text using innerHTML";
      // console.log(btn.innerHTML);

      // axios
      //   .post("/shoppingList/add", {
      //     foodName: value,
      //     quantity: 1,
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    };
  }

  updateID() {
    rand = rand + 1;
  }

  onSubmit(e) {
    e.preventDefault();

    // const food = {
    //   foodName: this.state.foodName,
    //   quantity: this.state.quantity,
    //   expiryDate: this.state.expiryDate,
    // };

    // console.log(JSON.stringify(food));

    //window.location = "/";
    // console.log(typeof this.state.foods);
    let recipeName = this.state.recipeName;
    let index = this.state.recipes.indexOf(recipeName);
    //console.log("foodName: " + foodName + "\nindex: " + index);

    axios
      .get("http://localhost:5000/recipe/" + this.state.ids[index])
      .then((response) => {
        // console.log("RESPONSE: " + JSON.stringify(response));
        // console.log("length: " + response.data.foodname);
        if (response.data) {
          this.setState({
            //foods: response.data.map((food) => food.foodname),
            recipeName: response.data.recipeName,
            displayName: response.data.recipeName,
            description: response.data.description,
            ingredientsNeeded: response.data.ingredientsNeeded,
          });
          console.log("Ingredients Needed " + response.data.ingredientsNeeded);
          this.getMissingIngredients();
          console.log("foods: " + this.state.missingIngredients);
        } else {
          console.log("NOT IFF");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("ids: " + this.state.id);
    // console.log("QUANTITY: " + this.state.quantity);
  }

  render() {
    return (
      <div>
        <Navbar> </Navbar>
        <form onSubmit={this.onSubmit}>
          <div className="drop-down-label">
            <label className="label2">Recipe: </label>

            <select
              //ref="userInput"
              required
              className="drop-down"
              value={this.state.recipeName}
              onChange={this.onChangeRecipeName}
            >
              <option value=" "></option>
              {this.state.recipes.map(function (recipe) {
                return (
                  <option key={recipe} value={recipe}>
                    {recipe}
                  </option>
                );
              })}
            </select>
            <input className="enter-button" type="submit" value="Enter" />
          </div>
        </form>
        <div>
          <h3 className="drop-down-label recipe-name">
            {" "}
            {this.state.displayName}
          </h3>

          {this.state.description && (
            <p className="drop-down-label">
              Description : {this.state.description}
            </p>
          )}
        </div>

        <div className="row">
          <div className="col-md-6 ingredients">
            {this.state.description && (
              <h4>
                <b>Ingredients:</b>
              </h4>
            )}

            <ul className="list-group recipe">
              {this.state.ingredientsNeeded &&
                this.state.ingredientsNeeded.map((ingredient) => (
                  <li
                    className={
                      "list-group-item"
                      // + (index === currentIndex ? "active" : "")
                    }
                    // onClick={() => this.setActiveTutorial(tutorial, index)}
                    // key={index}
                  >
                    {ingredient}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6 missing-ingredient">
            {this.state.description && (
              <h4>
                <b>You are missing:</b>
              </h4>
            )}

            <ul className="list-group" id="missingIngList">
              {/* {this.state.missingIngredients &&
                this.state.missingIngredients.map((missingIngr) => (
                  <li
                    className={
                      "list-group-item "
                      // + (index === currentIndex ? "active" : "")
                    }
                    // onClick={() => this.setActiveTutorial(tutorial, index)}
                    // key={index}
                  >
                    {missingIngr}
                    {this.updateID}
                    {/* <Link to="/shoppingList"> 
                    <button
                      id={missingIngr}
                      onClick={this.addMissingIngrToList(
                        missingIngr,
                        document.getElementById({ missingIngr })
                      )}
                      className="btn btn-xs btn-success float-end"
                    >
                      add to shopping list
                    </button> */}

              {/* </Link> */}
              {/* </li> */}
              {/* ))} */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipes;
