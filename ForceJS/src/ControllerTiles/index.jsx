import React, {Component} from 'react'
import ros from '../ros'
import '../tile.css'
import math from 'mathjs'
import GF from '../GlobalFunctions.js'

class ControllerTile extends Component {

	// React Component LifeCycle
	componentDidMount() {
		var type = this.dataTypeForTileID(this.state.tileID)
		if (type !== "n/a") {
			this.createTopic()
		}
	}

	componentWillUnmount() {
		var type = this.dataTypeForTileID(this.state.tileID)
		if (type !== "n/a") {
			this.stopTopic()
		}
	}

	// BEGIN ROS data flow
	
	// The 
	// @param type should be a string with the first character capitalised 
	createTopic = function () {
		//console.log(this.state.ros.topic)
		this.topic = ros.Topic(this.state.ros.topic);
    	this.topic.advertise()
	}

	stopTopic = function () {
		this.topic.unadvertise()
	}

	pushData = function (data) {
		this.topic.publish({
			data: data
		})
	}

	subscribeToIncoming = function () {
		var toSubscribeTopic = '/ForceJS/toController/' + this.state.tag
		
	}

	// END ROS data flow

	// BEGIN data flow between parent and child tile
	setData = function (value) {
		console.log("No Override", this)
	}

	oldCreateJSONToSend = function (data) {
		var key = this.state.ros.send.variableValue.key

		var toSend = {
			[key]: parseFloat(data)/1000
		}

		toSend = GF.mergeDictionaries(toSend, this.state.ros.send.staticValues)
		return toSend
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

	sendMessage = function (data) {
		console.log("Tag: " + this.state.tag + " sent: " + data)
		
		var toSend = this.newCreateJSONToSend(data)

		this.topic.publish(toSend);
		console.log(toSend)
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

	embedInContainerTile = function (child) {
		var location = this.state.location
		var size = this.state.size

		var style = this.locationStyle(location, size)

		return (
				<div className="ui-tile" style={style}>
					{child}
				</div>
			)
	}

	constructor(props) {
		super(props);
		this.state = this.props
		this.isEditting = false
	}

	render() {
		console.log("Render was not overwritten.")
		alert("YOU DIDN'T OVERRIDE RENDER FOR:" + this.state.tag)
		return null
	}
}

export default ControllerTile;