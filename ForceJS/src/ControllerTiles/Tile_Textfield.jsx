import React, {Component} from 'react'
import TextField from 'material-ui/TextField'

class Textfield extends Component {

	textValueChanged = function (event, value) {
		this.props.sendCallback(value)
	}

	setTextValue = function (value) {
		this.setState({
			defaultValue: value
		})
	}

	constructor(props) {
		super(props);
		this.state = this.props

		var parent = this.props.parent
		parent.setChildSetFunction(this.setTextValue.bind(this))
	}

	render() {
		return (
				<TextField
				floatingLabelText={this.state.labelText}
				hintText={this.state.placeHolder}
				value={this.state.defaultValue}
				onChange={this.textValueChanged.bind(this)}
				/>
			)
	}
}

export default Textfield