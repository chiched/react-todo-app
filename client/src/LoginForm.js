import React from "react";

const LoginForm = (props) => {
  return (
    <div className="login">
      <h2>Login Form</h2>
      <form
        className="form"
        onSubmit={(event) => props.handleLoginSubmit(event)}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={(event) => props.handleLoginEmailChange(event)}
            type="email"
            className="form-control"
            id="email"
            placeholder="hello@world.com"
            value={props.loginEmail}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(event) => props.handleLoginPasswordChange(event)}
            type="password"
            value={props.loginPassword}
            className="form-control"
            id="password"
            placeholder="keyboard cat"
            required
          />
          <p className="help-block"> Help text here.</p>
        </div>
        <button type="submit">Login</button>
        <span>{props.loginError}</span>
      </form>
    </div>
  );
};

export default LoginForm;
