import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import '../tile.css'
import ControllerTile from '.'

class NumericStepper extends ControllerTile {

	add = function (x, y) {
		return x + y
	}

	subtract = function (x, y) {
		return x - y
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

	/**
	* Thanks to Sam Pfeiffer for his expert debugging skills in debuggin the bullshit nature of order of arguments in the below function.
	*/
	buttonPressed = function (func, event) {

		var newNum = func(this.state.value, this.state.incr)

		if (this.isValidNumber(newNum)) {
			this.setState({
				value: newNum
			})
		}
		this.sendMessage(this.state.value)
	}

	constructor(props) {
		super(props)
		this.setData = this.setValue
	}

	render() {
		var childElement = (
			<div className="numericStepper">
					<p>{this.state.value}</p>
					<RaisedButton className='numericStepper-button' label="-" onClick={this.buttonPressed.bind(this, this.subtract)} />
					<RaisedButton className='numericStepper-button' label="+" onClick={this.buttonPressed.bind(this, this.add)} />
				</div>
		)

		return this.embedInContainerTile(childElement)
	}
}

export default NumericStepper