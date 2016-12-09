import React, {Component} from 'react'

import {
	Button,
    Dialog,
    Intent,
} from '@blueprintjs/core'

import '@blueprintjs/core/dist/blueprint.css'
import TSDSectionConfigurator, {FormFieldType} from '../TileSettings/TSDSectionConfigurator.jsx'


class TileSettingsDialog extends Component {
 	
	constructor(props) {
		super(props);

    var sections = []

    var configurator = new TSDSectionConfigurator()
    configurator.newSection()
    configurator.addField(FormFieldType.Textfield, "Topic Name", {
        placeholder: "ROS Topic Name",
        value: "Predefined Value 1998"
    })
    configurator.addField(FormFieldType.Textfield, "Message Type", {
        placeholder: "ROS Message Type"
    })
    configurator.addField(FormFieldType.MultilineTextfield, "Send", {
        minLines:3,
        maxLines:10,
        placeholder: "This is a JSON dictionary, wrap it in {}"
    })
    configurator.closeSection("ROS")

		this.state = {
			isOpen: true,
            sections: configurator.output()
		}
	}

 	render() {
    return (
        <Dialog
            iconName="settings"
            isOpen={ this.state.isOpen }
            onClose={ this.toggleDialog }
            title="Tile Settings">
            <div className="pt-dialog-body">
                {this.state.sections}
            </div>
            <div className="pt-dialog-footer">
                <div className="pt-dialog-footer-actions">
                    <Button text="Cancel" />
                    <Button intent={Intent.PRIMARY} onClick={this.toggleDialog} text="Save" />
                </div>
            </div>
        </Dialog>
    );
  }
 
 	toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });
}

export default TileSettingsDialog