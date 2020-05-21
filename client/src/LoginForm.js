import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faPlus,
  faTrashAlt,
  faStar,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const LoginForm = (props) => {
  return (
    <div className="login auth-form login-form">
      <form
        className={props.showingLogin ? "form" : "form hidden"}
        onSubmit={(event) => props.handleLoginSubmit(event)}
      >
        <div className="form-group">
          <input
            onChange={(event) => props.handleLoginEmailChange(event)}
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={props.loginEmail}
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={(event) => props.handleLoginPasswordChange(event)}
            type="password"
            value={props.loginPassword}
            className="form-control"
            id="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">
          <FontAwesomeIcon className="logout" icon={faSignInAlt} />
        </button>
        <span>{props.loginError}</span>
      </form>
    </div>
  );
};

export default LoginForm;
