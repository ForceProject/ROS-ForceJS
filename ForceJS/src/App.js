import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar.jsx'
import ControllerContainer from './ControllerContainer.jsx'
import {TileAdderHandler} from './TileAdderHandler.jsx'
import DimensionsDialog from './DimensionsDialog.jsx'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TileSettingsDialog from './TileSettings'

class App extends Component {
    getDOMTileTag = (tile) => {
        return tile.props.tag
    }
    getTileInstanceTag = (instance) => {
        return instance.getTag()
    }

    removeTile = (tag) => {
        // TODO: WHY is the output correct, but what is displayed wrong?
        // TODO: WHY does it work for manually added stuff but not loaded stuff?

        // console.log("Delete: " + tag)
        // console.log("Tiles")
        // console.log(this.state.tiles.map(this.getDOMTileTag))
        // console.log("Instances")
        // console.log(this.state.tileInstances.map(this.getTileInstanceTag))
        // console.log("Updated")

        let updatedTiles = this.state.tiles.filter((tile) => {
            return this.getDOMTileTag(tile) !== tag
        })
        //console.log(updatedTiles.map(this.getDOMTileTag))

        let updatedInstances = this.state.tileInstances.filter((instance) => {
            return this.getTileInstanceTag(instance) !== tag
        })

        //console.log(updatedInstances.map(this.getTileInstanceTag))

        this.setState({
            tiles:updatedTiles,
            tileInstances:updatedInstances
        })
    }

    componentDidUpdate() {
        //console.log("Component Updated")
        //console.log(this.state.tiles.map(this.getDOMTileTag))
        //console.log(this.state.tileInstances.map(this.getTileInstanceTag))

        if (this.state.settingsDialog === null) {
            if (this.pendingDialog !== null) {
                this.showDialog(this.pendingDialog)
                this.pendingDialog = null
            }
        }
    }

    allTags = () => {
        return this.state.tileInstances.map(this.getTileInstanceTag)
    }

    tileInstanceForTag = (tag) => {
        for (let instance of this.state.tileInstances) {
            if (instance.getTag() === tag) {
                return instance
            }
        }
        return null
    }

    createSaveJSONStr = () => {
        let jsonArray = []
        for (let instance of this.state.tileInstances) {
            jsonArray.push(instance.exported())
        }

        // TODO: Don't hardcode the dimensions of the controller
        let exportDict = {
            dimensions:{
                width:1280,
                height:720
            },
            tiles:jsonArray
        }
        return JSON.stringify(exportDict, null, 4)
    }

    // http://stackoverflow.com/questions/11214404/how-to-detect-if-browser-supports-html5-local-storage
    isLocalStorageAvailable = () => {
        let mod = 'test1234'
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }

    }

    getFromLocalStorage = () => {
        return localStorage.getItem('ForceJS_LastController')
    }

    saveToLocalStorage = () => {

        let isLocal = this.isLocalStorageAvailable()
        if (!isLocal) {
            alert("Local storage is: " + (isLocal ? "" : "NOT ") + "AVAILABLE")
        }

        var jsonStr = this.createSaveJSONStr()
        localStorage.setItem('ForceJS_LastController', jsonStr)
        console.log("Saved to localStorage")
    }

    exportController = () => {
        var str = this.createSaveJSONStr()
        var dataStr = "data:application/octet-stream;charset=utf-8," + encodeURIComponent(str);
        window.open(dataStr)
        alert("Exported controller is now saved in your downloads folder under a name along the lines of 'download'.")
    }

    addTileInstance = (instance) => {
        this.state.tileInstances.push(instance)
    }

    addTile = function (tileToAdd, tileInstance) {
        this.state.tiles.push(tileToAdd)
        this.forceUpdate()
    }

    printLine = () => {
        console.log("--------------------")
    }

    showDialog = (settingsDialog) => {
        if (this.state.settingsDialog === null) {
            this.setState({
                settingsDialog: settingsDialog,
            })
        } else {
            this.removeCurrentDialog()
            this.pendingDialog = settingsDialog
        }
    }

    settingsDialog = () => {
        if (this.state.settingsDialog !== null) {
            return this.state.settingsDialog
        }
    }

    removeCurrentDialog = () => {
        this.setState({
            settingsDialog: null
        })
    }

    loadController = (jsonStr) => {
        this.setState({
            controllerJSONStr: jsonStr,
            tiles:[]
        })
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    resetController = () => {

        let dialog = (<DimensionsDialog dimensions={this.state.dimensions}
                                        completion={
                                            (newDimensions) => {
                                                this.setState({
                                                    dimensions: newDimensions,
                                                    tiles:[],
                                                    tileInstances:[],
                                                    settingsDialog:null,
                                                    controllerJSONStr: ""
                                                })
                                                this.forceUpdate()
                                            }
                                        }/>)

        this.showDialog(dialog)
    }

    constructor(props) {
        super(props);
        this.state = {
            dimensions: {
                width:1280,
                height:720,
                divisor:80
            },
            tiles: [],
            tileInstances: [],
            settingsDialog: null,
            controllerJSONStr: this.getFromLocalStorage()
        }

        this.tileAdder = new TileAdderHandler(this, 80)
    }

    render() {
        //console.log(this.state.dimensions)
        return (
            <div className="App">
                <NavBar pointers={{
                    app: this,
                    tileAdderHandler: this.tileAdder
                }} />
                <ControllerContainer dimensions={this.state.dimensions}
                                     adderHandler={this.tileAdder}
                                     tiles={this.state.tiles}
                                     load={this.state.controllerJSONStr}
                                     acceptingClicks={this.tileAdder.acceptingClicks}
                                     positionChosen={this.tileAdder.positionChosen}
                />
                {this.settingsDialog()}
            </div>
        );
    }
}

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default App;
