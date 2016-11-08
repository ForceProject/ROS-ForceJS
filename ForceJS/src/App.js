import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './controller-styles.css';
import BGTile from './BGTile.jsx';
import ControllerTile from './ControllerTiles/ControllerTile.jsx'

import Button from './ControllerTiles/Tile_Button.jsx' // 1
import Slider from './ControllerTiles/Tile_Slider.jsx'
import Switch from './ControllerTiles/Tile_Switch.jsx' // 3
import NumericStepper from './ControllerTiles/Tile_NumericStepper.jsx'
import Textfield from './ControllerTiles/Tile_Textfield.jsx' // 5

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

  createTilesFromArray(allTileData, size) {
      var uiTiles = []
      var i = 0
      for (i in allTileData) {
        if (i < allTileData.length) {
          var tileDict = allTileData[i]

          var tileID = tileDict.tileID
          var tag = tileDict.tag
          var location = tileDict.locations
          var parameters = tileDict.parameters

          var uiElement
          switch (tileID) {
            case 1:
              uiElement = <Button key={i} tag={tag} title={parameters["title"]} height={location[1].y - location[0].y + 1} size={size} />
            break
            case 2:
              uiElement = <Slider 
              defaultValue={parameters.defaultValue} 
              step={parameters.step} 
              min={parameters.min} 
              max={parameters.max} 
              isHorizontal={parameters.isHorizontal} 
              reversed={parameters.reversed} />
            break
            case 3:
              uiElement = <Switch title={parameters.title} labelSideLeft={parameters.labelSideLeft} on={parameters.on} />
            break
            case 4:
              uiElement = <NumericStepper initial={parameters.initial} min={parameters.min} max={parameters.max} incr={parameters.incr} />
            break
            case 5:
              uiElement = <Textfield placeHolder={parameters.placeHolder} labelText={parameters.labelText} defaultValue={parameters.defaultValue} />
            break
            default:
            break;
          }

          uiTiles.push(<ControllerTile key={i} location={location} size={size} subview={uiElement} />)
        }
      }

      return uiTiles
  }

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

  render() {

    var width = 1280
    var height = 720
    var size = 80
    var bgtiles = this.createBGTiles(width, height, size)

    var userTiles = [
      {tileID:1, tag:"hello", parameters:{
        title:"PR2"
      }, locations:[{x:1, y:1}, {x:2, y:2}]},
      {tileID:2, tag:"hello2", parameters:{
        defaultValue:0,
        step:1,
        min:0,
        max:100,
        isHorizontal:true,
        reversed:false
      }, locations:[{x:3, y:2}, {x:4, y:2}]},
      {tileID:3, tag:"justASwitch", parameters:{
        title:"Switch",
        labelSideLeft:true,
        on: false,
      }, locations:[{x:4, y:4}, {x:5, y:4}]},
      {tileID:4, tag:"aStepper", parameters: {
        initial:0,
        min: 0,
        max: 10,
        incr: 1
      }, locations:[{x:5, y:1}, {x:7, y:1}]},
      {tileID:5, tag:"text", parameters: {
        placeHolder: "this is placeholder",
        labelText: "This is a label",
        defaultValue: "a"
      }, locations:this.createLocations([6,0], 3, 1)}
    ]

    var customTiles = this.createTilesFromArray(userTiles, size)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to ForceJS</h2>
        </div>
        <div className="controller-container">
          <div>
            {bgtiles}
          </div>
          <div>
            {customTiles}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
