import React from "react";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.removeSessionErrors();
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formType === "Name") {
      this.setState({ artistName: this.state.username })
    }
    // add logic here depending on this.props.formType
    this.props.signup(this.state);
  }

  renderErrors() {
    return (
      <ul className="signup-errors">
        {this.props.errors.map((error, idx) => {
          return (
            <li className="signup-error" key={idx}>
              {error}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { formType } = this.props;
    return (
      <div className="signup-form">
        <form> 
          <label> {formType}:
            <input 
              type="text"
              placeholder={this.props.formType === "Name" ? "Enter arist or band name here" : "Enter desired username" }
              value={this.state.username}
              onChange={this.handleChange("username")}
            />
          </label>

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
    );
  }
}

export default SignupForm;
