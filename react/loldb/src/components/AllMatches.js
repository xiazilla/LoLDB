import React, { Component } from 'react';
import data from './matches.json'
import MatchObject from './MatchObject.js'
 
class AllMatches extends Component {

    render() {
    	var matches = [];
    	Object.keys(data).forEach(function(key) {
      		//
      		matches.push(data[key]);
    	});
    	// console.log(items)
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
	            				return (<MatchObject key={match.id} thisMatch={match} thisChampId={match.participants["0"].championId}/>)
	            			})}
	            			
		                </table>
		            </div>
		        </div>
	        </section>
        )
    }
}

export default AllMatches;
