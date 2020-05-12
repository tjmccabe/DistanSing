import React from "react";
import {demo} from "./demos";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoing = false;
  }

  componentWillUnmount() {
    this.props.removeSessionErrors();
  }

  componentDidUpdate() {
    if (this.props.loggedIn) this.props.closeModal()
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state)
  }

  renderErrors() {
    return this.props.errors[0] ? (
      <ul className="login-errors">
        {this.props.errors.map((error, idx) => {
          return (
            <li
              key={idx}>
              {error}
            </li>
          )
        })}
      </ul>
    ) : null;
  }

  demoSubmit() {
    if (this.demoing) return;
    this.demoing = true;
    demo(this.props.formType, this.props.login)
  }

  render() {
    const {formType, openModal, login} = this.props;

    const AltUserLink = formType === "userLogin" ? (
      <div
        onClick={() => openModal("artistLogin")}
        className="session-form-link"
      >
        Go to Artist Login
      </div>
    ) : (
      <div
        onClick={() => openModal("userLogin")}
        className="session-form-link"
      >
        Go to User Login
      </div>
    );

    const AltFormLink = formType === "userLogin" ? (
      <div
        onClick={() => openModal("userSignup")}
        className="session-form-link"
      >
        Don't have an account? Sign up
      </div>
    ) : (
      <div
        onClick={() => openModal("artistSignup")}
        className="session-form-link"
      >
        Don't have an account? Sign up
      </div>
    );

    const ErrorList = this.renderErrors();

    const formTitle = formType === "userLogin" ? "DistanSing User Login" : "DistanSing Artist Login"

    return (
      <div className="login-form">
        <div className="form-title">{formTitle}</div>
        {ErrorList}
        <form onSubmit={this.handleSubmit} className="login-form-form">
          <input
            type="text"
            id="email-hook"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.handleChange("email")}
          />

          <input
            type="password"
            id="password-hook"
            value={this.state.password}
            placeholder="Enter Password"
            onChange={this.handleChange("password")}
          />
          <div className="session-form-button">
            <button className="session-form-filter">Log In</button>
          </div>
        </form>
        <div className="session-form-button demo-button">
          <button
            className="session-form-filter"
            onClick={() => this.demoSubmit()}
          >Demo Login</button>
        </div>
        {AltFormLink}
        {AltUserLink}
      </div>

    )
  }
}

export default LoginForm;