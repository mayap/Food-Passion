import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link , withRouter} from 'react-router-dom';

import searchIcon from './images/search-icon.svg';
import Base from './Base';
import Login from './components/login';
import Register from './components/register';
import RecipeMenu from './components/recipeMenu';

import './index.css';
import './App.css';

@withRouter
class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setState({
      showPartialMenu: true
    });
  }

  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.focusInputField = this.focusInputField.bind(this);
    this.partialMenu = this.partialMenu =
      <div className="partial-menu">
        <RecipeMenu />
      </div>;
    this.state = {
      showPartialMenu: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  focusInputField() {
    this.nameInput.focus();
  };

  toggleMenu() {
    this.setState({
      showPartialMenu: !this.state.showPartialMenu
    });

    const currentState = !this.state.showPartialMenu;

    if (currentState) {
      this.partialMenu =
        <div className="partial-menu">
          <RecipeMenu />
        </div>
    } else {
      this.partialMenu = '';
    }
  }

  render() {
    return (
      <div className="container">
        {this.partialMenu}
        <div className="main-menu">
          <div className="main-menu-item home-icon">
            <Link to="/">Food Passion</Link>
          </div>
          <div className="main-menu-item search-holder">
            <img src={searchIcon} alt="search-icon" className="search-icon" onClick={this.focusInputField} />
            <input type="search" className="search-input" ref={(input) => { this.nameInput = input; }}  placeholder="What do you want to cook?" />
          </div>
          <div className="main-menu-item">
            <a className="item-link-dropdown" onClick={this.toggleMenu}>
              Recipes
              <span className="arrow-down"></span>
            </a>
          </div>
          <div className="main-menu-item">
            <Link to="/login">Login</Link>
          </div>
        </div>
        <Route exact path="/" component={Base} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <div className="footer">
          <div className="footer-icon">
            Food Passion
          </div>
          <div className="footer-menu">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
