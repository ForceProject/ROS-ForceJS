import React, {Component} from 'react'
import Toggle from 'material-ui/Toggle'
import '../tile.css'

class Switch extends Component {
	
	switchToggled = function (event, value) {
		this.props.sendCallback(value)
		this.setState({
			toggled: value
		})
	}

	setValue = function (value) {
		this.setState({
			toggled: value
		})
		console.log(this.state.toggled)
	}

	constructor(props) {
		super(props);
		this.state = this.props

		var parent = this.props.parent
		parent.setChildSetFunction(this.setValue.bind(this))
		//this.setData = this.setValue.bind(this)
	}

	render() {
		var style = {

		}

		return (
				<Toggle
				label={this.state.title}
				labelPosition={this.state.labelSideLeft ? "left":"right"}
				toggled={this.state.toggled}
				style={style}
				className={"vertically-centered"}
				onToggle={this.switchToggled.bind(this)} />
			)
	}
}

export default Switch