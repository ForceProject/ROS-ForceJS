import React, { Component } from 'react';
import './App.css';

import NavBar from './NavBar.jsx'
import ControllerContainer from './ControllerContainer.jsx'
import {TileAdderHandler} from './TileAdderHandler.jsx'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TileSettingsDialog from './TileSettings'

class App extends Component {

    tileAdder = new TileAdderHandler(this, 80)

    addTile = function (tileToAdd) {
        /* TODO:
         -[ ] Show the TileSettingsDialog here, use a state change and pass a show:Bool and a params:Dict
         -[ ] On the save button click, get the data and set it to the tile
         -[ ] Add a delete tile button to the TSDialog
         */
        this.state.tiles.push(tileToAdd)
        this.forceUpdate()
    }

    printLine = () => {
        console.log("--------------------")
    }

    showSettingsDialog = (settingsDialog) => {
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

    removeCurrentSettingsDialog = () => {
        this.setState({
            settingsDialog: null
        })
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
            settingsDialog: null,
        }
    }

    render() {
        return (
            <div className="App">
                <NavBar pointers={{
                    app: this,
                    tileAdderHandler: this.tileAdder
                }} />
                <ControllerContainer adderHandler={this.tileAdder} tiles={this.state.tiles} />
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
