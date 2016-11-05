import React, {Component} from 'react'
import Slider from 'material-ui/Slider'

class SliderTile extends Component {

	handleSliderValueChanged = (event, value) => {
		console.log(value)
	}

	render() {
		var defaultValue = this.props.defaultValue
		var step = this.props.step
		var min = this.props.min
		var max = this.props.max
		var isHorizontal = this.props.isHorizontal
		var reversed = this.props.reversed
		var axis = (isHorizontal ? "x":"y") + (reversed ? "-reversed":"")

		var style = {
			'margin-left': 5,
			'margin-right': 5,
			width: 'auto',
			'background-color': 'white'
		}

		return (
				<Slider defaultValue={defaultValue} step={step} min={min} max={max} axis={axis} style={style} />
			)
	}
}

export default SliderTile