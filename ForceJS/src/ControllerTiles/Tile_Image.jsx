/**
 * Created by jordan on 19/12/16.
 */
import React, {Component} from 'react'
import '../tile.css'
import ControllerTile from '.'

class ImageTile extends ControllerTile {

    // TODO: Make this work

    setImage = (imageData) => {
        console.log("SET IMAGE: DO SOMETHING")
    }

    constructor(props) {
        super(props)
        this.setData = this.setImage
    }

    render() {
        let style = {
            width: '100%',
            height: '100%',
            backgroundColor: 'purple'
        }
        let childElement = (<img style={style} />)
        return this.embedInContainerTile(childElement)
    }
}

export default ImageTile