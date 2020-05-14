import React from "react";

const SignupForm = (props) => {
  return (
    <div className="login">
      <h2>Signup Form</h2>
      <form
        className="form"
        onSubmit={(event) => props.handleSignupSubmit(event)}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={(event) => props.handleSignupEmailChange(event)}
            type="email"
            className="form-control"
            id="email"
            placeholder="hello@world.com"
            value={props.signupEmail}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(event) => props.handleSignupPasswordChange(event)}
            type="password"
            value={props.signupPassword}
            className="form-control"
            id="password"
            placeholder="keyboard cat"
            required
          />
          <p className="help-block"> Help text here.</p>
        </div>
        <button type="submit">Signup</button>
        <span>{props.signupError}</span>
      </form>
    </div>
  );
};

export default SignupForm;
