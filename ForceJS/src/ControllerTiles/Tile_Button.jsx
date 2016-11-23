import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ControllerTile from '.'

class ButtonTile extends ControllerTile {

	buttonRef = function (button) {

	}

	buttonPressed = function (func) {
		this.sendMessage("Clicked")
	}

	constructor(props) {
		super(props)
	}

	render() {
		var title = this.state.title
		var height = this.state.height
		var size = this.state.size

		var style = {
					width: '100%',
					height: height * size
				}

		var childElement = (<RaisedButton label={title} style={style} onClick={this.buttonPressed.bind(this)}/>)
		return this.embedInContainerTile(childElement)
	}
}



export default ButtonTile