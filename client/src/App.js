import React, { Component } from "react";
import axios from "axios";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "My To-Do App",
      newTodo: "",
      todos: [],
      apitest: {},
      loginEmail: "",
      loginPassword: "",
      loginError: "",
      signupEmail: "",
      signupPassword: "",
      signupError: "",
      showingLogin: false,
      showingSignup: false,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside.bind(this));

    const url = window.location.pathname;
    let urlParams = url.split("/");
    if (urlParams[1] === "user" && !isNaN(urlParams[2])) {
      axios
        .get(`/api/user/` + urlParams[2])
        .then((res) => {
          const todos = res.data;
          this.setState({ todos });
        })
        .catch((error) => {
          window.location = "/";
        });
    } else {
      if (document.cookie) {
        const cookie = document.cookie.split("=");
        window.location = "/user/" + cookie[1];
        this.setState({
          loggedIn: true,
        });
      }
      axios.get(`/api/`).then((res) => {
        const todos = res.data;
        this.setState({ todos });
      });
    }
  }

  handleClickOutside(event) {
    const loginButton = document.getElementsByClassName("login");
    const signupButton = document.getElementsByClassName("signup");

    if (
      !loginButton.item(0).contains(event.target) &&
      !loginButton.item(1).contains(event.target)
    ) {
      const showingLogin = false;
      this.setState({ showingLogin });
    }
    if (
      !signupButton.item(0).contains(event.target) &&
      !signupButton.item(1).contains(event.target)
    ) {
      const showingSignup = false;
      this.setState({ showingSignup });
    }
    // showingLogin: false,
    //   showingSignup: false,
  }
  formSubmitted(event) {
    event.preventDefault();
    if (this.state.newTodo !== "") {
      axios
        .post("/api/", {
          title: this.state.newTodo,
          done: false,
          important: false,
        })
        .then((res) => {
          const todo = {
            id: res.data.id,
            title: res.data.title,
            done: false,
            important: false,
          };

          this.setState({
            newTodo: "",
            todos: [...this.state.todos, todo],
          });
        });
    }
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
    axios
      .put("/api/" + id, {
        title: todos[index].title,
        done: todos[index].done,
        important: todos[index].important,
      })
      .then((res) => {
        return res;
      });
    this.setState({ todos });
  }

  toggleTodoImportant(event, index, id) {
    let todos = [...this.state.todos];
    todos[index].important = !todos[index].important;
    axios
      .put("/api/" + id, {
        title: todos[index].title,
        done: todos[index].done,
        important: todos[index].important,
      })
      .then((res) => {
        todos = res.data;
        this.setState({ todos });
      });
  }
  removeTodo(event, index, id) {
    event.preventDefault();
    const todos = [...this.state.todos];

    axios.delete("/api/" + id).then((res) => {
      if (res.status === 200) {
        todos.splice(index, 1);
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
      .then(() => (window.location = "/"))
      .catch((error) => {
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
    if (password.length >= 6) {
      axios
        .post(`/auth/signup`, user)
        .then((res) => {
          window.location = "/";
        })
        .catch((error) => {
          const signupError = error.response.data.message;
          this.setState({
            signupError,
          });
        });
    } else {
      const signupError = "Min. 6 characters";
      this.setState({
        signupError,
      });
    }
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
  logout(event) {
    event.preventDefault();
    axios.get("/auth/logout").then(() => {
      window.location = "/";
    });
  }
  loggedIn() {
    if (document.cookie) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div className="App">
        <span
          className={
            this.loggedIn() ? "hidden demo-message" : "visible demo-message"
          }
        >
          This is a demo that's accessible to all. Please signup to access your
          personal to-do list.
        </span>
        <navbar>
          <span>
            {this.loggedIn() ? "You are logged in" : this.state.message}
          </span>
          <div className="nav-right">
            <a
              href=""
              className={this.loggedIn() ? "visible logout" : "hidden logout"}
              onClick={(event) => this.logout(event)}
              title="Logout"
            >
              Logout <FontAwesomeIcon className="logout" icon={faSignOutAlt} />
            </a>

            <a
              href=""
              className={`${this.loggedIn() ? "hidden " : "visible "} ${
                this.state.showingSignup ? "active " : ""
              } signup`}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ showingSignup: true });
              }}
            >
              Signup
            </a>
            <a
              href=""
              className={`${this.loggedIn() ? "hidden " : "visible "} ${
                this.state.showingLogin ? "active " : ""
              } login`}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ showingLogin: true });
              }}
            >
              Login <FontAwesomeIcon className="logout" icon={faSignInAlt} />
            </a>

            <LoginForm
              handleLoginSubmit={this.handleLoginSubmit.bind(this)}
              handleLoginEmailChange={this.handleLoginEmailChange.bind(this)}
              handleLoginPasswordChange={this.handleLoginPasswordChange.bind(
                this
              )}
              loginEmail={this.state.loginEmail}
              loginPassword={this.state.loginPassword}
              loginError={this.state.loginError}
              showingLogin={this.state.showingLogin}
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
              showingSignup={this.state.showingSignup}
            />
          </div>
        </navbar>

        <NewTodoForm
          newTodo={this.state.newTodo}
          formSubmitted={this.formSubmitted.bind(this)}
          newTodoChanged={this.newTodoChanged.bind(this)}
        />
        <TodoList
          todos={this.state.todos}
          toggleTodoImportant={this.toggleTodoImportant.bind(this)}
          toggleTodoDone={this.toggleTodoDone.bind(this)}
          removeTodo={this.removeTodo.bind(this)}
        />
      </div>
    );
  }
}

export default App;
