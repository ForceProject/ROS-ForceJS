import React, {Component} from 'react'
import TextField from 'material-ui/TextField'

class Textfield extends Component {

	render() {
		return (
				<TextField floatingLabelText={this.props.labelText} hintText={this.props.placeHolder} defaultValue={this.props.defaultValue}/>
			)
	}
}

export default Textfield