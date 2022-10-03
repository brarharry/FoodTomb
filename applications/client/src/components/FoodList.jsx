import React, { Component } from "react";
import TutorialDataService from "../services/InventoryService";
import { Link } from "react-router-dom";
import Navbar from "./Navbar-user";
import "../styles/Inventory.css";

export default class FoodList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then((response) => {
        this.setState({
          tutorials: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });

    TutorialDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          tutorials: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } =
      this.state;

    return (
      <div>
        <Navbar></Navbar>
        <div className="foodlist">
        <div className="row">
          <div className="col-sm-9">
            <div className="input-group">
                  <input
                    type="text"
                    className="search-box"
                    placeholder="Search for items .."
                    value={searchTitle}
                    onChange={this.onChangeSearchTitle}
                  />
                  <div className="input-group-append">
                    <button
                      className="search-button"
                      type="button"
                      onClick={this.searchTitle}
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
            {/* <ul className="list-group">
              {tutorials &&
                tutorials.map((tutorial, index) => (
                  <li
                    className={
                      "list-group-item list-group-item-action list-group-item-success border-0 height-5 rounded-3" +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    key={index}
                  >
                    {tutorial.title}
                  </li>
                ))}
            </ul>
            
            <div className="add-remove">
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllTutorials}
            >
              Remove All
            </button>
            <Link to="/add-food" className="m-3 btn btn-sm btn-success">
              Add Item
            </Link>
            <Link to="/qr_scanner" className="m-3 btn btn-sm btn-success">
              Add Item with Barcode
            </Link>
          </div> */}
          
          

          
          
        </div>
        </div>





          <div className="row">
          <div className="col-11">
            <div className="row">
            <div className="col-7">

                {/* <div className="input-group">
                  <input
                    type="text"
                    className="search-box"
                    placeholder="Search for items .."
                    value={searchTitle}
                    onChange={this.onChangeSearchTitle}
                  />
                  <div className="input-group-append">
                    <button
                      className="search-button"
                      type="button"
                      onClick={this.searchTitle}
                    >
                      SEARCH
                    </button>
                  </div>
                </div> */}
            
                <ul className="list-group">
              {tutorials &&
                tutorials.map((tutorial, index) => (
                  <li
                    className={
                      "list-group-item list-group-item-action list-group-item-secondary border-0 height-5 rounded-3" +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    key={index}
                  >
                    {tutorial.title}
                  </li>
                ))}
            </ul>
            
            <div className="add-remove">
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllTutorials}
            >
              Remove All
            </button>
            <Link to="/add-food" className="m-3 btn btn-sm btn-success">
              Add Item
            </Link>
            <Link to="/qr_scanner" className="m-3 btn btn-sm btn-success">
              Add Item with Barcode
            </Link>
          </div>
            </div>
          

              <div className="col-4">
              <div className="food-desc">
                {currentTutorial ? (
                  <div className="tag-desc">
                    
                    <div className="item-name">
                      <label>
                        <strong>Item:</strong>
                      </label>{" "}
                      {currentTutorial.title}
                    </div>
                    <div className="item-quantity">
                      <label>
                        <strong>Quantity:</strong>
                      </label>{" "}
                      {currentTutorial.description}
                    </div>
                    <div className="item-status">
                      <label>
                        <strong>Status:</strong>
                      </label>{" "}
                      {currentTutorial.published ? "Expired" : "Not expired"}
                    </div>
                    <div  className="edit-button">
                    <Link
                      to={"/refrigerator/" + currentTutorial._id}
                      className="btn btn-sm btn-secondary"
                    >
                      Edit
                    </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <br />
          
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>

        
        
        </div>
      </div>
    );
  }
}
