import React, { Component } from 'react';
import './addRecipe.css';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
debugger;
    this.state = {
      recipeName: "",
      prepTime: "",
      calories: "",
      ingredients: '',
      prepSteps: '',
      // isPublic: null,
      // categories: [],
      result: {
        state: null,
        text: ''
      },
      renderView: props.renderView
    };
  }

  validateForm() {
    return this.state.recipeName.length > 0 &&
      this.state.prepTime.length > 0 &&
      this.state.calories.length > 0 &&
      this.state.ingredients.length > 0 &&
      this.state.prepSteps.length > 0;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [event.target.id]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      result: {
        state: true,
        text: ''
      }
    });

    const recipe = {
      recipeName: this.state.recipeName,
      preparationTime: this.state.prepTime,
      calories: this.state.calories,
      ingredients: this.state.ingredients,
      preparationSteps: this.state.prepSteps,
      // isPublic: (this.state.isPublic || this.state.isPublic === false) || 1,
      // categories: this.state.categories
    };

    let formBody = [];
    for (let property in recipe) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(recipe[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`http://localhost:3200/recipe`, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: formBody,
      credentials: 'include'
    }).then(res => {
      debugger;
    }).catch(err => {
      debugger;
    });
  };

  render() {
    return (
      <div className="add-recipe">
        <div className="add-recipe-header">
          <p className="">Add Recipe</p>
          {/*<div className="login-form-error">*/}
            {/*{this.state.missingUser}*/}
          {/*</div>*/}
        </div>
        <div className="add-recipe-form-content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label htmlFor="recipeName">Recipe name:</label>
              <input id="recipeName"
                     type="text"
                     value={this.state.recipeName}
                     onChange={this.handleChange}
                     className="input-field"
                     placeholder="Enter name of the recipe" />
            </div>
            <div className="form-control">
              <label htmlFor="prepTime">Preparation time:</label>
              <input id="prepTime"
                     type="number"
                     value={this.state.prepTime}
                     onChange={this.handleChange}
                     className="input-field"
                     placeholder="Preparation time in minutes" />
            </div>
            {/*<div className="form-control">*/}
              {/*<label htmlFor="email">Upload image:</label>*/}
              {/*<input id="email"*/}
              {/*type="email"*/}
              {/*value={this.state.email}*/}
              {/*onChange={this.handleChange}*/}
              {/*className="input-field"*/}
              {/*placeholder="Enter your e-mail address" />*/}
            {/*</div>*/}
            <div className="form-control">
              <label htmlFor="calories">Calories:</label>
              <input id="calories"
                     type="number"
                     className="input-field"
                     value={this.state.calories}
                     onChange={this.handleChange}
                     placeholder="Enter calories for this recipe" />
            </div>
            {/*<div className="form-control checkbox-wrapper">*/}
              {/*<input type="checkbox" name="isPublic" value="true" onChange={this.handleChange} />*/}
              {/*<span>I want my recipe to be visible for all users</span>*/}
            {/*</div>*/}
            <div className="form-control">
              <label htmlFor="ingredients">Ingredients:</label>
              <textarea name="ingredients" id="ingredients" cols="30" rows="10" value={this.state.ingredients} onChange={this.handleChange} />
            </div>
            <div className="form-control">
              <label htmlFor="prepSteps">Preparation steps:</label>
              <textarea name="preparationSteps" id="prepSteps" cols="30" rows="10" value={this.state.prepSteps} onChange={this.handleChange} />
            </div>
            {/*<div className="form-control">*/}
              {/*<p>Choose categories for this recipe:</p>*/}
              {/*{this.state.renderView}*/}
            {/*</div>*/}
            <div className="form-control">
              <button
                className="reg-button"
                disabled={!this.validateForm()}
                type="submit">
                Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddRecipe;
