import React, { Component } from "react";
import TutorialDataService from "../services/InventoryService";
import Navbar from "./Navbar-user";
import "../styles/components.css";

export default class EditFood extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description,
      },
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then((response) => {
        this.setState({
          currentTutorial: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      published: status,
    };

    TutorialDataService.update(this.state.currentTutorial._id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial._id,
      this.state.currentTutorial
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The food was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteTutorial() {
    TutorialDataService.delete(this.state.currentTutorial._id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/refrigerator");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        <Navbar></Navbar>
        <div>
          {currentTutorial ? (
            <div className="edit-form">
              <h4>Updating food details</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={currentTutorial.title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={currentTutorial.description}
                    onChange={this.onChangeDescription}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <strong>Status:</strong>
                  </label>
                  {currentTutorial.published ? "Expired" : "Not expired"}
                </div>
              </form>

              {currentTutorial.published ? (
                <button
                  className="badge bg-primary mr-2"
                  onClick={() => this.updatePublished(false)}
                >
                  Set food status back to not expired
                </button>
              ) : (
                <button
                  className="badge bg-primary mr-2"
                  onClick={() => this.updatePublished(true)}
                >
                  Set food status to Expired
                </button>
              )}

              <button
                className="badge bg-danger mr-2"
                onClick={this.deleteTutorial}
              >
                Delete
              </button>

              <button
                type="submit"
                className="badge bg-success"
                onClick={this.updateTutorial}
              >
                Update
              </button>
              <p>{this.state.message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
