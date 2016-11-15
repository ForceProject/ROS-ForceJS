import React, {Component} from 'react'

import Button from '../ControllerTiles/Tile_Button.jsx' // 1
import Slider from '../ControllerTiles/Tile_Slider.jsx'
import Switch from '../ControllerTiles/Tile_Switch.jsx' // 3
import NumericStepper from '../ControllerTiles/Tile_NumericStepper.jsx'
import Textfield from '../ControllerTiles/Tile_Textfield.jsx' // 5

class ControllerTile extends Component {

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

	createChildElement = function (tileID) {

		var parameters = this.defaultParametersForTileID(tileID)

		var uiElement
    switch (tileID) {
      case 1:
        uiElement = <Button
        key={this.state.tag}
        tag={this.state.tag}
        title={parameters["title"]}
        height={this.state.location[1].y - this.state.location[0].y + 1}
        size={this.state.size} />
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
        uiElement = <Switch
        title={parameters.title}
        labelSideLeft={parameters.labelSideLeft}
        on={parameters.on} />
      break
      case 4:
        uiElement = <NumericStepper
        initial={parameters.initial}
        min={parameters.min}
        max={parameters.max}
        incr={parameters.incr} />
      break
      case 5:
        uiElement = <Textfield
        placeHolder={parameters.placeHolder}
        labelText={parameters.labelText}
        defaultValue={parameters.defaultValue} />
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