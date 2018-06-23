import React, { Component } from 'react';
import './base.css';
import axios from 'axios';
import foodImg from './images/tacos.jpg';

class Base extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getAllRecipes = this.getAllRecipes.bind(this);

    this.getAllRecipes().then(res => {
      debugger;
      this.setState({
        recipes: JSON.parse(res.data.rows)
      });
    }, err => {
      debugger;
      this.setState({
        error: err.response.data
      });
    });
  }

  getAllRecipes() {
    let url = `http://localhost:3200/recipes`;

    return axios.get(url);
  }

  render() {
    return (
      <div className="base">
        {this.state.recipes &&
          this.state.recipes.map(recipe =>
            <div key={recipe.id} className="single-recipe-wrapper">
              <img src={foodImg} alt="" className="single-recipe-image"/>
              <div className="single-recipe-content">
                <h3>{recipe.recipe_name}</h3>
                <hr className="recipe-separation-line"/>
                <div className="calories">
                  <span>Calories</span>
                  <span>{recipe.calories}</span>
                </div>
                <hr className="recipe-separation-line"/>
                <div className="preparation-time">
                  <span>Preparation time:</span>
                  <span>{recipe.preparation_time}</span>
                </div>
              </div>
            </div>
          )}
        {this.state.error &&
          <div style={{color: 'red'}}>{this.state.error}</div>}
      </div>
    );
  }
}

export default Base;
