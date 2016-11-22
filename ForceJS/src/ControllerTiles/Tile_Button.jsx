import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import MessageHandler from '../MessageHandler.js'

class ButtonTile extends Component {

	buttonRef = function (button) {

	}

	buttonPressed = function (func) {
		this.props.sendCallback("Clicked")
	}

	render() {
		var title = this.props.title
		var height = this.props.height
		var size = this.props.size

		var style = {
					width: '100%',
					height: height * size
				}
		return (
				<RaisedButton ref={this.buttonRef.bind(this)} label={title} style={style} onClick={this.buttonPressed.bind(this)}/>
			)
	}
}



export default ButtonTile