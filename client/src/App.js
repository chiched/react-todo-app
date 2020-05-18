import React, { Component } from "react";
import axios from "axios";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./App.css";
import API_URL from "./HelperFunctions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "Hello Coding Garden",
      newTodo: "",
      todos: [],
      apitest: {},
      loginEmail: "",
      loginPassword: "",
      loginError: "",
      signupEmail: "",
      signupPassword: "",
      signupError: "",
    };
  }

  componentDidMount() {
    const url = window.location.pathname;
    let urlParams = url.split("/");
    console.log(urlParams[2]);
    console.log(typeof urlParams[2]);
    if (urlParams[1] === "user" && !isNaN(urlParams[2])) {
      axios.get(`/api/user/` + urlParams[2]).then((res) => {
        console.log(res);
        const todos = res.data;
        this.setState({ todos });
      });
    } else {
      axios.get(`/api/`).then((res) => {
        const todos = res.data;
        this.setState({ todos });
      });
    }
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
  handleLoginEmailChange(event) {
    const loginEmail = event.target.value;
    this.setState({
      loginEmail,
    });
  }
  handleLoginPasswordChange(event) {
    const loginPassword = event.target.value;
    this.setState({
      loginPassword,
    });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;
    const user = {
      email,
      password,
    };
    axios
      .post(`/auth/login`, user)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error.response);
        const loginError = error.response.data.message;
        this.setState({
          loginError,
        });
      });
  }
  handleSignupSubmit(event) {
    event.preventDefault();
    const email = this.state.signupEmail;
    const password = this.state.signupPassword;
    const user = {
      email,
      password,
    };
    console.log(user);
    axios
      .post(`/auth/signup`, user)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error.response);
        const signupError = error.response.data.message;
        this.setState({
          signupError,
        });
      });
  }
  handleSignupEmailChange(event) {
    const signupEmail = event.target.value;
    this.setState({
      signupEmail,
    });
  }

  handleSignupPasswordChange(event) {
    const signupPassword = event.target.value;
    this.setState({
      signupPassword,
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
          toggleTodoImportant={this.toggleTodoImportant.bind(this)}
          toggleTodoDone={this.toggleTodoDone.bind(this)}
          removeTodo={this.removeTodo.bind(this)}
        />
        <LoginForm
          handleLoginSubmit={this.handleLoginSubmit.bind(this)}
          handleLoginEmailChange={this.handleLoginEmailChange.bind(this)}
          handleLoginPasswordChange={this.handleLoginPasswordChange.bind(this)}
          loginEmail={this.state.loginEmail}
          loginPassword={this.state.loginPassword}
          loginError={this.state.loginError}
        />
        <SignupForm
          handleSignupSubmit={this.handleSignupSubmit.bind(this)}
          handleSignupEmailChange={this.handleSignupEmailChange.bind(this)}
          handleSignupPasswordChange={this.handleSignupPasswordChange.bind(
            this
          )}
          signupEmail={this.state.signupEmail}
          signupPassword={this.state.signupPassword}
          signupError={this.state.signupError}
        />
      </div>
    );
  }
}

export default App;
