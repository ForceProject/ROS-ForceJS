import React, {Component} from 'react'
import TextField from 'material-ui/TextField'

class Textfield extends Component {

	textValueChanged = function (event, value) {
		this.props.sendCallback(value)
	}

	render() {
		return (
				<TextField
				floatingLabelText={this.props.labelText}
				hintText={this.props.placeHolder}
				defaultValue={this.props.defaultValue}
				onChange={this.textValueChanged.bind(this)}
				/>
			)
	}
}

export default Textfield