import React, {Component} from 'react'
import {
    Button,
    Dialog,
    EditableText,
    Intent
} from '@blueprintjs/core'
import GF from './GlobalFunctions.js'

class DimensionsDialog extends Component {

    trackChanges = function (key, value) {
        var toCheck = value
        if (value.length === 1) {
            toCheck = 0
        }
        if (GF.isInt(value)) {
            var nD = this.state.newDimensions
            nD[key] = parseInt(toCheck).toString()
            this.setState({
                newDimensions: nD
            })
        }
    }

    createClicked = () => {
        let dimensions = this.state.newDimensions
        let conv = {
            width:parseInt(dimensions.width),
            height:parseInt(dimensions.height),
            divisor:parseInt(dimensions.divisor)
        }
        this.props.completion(conv)
        this.toggleDialog()
    }

    toggleDialog = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            isOpen: true,
            newDimensions: this.props.dimensions
        }
    }

    render() {

        return (
            <Dialog
                iconName="pt-icon-fullscreen"
                isOpen={this.state.isOpen}
                onClose={this.toggleDialog}
                title="Controller Dimensions">
                <div className="pt-dialog-body">
                    <h6>Width</h6>
                    <EditableText placeholder="Width"
                                  value={this.state.newDimensions.width}
                                  onChange={this.trackChanges.bind(this, "width")} />
                    <br/><br/>
                    <h6>Height</h6>
                    <EditableText placeholder="Height"
                                  value={this.state.newDimensions.height}
                                  onChange={this.trackChanges.bind(this, "height")} />
                    <br/><br/>
                    <h6>Size</h6>
                    <EditableText placeholder="Divisor / Single Tile Size"
                                  value={this.state.newDimensions.divisor}
                                  onChange={this.trackChanges.bind(this, "divisor")} />
                </div>
                <div className="pt-dialog-footer">
                    <div className="pt-dialog-footer-actions">
                        <Button text="Cancel" />
                        <Button intent={Intent.PRIMARY} onClick={this.createClicked} text="Create" />
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default DimensionsDialog