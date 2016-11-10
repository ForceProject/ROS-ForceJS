import React, { Component } from 'react';
import './App.css';
import './controller-styles.css';

import NavBar from './NavBar.jsx'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {TileAdderHandler} from './TileAdderHandler.jsx'
import jquery from 'jquery'

class App extends Component {

  tileAdder = new TileAdderHandler(this)

  /**

  @param startLoc Array [x,y]
  @param width Integer
  @param height Integer
  */
  createLocations(startLoc, width, height) {
    return [
    {
      x:startLoc[0], 
      y:startLoc[1]
    }, 
    {
      x:startLoc[0] + width - 1, 
      y:startLoc[1] + height - 1
    }
      ]
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  constructor(props) {
    super(props)
    this.state = {
      dimensions: {
        width:1280, 
        height:720
      },
      tileSize: 80,

      tileData: [
      {
        tileID:1,
        tag:"hello",
        locations:[{x:1, y:1}, {x:2, y:2}],
        parameters: this.tileAdder.defaultParametersForTileID(1),
      },
      {
        tileID:2,
        tag:"hello2",
        locations:[{x:3, y:2}, {x:4, y:2}],
        parameters: this.tileAdder.defaultParametersForTileID(2),
      },
      {
        tileID:3,
        tag:"justASwitch",
        locations:[{x:4, y:4}, {x:5, y:4}],
        parameters: this.tileAdder.defaultParametersForTileID(3),
      },
      {
        tileID:4,
        tag:"aStepper",
        locations:[{x:5, y:1}, {x:7, y:1}],
        parameters: this.tileAdder.defaultParametersForTileID(4),
      },
      {
        tileID:5,
        tag:"text",
        locations:this.createLocations([6,0], 3, 1),
        parameters: this.tileAdder.defaultParametersForTileID(5),
      }
      ],
      tiles: [],
    }
  }

  render() {

    var bgtiles = this.tileAdder.createBGTiles(this.state.dimensions.width, this.state.dimensions.height, this.state.tileSize)

    var tiles = this.tileAdder.createTilesFromArray(this.state.tileData, this.state.tileSize)

    return (
      <div className="App">
          <NavBar adderHandler={this.tileAdder} />
        <div className="controller-container">
          <div>
            {bgtiles}
          </div>
          <div>
            {tiles}
          </div>
        </div>
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
