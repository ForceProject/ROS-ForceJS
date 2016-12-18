import React, {Component} from 'react'
import {Slider} from '@blueprintjs/core'
import '../tile.css'
import ControllerTile from '.'

class SliderTile extends ControllerTile {

	handleSliderValueChanged = (value) => {
	    var nParams = this.state.params
        nParams["value"] = value
        this.setState({
            params:nParams
        })
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
			width: '100%',
		}
		var childElement = (
            <div className="vertically-centered" style={{
                paddingLeft: 15,
                paddingRight: 15,
                width:'100%',
                backgroundColor: 'white'
            }}>
                <Slider
                    {...this.state.params}
                    style={style}
                    onChange={this.handleSliderValueChanged} />
            </div>
        )
		return this.embedInContainerTile(childElement)
	}
}

export default SliderTile