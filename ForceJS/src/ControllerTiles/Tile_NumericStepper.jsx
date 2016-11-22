import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import '../tile.css'

class NumericStepper extends Component {

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
				current: value
			})
		}
	}

	/**
	* Thanks to Sam Pfeiffer for his expert debugging skills in debuggin the bullshit nature of order of arguments in the below function.
	*/
	buttonPressed = function (func, event) {

		var newNum = func(this.state.current, this.state.increment)

		if (this.isValidNumber(newNum)) {
			this.setState({
				current: newNum
			})
		}
		this.props.sendCallback(this.state.current)
	}

	constructor(props) {
		super(props)
		this.state = {
			current: props.value,
			min: props.min,
			max: props.max,
			increment: props.incr
		}

		var parent = this.props.parent
		parent.setChildSetFunction(this.setValue.bind(this))
	}

	render() {
		return (
				<div className="numericStepper">
					<p>{this.state.current}</p>
					<RaisedButton className='numericStepper-button' label="-" onClick={this.buttonPressed.bind(this, this.subtract)} />
					<RaisedButton className='numericStepper-button' label="+" onClick={this.buttonPressed.bind(this, this.add)} />
				</div>
			)
	}
}

export default NumericStepper