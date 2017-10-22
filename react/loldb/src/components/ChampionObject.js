import React, { Component } from 'react';
import '../index.css';

class ChampionObject extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	render () {
		return (
	      <div> {this.props.thisChampion.name}
	      </div>
	     )

	}

}

export default ChampionObject;