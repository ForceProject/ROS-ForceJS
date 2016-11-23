// Tile Adder Handler

import React from 'react'

import ControllerTile from './ControllerTiles'

import BGTile from './BGTile.jsx';


// startAddTileProcess
//  tileIDFromName
// getClickInput * 2
//  createAt
//    createTileWithID
//      c
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
    var dataDictionary = {
      'tag': tag,
      'tileID': tileID,
      'location': location,
      'size': size
    }
    return (
      <ControllerTile key={tag} dataDict={dataDictionary}>
        {this.createChildElement(tileID)}
      </ControllerTile>
      )
  }








  // BEGIN Creating the sub element
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

  createTileDataDictionary = function (tag, parameters, startLocation, endLocation) {
    return {
      'tag': tag,
      'locations': [startLocation, endLocation],
      'parameters': parameters
    }
  }

  tileParameters = function (tag, tileID) {
    var parameters = this.defaultParametersForTileID(tileID)
    var constantProps = {
      key: tag,
      tag: tag,
      parent: this,
      sendCallback: this.sendMessage.bind(this)
    }

    return this.mergeDictionaries(parameters, constantProps)
  }

  createChildElement = function (tileID) {
    var params = this.tileParameters(this.state.tag, tileID)
    if (this.state.childElementParams === undefined) {
      this.state.childElementParams = params
    }

    var uiElement
    switch (tileID) {
      case 1:
        uiElement = <Button
        {...params}
        height={this.state.location[1].y - this.state.location[0].y + 1}
        size={this.state.size} />
      break
      case 2:
        uiElement = <Slider {...params}/>
      break
      case 3:
        uiElement = <Switch {...this.state.childElementParams} />
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
  // END Creating the sub element


	constructor(mainView, size) {
		this.gridViewParent = mainView
		this.size = size
	}
}