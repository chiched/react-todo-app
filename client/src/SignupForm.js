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

const SignupForm = (props) => {
  return (
    <div className="signup auth-form signup-form">
      <form
        className={props.showingSignup ? "form" : "form hidden"}
        onSubmit={(event) => props.handleSignupSubmit(event)}
      >
        <div className="form-group">
          <input
            onChange={(event) => props.handleSignupEmailChange(event)}
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={props.signupEmail}
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={(event) => props.handleSignupPasswordChange(event)}
            type="password"
            value={props.signupPassword}
            className="form-control"
            id="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">
          <FontAwesomeIcon className="logout" icon={faSignInAlt} />
        </button>
        <span>{props.signupError}</span>
      </form>
    </div>
  );
};

export default SignupForm;
