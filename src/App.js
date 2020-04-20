import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "Hello Coding Garden",
      newTodo: "",
      todos: [],
    };
  }
  formSubmitted(event) {
    event.preventDefault();
    console.log(this.state.newTodo);
    this.setState({
      newTodo: "",
      todos: [
        ...this.state.todos,
        {
          title: this.state.newTodo,
          done: false,
        },
      ],
    });
  }
  newTodoChanged(event) {
    const newTodo = event.target.value;
    this.setState({
      newTodo,
    });
  }
  toggleTodoDone(event, index) {
    console.log(event.target.checked);
    const todos = [...this.state.todos];
    // todos[index] = {...todos[index]};
    todos[index].done = event.target.checked;
    console.log(todos);
    this.setState({
      todos,
    });
  }
  removeTodo(index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({
      todos,
    });
  }
  allDone() {
    const todos = this.state.todos.map((todo) => {
      return {
        ...todo, // title: todo.title,
        done: true,
      };
    });
    this.setState({
      todos,
    });
  }

  render() {
    return (
      <div className="App">
        <h3>{this.state.message}</h3>
        <form onSubmit={(event) => this.formSubmitted(event)}>
          <label htmlFor="newTodo">Newest Todo</label>
          <input
            onChange={(event) => this.newTodoChanged(event)}
            id="newTodo"
            name="newTodo"
            value={this.state.newTodo}
          />
          <button type="submit">Add Todo</button>
        </form>
        <button onClick={() => this.allDone()}>All done</button>
        <ul>
          {this.state.todos.map((todo, index) => {
            return (
              <li key={index}>
                <input
                  onChange={(event) => this.toggleTodoDone(event, index)}
                  type="checkbox"
                  checked={todo.done}
                />
                {/* <span
                  style={{
                    textDecoration: todo.done ? "line-through" : "inherit",
                  }}
                >
                  {todo.title}
                </span> */}
                <span className={todo.done ? "done" : ""}>{todo.title}</span>
                <button onClick={() => this.removeTodo(index)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
