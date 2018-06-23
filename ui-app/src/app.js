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

import './index.css';
import './app.css';

@withRouter
class App extends Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.focusInputField = this.focusInputField.bind(this);
    // this.partialMenu = this.partialMenu =
    //   <div className="partial-menu">
    //     <RecipeMenu />
    //   </div>;
    this.partialMenu = '';
    this.state = {
      showPartialMenu: false,
      // fade: false,
    };
    this.renderView = [];
    this.renderRecipes = [];

    this.toggleMenu = this.toggleMenu.bind(this);
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
              <Link
                to={`/category/${childrenCategories[j].id}`}
                className='children'
                key={childrenCategories[j].id}>
                {childrenCategories[j].category_name}
              </Link>
            );
          }
        }

        this.renderView.push(<div className="section" key={parentCategories[i].id}>
          <h3>{parentCategories[i].category_name}</h3>
          <div className="separation-line"></div>
          <div className="section-items">
            {children}
          </div>
        </div>)
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
    }
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
          <div className="main-menu-item">
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="main-wrapper">
          <Switch>
            <Route exact path="/" component={Base} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/category/:id" render={(props) => {
              return (<Categories key={props.match.params.id} categoryId={props.match.params.id} />);
            }} />
            <Route render={() => <PageNotFound partialMenuShown={this.state.showPartialMenu} />} />
          </Switch>
        </div>

        <div className="footer">
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
            <div className="footer-logo">Food Passion</div>
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
