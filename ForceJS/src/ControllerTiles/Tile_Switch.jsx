import React, {Component} from 'react'
import Toggle from 'material-ui/Toggle'
import '../tile.css'

class Switch extends Component {
	
	switchToggled = function (event, value) {
		this.props.sendCallback(value)
	}

	render() {
		var label = this.props.title
		var labelSideLeft = this.props.labelSideLeft
		var on = this.props.on

		var style = {

		}

		return (
				<Toggle
				label={label}
				labelPosition={labelSideLeft ? "left":"right"}
				defaultToggled={on}
				style={style}
				className={"vertically-centered"}
				onToggle={this.switchToggled.bind(this)} />
			)
	}
}

export default Switch