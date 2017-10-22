import React, { Component } from 'react';

class ItemObject extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	render () {
		return <h4 className="col-md-4">{this.props.thisItem.name}</h4>
	}

}

export default ItemObject;