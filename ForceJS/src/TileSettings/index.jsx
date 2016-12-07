import React, {Component} from 'react'

import {
	Button,
    Dialog,
    Intent,
} from '@blueprintjs/core'

import '@blueprintjs/core/dist/blueprint.css'
import TSDialogSection from '../TileSettings/TSDialogSection.jsx'
import TSDSectionConfigurator, {FormFieldType} from '../TileSettings/TSDSectionConfigurator.jsx'

interface TPDialogState {
	isOpen: boolean
}

class TileSettingsDialog extends Component<{}, TPDialogState> {
 	
	constructor(props) {
		super(props);

    var sections = []

    var configurator = new TSDSectionConfigurator()
    configurator.newSection()
    configurator.addField(FormFieldType.Textfield, "Topic Name")
    configurator.addField(FormFieldType.Textfield, "Message Type")
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