import React, { Component } from 'react';
import logo from './logo.svg';
import './base.css';

class Base extends Component {
  render() {
    return (
      <div className="base">
        {/*<header className="Base-header">*/}
          {/*<img src={logo} className="Base-logo" alt="logo" />*/}
          {/*<h1 className="Base-title">Welcome to React</h1>*/}
        {/*</header>*/}
        {/*<p className="Base-intro">*/}
          {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
      </div>
    );
  }
}

export default Base;

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Loadable from 'react-loadable';
//
// const Loading = () => <div>Loading...</div>;
//
// const Home = Loadable({
//     loader: () => import('./routes/Home'),
//   loading: Loading,
// });
//
// const About = Loadable({
//     loader: () => import('./routes/About'),
//   loading: Loading,
// });
//
// const App = () => (
// <Router>
// <Switch>
// <Route exact path="/" component={Home}/>
//   <Route path="/about" component={About}/>
//   </Switch>
//   </Router>
// );
