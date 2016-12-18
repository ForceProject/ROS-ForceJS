import React, {Component} from 'react'
import {Button, Dialog, EditableText, Intent} from '@blueprintjs/core'

class LoadDialog extends Component {

    textfieldValueChanged = (newValue) => {
        this.value = newValue
    }

    saveClicked = () => {
        console.log(this.value)
        this.app.loadController(this.value)
        this.toggleDialog()
    }

    toggleDialog = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
        //if (!this.state.isOpen) {
            this.app.removeCurrentDialog()
        //}
    }

    constructor(props) {
        super(props)
        this.app = this.props.app
        this.state = {
            isOpen: true
        }
        this.value = ""
    }

    render() {
        return (
            <Dialog
            iconName="pt-icon-document-open"
            isOpen={this.state.isOpen}
            onClose={this.toggleDialog}
            title="Load Controller from JSON String">
                <div className="pt-dialog-body">
                    <EditableText
                        placeholder="Copy and Paste the JSON of a save file into here to load it as a controller."
                        multiline
                        minLines={10}
                        maxLines={15}
                        onChange={this.textfieldValueChanged} />
                </div>
                <div className="pt-dialog-footer">
                    <div className="pt-dialog-footer-actions">
                        <Button text="Cancel" />
                        <Button intent={Intent.PRIMARY} onClick={this.saveClicked} text="Load" />
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default LoadDialog