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
      <button onClick={() => openModal("artistLogin")}>
        Go to Artist Login
      </button>
    ) : (
      <button onClick={() => openModal("userLogin")}>
        Go to User Login
      </button>
    );

    const AltFormLink = formType === "userLogin" ? (
      <button onClick={() => openModal("userSignup")}>
        Don't have an account? Sign up
      </button>
    ) : (
      <button onClick={() => openModal("artistSignup")}>
        Don't have an account? Sign up
      </button>
    );

    const ErrorList = this.renderErrors();

    return (
      <div className="login-form">
        {ErrorList}
        <form onSubmit={this.handleSubmit}>
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
          <button>Log In</button>
        </form>
        {AltUserLink}
        {AltFormLink}
      </div>

    )
  }
}

export default LoginForm;