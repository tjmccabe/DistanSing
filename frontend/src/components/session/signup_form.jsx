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

  handleSubmit() {
    return e => {
      e.preventDefault();
      if (this.props.formType === "artistSignup") {
        this.setState({ artistname: this.state.username }, 
          () => {
            this.props.signup(this.state)}
        )
      } else {
        this.props.signup(this.state)
      }
    }
  }

  renderErrors() {
    return this.props.errors[0] ? (
      <ul className="signup-errors">
        {this.props.errors.map((error, idx) => {
          return (
            <li className="signup-error" key={idx}>
              {error}
            </li>
          );
        })}
      </ul>
    ) : null;
  }

  render() {
    const { formType, openModal } = this.props;

    const name = formType === "artistSignup" ? "Enter Artist/Band Name" : "Enter Username"

    const AltUserLink = formType === "userSignup" ? (
      <button onClick={() => openModal("artistLogin")}>
        Go to Artist Signup
      </button>
    ) : (
      <button onClick={() => openModal("userSignup")}>
        Go to User Signup
      </button>
    );

    const AltFormLink = formType === "userSignup" ? (
      <button onClick={() => openModal("userLogin")}>
        Already have an account? Log in
      </button>
    ) : (
      <button onClick={() => openModal("artistLogin")}>
        Already have an account? Log in
      </button>
    );

    const ErrorList = this.renderErrors();

    return (
      <div className="signup-form">
        {ErrorList}
        <form onSubmit={this.handleSubmit()}> 
          <input 
            type="text"
            placeholder={ name }
            value={this.state.username}
            onChange={this.handleChange("username")}
          />

          <input 
            type="text"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.handleChange("email")}
          />
          
          <input 
            type="password"
            placeholder="Create Password"
            value={this.state.password}
            onChange={this.handleChange("password")}
          />
          <button>Sign Up</button>
        </form>
        {AltUserLink}
        {AltFormLink}
      </div>
    );
  }
}

export default SignupForm;
