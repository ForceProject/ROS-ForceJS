/**
 * Created by jordan on 19/12/16.
 */
import React, {Component} from 'react'
import '../tile.css'
import ControllerTile from '.'

class LabelTile extends ControllerTile {

    setText = (newText) => {
        var nParams = this.state.params
        nParams["value"] = newText
        this.setState({
            params: nParams
        })
    }

    constructor(props) {
        super(props)
        this.setData = this.setText
    }

    render() {
        let style = {
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'white',
            verticalAlign: 'middle'
        }
        let childElement = (
            <p style={style}>{this.state.params.value}</p>
        )
        return this.embedInContainerTile(childElement)
    }
}

export default LabelTile