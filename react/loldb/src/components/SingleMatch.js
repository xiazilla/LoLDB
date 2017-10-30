import React, { Component } from 'react';
import MatchObject from './MatchObject';

class MatchSingle extends Component {



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
	// Time Converter b/c Riot stores their time in seconds, feels bad man
	fancyTimeFormat(time)
	{   
	    // Hours, minutes and seconds
	    var hrs = ~~(time / 3600);
	    var mins = ~~((time % 3600) / 60);
	    var secs = time % 60;

	    // Output like "1:01" or "4:03:59" or "123:03:59"
	    var ret = "";

	    if (hrs > 0) {
	        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
	    }

	    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
	    ret += "" + secs;
	    return ret;
	}

	render () {
		if (this.state.dataLoaded) {
			var allMatches = this.state.data.result
			var i;
			var actualMatch;
			for (i in allMatches) {
				if (allMatches[i].gameId.toString() === this.props.match.params.matchId) {
					actualMatch = allMatches[i]
					// console.log(allMatches[i])
					var winningTeam = actualMatch.teams["0"].win === "Win" ? "Blue Team" : "Red Team";
					var fontColor = actualMatch.teams["0"].win === "Win" ? "blue" : "red";
				return (
				                    
					<div>
						<div className="container">
						<h3> <strong> Pro History </strong> </h3>
				                    <h4>Winning Team: <font color={fontColor}>{winningTeam}</font> &emsp; Game Length: {this.fancyTimeFormat(actualMatch.gameDuration)}</h4>
				                    <h4><font color="blue"> Blue Team </font></h4>
		                	<div className="row">
				                <table bordercolor="white" align="left">

				                    <tr>
				                        <th width="50">Champion</th>
				                        <th width="100">Player</th>
				                        <th width="60">KDA</th>
				                        <th width="350">Items</th>
				                        <th>Summoner Spells</th>
				                    </tr>
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"0"}/>
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"1"}/>	
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"2"}/>	
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"3"}/>	
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"4"}/>
				                </table>
				            </div>
							<h4><font color="red"> Red Team </font></h4>
				            <div className="row">
				            	<table bordercolor="white" align="left">
				                	<tr>
				                        <th width="50">Champion</th>
				                        <th width="100">Player</th>
				                        <th width="60">KDA</th>
				                        <th width="350">Items</th>
				                        <th>Summoner Spells</th>
				                    </tr>	
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"5"}/>
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"6"}/>	
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"7"}/>	
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"8"}/>	
									<MatchObject key={actualMatch.id} thisMatch={actualMatch} index={"9"}/>				                    			                          		                    			                   			                    			                   			                 			                                      
				                </table>
		                	</div>
		                </div>
	            	</div>);					
				}
			}
		}
		else {
			return(<div> Loading... </div>)
		}

	}


}

export default MatchSingle;