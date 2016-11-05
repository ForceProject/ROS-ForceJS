import React, {Component} from 'react'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class ControllerTile extends Component {

		getChildContext() {
	    return { muiTheme: getMuiTheme(baseTheme) };
	}

	render() {

		var childElement = this.props.subview

		var location = this.props.location
		var size = this.props.size
		var y = "y"
		var x = "x"
		var topLeft = location[0]
		var bottomRight = location[1]
		var tileWidth = bottomRight[x] - topLeft[x] + 1
		var tileHeight = bottomRight[y] - topLeft[y] + 1

		console.log(tileWidth)

		var style = {
			top: topLeft[y] * size,
			left: topLeft[x] * size,
			width: tileWidth * size,
			height: tileHeight * size,
		}

		return (
				<div className="ui-tile" style={style}>
					{childElement}
				</div>
			)
	}
}

ControllerTile.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default ControllerTile;