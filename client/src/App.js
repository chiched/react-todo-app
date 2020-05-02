import React, { Component } from "react";
import axios from "axios";
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
      apitest: {},
      email: "",
      password: "",
    };
  }
  componentDidMount() {
    axios.get(`/api`).then((res) => {
      const todos = res.data;
      this.setState({ todos });
    });
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

  toggleTodoDone(event, index, id) {
    const todos = [...this.state.todos];
    todos[index].done = event.target.checked;
    console.log("data: " + JSON.stringify(todos[index]));
    axios
      .put("/api/" + id, {
        title: todos[index].title,
        done: todos[index].done,
        important: todos[index].important,
      })
      .then((res) => {
        console.log(res.data);
        return res;
      });
    this.setState({ todos });
  }

  toggleTodoImportant(event, index, id) {
    let todos = [...this.state.todos];
    console.log("first todo " + JSON.stringify(todos));
    todos[index].important = !todos[index].important;
    axios
      .put("/api/" + id, {
        title: todos[index].title,
        done: todos[index].done,
        important: todos[index].important,
      })
      .then((res) => {
        todos = res.data;
        console.log("second todo " + JSON.stringify(res.data));
        this.setState({ todos });
      });
  }
  removeTodo(index, id) {
    const todos = [...this.state.todos];
    axios.delete("/api/" + id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("status 200 received");
        todos.splice(index, 1);
        console.log("new todos: " + JSON.stringify(todos));
        this.setState({
          todos,
        });
      }
    });
  }
  handleEmailChange(event) {
    const email = event.target.value;
    this.setState({
      email,
    });
  }
  handlePasswordChange(event) {
    const password = event.target.value;
    this.setState({
      password,
    });
  }
  handleLoginSubmit(event) {
    event.preventDefault();
    console.log("Login submitted");
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
          toggleTodoImportant={this.toggleTodoImportant.bind(this)}
          toggleTodoDone={this.toggleTodoDone.bind(this)}
          removeTodo={this.removeTodo.bind(this)}
        />

        <div className="login">
          <h2>Login Form</h2>
          <form className="form" onSubmit={this.handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={this.handleEmailChange.bind(this)}
                type="email"
                className="form-control"
                id="email"
                placeholder="hello@world.com"
                value={this.state.email}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={this.handlePasswordChange.bind(this)}
                type="password"
                value={this.state.password}
                className="form-control"
                id="password"
                placeholder="keyboard cat"
                required
              />
              <p className="help-block"> Help text here.</p>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
