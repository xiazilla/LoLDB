import React, { Component } from 'react';
import mockData from './twistedSearch.json'
import "./map.css"

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			champResult: [],
			itemResult: [],
			mapResult: [],
			matchResult: [],
			filter: 'All',
			activePage: 1,
			resultsPerPage: 10,
			pages: 6
		};

		this.increasePage = this.increasePage.bind(this);
		this.decreasePage = this.decreasePage.bind(this);
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
        console.log("decreasePage")
        if (this.state.activePage === 1) {
            return false;
        } else {
            let newPage = this.state.activePage - 1;
            this.setState({
                activePage: newPage
            })
        }

    }

	updateSelect(event) {
        this.setState({filter: event.target.value.substr(0,20)});
        this.setState({activePage: 1})
    }

	componentWillMount(){
		this.setState({champResult: mockData.result[0]})
		this.setState({itemResult: mockData.result[1]})
		this.setState({mapResult: mockData.result[2]})
		this.setState({matchResult: mockData.result[3]})
	}

	handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber})
    }

	render() {
		console.log(this.props.match.params.searchFor);
		let champResult = this.state.champResult
		let itemResult = this.state.itemResult
		let mapResult = this.state.mapResult
		let matchResult = this.state.matchResult

		let results = [];


		switch(this.state.filter) {

			case 'Champions' :
				Object.keys(champResult).forEach(function(key) {
		      		results.push(champResult[key]);
		    	});
		    	break;
		    case 'Items' :
				Object.keys(itemResult).forEach(function(key) {
		      		results.push(itemResult[key]);
		    	});
		    	break;
		    case 'Maps' :
				Object.keys(mapResult).forEach(function(key) {
		      		results.push(mapResult[key]);
		    	});
		    	break;
		    case 'Matches' :
				Object.keys(matchResult).forEach(function(key) {
		      		results.push(matchResult[key]);
		    	});
		    	break;
			default: 
				Object.keys(champResult).forEach(function(key) {
		      		results.push(champResult[key]);
		    	});
				Object.keys(itemResult).forEach(function(key) {
		      		results.push(itemResult[key]);
		    	});
				Object.keys(mapResult).forEach(function(key) {
		      		results.push(mapResult[key]);
		    	});
				Object.keys(matchResult).forEach(function(key) {
		      		results.push(matchResult[key]);
		    	});
		}

		  	let lastResultOnPage = this.state.resultsPerPage * this.state.activePage;
	        let firstResultOnPage = this.state.resultsPerPage * (this.state.activePage - 1);
	        let numPages = Math.ceil(parseInt(results.length, 10)/parseInt(this.state.resultsPerPage, 10))
	        results = results.slice(firstResultOnPage, lastResultOnPage);

	        let pages = new Array(numPages)
	        for(let i = 0; i < numPages; ++i) {
	            pages[i] = i + 1
	        }



		return(
			<div >
				<div className="row">
					<div className="col-md-10"></div>
				</div>
				<div className="row">
					<div className="col-md-9"></div>
			        <div className="col-md-1">
						<h5 className="right">Filter: </h5>
			        </div>
					<div className="col-md-1">
			            <select onChange={this.updateSelect.bind(this)}> 
			                <option value='All'>All</option>
			                <option value='Champions'>Champion</option>
			                <option value='Items'>Items</option>
			                <option value='Maps'>Maps</option>
			                <option value='Matches'>Matches</option>
			            </select>
			        </div>			        
		        </div>
				<h3> {this.state.filter} Results </h3>

				<div className="row">
					<div className="col-md-1"> </div>
					<div>
						{results.map(r => <p className="text"><a href={r}>{r}</a></p>)}
					</div>
				</div>
		        {numPages === 0 ? <div> No Matches Match Your Search </div> :
                <section className="global-page-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="block">
                                        <div className="pager in-line"> 
                                            {this.state.activePage === 1 ? false: <button onClick={this.decreasePage}>&laquo;</button>}
                                            {pages.map(page => (<button className={this.state.activePage === page ? "active" : false} key={page} onClick={() => this.handlePageChange(page)}>{"" + page}</button>))}
                                            {this.state.activePage === numPages ? false: <button onClick={this.increasePage}>&raquo;</button>}
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </section>}
   			</div>
		);
	}
}

export default Search;