import React, {Component} from 'react'

import {TileAdderHandler} from './TileAdderHandler.jsx'
import './controller-styles.css';

class ControllerContainer extends Component {

  listeningForCurserLocation = function (listen) {
    this.setState({
      listeningForCurserLocation: !this.state.listeningForCurserLocation
    })
  }

  correctCoordinatesToContainer = function (x, y) {
  	var thisContainer = document.getElementsByClassName('controller-container')[0]
    var new_x = x - thisContainer.offsetLeft + 1
    var new_y = y - thisContainer.offsetTop
    return {x:new_x, y:new_y}
  }

  tileCoordinateAtLocation = function (x, y) {
  	var size = this.state.tileSize
  	var tile_x = Math.floor(x/size)
  	var tile_y = Math.floor(y/size)
  	return {x:tile_x, y:tile_y}
  }

  mouseClick = function (event) {
  	
  }

  mouseMoved = function (event) {
  	var corrected = this.correctCoordinatesToContainer(event.pageX, event.pageY)
  	var tile = this.tileCoordinateAtLocation(corrected.x, corrected.y)
  	console.log(tile.x, tile.y)
  }

	 constructor(props) {
    super(props)
    
    this.tileAdder = props.adderHandler

    this.state = {
      listeningForCurserLocation: false,
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
        locations:this.tileAdder.createLocations([6,0], 3, 1),
        parameters: this.tileAdder.defaultParametersForTileID(5),
      }
      ],
      tiles: []
    }
  }

  render() {

  	var bgtiles = this.tileAdder.createBGTiles(this.state.dimensions.width, this.state.dimensions.height, this.state.tileSize)
    var tiles = this.tileAdder.createTilesFromArray(this.state.tileData, this.state.tileSize)

  	return (
  			<div className="controller-container" onMouseMove={this.mouseMoved.bind(this)} onClick={this.mouseClick.bind(this)} >
          <div>
            {bgtiles}
          </div>
          <div>
            {tiles}
          </div>
        </div>
  		)
  }
}

export default ControllerContainer