import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import ControllerTile from '.'

class Textfield extends ControllerTile {

	textValueChanged = function (event, value) {
		this.sendMessage(value)
	}

	setTextValue = function (value) {
		this.setState({
			defaultValue: value
		})
	}

	constructor(props) {
		super(props);
		this.setData = this.setTextValue
	}

	render() {

		var childElement = (
			<TextField
				floatingLabelText={this.state.labelText}
				hintText={this.state.placeHolder}
				value={this.state.defaultValue}
				onChange={this.textValueChanged.bind(this)}
			/>
		)

		return this.embedInContainerTile(childElement)
	}
}

export default Textfield