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
      showInstallMessage: false,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside.bind(this));

    if (this.isIos() && !this.isInStandaloneMode()) {
      this.setState({ showInstallMessage: true });
    }
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

  // Detects if device is on iOS
  isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    var isSafari =
      /Safari/.test(navigator.userAgent) &&
      /Apple Computer/.test(navigator.vendor);
    return /iphone|ipad|ipod/.test(userAgent) && isSafari;
  };
  // Detects if device is in standalone mode
  isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;

  handleClickOutside(event) {
    const loginButton = document.getElementsByClassName("login");
    const signupButton = document.getElementsByClassName("signup");
    this.setState({ showInstallMessage: false });

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
        <div
          className={
            this.state.showInstallMessage
              ? "visible install-message"
              : "hidden install-message"
          }
        >
          Install this webapp on your iPhone:
          <br /> tap
          <div className="install-button share">
            <svg viewBox="0 0 66 83" xmlns="http://www.w3.org/2000/svg">
              <g>
                <title>background</title>
                <rect fill="none" id="canvas_background" y="-1" x="-1" />
              </g>
              <g>
                <title>Layer 1</title>
                <g id="Symbols">
                  <g transform="matrix(1,0,0,1,517.792,696) " id="Ultralight-S">
                    <path
                      fill="#5a91f6"
                      id="svg_72"
                      d="m-485.389933,-641.382133c0.6347,0 1.123,-0.4883 1.123,-1.0742l0,-44.5313l-0.0488,-5.2734l4.8828,4.9316l7.7148,7.7637c0.1953,0.2441 0.5371,0.3906 0.8301,0.3906c0.4883,0 0.9766,-0.4883 0.9766,-1.0254c0,-0.293 -0.0977,-0.5371 -0.3418,-0.7324l-14.3555,-14.4043c-0.2441,-0.1953 -0.4883,-0.293 -0.7812,-0.293c-0.2442,0 -0.5372,0.0977 -0.7813,0.293l-14.4043,14.4043c-0.1953,0.1953 -0.293,0.4394 -0.293,0.7324c0,0.5371 0.4395,1.0254 0.9766,1.0254c0.2441,0 0.5859,-0.1465 0.8301,-0.3906l7.7148,-7.7637l4.9317,-4.9805l-0.0489,5.3223l0,44.5313c0,0.5859 0.4883,1.0742 1.0743,1.0742zm-22.168,28.56442l44.2871,0c6.543,0 10.0098,-3.564448 10.0098,-9.96093l0,-40.77149c0,-6.4453 -3.4668,-9.9609 -10.0098,-9.9609l-11.3281,0l0,2.1972l11.2304,0c4.9805,0 7.9102,2.6856 7.9102,7.8614l0,40.5273c0,5.22461 -2.9297,7.91016 -7.9102,7.91016l-44.0918,0c-5.2246,0 -7.9101,-2.68555 -7.9101,-7.91016l0,-40.5273c0,-5.1758 2.6855,-7.8614 7.9101,-7.8614l11.3282,0l0,-2.1972l-11.4258,0c-6.543,0 -10.00978,3.4179 -10.00978,9.9609l0,40.77149c0,6.494138 3.46678,9.96093 10.00978,9.96093z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          and then Add to Home Screen
          <div className="install-button add">
            <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
              <g>
                <title>background</title>
              </g>
              <g>
                <title>Layer 1</title>
                <g id="svg_16">
                  <path
                    fill="#666666"
                    id="svg_15"
                    d="m10.546875,68.115231l47.0215,0c6.9336,0 10.5469,-3.66211 10.5469,-10.49805l0,-47.0703c0,-6.8848 -3.6133,-10.5469 -10.5469,-10.5469l-47.0215,0c-6.9336,0 -10.54688,3.6133 -10.54688,10.5469l0,47.0703c0,6.9336 3.61328,10.49805 10.54688,10.49805zm23.4375,-15.03905c-1.0742,0 -1.7578,-0.8301 -1.7578,-1.9043l0,-15.332l-15.5274,0c-1.0742,0 -1.9531,-0.7325 -1.9531,-1.7578c0,-1.1231 0.8301,-1.8555 1.9531,-1.8555l15.5274,0l0,-15.5762c0,-1.123 0.6836,-1.9531 1.7578,-1.9531c1.1719,0 1.8555,0.8301 1.8555,1.9531l0,15.5762l15.5761,0c1.1231,0 1.9532,0.7324 1.9532,1.8555c0,1.0253 -0.8789,1.7578 -1.9532,1.7578l-15.5761,0l0,15.332c0,1.123 -0.6836,1.9043 -1.8555,1.9043z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
