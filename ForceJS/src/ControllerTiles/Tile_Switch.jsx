import React, {Component} from 'react'
import Toggle from 'material-ui/Toggle'
import ControllerTile from '.'

class Switch extends ControllerTile {
	
	switchToggled = function (event, value) {
		this.sendMessage(value)
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
		super(props)
		this.setData = this.setValue.bind(this)
	}

	render() {
		var childElement = (					
			<Toggle
			label={this.state.title}
			labelPosition={this.state.labelSideLeft ? "left":"right"}
			toggled={this.state.toggled}
			className={"vertically-centered"}
			onToggle={this.switchToggled.bind(this)} />
		)

		return this.embedInContainerTile(childElement)
	}
}

export default Switch