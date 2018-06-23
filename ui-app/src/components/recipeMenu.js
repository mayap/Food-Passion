import React, { Component } from 'react';
import './recipeMenu.css';

class RecipeMenu extends Component {
  constructor(props) {
    super(props);

  };

  render() {
    return (

      <div className="recipe-menu">
        <div className="sections-content">
          {this.props.renderView}
        </div>
      </div>
    );
  }
}

export default RecipeMenu;
