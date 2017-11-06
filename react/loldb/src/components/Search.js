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
		  matchResult: []
		};
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
			<div>
				<h1 className="text"> Champion Results </h1>
				{champResult.map(r => <p className="text"><a href={r}>{r}</a></p>)}
				<h1 className="text"> Item Results </h1>
				{itemResult.map(r => <p className="text"><a href={r}>{r}</a></p>)}
				<h1 className="text"> Maps Results </h1>
				{mapResult.map(r => <p className="text"><a href={r}>{r}</a></p>)}
				<h1 className="text"> Match Results </h1>
				{matchResult.map(r => <p className="text"><a href={r}>{r}</a></p>)}
			</div>
		);
	}
}

export default Search;