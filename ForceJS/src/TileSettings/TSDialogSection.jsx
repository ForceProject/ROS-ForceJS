import React, {Component} from 'react'
import { Button, Collapse } from '@blueprintjs/core'


class TSDialogSection extends Component {

	getValues = () => {
		console.log(this.state.sectionElements["Topic Name"])
	}

    printLine = () => {
        console.log("--------------------")
    }

    // PURE and working
    extractFieldElements = (fields) => {

	    var nestStyle = {
	        marginTop: 5,
            marginBottom: 10
        }

        var extracted = []
        var keys = Object.keys(fields)
        for (var key of keys) {
			var field = fields[key]["field"]
            var title = fields[key]["title"]
            var nested = (
                <div style={nestStyle}>
                    <h6>{title}</h6>
                    {field}<br/>
                </div>
            )
            extracted.push(nested)
        }
        return extracted
    }

	handleClick = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	constructor(props) {
		super(props);

		this.state = {
			isOpen: true,
			sectionTitle: this.props.title,
			sectionElements: this.props.fields
		}

		//this.props.getInstanceFunc(this)
	}

	render() {
		var style = {
			borderWidth: 1,
			borderColor: '#ff0000',
			borderBottomStyle: 'solid'
		}
		return (
            <div style={style} >
                <Button onClick={this.handleClick}>
                    {this.state.isOpen ? "Hide":"Show"} {this.state.sectionTitle} Section
                </Button>
                <Collapse isOpen={this.state.isOpen}>
                    {this.extractFieldElements(this.state.sectionElements)}
                </Collapse>
            </div>
			)
	}
}

export default TSDialogSection