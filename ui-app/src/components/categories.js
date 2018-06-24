import React, { Component } from 'react';
import './categories.css';
import axios from 'axios';
import foodImg from '../images/burger.jpg';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.getRecipesFromCategory = this.getRecipesFromCategory.bind(this);
    this.getRecipesFromCategory(props.categoryId).then(res => {
      this.setState({
        recipes: res.data
      });
    }, err => {
      this.setState({
        error: err.response.data
      });
    });

    this.state = {
      categoryId: props.categoryId
    };
  };

  getRecipesFromCategory(categoryId) {
    let url = `http://localhost:3200/category/${categoryId}/recipes`;

    return axios.get(url, {withCredentials: true});
  }

  render() {
    return (
      <div className="categories-wrapper">
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

export default Categories;
