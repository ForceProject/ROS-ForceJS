import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

class ButtonTile extends React.Component {

	render() {
		var title = this.props.title

		var style = {
					top: 0,
					left: 0,
					width: '100%',
					height: '100%'
				}
		return (
				<RaisedButton label={title} style={style} />
			)
	}
}



export default ButtonTile