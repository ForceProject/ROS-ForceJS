// Tile Adder Handler

import React from 'react'

import ControllerTile from './ControllerTiles/ControllerTile.jsx'

import BGTile from './BGTile.jsx';

import Button from './ControllerTiles/Tile_Button.jsx' // 1
import Slider from './ControllerTiles/Tile_Slider.jsx'
import Switch from './ControllerTiles/Tile_Switch.jsx' // 3
import NumericStepper from './ControllerTiles/Tile_NumericStepper.jsx'
import Textfield from './ControllerTiles/Tile_Textfield.jsx' // 5

export class TileAdderHandler {

	addTile = function (name) {
		var tileID = this.tileIDFromName(name)
		// tell grid to start listening to click/taps
		// listen for a start and finish
	}

	createAt = function (startLocation, endLocation) {
		
	}

	defaultParametersForTileID = function (id) {
		var lookUp = [
			{ // Button
	      title:"PR2"
	    },
	    { // Slider
				defaultValue:0,
				step:1,
				min:0,
				max:100,
				isHorizontal:true,
				reversed:false
	    },
			{ // Switch
				title:"Switch",
				labelSideLeft:true,
				on: false,
			},
			{ // Numeric Stepper
				initial:0,
				min: 0,
				max: 10,
				incr: 1
			},
			{ // Textfield
				placeHolder: "this is placeholder",
				labelText: "This is a label",
				defaultValue: "a"
			},
		]
		return lookUp[ id - 1 ]
	}

	tileIDFromName = function (name) {
		var lookUp = {
			Button: 1,
			Slider: 2,
			Switch: 3,
			NumericStepper: 4,
			Textfield: 5
		}
		return lookUp[name]
	}

	createTileWithID = function (tileID, tileDict, key, size) {
		var tag = tileDict.tag
    var location = tileDict.locations
    var parameters = tileDict.parameters

    var uiElement
    switch (tileID) {
      case 1:
        uiElement = <Button key={key} tag={tag} title={parameters["title"]} height={location[1].y - location[0].y + 1} size={size} />
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

    return (<ControllerTile key={key} location={location} size={size} subview={uiElement} />)
	}

	createBGTiles = function (width, height, size) {
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

	createTilesFromArray = function (allTileData, size) {
      var uiTiles = []
      var i = 0
      for (i in allTileData) {
        if (i < allTileData.length) {
          var tileDict = allTileData[i]
          var tileID = tileDict.tileID
          uiTiles.push(this.createTileWithID(tileID, tileDict, i, size))
        }
      }

      return uiTiles
  	}

	constructor(mainView) {
		this.gridView = mainView

	}
}