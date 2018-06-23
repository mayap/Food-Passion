import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pageNotFound.css';
import imgFood from '../images/food.png';

class PageNotFound extends Component {
  constructor(props) {
    super(props);

  };

  render() {
  return (
    <div className={"pagenotfound-wrapper " + (this.props.partialMenuShown ? 'hide': '')}>
      <section id="content-404">
        <div className="pagenotfound-header">
          <h1 className="main-header"><span>4</span><span>0</span><span>4</span></h1>
        </div>
        <div id="content">
          <h2 className="sub-header">Oops! Page not found!</h2>
          <p className="info-text">The page you are looking for was moved, removed, renamed or might never existed.</p>
        </div>
        <div className="footer-btn">
          <div className="home">
            <Link to="/" className="btn">Home page</Link>
          </div>
        </div>
      </section>
      <img src={imgFood} id="img-left" className={(this.props.partialMenuShown ? 'hide-img': '')} alt="img" />
    </div>
    );
  }

}

export default PageNotFound;
