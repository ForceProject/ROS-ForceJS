import React, {Component} from 'react'
import Slider from 'material-ui/Slider'
import '../tile.css'
import ControllerTile from '.'

class SliderTile extends ControllerTile {

	handleSliderValueChanged = function (event, value) {
		this.sendMessage(value)
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
		/*
        this.setState({
			axis: (this.state.params.isHorizontal ? "x":"y") + (this.state.params.reversed ? "-reversed":"")
		})
		*/
		this.setData = this.setValue
	}

	render() {
		var style = {
			marginLeft: '0%',
			width: '100%',
			height: '100%',
			backgroundColor: 'white'
		}
		var childElement = (
			<Slider
				{...this.state.params}
				axis={"x"}
				style={style}
				className={'vertically-centered'}
				onChange={this.handleSliderValueChanged.bind(this)} />
			)
		return this.embedInContainerTile(childElement)
	}
}

export default SliderTile