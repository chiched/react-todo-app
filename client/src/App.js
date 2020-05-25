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
      message: "My Work",
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
          console.log(res);
          const todos = res.data;
          this.setState({ todos });
        })
        .catch((error) => {
          window.location = "/";
          console.log(error.response);
        });
    } else {
      if (sessionStorage.user_id) {
        window.location = "/user/" + sessionStorage.user_id;
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
  removeTodo(event, index, id) {
    event.preventDefault();
    const todos = [...this.state.todos];
    console.log("remove todo started");

    axios.delete("/api/" + id).then((res) => {
      if (res.status === 200) {
        console.log("status 200 received");
        // todos.splice(index, 1);
        console.log(todos);
        todos.splice(index, 1);
        console.log(todos);
        this.setState({
          todos,
        });
      } else {
        console.log("status code wasn't 200");
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
        sessionStorage.user_id = res.data.id;
        this.setState({
          loggedIn: true,
        });
      })

      .catch((error) => {
        const loginError = error.response.data.message;
        this.setState({
          loginError,
        });
      })
      .then(() => (window.location = "/"));
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
        console.log("signed up");
        console.log(res);
        sessionStorage.user_id = res.data.id;
        console.log("test");

        window.location = "/";
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
  logout() {
    sessionStorage.removeItem("user_id");
    axios
      .get("/auth/logout")
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        this.state.loggedIn = false;
        window.location = "/";
      });
  }
  loggedIn() {
    if (sessionStorage.user_id) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div className="App">
        <navbar>
          <span>{this.state.message}</span>
          <div className="nav-right">
            <a
              href=""
              className={this.loggedIn() ? "visible logout" : "hidden logout"}
              onClick={() => this.logout()}
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
