import React, {Component} from 'react'
import { Button, Collapse } from '@blueprintjs/core'


class TSDialogSection extends Component {

	getValues = () => {
		console.log(this.state.sectionElements["Topic Name"])
	}

    extractFieldElements = (fields) => {
        var extracted = []
        var keys = Object.keys(fields)
        for (var key of keys) {
            extracted.push(fields.key.field)
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

		this.getValues()
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