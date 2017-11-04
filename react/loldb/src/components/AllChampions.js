import React, { Component } from 'react';
import mydata from './champions.json';
import ChampionObject from './ChampionObject'
import './page.css'
import './dropdown.css'

class AllChampions extends Component {

	    constructor() {
            super();
            this.state = {
                search: '',
                role: ''
            };
        }

        updateSearch(event) {
            this.setState({search: event.target.value.substr(0,20)});
        }

        updateSelect(event) {
            this.setState({role: event.target.value.substr(0,20)});
        }

        render() {
    	// console.log(mydata);
    	let data = mydata.result;
    	var champions = [];
    	Object.keys(data).forEach(function(key) {
      		champions.push(data[key]);
    	});
        var filteredChamps = champions.filter(
            (champion) => {
                return champion.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            });
        filteredChamps = filteredChamps.filter(
            (champion) => {
                //console.log(this.state.role)
                if (this.state.role === '') {
                    return true;
                }
                else {
                    return champion.roles.indexOf(this.state.role) !== -1;
                }
            }); 
        return (
        <div>
        <section className="global-page-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="block">
                            <h2>Champions</h2>
                            <input type="text" placeholder="Search by name..."
                                value={this.state.search} 
                                onChange={this.updateSearch.bind(this)}/>
                            Filter By:
                            <select onChange={this.updateSelect.bind(this)}> 
                                <option value=''>All</option>
                                <option>Assassin</option>
                                <option>Tank</option>
                                <option>Mage</option>
                                <option>Marksman</option>
                                <option>Fighter</option>
                                <option>Support</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className = "row">
                {filteredChamps.map(champion => <ChampionObject key={champions.title} thisChampion={champion} />)}
            </div>
            </section>
        </div>

        )
    }

}

export default AllChampions;