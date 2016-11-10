import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title="ForceJS"
          iconElementLeft={
            <div>
              <FlatButton {...this.props} label={this.state.editting ? "Save" : "Edit"} onClick={this.toggleEdit.bind(this)} />
              {this.state.editting ? <TileMenu onItemTouchTap={this.menuItemSelected}/> : ''}
            </div>
          }
          iconElementRight={
            <FlatButton {...this.props} label={this.state.connected ? "Disconnect" : "Connect"} onClick={this.toggleConnection.bind(this)}/>
          }
        />
      </div>
    );
  }
}

export default NavBar;