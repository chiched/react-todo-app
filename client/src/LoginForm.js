import React from "react";

const TodoItem = (props) => {
  return (
    <div className="login">
      <h2>Login Form</h2>
      () => props.handlePasswordChange()
      <form
        className="form"
        onSubmit={(event) => props.handleLoginSubmit(event)}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={(event) => props.handleEmailChange(event)}
            type="email"
            className="form-control"
            id="email"
            placeholder="hello@world.com"
            value={props.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(event) => props.handlePasswordChange(event)}
            type="password"
            value={props.password}
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
  );
};

export default LoginForm;
