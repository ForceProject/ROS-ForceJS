import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LoadDialog from './LoadDialog'

const TileMenu = (props) => (
    <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        {...props}
    >
        <MenuItem primaryText="Button" />
        <MenuItem primaryText="Slider" />
        <MenuItem primaryText="Switch" />
        <MenuItem primaryText="Numeric Stepper" />
        <MenuItem primaryText="TextField" />
        <MenuItem primaryText="Label" />
        <MenuItem primaryText="Close" />
    </IconMenu>
)

TileMenu.muiName = 'IconMenu';

class NavBar extends Component {
    state = {
        connected: false,
        editting: false,
        menuOpened: false
    };

    toggleConnection(event) {
        // Chnage the state of the connection
        this.setState({
            connected: !this.state.connected
        })
    }

    toggleEdit(event) {
        this.setState({
            editting: !this.state.editting
        })
    }

    menuItemSelected(event, child) {
        var selectionName = child.props.primaryText
        if (selectionName !== 'Close') {
            console.log(selectionName)
            this.tileAdderHandler.startAddTileProcess(selectionName)
        }
    }

    loadControllerPressed = () => {
        this.app.showDialog(<LoadDialog app={this.app} />)
    }

    constructor(props) {
        super(props);
        this.app = this.props.pointers.app
        this.tileAdderHandler = this.props.pointers.tileAdderHandler
    }

    render() {
        /* Old Left
         <div>
         <FlatButton {...this.props} label={this.state.editting ? "Save" : "Edit"} onClick={this.toggleEdit.bind(this)} />
         {this.state.editting ? <TileMenu onItemTouchTap={this.menuItemSelected.bind(this)}/> : ''}
         </div>
         */

        /* Connect Button
         <FlatButton label={this.state.connected ? "Disconnect" : "Connect"} onClick={this.toggleConnection.bind(this)}/>
         */
        return (
            <div>
                <AppBar
                    title="ForceJS"
                    iconElementLeft={
                        <TileMenu onItemTouchTap={this.menuItemSelected.bind(this)}/>
                    }
                    iconElementRight={
                        <div>
                            <FlatButton label="Reset" onClick={this.app.resetController} />
                            <FlatButton label="Save to Local" onClick={this.app.saveToLocalStorage} />
                            <FlatButton label="Load" onClick={this.loadControllerPressed} />
                            <FlatButton label="Export" onClick={this.app.exportController} />
                        </div>
                    }
                />
            </div>
        );
    }
}

export default NavBar;