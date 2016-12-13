import React, {Component} from 'react'

import {
	Button,
    Dialog,
    Intent,
} from '@blueprintjs/core'

import '@blueprintjs/core/dist/blueprint.css'
import TSDSectionConfigurator, {FormFieldType} from '../TileSettings/TSDSectionConfigurator.jsx'


class TileSettingsDialog extends Component {

    createROSSection = (configurator) => {
        configurator.newSection()
        configurator.addField(FormFieldType.Textfield, "Topic Name", {
            placeholder: "ROS Topic Name"
        })
        configurator.addField(FormFieldType.Textfield, "Message Type", {
            placeholder: "ROS Message Type"
        })
        configurator.addField(FormFieldType.MultilineTextfield, "Send", {
            minLines:3,
            maxLines:10,
            placeholder: 'This is a JSON dictionary, wrap it in {}; Sample:\n{"data":"<this(Float64)>"}',
            defaultValue: "{\n\n}"
        })
        configurator.closeSection("ROS")
    }

    // PURE working
    createSectionFromParamsDict = (params, config) => {
        config.newSection()
        let keys = Object.keys(params)
        for (let key of keys) {
            let value = params[key]
            let typ = typeof(value)
            let stdParams = {
                placeholder: value,
                defaultValue:value
            }
            switch (typ) {
                case "string":
                    config.addField(FormFieldType.Textfield, key, stdParams)
                    break
                case "number":
                    config.addField(FormFieldType.NumericalText, key, stdParams)
                    break
                case "boolean":
                    config.addField(FormFieldType.Switch, key, {
                        defaultChecked: value
                    })
                    break
                default:
                    console.log("TSDialogSection does not know the type of: " & value)
                    break
            }
        }
        config.closeSection("Tile Parameters")
    }

	constructor(props) {
		super(props);

        var sections = []

        var sliderParams = {
            "value":0,
            "step":0.001,
            "min":-2.7,
            "max":2.7,
            "isHorizontal":true,
            "reversed":false
        }

        var configurator = new TSDSectionConfigurator()
        this.createROSSection(configurator)
        this.createSectionFromParamsDict(sliderParams, configurator)

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