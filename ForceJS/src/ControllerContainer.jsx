import React, {Component} from 'react'

import ControllerLoader from './ControllerLoader.js'
import {TileAdderHandler} from './TileAdderHandler.jsx'
import './controller-styles.css';

class ControllerContainer extends Component {

    tileCoordinateAtLocation = function (x, y) {
        var size = this.props.dimensions.divisor
        var tile_x = Math.floor(x/size)
        var tile_y = Math.floor(y/size)
        return {x:tile_x, y:tile_y}
    }

    correctCoordinatesToContainer = function (x, y) {
        var thisContainer = document.getElementsByClassName('controller-container')[0]
        var new_x = x - thisContainer.offsetLeft + 1
        var new_y = y - thisContainer.offsetTop
        return {x:new_x, y:new_y}
    }

    getTileLocationFromMouseEvent = function (event) {
        var corrected = this.correctCoordinatesToContainer(event.pageX, event.pageY)
        var tile = this.tileCoordinateAtLocation(corrected.x, corrected.y)
        return tile
    }

    mouseClick = function (event) {
        var tile = this.getTileLocationFromMouseEvent(event)
        //console.log(tile.x, tile.y)
        this.tileAdder.getClickInput(tile.x, tile.y)
    }

    loadController = (jsonStr) => {
        if (jsonStr !== null) {
            if (this.props.tiles.length > 0) {
                alert("You must reset the controller before loading one.")
            } else {
                //this.lastJSONStr = jsonStr
                this.loader = new ControllerLoader(this.tileAdder, jsonStr)
            }
        }
    }



    componentDidMount() {
        this.loadController(this.props.load)
    }

    /*
    componentDidUpdate() {
        var jsonStr = this.props.load
        if (jsonStr !== this.lastJSONStr) {
            this.loadController(jsonStr)
        }
    }
    */

    componentWillReceiveProps(nextProps) {

        console.log("Will Receive Props")
        console.log(nextProps.tiles.map((tile) => {
            return `TAG: ${tile.props.tag}; KEY: ${tile.key}`
        }))
        console.log(nextProps.tiles)

        if (this.props.load !== nextProps.load) {
            this.loadController(nextProps.load)
        }

        if (this.props.dimensions !== nextProps.dimensions) {
            this.setState({
                bgInstances:[]
            })
        }

        if (this.props.tiles.length !== nextProps.tiles.length) {
            this.forceUpdate()
        }
    }

    getBGTileInstance = (instance) => {
        this.state.bgInstances.push(instance)
    }

    setBGTileHighlighted = (location, highlighted) => {
        for (let instance of this.state.bgInstances) {
            if (instance.getX() === location.x && instance.getY() === location.y) {
                instance.setHighlighted(highlighted)
            }
        }
    }

    constructor(props) {
        super(props)

        this.tileAdder = this.props.adderHandler

        this.state = {
            listeningForCurserLocation: false,
            bgInstances: []
        }
    }

    render() {

        let dimensions = this.props.dimensions

        let dimensionsStyle = {
            width: dimensions.width.toString() + "px",
            height: dimensions.height.toString() + "px"
        }

        let bgTiles = this.tileAdder.createBGTiles(
            dimensions.width,
            dimensions.height,
            dimensions.divisor,
            this,
            this.getBGTileInstance
        )

        return (
            <div className="controller-container" style={dimensionsStyle} onClick={this.mouseClick.bind(this)} >
                <div>
                    {bgTiles}
                </div>
                <div>
                    {this.props.tiles}
                </div>
            </div>
        )
    }
}

export default ControllerContainer