import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import MessageHandler from '../MessageHandler.js'

class ButtonTile extends Component {

	buttonPressed = function (func) {
		console.log("hello")
		MessageHandler.getInstance().sendMessage("Button", "Pressed")
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
				<RaisedButton label={title} style={style} onClick={this.buttonPressed}/>
			)
	}
}



export default ButtonTile