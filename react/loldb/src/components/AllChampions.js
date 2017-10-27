import React, { Component } from 'react';
import mydata from './champions.json';
import ChampionObject from './ChampionObject'
import './page.css'

class AllChampions extends Component {

	    render() {
    	// console.log(mydata);
    	let data = mydata.data;
    	var champions = [];
    	Object.keys(data).forEach(function(key) {
      		champions.push(mydata.data[key]);
    	});

        return (
        <div>
        <section className="global-page-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="block">
                            <h2>Champions</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className = "row"> {champions.map(champion => 
                <ChampionObject key={champions.title} thisChampion={champion} />)}
            </div>
            </section>
        </div>

        )
    }

}


export default AllChampions;