import React, {Component} from 'react'
import { Button, Collapse } from '@blueprintjs/core'


class TSDialogSection extends Component {

    printLine = () => {
        console.log("--------------------")
    }

    // PURE and working
    extractFieldElements = (fields) => {

        let nestStyle = {
            marginTop: 5,
            marginBottom: 10
        }

        let extracted = []
        let keys = Object.keys(fields)
        for (let key of keys) {
            let field = fields[key]["field"]
            let title = fields[key]["title"]
            let nested = (
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
    }

    render() {
        let style = {
            //borderWidth: 1,
            //borderColor: '#ff0000',
            //borderBottomStyle: 'solid'
        }
		/*
		 <!--<Button onClick={this.handleClick}>
		 {this.state.isOpen ? "Hide":"Show"} {this.state.sectionTitle} Section
		 </Button>-->
		 */
		console.log(this.props)
        return (
			<div key={this.props.key} style={style} >
				<h4>{this.state.sectionTitle}</h4>
				<Collapse isOpen={this.state.isOpen}>
                    {this.extractFieldElements(this.state.sectionElements)}
				</Collapse>
			</div>
        )
    }
}

export default TSDialogSection