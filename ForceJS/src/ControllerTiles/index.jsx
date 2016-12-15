import React, {Component} from 'react'
import ros from '../ros'
import '../tile.css'
import math from 'mathjs'
import GF from '../GlobalFunctions.js'
import TileSettingsDialog from '../TileSettings'

class ControllerTile extends Component {

    tileSettingsCallback = (newSettings) => {
        var rosSettings = newSettings.ROS
        rosSettings["send"] = JSON.parse(rosSettings["send"])
        let params = newSettings["Tile Parameters"]

        this.setState({
            ros:rosSettings,
            params:params
        })


        //http://stackoverflow.com/a/34321245
        // state doesnt update instantly

        this.forceUpdate()
        // Refresh the topic being published
        //this.stopTopic()
        this.shouldCreateTopic = true
    }

    componentDidUpdate() {
        if (this.shouldCreateTopic) {
            this.shouldCreateTopic = false
            this.createTopic()
        }
    }

    // React Component LifeCycle
    componentDidMount() {
        this.showTilePreferences()
        /*
         let typ = this.dataTypeForTileID(this.state.tileID)
         let rosData = this.state.ros
         if (typ !== "n/a" && rosData !== undefined) {
         this.createTopic()
         }
         */
    }

    componentWillUnmount() {
        let type = this.dataTypeForTileID(this.state.tileID)

        if (type !== "n/a") {
            this.stopTopic()
        }
    }

    printLine = () => {
        console.log("--------------------")
    }

    // BEGIN ROS data flow

    // The
    // @param type should be a string with the first character capitalised
    createTopic = function () {
        let topicName = this.state.ros.topic
        console.log("About to advertise topic: " + topicName)

        this.topic = ros.Topic(topicName)
        this.topic.advertise()
    }

    stopTopic = function () {
        if (this.topic !== undefined) {
            this.topic.unadvertise()
        }
    }

    // END ROS data flow

    // BEGIN data flow between parent and child tile
    setData = function (value) {
        console.log("No Override", this)
    }

    extractStringBetween = function (source, pre, suf) {
        var splitByOpening = source.split(pre)
        var filtered = splitByOpening.filter((string) => {return string.includes(suf)})
        var cleaned = filtered.map((string) => {return string.split(suf)[0]})
        return cleaned
    }

    getDataToInput = function (tag, thisData) {
        var input = null
        if (tag === "this") {
            input = thisData
        } else {
            // TODO: Bidirectional stuff
            // Search all tiles for matching tag
            // Read data from tag
            // Set it to the input
        }
        return input
    }

    newCreateJSONToSend = function (data) {
        var templateDict = this.state.ros.send
        var stringified = JSON.stringify(templateDict)

        /*
         * find all triangular braces and extract internal contents
         * remove the surrounding double quotes
         * if the data type is not a string, but substitute the "" with the number
         * if it is, insert it within the ""
         */
        var placeholders = this.extractStringBetween(stringified, "<", ">")
        var tags = placeholders.map((string) => {
            return string.split("(").filter((string) => {
                return !string.includes(")")
            })[0]
        })
        var types = placeholders.map((string) => {return this.extractStringBetween(string, "(", ")")[0]})

        for (var phIndex in placeholders) {
            var placeholder = placeholders[phIndex]
            var type = types[phIndex]

            var input = "" + this.getDataToInput(tags[phIndex], data) // Gotta change it to a string
            var convertedData = this.changeDataToType(input, type) // Then change it to the right data type

            if (type !== String) {
                placeholder = '"<' + placeholder + '>"'
            }

            stringified = stringified.replace(placeholder, convertedData.toString())
        }

        return JSON.parse(stringified)
    }

    sendMessage =  (data) => {
        console.log("Tag: " + this.state.tag + " sent: " + data)

        if (this.topic !== undefined) {
            let toSend = this.newCreateJSONToSend(data)
            console.log(toSend)
            this.topic.publish(toSend);
        } else {
            console.log("No ROS topic to publish data from tile: " & this.state.tag)
        }
        // setTimeout(() => {
        // 	this.messageRecieved(data + "a")
        // }, 150)

    }

    messageRecieved = function (data) {
        var newData = this.changeDataToType(data, this.dataTypeForTileID(this.state.tileID))
        // Now pass the data onto the child element by updating the
        this.setData(data)
    }
    // END data flow between parent and child tile

    changeDataToType = function (data, type) {
        var newData = data
        switch (type) {
            case "Float64":
                newData = parseFloat(data)
                break
            case "Int64":
                newData = parseInt(data)
                break
            case "String":
                // Do nothing, since the data is already a string
                break
            case "Bool":
                newData = data === 'true' || data === '1'
                break
            default:
                alert(this.state.tag + " does not accept input")
                break
        }
        return newData
    }

    dataKeyForTileID = function (id) {
        var lookUp = [
            "n/a",
            "defaultValue",
            "toggled",
            "value",
            "defaultValue",
        ]

        return lookUp[ id - 1 ]
    }

    dataTypeForTileID = function (id) {
        var lookUp = [
            "n/a",
            "Float64",
            "Bool",
            "Int64",
            "String",
        ]
        return lookUp[ id - 1 ]
    }

    locationStyle = function (location, size) {
        var x = 'x'
        var y = 'y'
        var topLeft = location[0]
        var bottomRight = location[1]
        var tileWidth = bottomRight[x] - topLeft[x] + 1
        var tileHeight = bottomRight[y] - topLeft[y] + 1

        var style = {
            top: topLeft[y] * size,
            left: topLeft[x] * size,
            width: tileWidth * size,
            height: tileHeight * size,
        }
        return style
    }

    preferencesAreNow = (shown) => {
        if (!shown) {
            this.app.removeCurrentSettingsDialog()
        }
    }

    showTilePreferences = () => {
        this.app.showSettingsDialog(<TileSettingsDialog ros={this.state.ros}
                                                        params={this.state.params}
                                                        callback={this.tileSettingsCallback}
        preferencesAreNow={this.preferencesAreNow}/>)
    }

    rightClicked = (e) => {
        e.preventDefault()
        // TODO: Show the tile settings
        console.log("\n\n Tile RIGHT CLICKED! Show the tile's preferences.")
        this.showTilePreferences()
    }

    embedInContainerTile = function (child) {
        var location = this.state.location
        var size = this.state.size

        var style = this.locationStyle(location, size)

        return (
            <div className="ui-tile" style={style} onContextMenu={this.rightClicked}>
                {child}
            </div>
        )
    }

    constructor(props) {
        super(props);
        let defaultROS = {
            ros: {
                topic: "/head_traj_controller/command",
                messageType: "trajectory_msgs/JointTrajectory",
                send: {
                    "joint_names": ["head_pan_joint", "head_tilt_joint"],
                    "points":[{
                        "positions": ["<this(Float64)>", -0.018430676901060112],
                        "velocities": [0.3, 0.0],
                        "accelerations": [],
                        "effort": [],
                        "time_from_start": {
                            "secs": 1,
                            "nsecs": 150000000
                        }
                    }]
                }
            }
        }
        this.state = GF.mergeDictionaries(defaultROS, this.props)
        this.isEditting = false
        this.app = this.state.app
    }

    render() {
        console.log("Render was not overwritten.")
        alert("YOU DIDN'T OVERRIDE RENDER FOR:" + this.state.tag)
        return null
    }
}

export default ControllerTile;