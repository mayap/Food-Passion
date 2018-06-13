import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: ""
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

    debugger;
    // axios.post(`http://localhost:3200/login`, user)
    //   .then(res => {
    //     debugger;
    //     // const persons = res.data;
    //     // this.setState({ persons });
    //   })

    // fetch(`http://localhost:3200/login`, {
    //   method: 'post',
    //   headers: {
    //     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    //   },
    //   body: user
    // }).then(res => {
    //   debugger;
    // })
  };

  render() {
    return (
      <div className="login-form-wrapper">
        <div className="login-form-header">
          <p className="">Login</p>
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
          <button className="reg-login-button full-width">
            <Link className="link-login" to="/register">Register now</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Login;