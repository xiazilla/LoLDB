import React, { Component } from 'react';
import MatchObject from './MatchObject.js'
 
class AllMatches extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataLoaded: 0,
			data: [],
			activePage: 1,
			matchesPerPage: 8,
			category: ''

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

	handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber})
    }

    render() {
	    var matches = [];




	    if(!this.state.dataLoaded) {
	    	return (<h2>Loading...</h2>)
	    } else {
	  		matches = this.state.data.result
	  		// console.log(matches)



	  		console.log(matches)


		  	let lastMatchOnPage = this.state.matchesPerPage * this.state.activePage;
	        let firstMatchOnPage = this.state.matchesPerPage * (this.state.activePage - 1);
	        let numPages = Math.ceil(parseInt(matches.length, 10)/parseInt(this.state.matchesPerPage, 10))
	        matches = matches.slice(firstMatchOnPage, lastMatchOnPage);

	        let pages = new Array(numPages)
	        console.log(pages)
	        for(let i = 0; i < numPages; ++i) {
	            pages[i] = i + 1
	        }


	        return (
	        <div>
		        <section className="global-page-header">
		            <div className="container">
		                <div className="row">
		                    <div className="col-md-12">
		                        <div className="block">
		                            <h2>Matches</h2>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </section>
	            {numPages === 0 ? false : 
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
			            				return (<MatchObject key={match.id} thisMatch={match} index={"0"} linkToMatch={1}/>)
			            			})}
			            			
				                </table>
				            </div>
				        </div>
			        </section> }
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
	        )
	    }
    }
}

export default AllMatches;
