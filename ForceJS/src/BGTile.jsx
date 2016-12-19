import React, { Component } from 'react';
import './tile.css';

class BGTile extends Component {

    getX = () => {return this.props.x / this.props.size}
    getY = () => {return this.props.y / this.props.size}

    setHighlighted = (highlighted) => {
    	console.log('is highlighted: ' + highlighted)
        this.setState({
            highlighted: highlighted ? "#4b7d36" : ""
        })
    }

    constructor(props) {
        super(props)

        this.props.getInstance(this)
        this.state = {
            highlighted: ""
        }
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
            backgroundColor: this.state.highlighted
        };

        return (
			<div className="controller-tile" style={style}>
				<div className="circle"></div>
			</div>
        );
    }
}

export default BGTile;