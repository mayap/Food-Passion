import React, { Component } from 'react';
import './recipeMenu.css';
// import { Route, Link , withRouter} from 'react-router-dom';
// import axios from 'axios';

class RecipeMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  };

  render() {
    return (
      <div className="recipe-menu">
        <div className="sections-content">
          <div className="section">
            <h3>Meal Type</h3>
            <hr/>
            <div className="section-items">
              <span>Appetizers & Snacks</span>
              <span>Breakfast & Brunch</span>
              <span>Desserts</span>
              <span>Dinner</span>
              <span>Drinks</span>
            </div>
          </div>
          <div className="section">
            <h3>Dish Type</h3>
            <hr/>
            <div className="section-items">
              <span>Breads</span>
              <span>Cakes</span>
              <span>Salads</span>
              <span>Smoothies</span>
              <span>Soups, Stews & Chilli</span>
            </div>
          </div>
          <div className="section">
            <h3>Cooking Style</h3>
            <hr/>
            <div className="section-items">
              <span>BBQ & Grilling</span>
              <span>Quick & Easy</span>
              <span>Slow Cooker</span>
              <span>Vegan</span>
              <span>Vegetarian</span>
            </div>
          </div>
          <div className="section">
            <h3>World Cuisine</h3>
            <hr/>
            <div className="section-items">
              <span>Asian</span>
              <span>Indian</span>
              <span>Italian</span>
              <span>Mexican</span>
              <span>Southern</span>
            </div>
          </div>
          <div className="section">
            <h3>Seasonal</h3>
            <hr/>
            <div className="section-items">
              <span>Easter</span>
              <span>Christmas</span>
              <span>Birthdays</span>
              <span>Mother's day</span>
              <span>More Holidays & Events</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeMenu;