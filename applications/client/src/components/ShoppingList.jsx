import React, { Component } from "react";
import Navbar from "./Navbar-user";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ShoppingList.css";
import TutorialDataService from "../services/InventoryService";
//import shoppingList from "../../../server/models/shoppingList.model";

class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeFoodName = this.onChangeFoodName.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: "",
      foodName: "",
      quantity: "",
      shoppingList: [],
    };
  }

  componentDidMount() {
    // this.setState({
    //   foods: ["onion", "apples"],
    //   foodName: "onion",
    // });
    axios
      .get("http://localhost:5000/shoppingList/")
      .then((response) => {
        if (response.data.length > 0) {
          console.log("RESPONSE :" + JSON.stringify(response));
          this.setState({
            foods: response.data.map((food) => food.foodName),
            quantities: response.data.map((food) => food.quantity),
            ids: response.data.map((food) => food._id),
            shoppingList: response.data,
            //id: response.data[0]._id,
            //foodName: response.data[0].foodname,
            //quantity: response.data[0].quantity,
            // expiryDate: response.data[0].expiryDate,
          });
        }
        console.log("shoppingList: " + this.state.shoppingList);
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

  addToInventory = (event) => {
    console.log("in addToInventory");
    // tempList = this.state.shoppingList;
    for (let i of this.state.shoppingList) {
      // console.log("i: " + i.foodName);
      var data = {
        title: i.foodName,
        description: i.quantity,
      };

      TutorialDataService.create(data)
        .then((response) => {
          this.setState({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            published: response.data.published,

            submitted: true,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      axios
        .delete("/shoppingList/" + i._id)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    window.location.reload(false);
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
    const { searchTitle, tutorials, currentTutorial, currentIndex } =
      this.state;

    return (
      <div>
        <Navbar></Navbar>
        <div className="shopping">
          <ul className="list-group cart">
            {this.state.shoppingList &&
              this.state.shoppingList.map((item) => (
                <li
                  className={
                    "list-group-item "
                    // + (index === currentIndex ? "active" : "")
                  }
                  // onClick={() => this.setActiveTutorial(tutorial, index)}
                  // key={index}
                >
                  {item.foodName}
                  <div className=" float-end"></div>
                </li>
              ))}
          </ul>
          {this.state.shoppingList && (
            <button className="addToInventory" onClick={this.addToInventory}>Add to Inventory 🛒 💸</button>
          )}
        </div>
      </div>
    );
  }
}

export default ShoppingList;
