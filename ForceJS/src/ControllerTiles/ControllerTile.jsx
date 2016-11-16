import React, {Component} from 'react'

import Button from '../ControllerTiles/Tile_Button.jsx' // 1
import Slider from '../ControllerTiles/Tile_Slider.jsx'
import Switch from '../ControllerTiles/Tile_Switch.jsx' // 3
import NumericStepper from '../ControllerTiles/Tile_NumericStepper.jsx'
import Textfield from '../ControllerTiles/Tile_Textfield.jsx' // 5

class ControllerTile extends Component {

	sendMessage = function (data) {
		console.log("Tag: " + this.state.tag + " sent: " + data)
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

	tileParameters = function (tag, tileID) {
		var parameters = this.defaultParametersForTileID(tileID)
		var constantProps = {
			key: tag,
			tag: tag,
			sendCallBack: this.sendMessage.bind(this)
		}

		return this.mergeDictionaries(parameters, constantProps)
	}

	createChildElement = function (tileID) {
		var params = this.tileParameters(this.state.tag, tileID)

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

	locationStyle = function (location, size) {
		var x = 'x'
		var y = 'y'
		var topLeft = location[0]
		var bottomRight = location[1]
		var tileWidth = bottomRight[x] - topLeft[x] + 1
		var tileHeight = bottomRight[y] - topLeft[y] + 1

		var style = {
			top: topLeft[y] * size,
			left: topLeft[x] * size,
			width: tileWidth * size,
			height: tileHeight * size,
		}
		return style
	}

	constructor(props) {
		super(props);
		
		this.state = this.props.dataDict
	}

	render() {

		var childElement = this.createChildElement(this.state.tileID)

		var location = this.state.location
		var size = this.state.size

		var style = this.locationStyle(location, size)

		return (
				<div className="ui-tile" style={style}>
					{childElement}
				</div>
			)
	}
}

export default ControllerTile;