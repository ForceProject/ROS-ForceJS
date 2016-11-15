// Tile Adder Handler

import React from 'react'

import ControllerTile from './ControllerTiles/ControllerTile.jsx'

import BGTile from './BGTile.jsx';

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

  createTileWithID = function (tileID, tag, location, size) {
    var dataDictionary = {
      'tag': tag,
      'tileID': tileID,
      'location': location,
      'size': size
    }
    return (<ControllerTile key={tag} dataDict={dataDictionary} />)
  }

	createAt = function (tileID, startLocation, endLocation) {
		var newTile = this.createTileWithID(tileID, this.gridViewParent.state.tiles.length.toString(), [startLocation, endLocation], this.size)
		console.log("Adding Tile")
		this.gridViewParent.addTile(newTile)
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
	}
}