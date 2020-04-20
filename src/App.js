import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
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
        <NewTodoForm
          newTodo={this.state.newTodo}
          formSubmitted={this.formSubmitted.bind(this)}
          newTodoChanged={this.newTodoChanged.bind(this)}
        />
        <button onClick={() => this.allDone()}>All done</button>
        <TodoList
          todos={this.state.todos}
          toggleTodoDone={this.toggleTodoDone.bind(this)}
          removeTodo={this.removeTodo.bind(this)}
        />
      </div>
    );
  }
}

export default App;
