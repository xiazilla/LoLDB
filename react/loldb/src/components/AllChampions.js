import React, { Component } from 'react';
import mydata from './champions.json';
import ChampionObject from './ChampionObject'

class AllChampions extends Component {

	    render() {
    	// console.log(mydata);
    	let data = mydata.data;
    	var champions = [];
    	Object.keys(data).forEach(function(key) {
      		champions.push(mydata.data[key]);
    	});

        return (
        	<div className = "row"> {champions.map(champion => 
        		<ChampionObject key={champions.title} thisChampion={champion} />)}
        	</div>
        )
    }

}


export default AllChampions;