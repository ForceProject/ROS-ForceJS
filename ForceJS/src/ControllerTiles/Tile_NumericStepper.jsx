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
        return this.isInBounds(this.state.params.min, number, this.state.params.max)
    }

    setValue = function (value) {
        if (this.isValidNumber(value)) {
            this.setState({
            	params:{
            		incr:this.state.params.incr,
					max:this.state.params.max,
					min:this.state.params.min,
					value:value
				}
			})
        }
    }

    /**
     * Thanks to Sam Pfeiffer for his expert debugging skills in debuggin the bullshit nature of order of arguments in the below function.
     */
    buttonPressed = function (func, event) {

        var newNum = func(this.state.params.value, this.state.params.incr)

        this.setValue(newNum)
        this.sendMessage(this.state.params.value)
    }

    constructor(props) {
        super(props)
        this.setData = this.setValue
    }

    render() {
        var childElement = (
			<div className="numericStepper">
				<p>{this.state.params.value}</p>
				<RaisedButton className='numericStepper-button' label="-" onClick={this.buttonPressed.bind(this, this.subtract)} />
				<RaisedButton className='numericStepper-button' label="+" onClick={this.buttonPressed.bind(this, this.add)} />
			</div>
        )

        return this.embedInContainerTile(childElement)
    }
}

export default NumericStepper