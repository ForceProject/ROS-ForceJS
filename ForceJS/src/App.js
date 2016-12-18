import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar.jsx'
import ControllerContainer from './ControllerContainer.jsx'
import {TileAdderHandler} from './TileAdderHandler.jsx'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TileSettingsDialog from './TileSettings'

class App extends Component {

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
        return JSON.stringify(exportDict)
    }

    getFromLocalStorage = () => {
        return localStorage.getItem('ForceJS_LastController')
    }

    saveToLocalStorage = () => {
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
        this.setState({
            settingsDialog: settingsDialog,
        })
        this.forceUpdate()
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
        this.setState({
            tiles:[],
            tileInstances:[],
            settingsDialog:null
            controllerJSONStr: ""
        })
        alert("Controller has been reset.")
    }

    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
            tileInstances: [],
            settingsDialog: null,
            controllerJSONStr: this.getFromLocalStorage()
        }

        this.tileAdder = new TileAdderHandler(this, 80)
    }

    render() {
        return (
            <div className="App">
                <NavBar pointers={{
                    app: this,
                    tileAdderHandler: this.tileAdder
                }} />
                <ControllerContainer adderHandler={this.tileAdder} tiles={this.state.tiles} load={this.state.controllerJSONStr} />
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
