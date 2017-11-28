import React, { Component } from 'react';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';


class SweVisualization extends Component {
	constructor (props) {
		super(props);
		this.state = {
			parks: [],
			campground: [],
			visCen: [],
			states: [],
			dataLoaded: 0
		};
	}

	componentWillMount () {
		let parksUrl = `https://sweet-travels.appspot.com/api/parks`;
		let campgroundUrl = `https://sweet-travels.appspot.com/api/campgrounds`;
		let visCenUrl = `https://sweet-travels.appspot.com/api/visitorcenters`;
		let statesUrl = `https://sweet-travels.appspot.com/api/states`;

		fetch(parksUrl)
		.then(response => {
			return response.json();
		}).then(results => {
			console.log(results)
			this.setState({parks: results});
		});

		fetch(campgroundUrl)
		.then(response => {
			return response.json();
		}).then(results => {
			// console.log(results)
			this.setState({campground: results});
			this.setState({dataLoaded: 1})
		});

		fetch(visCenUrl)
		.then(response => {
			return response.json();
		}).then(results => {
			// console.log(results)
			this.setState({visCen: results});
		});

		fetch(statesUrl)
		.then(response => {
			return response.json();
		}).then(results => {
			// console.log(results)
			this.setState({states: results});

		});
	}




	render() {
		if(this.state.dataLoaded === 0) {
			return (<div>Loading...</div>)
		} else {
			console.log(this.state.campground)
			// console.log(this.state.parks[0])
	        return (
			    <div>
			        <div className="global-about">
			            <div class="container">
			                <div class="row">
			                    <div class="col-md-12">
			                        <div class="block">
			                            <h1>SWEet Travels Visualization</h1>
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>

			        <br></br>

					<InteractiveForceGraph
					  simulationOptions={{ height: 600, width: 1000, animate: true}}
					  labelAttr="label"
					  onSelectNode={(node) => console.log(node)}
					  highlightDependencies
					>					

						{this.state.parks.map(park => <ForceGraphNode key={park.parkCode} node={{ id: park.parkCode, label: park.fullName }} fill="red" />)}
						{this.state.campground.map(campground => <ForceGraphNode key={campground.name} node={{ id: campground.name, label: campground.name }} fill="blue" />)}
						{this.state.visCen.map(visCen => <ForceGraphNode key={visCen.name} node={{ id: visCen.name, label: visCen.name }} fill="green" />)}
						{this.state.states.map(states => <ForceGraphNode key={states.abbreviations} node={{ id: states.abbreviations, label: states.name }} fill="orange" />)}

						{this.state.campground.map(campground => <ForceGraphLink link={{ source: campground.name, target: campground.parkCode }} />)}

						{this.state.visCen.map(function(visCen){
							let state = visCen.states;
							if(visCen.states === 'VI') {
								state = 'VA'
							}
							// console.log("STATE " + state)
							return <ForceGraphLink link={{ source: visCen.name, target: state}} />
						} )}

						{this.state.campground.map(function(campground) {
							if(campground.states.length === 2) {
								if(campground.states !== 'DC' && campground.states !== 'AS' && campground.states !== 'GU' && campground.states !== 'VI') {
									return <ForceGraphLink link={{source: campground.name, target: campground.states}} />
								} 
								return <div></div>
							} else {
									var array = campground.states.split(',');
									return array.map(
										function(state) {
											if (state !== 'DC' && state !== 'AS' && state !== 'GU' && state !== 'VI') {
												return <ForceGraphLink link={{ source: campground.name, target: state}} />
											} else {
												return <div></div>
											}
										})
							}

						})}

						{this.state.visCen.map(function(visCen){
							return <ForceGraphLink link={{ source: visCen.name, target: visCen.parkCode}} />
						} )}
						{this.state.parks.map(
							function(park) {
								if(park.states.length !== 2 ) {

									var array = park.states.split(',');
									return array.map(
										function(state) {
											if (state !== 'DC' && state !== 'AS' && state !== 'GU' && state !== 'VI') {
												return <ForceGraphLink link={{ source: park.parkCode, target: state}} />
											} else {
												return <div></div>
											}
										})
								}
								if(park.states !== 'DC' && park.states !== 'AS' && park.states !== 'GU' && park.states !== 'VI') {

									return <ForceGraphLink link={{source: park.parkCode, target: park.states}} />
								} 
								return <div></div>
							}
						)}
					</InteractiveForceGraph>

					<h5 align="left">Description</h5>
					<p>The graph above displays an interactive mapping of the SWEet Travel database. You can see blue dots which represent campgrounds, red dots which represent parks, orange dots which represent states and finally green dots which represent visitor centers. The lines between dots represent a link between two instances. Feel free to hover on dots to receive more information.</p>


			    </div>
		    )
		}
	}
}

export default SweVisualization