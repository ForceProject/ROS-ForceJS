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

	/**

  @param startLoc Array [x,y]
  @param width Integer
  @param height Integer
  */
  createLocations = function (startLoc, width, height) {
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

  clickBuffer = []
  getClickInput = function (x, y) {
  	if (this.acceptingClicks) {
  		console.log("Got Click Input")
  		this.clickBuffer.push({'x':x, 'y':y})
  		if (this.clickBuffer.length === 2) {
  				this.acceptingClicks = false
  				this.createAt(this.tileID, this.clickBuffer[0], this.clickBuffer[1]) // This should check which one is top left and which one isn't
  				this.clickBuffer = []
  		}
  	}
  }

	startAddTileProcess = function (name) {
		console.log("Accepting Click Inputs")
		this.tileID = this.tileIDFromName(name)
		this.acceptingClicks = true
	}

	createAt = function (tileID, startLocation, endLocation) {
		var tileDataDictionary = this.createTileDataDictionary(
			this.gridViewParent.state.tiles.length,
			this.defaultParametersForTileID(tileID),
			startLocation,
			endLocation
			)

		var newTile = this.createTileWithID(tileID, tileDataDictionary, this.keyIncr, this.size)
		this.keyIncr ++
		console.log("Adding Tile")
		this.gridViewParent.addTile(newTile)
	}

	createTileDataDictionary = function (tag, parameters, startLocation, endLocation) {
		return {
			'tag': tag,
			'locations': [startLocation, endLocation],
			'parameters': parameters
		}
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
			'Numeric Stepper': 4,
			TextField: 5
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

	constructor(mainView, size) {
		this.gridViewParent = mainView
		this.size = size
		this.keyIncr = 0
	}
}