import React, {Component} from 'react'

import ControllerLoader from './ControllerLoader.js'
import './controller-styles.css';
import BGTile from './BGTile.jsx';

class ControllerContainer extends Component {
    constructor(props) {
        super(props)

        this.tileAdder = this.props.adderHandler

        this.state = {
            listeningForCurserLocation: false,
            bgInstances: [],
            clickBuffer: []
        }
    }

    tileClicked = (info)=> {
        // console.log("clicked", info)

        if (this.props.acceptingClicks) {
            let clickBuffer = this.state.clickBuffer
            clickBuffer.push(info)

            if (clickBuffer.length >= 2) {
                this.props.positionChosen(clickBuffer)
                clickBuffer = []
            }
            this.setState({
                clickBuffer: clickBuffer
            })
        }
    }

    createBGTiles = function (width, height, size, callback) {
        var numHor = width / size
        var numVert = height / size

        var tiles = []

        for (var v = 0; v < numVert; v++) {
            var row = []
            for (var h = 0; h < numHor; h++) {
                var highlighted = false
                for (var click of this.state.clickBuffer) {
                    if (click.x === h && click.y === v) {
                        highlighted = true
                    }
                }
                row.push(
                    <BGTile key={(v*numHor)+h}
                        x={h*size}
                        y={v*size}
                        size={size}
                        highlighted={highlighted}
                        onClick={this.tileClicked}
                    />
                )
            }
            tiles.push(row)
        }

        return tiles
    }

    loadController = (jsonStr) => {
        if (jsonStr !== null) {
            if (this.props.tiles.length > 0) {
                //alert("You must reset the controller before loading one.")
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
        /*
        console.log("Will Receive Props")
        console.log(nextProps.tiles.map((tile) => {
            return `TAG: ${tile.props.tag}; KEY: ${tile.key}`
        }))
        console.log(nextProps.tiles)
        */
        
        if (this.props.load !== nextProps.load) {
            this.loadController(nextProps.load)
        }

        if (this.props.dimensions !== nextProps.dimensions) {
            this.bgTiles = null
            this.setState({
                bgInstances:[]
            })
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

    render() {

        let dimensions = this.props.dimensions

        let dimensionsStyle = {
            width: dimensions.width.toString() + "px",
            height: dimensions.height.toString() + "px"
        }

        let bgTiles = this.createBGTiles(
            dimensions.width,
            dimensions.height,
            dimensions.divisor
        )

        return (
            <div className="controller-container" style={dimensionsStyle} >
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
