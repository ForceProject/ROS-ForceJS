/*
 * Special Thanks to Strawberry Clouds & Trolli Brite Crawlers
 */

import GF from './GlobalFunctions.js'

class ControllerLoader {

	loadRemoteJSON = function (filePath, callback) {
		var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', filePath, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null); 
	}

	loadLocalJSON = function (fileName) {
		return require('json-loader!./' + fileName + '.json')
	}

	loadJSON = function (filePath, isLocal, callback) {
		if (isLocal) {
			var json = this.loadLocalJSON(filePath)
			callback(json)
		} else {
			this.loadRemoteJSON(filePath, function (response) {
				callback(JSON.parse(response))
			})
		}
	}

	createTileFromDict = function (dictionary) {
		var params = GF.mergeDictionaries(dictionary.universalParameters, dictionary.parameters)
		
		var ros = {
			ros:dictionary.ros
		}
		params = GF.mergeDictionaries(params, ros)

		// DO SOMETHING ABOUT THIS, IT'S BAD, IT'S HARDCODED
		var size = {
			size:80
		}
		params = GF.mergeDictionaries(params, size)

		var tile = this.tileAdder.createTileWithIDAndParameters(dictionary.universalParameters.tileID, params)
		return tile
	}

	createAndAddAllTilesFromArray = function (array) {
		var tiles = array.map(this.createTileFromDict.bind(this))
		console.log(tiles)
		for (var tileIndex in tiles) {
			this.tileAdder.addTileToView(tiles[tileIndex])
		}
	}

	constructor(tileAdder, filePath) {
		this.tileAdder = tileAdder

		this.loadJSON(filePath, true, (response) => {			
			var allTileData = response.tiles
			this.createAndAddAllTilesFromArray(allTileData)
		})
	}

}

export default ControllerLoader