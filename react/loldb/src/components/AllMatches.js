import React, { Component } from 'react';
import data from './matches.json'
import MatchObject from './MatchObject.js'
 
class AllMatches extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataLoaded: 0,
			data: [],
		}
	}

	componentWillMount() {
		let url = 'https://loldbapi.appspot.com/api/matches';
		fetch(url)
		.then(response => {
			return response.json()
			}).then(results => {
				this.setState({data: results})
				this.setState({dataLoaded: 1})
				// console.log("state", this.state.data)
			})


	}




    render() {
	    	var matches = [];
	    if(this.state.dataLoaded === 0) {
	    	return (<div>Loading...</div>)
	    } else {
	  		matches = this.state.data.result
	  		console.log(matches)
	        return (
	        	<section className="works service-page">
		            <div className="container">
		                <div className="row">
			                <table bordercolor="white" align="left">
			                    <h3 class="subtitle wow fadeInUp animated" data-wow-delay=".3s" data-wow-duration="500ms"> <strong> Pro History </strong> </h3>
			                    <tr>
			                        <th width="50">Champion</th>
			                        <th width="100">Player</th>
			                        <th width="60">KDA</th>
			                        <th width="350">Items</th>
			                        <th>Summoner Spells</th>
			                    </tr>
		            			{matches.map((match) => {
		            				return (<MatchObject key={match.id} thisMatch={match} />)
		            			})}
		            			
			                </table>
			            </div>
			        </div>
		        </section>
	        )
	    }
    }
}

export default AllMatches;
