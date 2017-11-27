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
		let parksUrl = `http://sweet-travels.appspot.com/api/parks`;
		let campgroundUrl = `http://sweet-travels.appspot.com/api/campgrounds`;
		let visCenUrl = `http://sweet-travels.appspot.com/api/visitorcenters`;
		let statesUrl = `http://sweet-travels.appspot.com/api/states`;

		fetch(parksUrl)
		.then(response => {
			return response.json();
		}).then(results => {
			// console.log(results)
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

	cgToStates(campground) {
		console.log(campground);
		if(campground.abbreviations === "CA,NV") {
			return (<div></div>)
		}
		else {
			return <ForceGraphLink link={{ source: campground.name, target: campground.abbreviations }} />
		}
	}




	render() {
		if(this.state.dataLoaded === 0) {
			return (<div>Loading...</div>)
		} else {
			// console.log(this.state.parks)
			console.log(this.state.parks[0])
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
					  simulationOptions={{ height: 600, width: 800, animate: true}}
					  labelAttr="label"
					  onSelectNode={(node) => console.log(node)}
					  highlightDependencies
					>					

						{this.state.parks.map(park => <ForceGraphNode key={park.parkCode} node={{ id: park.parkCode, label: park.fullName }} fill="red" />)}
						{this.state.campground.map(campground => <ForceGraphNode key={campground.name} node={{ id: campground.name, label: campground.name }} fill="blue" />)}
						{this.state.visCen.map(visCen => <ForceGraphNode key={visCen.name} node={{ id: visCen.name, label: visCen.name }} fill="green" />)}
						{this.state.states.map(states => <ForceGraphNode key={states.abbreviations} node={{ id: states.abbreviations, label: states.name }} fill="orange" />)}

						{this.state.campground.map(campground => <ForceGraphLink link={{ source: campground.name, target: campground.parkCode }} />)}
						{this.state.campground.map(function(campground) {
							if(campground.states === 'CA,NV') {
								return <div></div>
							}
							return <ForceGraphLink link={{ source: campground.name, target: campground.states }} />
						})}
						{this.state.campground.map(function(campground) {
							if(campground.states === 'CA,NV') {
								return <div></div>
							}
							return <ForceGraphLink link={{ source: campground.name, target: campground.states }} />
						})}
						{this.state.visCen.map(function(visCen){
							let state = visCen.states;
							if(visCen.states === 'VI') {
								state = 'VA'
							}
							return <ForceGraphLink link={{ source: visCen.name, target: state}} />
						} )}

						{this.state.visCen.map(function(visCen){
							return <ForceGraphLink link={{ source: visCen.name, target: visCen.parkCode}} />
						} )}
						{this.state.parks.map(
							function(park) {
								console.log()
								if(park.states.length !== 2 ) {

									var array = park.states.split(',');
									array.map(function(state) {
										if (state !== 'DC' && state !== 'AS' && state !== 'GU' && state !== 'VI') {
											return <ForceGraphLink link={{ source: park.parkCode, target: park.state}} />
										}
									})
									return <div></div>
								}
								if(park.states !== 'DC' && park.states !== 'AS' && park.states !== 'GU' && park.states !== 'VI') {
									return <ForceGraphLink link={{source: park.parkCode, target: park.states}} />
								} 
								return <div></div>
							}
						)}






					</InteractiveForceGraph>

			    </div>
		    )
		}
	}
}

export default SweVisualization