import React, {Component} from 'react'
import { Button, Collapse, EditableText } from '@blueprintjs/core'

interface TSDialogSectionState {
	isOpen: boolean
}

class TSDialogSection extends Component<{}, TSDialogSectionState> {

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
			return (
					<div>
						<Button onClick={this.handleClick}>
							{this.state.isOpen ? "Hide":"Show"} {this.state.sectionTitle} Section
						</Button>
						<Collapse isOpen={this.state.isOpen}>
							{this.state.sectionElements}
						</Collapse>
					</div>
				)
	}
}

export default TSDialogSection