import React, { Component } from 'react';
import './register.css';
import axios from 'axios';
import { Route, Link , withRouter} from 'react-router-dom';
import $ from 'jquery';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      result: {
        state: null,
        text: ''
      }
    };
  };

  validateForm() {
    return this.state.firstName.length > 0 &&
          this.state.lastName.length > 0 &&
          this.state.email.length > 0 &&
          this.state.password.length > 0;
  };

  validateBeforeSend() {
    if (this.state.password.length < 6) {
      this.setState(prevState => ({
        result: {
          state: false,
          text: 'Please enter password with at least 6 characters.'
        }
      }));

      return false;
    }

    return true;
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.validateBeforeSend()) {
      return false;
    }

    this.setState({
      result: {
        state: true,
        text: ''
      }
    });

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };

    // axios.defaults.withCredentials = true;

    // fetch(`http://localhost:3200/user`, {
    //   method: 'post',
    //   headers: {
    //     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    //   },
    //   body: user
    // }).then(res => {
    //   debugger;
    // });
    //
    // $.ajax({
    //   url: 'http://localhost:3200/user',
    //   dataType: 'json',
    //   cache: false,
    //   success: function(data) {
    //     debugger;
    //     // this.setState({data: data}); // Notice this
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     debugger;
    //     // console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });

    // axios.post(`http://127.0.0.1:3200/user`, user)
    //   .then(res => {
    //     this.setState({
    //       firstName: "",
    //       lastName: "",
    //       email: "",
    //       password: "",
    //       result: {
    //         state: true,
    //         text: 'Successful registration!'
    //       }
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       result: {
    //         state: false,
    //         text: [err.response.data]
    //       }
    //     });
    //   })
  };

  render() {
    let partialContent;

    if (this.state.result.state) {
      partialContent =
        <Link className="link-login" to="/login">
          <button className="login-button">
            Go to Login page
          </button>
        </Link>
    } else {
      partialContent = <form onSubmit={this.handleSubmit}>
          <div className="form-control">
            <label htmlFor="firstName">First name:</label>
            <input id="firstName"
                   type="text"
                   value={this.state.firstName}
                   onChange={this.handleChange}
                   className="input-field"
                   placeholder="Enter your first name" />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Last name:</label>
            <input id="lastName"
                   type="text"
                   value={this.state.lastName}
                   onChange={this.handleChange}
                   className="input-field"
                   placeholder="Enter your last name" />
          </div>
          <div className="form-control">
            <label htmlFor="email">E-mail:</label>
            <input id="email"
                   type="email"
                   value={this.state.email}
                   onChange={this.handleChange}
                   className="input-field"
                   placeholder="Enter your e-mail address" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input id="password"
                   type="password"
                   className="input-field"
                   value={this.state.password}
                   onChange={this.handleChange}
                   placeholder="Enter your password" />
          </div>
          <div className="form-control">
            <button
              className="reg-button"
              disabled={!this.validateForm()}
              type="submit">
              Register
            </button>
          </div>
        </form>
    }

    return (

    <div className="reg-form-wrapper">
      <div className="reg-form-header">
        <p className="">Registration</p>
        <p className={this.state.result.state ? 'result-success' : 'result-failure'}>{this.state.result.text}</p>
      </div>
      <div className="reg-form-content">
        {partialContent}
      </div>
    </div>
    );
  }
}

export default Register;