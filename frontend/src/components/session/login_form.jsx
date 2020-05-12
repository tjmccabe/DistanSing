import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.phantomLogin = this.phantomLogin.bind(this);
  }

  componentWillUnmount() {
    this.props.removeSessionErrors();
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state)
      .then(() => {
        if (this.props.loggedIn) this.props.closeModal()
      })
      .catch(err => console.log(err))
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

  phantomLogin() {
    // this.props.login({ email: "demo@distansing.com", password: "123456" });
    // fill in demo user info
  }

  render() {
    const {formType, openModal} = this.props;

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
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.handleChange("email")}
          />

          <input
            type="password"
            value={this.state.password}
            placeholder="Enter Password"
            onChange={this.handleChange("password")}
          />
          <div className="session-form-button">
            <button className="session-form-filter">Log In</button>
          </div>
        </form>
        {AltFormLink}
        {AltUserLink}
      </div>

    )
  }
}

export default LoginForm;