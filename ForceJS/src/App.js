import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar.jsx'
import ControllerContainer from './ControllerContainer.jsx'
import {TileAdderHandler} from './TileAdderHandler.jsx'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TileSettingsDialog from './TileSettings'

class App extends Component {

  tileAdder = new TileAdderHandler(this, 80)

  addTile = function (tileToAdd) {
    this.state.tiles.push(tileToAdd)
    this.forceUpdate()
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  constructor(props) {
    super(props);
    this.state = {
      tiles: []
    }
  }

  render() {
    return (
      <div className="App">
          <NavBar adderHandler={this.tileAdder} />
          <ControllerContainer adderHandler={this.tileAdder} tiles={this.state.tiles} />
          <TileSettingsDialog />
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
