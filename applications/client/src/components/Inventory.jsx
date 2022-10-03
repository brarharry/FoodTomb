import React, { Component } from "react";
import Navbar from "./Navbar-user";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Inventory.css";

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeFoodName = this.onChangeFoodName.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeExpiryDate = this.onChangeExpiryDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: "",
      foodName: "",
      displayName: "",
      quantity: "",
      expiryDate: "",
      foods: [],
      ids: [],
    };
  }

  componentDidMount() {
    // this.setState({
    //   foods: ["onion", "apples"],
    //   foodName: "onion",
    // });
    axios
      .get("http://localhost:5000/food/")
      .then((response) => {
        if (response.data.length > 0) {
          console.log("RESPONSE :" + JSON.stringify(response));
          this.setState({
            foods: response.data.map((food) => food.foodname),
            ids: response.data.map((food) => food._id),
            //id: response.data[0]._id,
            //foodName: response.data[0].foodname,
            //quantity: response.data[0].quantity,
            // expiryDate: response.data[0].expiryDate,
          });
        }
        console.log("foods: " + this.state.foods);
        //console.log("ids: " + this.state.ids);
        //console.log("QUANTITY: " + this.state.id);
      })
      .catch((error) => {
        console.log(error);
        console.log("EROOOOOOOOOOOORRRRRR");
      });
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangeFoodName(e) {
    this.setState({
      foodName: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onChangeExpiryDate(e) {
    this.setState({
      expiryDate: e.target.value,
    });
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
    let foodName = this.state.foodName;
    let index = this.state.foods.indexOf(foodName);
    console.log("foodName: " + foodName + "\nindex: " + index);

    axios
      .get("http://localhost:5000/food/" + this.state.ids[index])
      .then((response) => {
        console.log("RESPONSE: " + JSON.stringify(response));
        console.log("lengtfh: " + response.data.foodname);
        console.log("React App URL" + process.env.REACT_APP_API_URL);
        if (response.data) {
          this.setState({
            //foods: response.data.map((food) => food.foodname),
            foodName: response.data.foodname,
            displayName: response.data.foodname,
            quantity: response.data.quantity,
            expiryDate: response.data.expiryDate,
          });
          console.log("FOODNAME " + response.data.foodname);
        } else {
          console.log("NOT IFF");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("foods: " + this.state.foodName);
    // console.log("ids: " + this.state.id);
    // console.log("QUANTITY: " + this.state.quantity);
  }

  render() {
    return (
      <div>
        <Navbar> </Navbar>
        <form onSubmit={this.onSubmit}>
          <div className="drop-down-label">
            <label>Food: </label>

            <select
              //ref="userInput"
              required
              className="drop-down"
              value={this.state.foodName}
              onChange={this.onChangeFoodName}
            >
              <option value=" "></option>
              {this.state.foods.map(function (food) {
                return (
                  <option key={food} value={food}>
                    {food}
                  </option>
                );
              })}
            </select>
            <input type="submit" value="Enter" />
          </div>
        </form>
        <div>
          <p className="drop-down-label">Name : {this.state.displayName}</p>
          <p className="drop-down-label">Quantity : {this.state.quantity}</p>
          <p className="drop-down-label">
            Expiry Date : {this.state.expiryDate}
          </p>
        </div>
        <Link to="/addIngredient" className="button btn btn-success m-4">
          Add Ingredient
        </Link>
      </div>
    );
  }
}

export default Inventory;
