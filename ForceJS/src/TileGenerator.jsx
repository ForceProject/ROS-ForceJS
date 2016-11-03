import Button from './ControllerTiles/Tile_Button.jsx'

class TileGenerator {
	function createTilesFromArray(uiTiles) {
		var uitiles = []
	    for (var tileDict in tilesArray) {
	      var tileID = tileDict["tileID"]
	      var tag = tileDict["tag"]

	        switch (tileID) {
	          case 1:
	          uitiles.push(<Button )
	          break
	          default:
	          break;
	        }
	    }
	}
}