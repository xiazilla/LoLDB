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
		  filter: 'all'
		};
	}


	updateSelect(event) {
        this.setState({filter: event.target.value.substr(0,20)});
    }

	componentWillMount(){
		this.setState({champResult: mockData.result[0]})
		this.setState({itemResult: mockData.result[1]})
		this.setState({mapResult: mockData.result[2]})
		this.setState({matchResult: mockData.result[3]})
	}

	render() {
		console.log(this.props.match.params.searchFor);
		let champResult = this.state.champResult
		let itemResult = this.state.itemResult
		let mapResult = this.state.mapResult
		let matchResult = this.state.matchResult
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
			                <option value='all'>All</option>
			                <option value='champs'>Champion</option>
			                <option value='items'>Items</option>
			                <option value='maps'>Maps</option>
			                <option value='matches'>Matches</option>
			            </select>
			        </div>			        
		        </div>
				{this.state.filter === 'all' || this.state.filter === 'champs' ? 
					<div>
						<h1 className="text"> Champion Results </h1>
						<div className="row">
							<div className="col-md-1"> </div>
							<div>
								{champResult.map(r => <p className="text "><a href={r}>{r}</a></p>)} 
							</div>
						</div>
					</div>: false }
				{this.state.filter === 'all' || this.state.filter === 'items' ? 
					<div>
						<h1 className="text"> Item Results </h1>
						<div className="row">
							<div className="col-md-1"> </div>
							<div>
							{itemResult.map(r => <p className="text"><a href={r}>{r}</a></p>)}
							</div>
						</div>
					</div> : false }
				{this.state.filter === 'all' || this.state.filter === 'maps' ?
					<div>
						<h1 className="text"> Maps Results </h1>
						<div className="row">
							<div className="col-md-1"> </div>
							<div>
							{mapResult.map(r => <p className="text"><a href={r}>{r}</a></p>)}
							</div>
						</div>
					</div> : false }

				{this.state.filter === 'all' || this.state.filter === 'matches' ? 
					<div>
						<h1 className="text"> Match Results </h1>
						<div className="row">
							<div className="col-md-1"> </div>
							<div>
								{matchResult.map(r => <p className="text"><a href={r}>{r}</a></p>)}
							</div>
						</div>
					</div> : false }
			</div>
		);
	}
}

export default Search;