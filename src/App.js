import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "Hello Coding Garden",
      newTodo: "",
    };
  }
  formSubmitted(event) {
    event.preventDefault();
    console.log("form submitted");
  }
  newTodoChanged(event) {
    this.setState({
      newTodo: event.target.value,
    });
    console.log(event.target.value);
  }
  render() {
    return (
      <div className="App">
        <h3>{this.state.message}</h3>
        <form onSubmit={this.formSubmitted}>
          <label htmlFor="newTodo">New Todo</label>
          <input
            onChange={(event) => this.newTodoChanged(event)}
            id="newTodo"
            name="newTodo"
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}

export default App;
