import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      missingUser: ""
    };
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateBeforeSend() {
    if (this.state.password.length < 6) {
      this.setState({
        passwordError: 'Please enter password with at least 6 characters.'
      });

    return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.validateBeforeSend()) {
      return false;
    }

    this.setState({
      emailError: '',
      passwordError: ''
    });

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    let formBody = [];
    for (let property in user) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(user[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`http://localhost:3200/login`, {
      method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: formBody
    }).then(res => {
      if (res.status === 400) {
        this.setState({
          missingUser: 'No such user found!'
        })
      } else {
        this.setState({
          email: "",
          password: "",
        });
        this.props.authenticate();
        this.props.history.push('/');
      }
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
      <div className="login-form-wrapper">
        <div className="login-form-header">
          <p className="">Login</p>
          <div className="login-form-error">
            {this.state.missingUser}
          </div>
        </div>
        <div className="login-form-content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label htmlFor="email">E-mail:</label>
              <input id="email"
                     type="email"
                     value={this.state.email}
                     onChange={this.handleChange}
                     className="input-field"
                     placeholder="Enter your e-mail address" />
              <span className="login-form-error">{this.state.emailError}</span>
            </div>
            <div className="form-control">
              <label htmlFor="password">Password:</label>
              <input id="password"
                     type="password"
                     className="input-field"
                     value={this.state.password}
                     onChange={this.handleChange}
                     placeholder="Enter your password" />
              <span className="login-form-error">{this.state.passwordError}</span>
            </div>
            <div className="form-control">
              <button
                className="login-button"
                disabled={!this.validateForm()}
                type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="login-form-register-part">
          <p>You do not have an account?</p>
          <Link to="/register">
            <button className="reg-login-button full-width">
              Register now
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;