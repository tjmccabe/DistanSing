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
    this.props.login(this.state);
  }

  renderErrors() {
    return (
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
    )
  }

  phantomLogin() {
    // this.props.login({ email: "demo@distansing.com", password: "123456" });
    // fill in demo user info
  }

  render() {
    return (
      <div className="login-form">
        <form>

          <label> Email:
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />
          </label>

          <label> Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange("password")}
            />
          </label>

        </form>
      </div>

    )
  }
}

export default LoginForm;