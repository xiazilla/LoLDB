import React, { Component } from 'react';
import mydata from './champions.json';

class SingleChampion extends Component {

	render() {

		return (
			<div>
				<h4>SingleChampion</h4>
				<p>{this.props.match.params.name}</p>
			</div>
		) 
	}
}

export default SingleChampion