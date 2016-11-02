import React, { Component } from 'react';
import './tile.css';

class BGTile extends Component {

	render() {

		var x = this.props.x
		var y = this.props.y
		var size = this.props.size

		var style = {
		      top: y,
		      left: x,
		      width: size,
		      height: size
		    };

		return (
			<div className="controller-tile" style={style}>
	                <div className="circle">
	                </div>
	        </div>
        );
	}
}

export default BGTile;