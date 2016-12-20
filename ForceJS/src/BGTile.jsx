import React, { Component } from 'react';
import './tile.css';

class BGTile extends Component {

    getX = () => {return this.props.x / this.props.size}
    getY = () => {return this.props.y / this.props.size}

    handleClick = (event) => {
        this.props.onClick({x: this.getX(), y: this.getY()})
    }

    constructor(props) {
        super(props)
    }

    render() {

        var x = this.props.x
        var y = this.props.y
        var size = this.props.size

        var style = {
            top: y,
            left: x,
            width: size,
            height: size,
            backgroundColor: this.props.highlighted ? "#4b7d36" : ""
        };

        return (
			<div className="controller-tile" style={style} onClick={this.handleClick}>
				<div className="circle"></div>
			</div>
        );
    }
}

export default BGTile;
