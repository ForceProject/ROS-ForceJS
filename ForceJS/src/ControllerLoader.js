 /*
 * Special Thanks to Strawberry Clouds & Trolli Brite Crawlers
 */

import GF from './GlobalFunctions.js'

class ControllerLoader {

    createTileFromDict = function (dictionary) {
        var params = GF.mergeDictionaries(dictionary.universalParameters, dictionary.parameters)

        var ros = {
            ros:{
                topic:dictionary.ros.topic.name,
                messageType:dictionary.ros.topic.messageType,
                send:dictionary.ros.send
            },
            params:dictionary.parameters
        }
        params = GF.mergeDictionaries(params, ros)

        // DO SOMETHING ABOUT THIS, IT'S BAD, IT'S HARDCODED
        var size = {
            size:80,
            app:this.tileAdder.gridViewParent
        }
        params = GF.mergeDictionaries(params, size)

        var tile = this.tileAdder.createTileWithIDAndParameters(
            dictionary.universalParameters.tileID,
            params,
            dictionary.universalParameters.location,
            size.size)
        return tile
    }

    createAndAddAllTilesFromArray = function (array) {
        var tiles = array.map(this.createTileFromDict.bind(this))
        //console.log(tiles)
        for (var tileIndex in tiles) {
            this.tileAdder.addTileToView(tiles[tileIndex])
        }
    }

    constructor(tileAdder, str) {
        this.tileAdder = tileAdder

        let parsed = JSON.parse(str)
        this.createAndAddAllTilesFromArray(parsed.tiles)
    }

}

export default ControllerLoader
