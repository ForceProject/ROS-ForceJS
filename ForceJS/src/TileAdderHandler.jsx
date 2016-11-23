// Tile Adder Handler

import React from 'react'

import ControllerTile from './ControllerTiles'

import BGTile from './BGTile.jsx';

import Button from './ControllerTiles/Tile_Button.jsx' // 1
import Slider from './ControllerTiles/Tile_Slider.jsx'
import Switch from './ControllerTiles/Tile_Switch.jsx' // 3
import NumericStepper from './ControllerTiles/Tile_NumericStepper.jsx'
import Textfield from './ControllerTiles/Tile_Textfield.jsx' // 5
                      
// TILE Creation Process
// startAddTileProcess
//  tileIDFromName
// getClickInput * 2
//  createAt
//    createTileWithID
//      tileParameters
//        defaultParametersForTileID
//        mergeDictionaries
//      mergeDictionaries
export class TileAdderHandler {

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



  // BEGIN Creating and Adding the Tile
  startAddTileProcess = function (name) {
    console.log("Accepting Click Inputs")
    this.tileID = this.tileIDFromName(name)
    this.acceptingClicks = true
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

  createAt = function (tileID, startLocation, endLocation) {
    var newTile = this.createTileWithID(tileID, this.gridViewParent.state.tiles.length.toString(), [startLocation, endLocation], this.size)
    console.log("Adding Tile")
    this.gridViewParent.addTile(newTile)
  }

  createTileWithID = function (tileID, tag, location, size) {
    var params = this.tileParameters(tag, tileID)
    var dataDictionary = {
      'tag': tag,
      'tileID': tileID,
      'location': location,
      'size': size
    }
    params = this.mergeDictionaries(params, dataDictionary)

    var uiElement
    switch (tileID) {
      case 1:
        uiElement = <Button
        {...params}
        height={location[1].y - location[0].y + 1}
        size={size} />
      break
      case 2:
        uiElement = <Slider {...params}/>
      break
      case 3:
        uiElement = <Switch {...params} />
      break
      case 4:
        uiElement = <NumericStepper {...params} />
      break
      case 5:
        uiElement = <Textfield {...params} />
      break
      default:
      break;
    }

    return uiElement
  }

  tileParameters = function (tag, tileID) {
    var parameters = this.defaultParametersForTileID(tileID)
    var constantProps = {
      key: tag,
      tag: tag,
    }

    return this.mergeDictionaries(parameters, constantProps)
  }

  defaultParametersForTileID = function (id) {
    var lookUp = [
      { // Button
        title:"PR2"
      },
      { // Slider
        value:0,
        step:1,
        min:0,
        max:100,
        isHorizontal:true,
        reversed:false
      },
      { // Switch
        title:"Switch",
        labelSideLeft:true,
        toggled: true,
      },
      { // Numeric Stepper
        value:0,
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

  /**
   * SOURCE: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
  */
  mergeDictionaries = function (obj1,obj2){
      var obj3 = {};
      for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
  }
  // END Creating and Adding the Tile

	constructor(mainView, size) {
		this.gridViewParent = mainView
		this.size = size
	}
}