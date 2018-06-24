import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link, withRouter, Switch } from 'react-router-dom';
import axios from 'axios';

import searchIcon from './images/search-icon.svg';
import Base from './base';
import Login from './components/login';
import Register from './components/register';
import RecipeMenu from './components/recipeMenu';
import PageNotFound from './components/pageNotFound';
import Categories from './components/categories';
import AddRecipe from './components/addRecipe';

import './index.css';
import './app.css';

@withRouter
class App extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.focusInputField = this.focusInputField.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    // this.partialMenu = this.partialMenu =
    //   <div className="partial-menu">
    //     <RecipeMenu />
    //   </div>;
    this.partialMenu = '';
    this.state = {
      showPartialMenu: false,
      showCheckboxes: true,
      authenticated: ''
      // fade: false,
    };
    this.showFooter = true;
    this.renderView = [];
    this.categories = [];
  }

  componentWillMount() {
    fetch(`http://localhost:3200/isLogged`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include'
    }).then(res => {
      debugger;
      if (res.status === 200) {
        this.setState({
          authenticated: true
        })
      } else if (res.status === 400) {
        this.setState({
          authenticated: false
        })
      }
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    const url = 'http://localhost:3200/categories';
    let parentCategories = [];
    let childrenCategories = [];
    let rowsLen = '';
    let children = [];

    axios.get(url).then(res => {
      if (res.data.rows) {
        return JSON.parse(res.data.rows);
      }
    }).then(data => {
      parentCategories = [];
      childrenCategories = [];
      rowsLen = data.length;

      data.forEach(item => {
        if (!item.parent_id) {
          parentCategories.push(item);
        } else {
          childrenCategories.push(item);
        }
      });

      for (let i = 0; i < parentCategories.length; i++) {
        children = [];
        for (let j = 0; j < childrenCategories.length; j++) {
          if (childrenCategories[j].parent_id === parentCategories[i].id) {
            children.push(
              <div key={childrenCategories[j].id}>
                <Link
                  to={`/category/${childrenCategories[j].id}`}
                  className='children'>
                  {childrenCategories[j].category_name}
                </Link>
              </div>
            );
          }
        }

        this.renderView.push(<div className="section" key={parentCategories[i].id}>
          <h3>{parentCategories[i].category_name}</h3>
          <div className="separation-line"></div>
          <div className="section-items">
            {children}
          </div>
        </div>);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.partialMenu = '';
    this.setState({
      showPartialMenu: false
    });
  }

  focusInputField() {
    this.nameInput.focus();
  };

  toggleMenu() {
    this.setState({
      showPartialMenu: !this.state.showPartialMenu
    });

    const currentState = !this.state.showPartialMenu;

    if (currentState) {
      // this.setState({fade: true});
      {/*<div className={"partial-menu " + (this.state.fade ? 'fade' : '')}>*/}
      this.partialMenu =
        <div className="partial-menu ">
          <RecipeMenu renderView={this.renderView} />
        </div>
    } else {
      this.partialMenu = '';
      debugger;
    }
  }

  authenticate() {
    debugger;
    this.setState({
      authenticated: true
    })
  }

  logout() {
    debugger;
    fetch(`http://localhost:3200/logout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include'
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          authenticated: false
        })
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    // const {fade} = this.state;

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
          <div className={"main-menu-item " +  (this.state.showPartialMenu ? 'active-button' : '')}>
            <a className={"item-link-dropdown " + (this.state.showPartialMenu ? 'active-link' : '')}
               onClick={this.toggleMenu}>
               {/*onAnimationEnd={() => this.setState({fade: false})}>*/}
              Recipes
              <span className="arrow-down"></span>
            </a>
          </div>
          <div className={"main-menu-item " + (this.state.authenticated ? 'show': 'hide')}>
            <Link to="/recipe/add">Add Recipe</Link>
          </div>
          <div className={"main-menu-item " + (this.state.authenticated ? 'hide': 'show')}>
            <Link to="/login">Login</Link>
          </div>
          <div className={"main-menu-item " + (this.state.authenticated ? 'show': 'hide')}>
            <a href="/" onClick={this.logout}>Log out</a>
          </div>
        </div>
        <div className={"main-wrapper " + (!this.showFooter ? 'full': '')}>
          <Switch>
            <Route exact path="/" component={Base} />
            <Route path="/login" render={(props) => {
              return (<Login authenticate={this.authenticate} {...props} />);
            }} />
            <Route path="/register" component={Register} />
            <Route path="/category/:id" render={(props) => {
              return (<Categories key={props.match.params.id} categoryId={props.match.params.id} />);
            }} />
            <Route path="/recipe/add" render={(props) => {
              return (<AddRecipe renderView={this.renderView} />);
            }} />
            <Route render={(props) => {
              debugger;
              this.showFooter = false;

              return (<PageNotFound partialMenuShown={this.state.showPartialMenu} />);
            }} />
          </Switch>
        </div>

        <div className={"footer " + (!this.showFooter ? 'hide-footer': '')}>
          <div className="subscription-form">
            <div className="subscription-info">
              <h2>The recipes you love - always on time</h2>
              <p>Get new, tasty and healthy recipes delivered to you regularly</p>
            </div>
            <div>
              <input type="email" className="subscription-input" placeholder="Your Email Address" />
              <button className="subscription-btn">Sign Up</button>
            </div>
          </div>
          <div className="footer-content">
            <div className="footer-logo">
              <Link to="/">Food Passion</Link>
            </div>
            <div className="info">
              About Us
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
