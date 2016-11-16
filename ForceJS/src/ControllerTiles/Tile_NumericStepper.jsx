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

	/**
	* Thanks to Sam Pfeiffer for his expert debugging skills in debuggin the bullshit nature of order of arguments in the below function.
	*/
	buttonPressed = function (func, event) {

		var newNum = func(this.state.current, this.state.increment)

		if (this.isInBounds(this.state.min , newNum, this.state.max)) {
			this.setState({
				current: newNum
			})
		}
		this.props.sendCallback(this.state.current)
	}

	constructor(props) {
		super(props)
		this.state = {
			current: props.initial,
			min: props.min,
			max: props.max,
			increment: props.incr
		}
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