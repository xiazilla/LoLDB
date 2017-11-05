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
                role: '',
                champsPerPage: 16,
                activePage: 1
            };

            this.handlePageChange = this.handlePageChange.bind(this)
            this.increasePage = this.increasePage.bind(this)
            this.decreasePage = this.decreasePage.bind(this)
        }




    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber})
    }

    increasePage() {

        if (this.state.activePage === this.state.pages) {
            return false;
        } else {
            let newPage = this.state.activePage + 1;
            this.setState({activePage: newPage})
        }

    }

    decreasePage() {

        if (this.state.activePage === 1) {
            return false;
        } else {
            let newPage = this.state.activePage - 1;
            this.setState({
                activePage: newPage
            })
        }

    }


        updateSearch(event) {
            this.setState({search: event.target.value.substr(0,20)});
            this.setState({activePage: 1})
        }

        updateSelect(event) {
            this.setState({role: event.target.value.substr(0,20)});
            this.setState({activePage: 1})
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


        let lastChampOnPage = this.state.champsPerPage * this.state.activePage;
        let firstChampOnPage = this.state.champsPerPage * (this.state.activePage - 1);
        const currentChampsOnPage = filteredChamps.slice(firstChampOnPage, lastChampOnPage);
        let numPages = Math.ceil(parseInt(filteredChamps.length, 10)/parseInt(this.state.champsPerPage, 10))
        let pages = new Array(numPages)
        for(let i = 0; i < numPages; ++i) {
            pages[i] = i + 1
        }


        console.log(currentChampsOnPage)

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
                                &nbsp; Filter By:
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
            {numPages === 0 ? false : 
                <div className = "row">
                    {currentChampsOnPage.map(champion => <ChampionObject key={champions.id} thisChampion={champion} />)}
                </div> }
            {numPages === 0 ? <div> No Champions Match Your Search </div> :
                <section className="global-page-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="block">
                                        <div className="pager in-line"> 
                                            <button onClick={() => this.decreasePage}>&laquo;</button>
                                            {pages.map(page => (<button className={this.state.activePage === page ? "active" : false} key={page} onClick={() => this.handlePageChange(page)}>{"" + page}</button>))}
                                            <button onClick={() => this.increasePage}>&raquo;</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </section>} 
        </div>

        )
    }

}

export default AllChampions;