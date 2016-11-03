import ControllerTile from './ControllerTile.jsx'
import MaterialUI, {RaisedButton} from 'material-ui'
import React from 'react'
import '../tile.css'

class ButtonTile extends React.Component {
	
	render() {
		var style = {
					top: 0,
					left: 0,
					width: 80,
					height: 80
				}
		return (
				<RaisedButton className="ui-tile" style={style} />
			)
	}
}

export default ButtonTile