// Tile Adder Handler

import React from 'react'

import ControllerTile from './ControllerTiles'

import Button from './ControllerTiles/Tile_Button.jsx' // 1
import Slider from './ControllerTiles/Tile_Slider.jsx'
import Switch from './ControllerTiles/Tile_Switch.jsx' // 3
import NumericStepper from './ControllerTiles/Tile_NumericStepper.jsx'
import Textfield from './ControllerTiles/Tile_Textfield.jsx' // 5
import Label from './ControllerTiles/Tile_Label.jsx'
import ImageTile from './ControllerTiles/Tile_Image.jsx' // 7

import GF from './GlobalFunctions.js'

// TILE Creation Process
// startAddTileProcess
//  tileIDFromName
// getClickInput * 2
//  createAt
//    createTileWithID
//      tileParameters
//        defaultParametersForTileID
//        mergeDictionaries
//      mergeDictionaries
export class TileAdderHandler {
    // BEGIN Creating and Adding the Tile
    startAddTileProcess = function (name) {
        //console.log("Accepting Click Inputs")
        this.tileID = this.tileIDFromName(name)
        this.acceptingClicks = true
        this.gridViewParent.forceUpdate() // ugly
    }

    tileIDFromName = function (name) {
        var lookUp = {
            Button: 1,
            Slider: 2,
            Switch: 3,
            'Numeric Stepper': 4,
            TextField: 5,
            Label: 6,
            Image: 7
        }
        return lookUp[name]
    }

    positionChosen = (locations) => {
        var tag = this.gridViewParent.state.tiles.length
        let allTags = this.gridViewParent.allTags()
        while (allTags.indexOf(tag.toString()) !== -1) {
            tag += 1
        }
        this.createAt(tag.toString(), this.tileID, locations, this.size) // This should check which one is top left and which one isn't
    }

    createAt = function (tag, tileID, locations, size) {
        var params = this.tileParameters(tag, tileID, locations, size)
        var newTile = this.createTileWithIDAndParameters(tileID, params, locations, size)
        console.log("Adding Tile")
        this.addTileToView(newTile)
    }

    addTileToView = function (tile) {
        this.gridViewParent.addTile(tile)
    }

    createTileWithIDAndParameters = function (tileID, params, location, size) {
        var uiElement
        switch (tileID) {
            case 1:
                uiElement = <Button
                    {...params}
                    height={location[1].y - location[0].y + 1}
                    size={size} />
                break
            case 2:
                uiElement = <Slider {...params}/>
                break
            case 3:
                uiElement = <Switch {...params} />
                break
            case 4:
                uiElement = <NumericStepper {...params} />
                break
            case 5:
                uiElement = <Textfield {...params} />
                break
            case 6:
                uiElement = <Label {...params} />
                break
            case 7:
                uiElement = <ImageTile {...params} />
                break
            default:
                break;
        }

        return uiElement
    }

    /*
     * Location format [{x:0,y:0}, {x:1,y:1}]
     */
    tileParameters = function (tag, tileID, location, size) {
        let parameters = this.defaultParametersForTileID(tileID)
        let constantProps = {
            key: tag,
            tag: tag,
            tileID: tileID,
            location: location,
            size: size,
            app: this.gridViewParent,
            params: parameters
        }

        return constantProps
    }

    defaultParametersForTileID = function (id) {
        var lookUp = [
            { // Button
                title:"PR2"
            },
            { // Slider
                initialValue:0,
                value:10,
                stepSize:1,
                min:0,
                max:100,
                labelStepSize:10,
                //axis:"x"
                //isHorizontal:true,
                //reversed:false
            },
            { // Switch
                title:"Switch",
                labelSideLeft:true,
                toggled: true,
            },
            { // Numeric Stepper
                value:0,
                min: 0,
                max: 10,
                incr: 1
            },
            { // Textfield
                placeHolder: "this is placeholder",
                labelText: "This is a label",
                defaultValue: "a"
            },
            { // Label
                value: "Hello World"
            },
            { // Image
                // TODO: Put something here for image params
            }
        ]
        return lookUp[ id - 1 ]
    }

    // END Creating and Adding the Tile

    constructor(mainView, size) {
        this.gridViewParent = mainView
        this.size = size
    }
}
