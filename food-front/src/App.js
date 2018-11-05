import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'

import About from './components/about';
import Homepage from './components/homepage';
import Foods from './components/foods';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar className="topbar__container" position="static">
            <Toolbar className="topbar__toolbar">
              <h3 className="home"><Link className="link" to="/">Home</Link></h3>
              <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/129/fork-and-knife-with-plate_1f37d.png"
                alt="emoji"
              />
              <h3 className="about"><Link className="link" to="/about">About</Link></h3>
            </Toolbar>
          </AppBar>
          <Route exact path="/" component={Homepage} />
          <Route path="/about" component={About} />
          <Route path="/restaurant/:id" component={Foods} />
        </div>
      </Router>
    );
  }
}

export default App;
