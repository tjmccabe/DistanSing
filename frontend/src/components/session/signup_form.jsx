import React from "react";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      artistname: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.removeSessionErrors();
  }

  handleChange(field) {
    if (this.props.formType === 'artistSignup' && field === 'username') field = 'artistname'
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit() {
    return e => {
      e.preventDefault();
        this.props.signup(this.state)
          .then(() => {
            if (this.props.loggedIn) this.props.closeModal()
        }
      )
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
      <div
        onClick={() => openModal("artistSignup")}
        className="session-form-link"
        >
        Go to Artist Signup
      </div>
    ) : (
      <div
        onClick={() => openModal("userSignup")}
        className="session-form-link"
      >
        Go to User Signup
      </div>
    );

    const AltFormLink = formType === "userSignup" ? (
      <div
        onClick={() => openModal("userLogin")}
        className="session-form-link"
      >
        Already have an account? Log in
      </div>
    ) : (
      <div
        onClick={() => openModal("artistLogin")}
        className="session-form-link"
      >
        Already have an account? Log in
      </div>
    );

    const ErrorList = this.renderErrors();

    const formTitle = formType === "userSignup" ? "DistanSing User Signup" : "DistanSing Artist Signup"
    const dynamicName = formType === 'artistSignup' ? this.state.artistname : this.state.username
    const dynamicSubmit = formType === 'artistSignup'? this.handleSubmit2 : this.handleSubmit

    return (
      <div className="signup-form">
        <div className="form-title">{formTitle}</div>
        {ErrorList}
        <form onSubmit={this.handleSubmit()} className="signup-form-form"> 
          <input 
            type="text"
            placeholder={ name }
            value={ dynamicName }
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
          <div className="session-form-button">
            <button className="session-form-filter">Sign Up</button>
          </div>
        </form>
        {AltFormLink}
        {AltUserLink}
      </div>
    );
  }
}

export default SignupForm;
