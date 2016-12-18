import React, {Component} from 'react'

import {
	Button,
    Dialog,
    Intent,
} from '@blueprintjs/core'

import '@blueprintjs/core/dist/blueprint.css'
import TSDSectionConfigurator, {FormFieldType} from '../TileSettings/TSDSectionConfigurator.jsx'


class TileSettingsDialog extends Component {

    createROSSection = (ros, configurator) => {
        configurator.newSection("ROS")
        configurator.addField(FormFieldType.Textfield, "topic", {
            placeholder: "ROS Topic Name",
            defaultValue: ros.topic
        })
        configurator.addField(FormFieldType.Textfield, "messageType", {
            placeholder: "ROS Message Type",
            defaultValue: ros.messageType
        })
        configurator.addField(FormFieldType.MultilineTextfield, "send", {
            minLines:3,
            maxLines:5,
            placeholder: 'This is a JSON dictionary, wrap it in {}; Sample:\n{"data":"<this(Float64)>"}',
            defaultValue: JSON.stringify(ros.send)
        })
        configurator.closeSection()
    }

    // PURE working
    createSectionFromParamsDict = (params, config) => {
        config.newSection("Tile Parameters")
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
        config.closeSection()
    }

    createTagSection = (tag, config) => {
        config.newSection("Tag")
        config.addField(FormFieldType.Textfield, "Tag", {
            defaultValue:tag,
            placeholder:"Enter a unique tag for this tile."
        })
        config.closeSection()
    }

    printLine = () => {
        console.log("--------------------")
    }

	constructor(props) {
		super(props);

        var configurator = new TSDSectionConfigurator(this.props.allTags)
        this.createTagSection(this.props.tag, configurator)
        this.createROSSection(this.props.ros, configurator)
        this.createSectionFromParamsDict(this.props.params, configurator)

		this.state = {
			isOpen: true,
            sections: configurator
		}
	}

	componentDidUpdate() {
        this.props.preferencesAreNow(this.state.isOpen)
    }

	saveClicked = (event) => {
        this.toggleDialog()

        var settingsData = this.state.sections.getData()
        this.props.callback(settingsData)
    }

 	render() {
        return (
            <Dialog
                iconName="settings"
                isOpen={ this.state.isOpen }
                onClose={ this.toggleDialog }
                title="Tile Settings">
                <div className="pt-dialog-body">
                    {this.state.sections.output()}
                </div>
                <div className="pt-dialog-footer">
                    <div className="pt-dialog-footer-actions">
                        <Button text="Cancel" onClick={this.toggleDialog} />
                        <Button intent={Intent.PRIMARY} onClick={this.saveClicked} text="Save" />
                    </div>
                </div>
            </Dialog>
        );
    }

  toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });
}

export default TileSettingsDialog