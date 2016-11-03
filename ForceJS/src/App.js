import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './controller-styles.css';
import BGTile from './BGTile.jsx';
//import Button from './ControllerTiles/Tile_Button.jsx'
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var userTiles = [
  {tileID:1, tag:"", location:{tl:[1,1], br:[2,2]}}
]

class App extends Component {

  createBGTiles(width, height, size) {
    var numHor = width / size
    var numVert = height / size

    var tiles = []

    for (var v = 0; v < numVert; v++) {
      var row = []
      for (var h = 0; h < numHor; h++) {
        row.push(<BGTile key={(h*numHor)+v} x={h*size} y={v*size} size={size} />)
      }
      tiles.push(row)
    }

    return tiles
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {

    var width = 1280
    var height = 720
    var size = 80
    var bgtiles = this.createBGTiles(width, height, size)

    const style = {
      margin: 12,
    };

    var button = (
      <div>
      <RaisedButton label="Default" style={style} />
      </div>
      );

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to ForceJS</h2>
        </div>
        <div className="controller-container">
          {bgtiles}
          {button}
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

export default App;
