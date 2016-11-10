import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar.jsx'
import ControllerContainer from './ControllerContainer.jsx'
import {TileAdderHandler} from './TileAdderHandler.jsx'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class App extends Component {

  tileAdder = new TileAdderHandler(this)

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return (
      <div className="App">
          <NavBar adderHandler={this.tileAdder} />
          <ControllerContainer adderHandler={this.tileAdder} />
      </div>
    );
  }
}

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default App;
