import React, {Component} from 'react'
import Slider from 'material-ui/Slider'
import '../tile.css'

class SliderTile extends Component {

	handleSliderValueChanged = function (event, value) {
		this.props.sendCallback(value)
	}

	isInBounds = function (min, num, max) {
		return min <= num && num <= max
	}

	isValidNumber = function (number) {
		return this.isInBounds(this.state.min, number, this.state.max)
	}

	setValue = function (value) {
		if (this.isValidNumber(value)) {
			this.setState({
				value: value
			})
		}
	}

	constructor(props) {
		super(props)

		this.state = {
			value: this.props.defaultValue,
			step: this.props.step,
			min: this.props.min,
			max: this.props.max,
			axis: (this.props.isHorizontal ? "x":"y") + (this.props.reversed ? "-reversed":"")
		}

		var parent = this.props.parent
		parent.setChildSetFunction(this.setValue.bind(this))
	}

	render() {
		var style = {
			marginLeft: '5%',
			width: '90%',
			height: '100%',
			backgroundColor: 'white'
		}

		return (
				<Slider
				{...this.state}
				style={style}
				className={'vertically-centered'}
				onChange={this.handleSliderValueChanged.bind(this)} />
			)
	}
}

export default SliderTile